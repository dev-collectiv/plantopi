#include "mqtt.h"

void setup()
{
  Serial.begin(upload_speed);
  setup_outputs();
  setup_wifi();
  delay(1500);
  mqttInit();
}

void loop()
{
  mqttCheckMessages();
  unsigned long now = millis();

  if (strcmp(stat, "ON") == 0)
  {
    if (now - started > duration)
    {
      pumpOff();
    }
  }

  if (now - lastMsg > 5000)
  {
    lastMsg = now;

    snprintf(msg, MSG_BUFFER_SIZE, "Status %s: %s", mqtt_id, stat);
    Serial.print("Publish message: ");
    Serial.println(msg);
    mqttClient.publish(mqtt_outTopic, msg);
  }
}
