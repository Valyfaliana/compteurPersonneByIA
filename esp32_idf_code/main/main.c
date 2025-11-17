#include <stdio.h>
#include <inttypes.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"

#include "capteurs_utils.h"
#include "network_utils.h"
#include "edge-impulse-sdk/classifier/ei_run_classifier_c.h"

void app_main(void)
{
    wifi_init_sta();
    mqtt_init();

    while (1)
    {
        compterPeople();

        uint64_t timestamp = millis();
        char *valA = gpio_get_level(BREAK_BEAM_A) == 1 ? "1" : "0";
        char *valB = gpio_get_level(BREAK_BEAM_B) == 1 ? "1" : "0";
        char *valPir = gpio_get_level(PIR) == 1 ? "1" : "0";
        char output[10];
        char nbrPeople[5]; // max: 9999 personnes
        sprintf(nbrPeople, "%d", people);

        if (entrer)
            sprintf(output, "entrer");
        else if (sortie)
            sprintf(output, "sortie");
        else
            sprintf(output, "rien");

        // affichage sur monitor serial
        printf("%" PRIu64 ", %s, %s, %s, %s\n", timestamp, valA, valB, valPir, output);

        // publication via mqtt
        mqtt_publish_data("nombre/personnes", nbrPeople);
        mqtt_publish_data("etat/break/beam/A", valA);
        mqtt_publish_data("etat/break/beam/B", valB);

        vTaskDelay(200 / portTICK_PERIOD_MS);
    }
}