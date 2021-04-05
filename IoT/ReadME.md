#Config File

- Required to have a **config.h** with this format:

```c
#define CONFIG_H

//GENERAL SETTINGS
const int upload_speed = 115200;//baud speed
const int digital_output_pin1 = 5;//pump pin
const char *name_pin1 = "pinId";

//WIFI SETTINGS
const char *wifi_ssid = "Codeworks";
const char *wifi_password = "codinginthesun";

//MQTT SETTINGS
const char *mqtt_broker = "brokerip";
const int mqtt_port = 1883;//broker port
const char *mqttId = "pumpId";
const char mqtt_inTopic[] = "action";
const char mqtt_outTopic[] = "status";
const char mqtt_resTopic[] = "response";
```
