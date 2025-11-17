#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"

#include "capteurs_utils.h"
#include "network_utils.h"

void app_main(void)
{
    wifi_init_sta();
    mqtt_init();
    
    while (1)
    {
        afficherValeurCapteur(BREAK_BEAM_A);
        char* str = (gpio_get_level(BREAK_BEAM_A) == 1) ? "1" : "0";

        mqtt_publish_data("etat/break/beam/A", str);
        vTaskDelay(200 / portTICK_PERIOD_MS);
    }
}