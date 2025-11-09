#include <Arduino.h>
#include <capteur_utils.h>

int people = 0;

int lastStateA = LOW;
int lastStateB = LOW;

int countA = 0;
int countB = 0;

unsigned long debutAttente;
unsigned long dureeAttente = 3000;
char isCouper = 'N';
 
int entrer = 0;
int sortie = 0;

void afficherValeurCapteur(int pin)
{
    int val = digitalRead(pin);
    if (pin == BREAK_BEAM_A)
        Serial.print("A : ");
    else if (pin == BREAK_BEAM_B)
        Serial.print("B : ");

    Serial.println(val);
    // Serial.print(" + ");

    // if (pin == BREAK_BEAM_A)
    //     Serial.println(countA);
    // else if (pin == BREAK_BEAM_B)
    //     Serial.println(countB);
}

float intensiteLumineux(int pin)
{
    int adc = analogRead(pin);
    float Vc = adc * 3.3 / 4095.0; // tension collecteur

    if (Vc == 0)
        Vc = 0.0008;

    float lux = 500.0 / Vc;
    return lux;
}

// Pour BP103
// int lireStateCapteur(int pin)
// {
//     int val = analogRead(pin);
//     if (val < SEUIL)
//         return LOW;
//     else
//         return HIGH;
// }

// bool isCouperCapteurA()
// {
//     int state = lireStateCapteur(BP103A);
//     if (state == HIGH && lastStateA == LOW)
//     {
//         countA++;
//         lastStateA = state;
//         return true;
//     }
//     lastStateA = state;
//     return false;
// }

// bool isCouperCapteurB()
// {
//     int state = lireStateCapteur(BP103B);
//     if (state == HIGH && lastStateB == LOW)
//     {
//         countB++;
//         lastStateB = state;
//         return true;
//     }
//     lastStateB = state;
//     return false;
// }

bool isCouperBreakBeamA() {
    int state = digitalRead(BREAK_BEAM_A);
    if (state == LOW && lastStateA == HIGH)
    {
        countA++;
        lastStateA = state;
        return true;
    }
    lastStateA = state;
    return false;
}

bool isCouperBreakBeamB() {
    int state = digitalRead(BREAK_BEAM_B);
    if (state == LOW && lastStateB == HIGH)
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
            if (isCouperBreakBeamB() && digitalRead(PIR) == HIGH)
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
            if (isCouperBreakBeamA() && digitalRead(PIR) == HIGH)
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