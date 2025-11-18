#include <stdio.h>
#include <inttypes.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"

#include "model-parameters/model_metadata.h"
#include "edge-impulse-sdk/classifier/ei_run_classifier.h"

extern "C"
{
    // #include "capteurs_utils.h"
    // #include "network_utils.h"
}

#define BREAK_BEAM_A GPIO_NUM_18
#define BREAK_BEAM_B GPIO_NUM_19
#define PIR GPIO_NUM_4

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

extern "C" void app_main(void)
{
    // wifi_init_sta();
    // mqtt_init();

    while (1)
    {
        // buffer d'entrer
        // float features[EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE];

        // collection des donnee
        for (int i=0 ; i < EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE ; i += 3)
        {
            features[i] = (float) gpio_get_level(BREAK_BEAM_A);
            features[i + 1] = (float) gpio_get_level(BREAK_BEAM_B);
            features[i + 2] = (float) gpio_get_level(PIR);
            vTaskDelay(200 / portTICK_PERIOD_MS);
        }

        signal_t signal;
        // numpy::signal_from_buffer(features, EI_CLASSIFIER_RAW_SAMPLE_COUNT, &signal);
        signal.total_length = EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE;
        signal.get_data = &get_signal_data;

        // le classifier
        ei_impulse_result_t result = {0};
        EI_IMPULSE_ERROR res = run_classifier(&signal, &result, false);

        // afficher resultat prediction
        if (res == EI_IMPULSE_OK) {
            // Afficher les résultats
            printf("Predictions:\n");
            for (size_t i = 0; i < EI_CLASSIFIER_LABEL_COUNT; i++) {
                printf("  %s: %.5f\n", result.classification[i].label, result.classification[i].value);
            }
        }
        // printf("prediction : %d \n", EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE);

        vTaskDelay(200 / portTICK_PERIOD_MS);
    }
}