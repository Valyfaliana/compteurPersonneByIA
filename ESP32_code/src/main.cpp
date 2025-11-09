#include <Arduino.h>
#include <network_utils.h>
#include <capteur_utils.h>

void setup()
{
  Serial.begin(921600); 
  delay(100);

  // WiFi
  setupWifi();

  // Broker
  client.setServer(mqtt_server, 1883);

  // analogSetPinAttenuation(BP103A, ADC_11db);
  // analogSetPinAttenuation(BP103B, ADC_11db);
  // analogReadResolution(12);

  // Les pins
  pinMode(PIR, INPUT);
  pinMode(BREAK_BEAM_A, INPUT);
  pinMode(BREAK_BEAM_B, INPUT);

  debutAttente = millis();

  Serial.println("timestamp,capteurA,capteurB,PIR,event");
}

void loop()
{
  // initialisation
  entrer = 0;
  sortie = 0;
  
  if (!client.connected())
  {
    reconnect();
  }
  client.loop();

  // Afficher valeurs des capteurs
  // afficherValeurCapteur(BREAK_BEAM_A);
  // afficherValeurCapteur(BREAK_BEAM_B);

  // // afficher valeur pir
  // int val = digitalRead(PIR);
  // Serial.print("Valeur PIR : ");
  // Serial.println(val);

  // Compter les gens
  compterPeople();

  Serial.print(millis());
  Serial.print(",");
  Serial.print(digitalRead(BREAK_BEAM_A));
  Serial.print(",");
  Serial.print(digitalRead(BREAK_BEAM_B));
  Serial.print(",");
  Serial.print(digitalRead(PIR));
  Serial.print(",");
  if (entrer)
    Serial.println("entrer");
  else if (sortie)
    Serial.println("sortie");
  else 
    Serial.println("rien");

  // Afficher nbr de personnes
  // Serial.print("Nombre personne : ");
  // Serial.println(people);
  // client.publish("nombre/personnes", String(people).c_str());

  // // En attente ou pas
  // Serial.print("En attente : ");
  // Serial.println(isAttente);

  // Envoyer valeur capteur (intensiter lumineux)
  // client.publish("intensite/lumineux/A", String(digitalRead(BP103A)).c_str());
  // client.publish("intensite/lumineux/B", String(digitalRead(BP103B)).c_str());

  // Envoyer Etat capteur (break beam)
  client.publish("etat/break/beam/A", String(digitalRead(BREAK_BEAM_A)).c_str());
  client.publish("etat/break/beam/B", String(digitalRead(BREAK_BEAM_B)).c_str());

  delay(200);
}