#pragma once

#define BREAK_BEAM_A 18
#define BREAK_BEAM_B 19
#define PIR 4

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