#define CONFIG_H

//GENERAL SETTINGS
const int upload_speed = 115200;
const int digital_output_pin1 = 5;
const char *name_pin1 = "Pump#1";

//WIFI SETTINGS
const char *wifi_ssid = "Codeworks";
const char *wifi_password = "codinginthesun";

//MQTT SETTINGS
const char *mqtt_broker = "192.168.1.170";
const int mqtt_port = 1883;
const char *mqttId = "pump1";
const char mqtt_inTopic[] = "action";
const char mqtt_outTopic[] = "status";
const char mqtt_resTopic[] = "response";
