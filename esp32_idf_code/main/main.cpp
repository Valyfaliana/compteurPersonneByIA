#include <stdio.h>
#include <inttypes.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"

#include "model-parameters/model_metadata.h"
#include "edge-impulse-sdk/classifier/ei_run_classifier.h"

extern "C"
{
#include "capteurs_utils.h"
#include "network_utils.h"
}

// #define BREAK_BEAM_A GPIO_NUM_18
// #define BREAK_BEAM_B GPIO_NUM_19
// #define PIR GPIO_NUM_4

static float features[EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE];

// Callback: fill a section of the out_ptr buffer when requested
static int get_signal_data(size_t offset, size_t length, float *out_ptr)
{
    for (size_t i = 0; i < length; i++)
    {
        out_ptr[i] = (features + offset)[i];
    }
    return EIDSP_OK;
}

char* deduction_probabiliste(float entrer, float rien, float sortie)
{
    if (entrer > rien && entrer > sortie && entrer > 50.) 
    {
        return "entrer";
    }
    else if (rien > sortie && rien > 50.) 
    {
        return "rien";
    }
    else if (sortie > 50.)
    {
        return "sortie";
    }
    else 
    {
        return "incertain";
    }
}

extern "C" void app_main(void)
{
    wifi_init_sta();
    mqtt_init();

    while (1)
    {
        // collection des donnee
        for (int i=0 ; i < EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE ; i += 3)
        {
            features[i] = (float) gpio_get_level(BREAK_BEAM_A);
            features[i + 1] = (float) gpio_get_level(BREAK_BEAM_B);
            features[i + 2] = (float) lecture_pir();
            vTaskDelay(50 / portTICK_PERIOD_MS);
        }

        signal_t signal;
        signal.total_length = EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE;
        signal.get_data = &get_signal_data;

        // le classifier
        ei_impulse_result_t result = {0};
        EI_IMPULSE_ERROR res = run_classifier(&signal, &result, false);

        // afficher resultat prediction
        if (res == EI_IMPULSE_OK)
        {
            // Afficher les résultats
            printf("Predictions:\n");
            for (size_t i = 0; i < EI_CLASSIFIER_LABEL_COUNT; i++)
            {
                printf("  %s: %.5f\n", result.classification[i].label, result.classification[i].value);
            }

            // 0: entrer - 1: rien - 2: sortie
            float entrer = result.classification[0].value;
            float rien = result.classification[1].value;
            float sortie = result.classification[2].value;

            printf("Evenement : %s\n", deduction_probabiliste(entrer, rien, sortie));
        }

        // compterPeople();

        // uint64_t timestamp = millis();
        // int valA = gpio_get_level(BREAK_BEAM_A);
        // int valB = gpio_get_level(BREAK_BEAM_B);
        // int valPir = lecture_pir();
        // char output[10];
        // char nbrPeople[5]; // max: 9999 personnes
        // sprintf(nbrPeople, "%d", people);

        // if (entrer)
        //     sprintf(output, "entrer");
        // else if (sortie)
        //     sprintf(output, "sortie");
        // else
        //     sprintf(output, "rien");

        // // affichage sur monitor serial
        // printf("%" PRIu64 ", %d, %d, %d, %s\n", timestamp, valA, valB, valPir, output);

        vTaskDelay(100 / portTICK_PERIOD_MS);
    }
}
