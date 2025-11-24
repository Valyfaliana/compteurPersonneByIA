#pragma once

#include "driver/gpio.h"

#define BREAK_BEAM_A GPIO_NUM_18
#define BREAK_BEAM_B GPIO_NUM_19
#define PIR1 GPIO_NUM_4
#define PIR2 GPIO_NUM_2

extern int people;

extern int lastStateA;
extern int lastStateB;

extern int countA;
extern int countB;

extern uint64_t debutAttente;
extern uint64_t dureeAttente;
extern char isCouper;

extern int entrer;
extern int sortie;

// les fonctions
void afficherValeurCapteur(int);
float intensiteLumineux(int);
void compterPeople(void);
uint64_t millis(void);
int lecture_pir(void);