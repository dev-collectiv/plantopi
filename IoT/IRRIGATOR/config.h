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
String mqtt_id = "Pump Controller 1";
const char mqtt_inTopic[] = "actionTest";
const char mqtt_outTopic[] = "statusTest";
