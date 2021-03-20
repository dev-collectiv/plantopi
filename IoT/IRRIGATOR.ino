#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// Update these with values suitable for your network.

const char *ssid = "Codeworks";
const char *password = "codinginthesun";
const char *mqtt_broker = "192.168.1.170";
const char *id = "Pump Controller 1";

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE (50)
#define STAT_BUFFER_SIZE (4)
char msg[MSG_BUFFER_SIZE];
char stat[STAT_BUFFER_SIZE] = "OFF";
int started = 0;
int duration = 0;

//GPIO PINS
int pump_pin = 5;

int charIsNum(char x)
{
  if ((int)x > 47 && (int)x < 58)
    return 1;
  return 0;
}

int charToInt(char x)
{
  return ((int)x) - 48;
}

void pumpOn(int time_duration)
{
  snprintf(stat, STAT_BUFFER_SIZE, "ON");
  snprintf(msg, MSG_BUFFER_SIZE, "PUMP TURNED ON FOR %d seconds!!", time_duration);
  Serial.println(msg);
  started = millis();
  duration = time_duration * 1000;
  digitalWrite(BUILTIN_LED, LOW); // Turn the LED on (Note that LOW is the voltage level
  digitalWrite(pump_pin, HIGH);   // IRRIGATE
}

void pumpOff()
{
  snprintf(stat, STAT_BUFFER_SIZE, "OFF");
  snprintf(msg, MSG_BUFFER_SIZE, "PUMP TURNED OFF!!");
  Serial.println(msg);
  digitalWrite(BUILTIN_LED, HIGH); // Turn the LED off by making the voltage HIGH
  digitalWrite(pump_pin, LOW);     // IRRIGATE
}

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
  if (strcmp(topic, "action") == 0)
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

void reconnect()
{
  // Loop until we're reconnected
  while (!client.connected())
  {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str()))
    {
      Serial.println("connected");
      // Once connected, publish an announcement...
      //snprintf(var1, maxSize, printf format string)
      //printf format string: string(example: "hello my name is #%s", values
      snprintf(msg, MSG_BUFFER_SIZE, "Connection established #%s", id);
      client.publish("status", msg);
      // ... and resubscribe
      client.subscribe("action");
    }
    else
    {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup_outputs()
{
  pinMode(pump_pin, OUTPUT);
  pinMode(BUILTIN_LED, OUTPUT); // Initialize the BUILTIN_LED pin as an output
}

void setup_wifi()
{

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void setup()
{
  Serial.begin(115200);
  setup_wifi();
  setup_outputs();
  client.setServer(mqtt_broker, 1883);
  client.setCallback(callback);
}

void loop()
{

  if (!client.connected())
  {
    reconnect();
  }
  client.loop();
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

    snprintf(msg, MSG_BUFFER_SIZE, "Status %s: %s", id, stat);
    Serial.print("Publish message: ");
    Serial.println(msg);
    client.publish("status", msg);
  }
}