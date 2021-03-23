// #define HELPERS_H

// #ifndef CONFIG_H
// #include "config.h"
// #endif
#include "config.h"

#define MSG_BUFFER_SIZE (50)
char msg[MSG_BUFFER_SIZE];

enum Status
{
  ON,
  OFF,
  UNKNOWN
};

Status stat = OFF;

unsigned long lastMsg = 0;
unsigned long started = 0;
unsigned long duration = 0;
unsigned long statusInterval = 2000;

void setup_outputs()
{
  pinMode(digital_output_pin1, OUTPUT);
  digitalWrite(digital_output_pin1, HIGH); // STOP
}

void printMsg(char *message_string)
{
  snprintf(msg, MSG_BUFFER_SIZE, message_string);
  Serial.println(msg);
}

int charToInt(char x)
{
  return ((int)x) - 48;
}

void pumpOn(int time_duration)
{
  stat = ON;
  snprintf(msg, MSG_BUFFER_SIZE, "PUMP TURNED ON FOR %d seconds!!", time_duration);
  Serial.println(msg);
  started = millis();
  duration = time_duration * 1000;
  digitalWrite(digital_output_pin1, LOW); // IRRIGATE
}

void pumpOff()
{
  stat = OFF;
  printMsg("PUMP TURNED OFF!!");
  digitalWrite(digital_output_pin1, HIGH); // STOP
}
