#include <PubSubClient.h>
#include "wifi.h"

PubSubClient mqttClient(wifiClient);

void callback(char *topic, byte *payload, unsigned int length)
{
  char parsed_payload[length];
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++)
  {
    Serial.print((char)payload[i]);
    parsed_payload[i] = (char)payload[i];
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character
  if (strcmp(topic, mqtt_inTopic) == 0)
  {
    Serial.println("Action Received");
    snprintf(msg, MSG_BUFFER_SIZE, "Action %c %d", parsed_payload[0], charToInt(parsed_payload[0]));

    Serial.println(msg);

    int aux = charToInt(parsed_payload[0]);
    if (aux == 0)
    {
      Serial.print(aux);
      Serial.println("action off");
      pumpOff();
    }
    else
    {
      if (aux > 0 && aux < 10)
      {
        pumpOn(charToInt(parsed_payload[0]));
      }
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

void reconnect()
{
  // Loop until we're reconnected
  while (!mqttClient.connected())
  {
    Serial.print("Attempting MQTT connection...");

    // Attempt to connect
    if (mqttClient.connect(mqtt_id.c_str()))
    {
      Serial.println("connected");
      // Once connected, publish an announcement...
      //snprintf(var1, maxSize, printf format string)
      //printf format string: string(example: "hello my name is #%s", values
      snprintf(msg, MSG_BUFFER_SIZE, "Connection established #%s", mqtt_id);
      mqttClient.publish(mqtt_outTopic, msg);
      // ... and resubscribe
      mqttClient.subscribe(mqtt_inTopic);
    }
    else
    {
      Serial.print("failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void mqttInit()
{
  mqttClient.setServer(mqtt_broker, mqtt_port);
  mqttClient.setCallback(callback);
}
