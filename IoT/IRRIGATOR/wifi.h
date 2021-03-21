// #define WIFI_H
// #ifndef HELPERS_H
// #include "helpers.h"
// #endif
// #ifndef CONFIG_H
// #include "config.h"
// #endif
#include "helpers.h"

#include <ESP8266WiFi.h>

WiFiClient wifiClient;

void setup_wifi()
{

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("\nConnecting to ");
  Serial.println(wifi_ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(wifi_ssid, wifi_password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("WiFi connected, IP: ");
  Serial.println(WiFi.localIP());
}