#pragma once

void wifi_init_sta(void);
void mqtt_init(void);
void mqtt_publish_data(char*, char*);

// extern PubSubClient client;

// extern const char* mqtt_server;