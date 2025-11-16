#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"

#define CAPTEUR GPIO_NUM_2

void app_main(void)
{
    gpio_set_direction(CAPTEUR, GPIO_MODE_INPUT);

    while(1)
    {
        int val = gpio_get_level(CAPTEUR);
        printf("Valeur : %d\n", val);
        vTaskDelay(500 / portTICK_PERIOD_MS);
    }
}