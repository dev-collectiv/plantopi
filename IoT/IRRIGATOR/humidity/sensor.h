//SENSOR CALIBRATION
const int dry = 740; //value for dry sensor
const int wet = 297; //value for wet sensor
const int sensorPin = A0;
int getSensorReading()
{
  int sensorVal = analogRead(sensorPin);
  return map(sensorVal, wet, dry, 100, 0);
}