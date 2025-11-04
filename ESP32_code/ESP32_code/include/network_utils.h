#ifndef NETWORK_UTILS_H
#define NETWORK_UTILS_H

#include <PubSubClient.h>

void setupWifi();
void reconnect();

extern PubSubClient client;

extern const char* mqtt_server;

#endif