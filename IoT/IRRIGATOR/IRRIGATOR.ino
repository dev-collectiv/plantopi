#include "mqtt.h"

// Setup function
void setup()
{
  Serial.begin(upload_speed); //Set serial speed
  setup_outputs();            //Set output pins -> helpers.h
  setup_wifi();               //Setup wifi -> wifi.h
  delay(1000);                //Delay between wifi connection and MQTT connection
  mqttInit();                 //Initializing MQTT connection with Broker -> mqtt.h
}

void loop()
{
  mqttCheckMessages();          //Check if message received on any mqtt subscribed topic -> mqtt.h
  unsigned long now = millis(); //Milliseconds since arduino booted

  if (stat == ON) //If pump is on, stat is an enum tipe defined in helpers.h
  {
    if (now - started > duration) // check if is time to turn off the pump
    {
      pumpOff(); // Turn off pump -> helpers.h
    }
  }

  if (now - lastMsg > statusInterval) // Check if is time to publish status
  {
    lastMsg = now;           //Update last status time
    mqttPublishStatus(stat); //Publish status -> mqtt.h
  }
}
