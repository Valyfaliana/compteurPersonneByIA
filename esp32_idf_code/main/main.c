#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"

#include "capteurs_utils.h"
#include "network_utils.h"

void app_main(void)
{
    wifi_init_sta();
    
    while (1)
    {
        afficherValeurCapteur(BREAK_BEAM_A);
        vTaskDelay(200 / portTICK_PERIOD_MS);
    }
}