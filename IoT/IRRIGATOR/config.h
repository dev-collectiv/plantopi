//GENERAL SETTINGS
const int uploadSpeed = 115200;
const int digitalOutputPin1 = 5;

//WIFI SETTINGS
const char *wifiSsid = "Codeworks";
const char *wifiPassword = "codinginthesun";

//MQTT SETTINGS
const char *mqttBroker = "nanopim4v2";
const int mqttPort = 1883;
const char *mqttControllerId = "pump2";
const char *sensorId = "humidity2";
const char *mqttControllerInTopic = "action";
const char *mqttControllerOutTopic = "status";
const char *mqttControllerResTopic = "response";
const char *mqttSensorTopic = "sensor2";

unsigned long statusInterval = 2000;
unsigned long sensorInterval = 1000;
