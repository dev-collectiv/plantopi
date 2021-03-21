#include "config.h"

#define MSG_BUFFER_SIZE (50)
#define STAT_BUFFER_SIZE (4)
char msg[MSG_BUFFER_SIZE];
char stat[STAT_BUFFER_SIZE] = "OFF";

unsigned long lastMsg = 0;
int started = 0;
int duration = 0;

void printMsg(char *message_string)
{
  snprintf(msg, MSG_BUFFER_SIZE, message_string);
  Serial.println(msg);
}

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

void setup_outputs()
{
  pinMode(digital_output_pin1, OUTPUT);
}

void pumpOn(int time_duration)
{
  snprintf(stat, STAT_BUFFER_SIZE, "ON");
  snprintf(msg, MSG_BUFFER_SIZE, "PUMP TURNED ON FOR %d seconds!!", time_duration);
  Serial.println(msg);
  started = millis();
  duration = time_duration * 1000;
  digitalWrite(digital_output_pin1, HIGH); // IRRIGATE
}

void pumpOff()
{
  snprintf(stat, STAT_BUFFER_SIZE, "OFF");
  printMsg("PUMP TURNED OFF!!");
  digitalWrite(digital_output_pin1, LOW); // IRRIGATE
}
