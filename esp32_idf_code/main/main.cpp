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

extern "C" void app_main(void)
{
    wifi_init_sta();
    mqtt_init();

    while (1)
    {
        // buffer d'entrer
        float features[EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE];
        features[0] = (float)gpio_get_level(BREAK_BEAM_A);
        features[1] = (float)gpio_get_level(BREAK_BEAM_B);
        features[2] = (float)gpio_get_level(PIR);

        signal_t signal;
        numpy::signal_from_buffer(features, EI_CLASSIFIER_RAW_SAMPLE_COUNT, &signal);

        // le classifier
        ei_impulse_result_t result = { 0 };
        EI_IMPULSE_ERROR res = run_classifier(&signal, &result, false);

        // afficher resultat prediction
        if (res == EI_IMPULSE_OK) {
            // Afficher les résultats
            printf("Predictions:\n");
            for (size_t i = 0; i < EI_CLASSIFIER_LABEL_COUNT; i++) {
                printf("  %s: %.5f\n", result.classification[i].label, result.classification[i].value);
            }
        }

        vTaskDelay(200 / portTICK_PERIOD_MS);
    }
}