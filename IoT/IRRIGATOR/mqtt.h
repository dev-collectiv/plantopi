#ifndef MQTT_H
#define MQTT_H

#include "wifi.h"

#include <PubSubClient.h>
#include <ArduinoJson.h>

PubSubClient mqttClient(wifiClient);

void mqttPublishResponse(char *);
void callback(char *, byte *, unsigned int);
void parseAction(StaticJsonDocument<256>);
void mqttInit();
void callback(char *, byte *, unsigned int);
void reconnect();
void mqttCheckMessages();
void publishStatusOn();
void mqttPublishResponse(char *);
void publishStatusOff();
void publishStatusUnknown();
void mqttPublishStatus(Status);

void mqttInit()
{
  mqttClient.setServer(mqtt_broker, mqtt_port);
  mqttClient.setCallback(callback);
}

void callback(char *topic, byte *payload, unsigned int length)
{
  if (!strcmp(topic, mqtt_inTopic))
  {
    StaticJsonDocument<256> msgJson;
    deserializeJson(msgJson, payload, length);
    parseAction(msgJson);
  }
}

void parseAction(StaticJsonDocument<256> actionJson)
{
  const char *msgId = actionJson["id"];
  if (!strcmp(msgId, mqttId))
  {
    if (!actionJson.containsKey("action"))
    {
      Serial.println("[action] received");
      Serial.println("ERROR: JSON does not contain an 'action' field");
      mqttPublishResponse("ERROR: JSON does not contain an 'action' field");
    }
    else
    {
      const char *msgAction = actionJson["action"];
      if (!strcmp(msgAction, "off"))
      {
        if (stat == ON)
        {
          Serial.println("[action] received OFF");
          mqttPublishResponse("Received OFF action");
          pumpOff();
        }
        else
        {
          Serial.println("[action] received");
          Serial.println("ERROR: Received OFF, being OFF already");
          mqttPublishResponse("O_o Received OFF action, but I was already OFF!");
        }
      }
      else if (!strcmp(msgAction, "on"))
      {
        if (!actionJson.containsKey("duration"))
        {
          Serial.println("[action] received ON");
          Serial.println("ERROR: JSON does not contain an 'duration' field");
          mqttPublishResponse("ERROR: JSON does not contain a 'duration' field for ON action");
        }
        else if (stat == OFF)
        {
          int msgDuration = actionJson["duration"];
          Serial.print("[action] received ON duration: ");
          Serial.print(msgDuration);
          Serial.println(" seconds.");
          mqttPublishResponse("Received ON action");
          pumpOn(msgDuration);
        }
        else
        {
          Serial.println("[action] received");
          Serial.println("ERROR: Received ON, being ON already");
          mqttPublishResponse("Received ON action, O_o I was already on!");
        }
      }
    }
  }
}

void reconnect()
{
  while (!mqttClient.connected()) // Loop until we're reconnected
  {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (mqttClient.connect(mqttId))
    {
      Serial.println("MQTT: Connected");
      snprintf(msg, MSG_BUFFER_SIZE, "Connection established #%s", mqttId);
      mqttClient.publish(mqtt_outTopic, msg);
      mqttClient.subscribe(mqtt_inTopic);
    }
    else
    {
      Serial.print("failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" try again in 3 seconds");
      delay(3000);
    }
  }
}

void mqttCheckMessages()
{
  if (!mqttClient.connected())
  {
    reconnect();
  }
  mqttClient.loop();
}

void publishStatusOn()
{
  unsigned long t_now = millis();
  unsigned long t_since = t_now - started;
  unsigned long t_left = duration - t_since;
  char buffer[256];
  StaticJsonDocument<256> statJson;
  statJson["id"] = mqttId;
  statJson["status"] = "on";
  statJson["time"] = t_now / 1000;
  statJson["duration"] = duration / 1000;
  statJson["timeLeft"] = t_left / 1000;
  size_t n = serializeJson(statJson, buffer);
  mqttClient.publish(mqtt_outTopic, buffer, n);
  Serial.print("STATUS: ON since ");
  Serial.print(t_since / 1000);
  Serial.print(" sec. ago, ");
  Serial.print(t_left / 1000);
  Serial.println(" sec. left");
}

void mqttPublishResponse(char *response)
{
  char buffer[256];
  StaticJsonDocument<256> statJson;
  statJson["id"] = mqttId;
  statJson["response"] = response;
  statJson["time"] = millis() / 1000;
  size_t n = serializeJson(statJson, buffer);
  mqttClient.publish(mqtt_resTopic, buffer, n);
}

void publishStatusOff()
{
  char buffer[256];
  StaticJsonDocument<256> statJson;
  statJson["id"] = mqttId;
  statJson["status"] = "off";
  statJson["time"] = millis() / 1000;
  size_t n = serializeJson(statJson, buffer);
  mqttClient.publish(mqtt_outTopic, buffer, n);
  Serial.println("STATUS: OFF");
}

void publishStatusUnknown()
{
  char buffer[256];
  StaticJsonDocument<256> statJson;
  statJson["id"] = mqttId;
  statJson["status"] = "unknown";
  statJson["time"] = millis() / 1000;
  size_t n = serializeJson(statJson, buffer);
  mqttClient.publish(mqtt_outTopic, buffer, n);
  Serial.println("STATUS: UNKNOWN");
}

void mqttPublishStatus(Status stat)
{
  switch (stat)
  {
  case ON:
    publishStatusOn();
    break;
  case OFF:
    publishStatusOff();
    break;
  default:
    publishStatusUnknown();
  }
}
#endif