- Required to have a **PLANTOPI/config.h** with this format:

```c
//GENERAL SETTINGS
const int uploadSpeed = 115200;
const int digitalOutputPin1 = ##; // Pin connected to the relay/electrovalve

//WIFI SETTINGS
const char *wifiSsid = "##"; // Wifi network name
const char *wifiPassword = "##"; // Wifi password

//MQTT SETTINGS
const char *mqttBroker = "##"; // MQTT broker's IP
const int mqttPort = ####; // MQTT broker's port
const char *mqttControllerId = "##"; // Id of the controller/arduino
const char *mqttControllerInTopic = "##"; // MQTT Topic to subscribe and receive actions
const char *mqttControllerOutTopic = "##"; // MQTT Topic to publish status
const char *mqttControllerResTopic = "response"; // MQTT Topic to publish action's response

unsigned long statusInterval = 2000; // Milliseconds between published status

bool sensorActive = true; // Flag to know if a sensor is connected to the arduino, if false it won't publish sensor info
unsigned long sensorInterval = 1000; // Milliseconds between published sensor readings
const char *sensorId = "sensor1"; // Id of the sensor/arduino
const char *mqttSensorTopic = "sensors"; // MQTT Topic to publish sensor's readings
```
