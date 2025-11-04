#include <Arduino.h>
#include <network_utils.h>
#include <WiFi.h>

// WiFi
const char* ssid = "iPhoneValy";
const char* password = "jiml3712";

// Broker Mqtt
const char* mqtt_server = "172.20.10.8";
WiFiClient espClient;
PubSubClient client(espClient);

void setupWifi() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  Serial.print("IP esp32 : ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("ESP32Client")) {
      Serial.println("connected");
      // client.subscribe("test/topic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}