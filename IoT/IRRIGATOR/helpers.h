#include "config.h"

#define MSG_BUFFER_SIZE (50)
char *msg = (char *)malloc(MSG_BUFFER_SIZE);

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

void setupOutputs()
{
  pinMode(digitalOutputPin1, OUTPUT);
  digitalWrite(digitalOutputPin1, HIGH); // inversed polarity STOP
}

void pumpOn(int timeDuration)
{
  stat = ON;
  snprintf(msg, MSG_BUFFER_SIZE, "PUMP TURNED ON FOR %d seconds!!", timeDuration);
  Serial.println(msg);
  started = millis();
  duration = timeDuration * 1000;
  digitalWrite(digitalOutputPin1, LOW); // IRRIGATE
}

void pumpOff()
{
  stat = OFF;
  Serial.println("PUMP TURNED OFF!!");
  digitalWrite(digitalOutputPin1, HIGH); // STOP
}
