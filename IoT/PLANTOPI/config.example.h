//GENERAL SETTINGS
const int uploadSpeed = 115200;
const int digitalOutputPin1 = 5;

//WIFI SETTINGS
const char *wifiSsid = "Codeworks";
const char *wifiPassword = "####";

//MQTT SETTINGS
const char *mqttBroker = "nanopim4v2";
const int mqttPort = 1883;
const char *mqttControllerId = "pump1";
const char *mqttControllerInTopic = "action";
const char *mqttControllerOutTopic = "status";
const char *mqttControllerResTopic = "response";

unsigned long statusInterval = 2000;

bool sensorActive = true;
unsigned long sensorInterval = 1000;
const char *sensorId = "sensor1";
const char *mqttSensorTopic = "sensors";
