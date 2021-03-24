//GENERAL SETTINGS
const int uploadSpeed = 115200;
const int digitalOutputPin1 = 5;
const char *namePin1 = "Pump#1";

//WIFI SETTINGS
const char *wifiSsid = "Codeworks";
const char *wifiPassword = "codinginthesun";

//MQTT SETTINGS
const char *mqttBroker = "nanopim4v2";
const int mqttPort = 1883;
const char *mqttId = "pump1";
const char *mqttInTopic = "action";
const char *mqttOutTopic = "status";
const char *mqttResTopic = "response";
