#include "helpers.h"

#include <ESP8266WiFi.h>

WiFiClient wifiClient;

void setupWifi()
{

  delay(10);

  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(wifiSsid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(wifiSsid, wifiPassword);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("WiFi - connected, IP: ");
  Serial.println(WiFi.localIP());
}