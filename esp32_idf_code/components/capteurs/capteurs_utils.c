#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"
#include "esp_timer.h"

#include "capteurs_utils.h"

int people = 0;

int lastStateA = 0;
int lastStateB = 0;

int countA = 0;
int countB = 0;

uint64_t debutAttente;
uint64_t dureeAttente = 3000;
char isCouper = 'N';

int entrer = 0;
int sortie = 0;

uint64_t millis(void);

void afficherValeurCapteur(int pin)
{
    int val = gpio_get_level(pin);
    if (pin == BREAK_BEAM_A)
        printf("A : %d\n", val);
    else if (pin == BREAK_BEAM_B)
        printf("B : %d\n", val);
}

float intensiteLumineux(int pin)
{
    int adc = gpio_get_level(pin);
    float Vc = adc * 3.3 / 4095.0; // tension collecteur

    if (Vc == 0)
        Vc = 0.0008;

    float lux = 500.0 / Vc;
    return lux;
}

bool isCouperBreakBeamA() {
    int state = gpio_get_level(BREAK_BEAM_A);
    if (state == 0 && lastStateA == 1)
    {
        countA++;
        lastStateA = state;
        return true;
    }
    lastStateA = state;
    return false;
}

bool isCouperBreakBeamB() {
    int state = gpio_get_level(BREAK_BEAM_B);
    if (state == 0 && lastStateB == 1)
    {
        countB++;
        lastStateB = state;
        return true;
    }
    lastStateB = state;
    return false;
}

void compterPeople()
{
    if (isCouper == 'N')
    {
        // initialiser les flags
        entrer = 0;
        sortie = 0;
        
        if (isCouperBreakBeamA())
        {
            isCouper = 'A';
            debutAttente = millis();
            compterPeople();
        }
        else if (isCouperBreakBeamB())
        {
            isCouper = 'B';
            debutAttente = millis();
            compterPeople();
        }
    }
    // Pour entrer
    else if (isCouper == 'A')
    {
        // Annuler si duree trop long ou capteur A couper de nouveau
        if (millis() - debutAttente > dureeAttente || isCouperBreakBeamA())
        {
            isCouper = 'N';
        }
        else
        {
            if (isCouperBreakBeamB() && gpio_get_level(PIR) == 1)
            {
                isCouper = 'N';
                people++;
                entrer = 1;
                return;
            }
        }
    }
    // Pour sortie
    else if (isCouper == 'B')
    {
        // Annuler si duree trop long ou capteur B couper de nouveau
        if (millis() - debutAttente > dureeAttente || isCouperBreakBeamB())
        {
            isCouper = 'N';
        }
        else
        {
            if (isCouperBreakBeamA() && gpio_get_level(PIR) == 1)
            {
                isCouper = 'N';
                if (people > 0) {
                    people--;
                }
                sortie = 1;
                return;
            }
        }
    }
}

uint64_t millis()
{
    return esp_timer_get_time() / 1000;   // microseconds → milliseconds
}
