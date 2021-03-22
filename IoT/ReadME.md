#Config File

- Required to have a **config.h** with this format:

```c
#define CONFIG_H

//GENERAL SETTINGS
const int upload_speed = 115200;//baud speed
const int digital_output_pin1 = 5;//pump pin
const char *name_pin1 = "pinId";

//WIFI SETTINGS
const char *wifi_ssid = "Codeworks";
const char *wifi_password = "codinginthesun";

//MQTT SETTINGS
const char *mqtt_broker = "brokerip";
const int mqtt_port = 1883;//broker port
const char *mqttId = "pumpId";
const char mqtt_inTopic[] = "action";
const char mqtt_outTopic[] = "status";
const char mqtt_resTopic[] = "response";
```
# C useful functions
## constrain(x, a, b)

#### Parameters
- x: the number to constrain Allowed data types: all data types.
- a: the lower end of the range. Allowed data types: all data types.
- b: the upper end of the range. Allowed data types: all data types.

#### Returns
- x: if x is between a and b.
- a: if x is less than a.
- b: if x is greater than b.

Example:


```c
sensVal = constrain(sensVal, 10, 150);  // limits range of sensor values to between 10 and 150
```

## map(value, fromLow, fromHigh, toLow, toHigh)
```c
long map(long x, long in_min, long in_max, long out_min, long out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
```

#### Parameters
- value: the number to map.
- fromLow: the lower bound of the value’s current range.
- fromHigh: the upper bound of the value’s current range.
- toLow: the lower bound of the value’s target range.
- toHigh: the upper bound of the value’s target range.

#### Returns
- The mapped value.



Example:


```c
/* Map an analog value to 8 bits (0 to 255) */
void setup() {}

void loop() {
  int val = analogRead(0);
  val = map(val, 0, 1023, 0, 255);
  analogWrite(9, val);
}
```

## random(max)
## random(min, max)

#### Parameters
- min: lower bound of the random value, inclusive (optional).
- max: upper bound of the random value, exclusive.

#### Returns
- A random number between min and max-1. Data type: long.

## isDigit(thisChar)

#### Parameters
- thisChar: variable char

#### Returns
- true if thisChar is a number.

## millis()

#### Returns
- the number of milliseconds passed since the Arduino board began running the current program. This number will overflow (go back to zero), after approximately 50 days.

- Data type: unsigned long.

## digitalRead()
#### Description
- Reads the value from a specified digital pin, either HIGH or LOW.
#### Syntax
- digitalRead(pin)

#### Parameters
- pin: the Arduino pin number you want to read

#### Returns
- HIGH or LOW

## digitalWrite()
#### Description
- Write a HIGH or a LOW value to a digital pin.
- If the pin has been configured as an OUTPUT with pinMode(), its voltage will be set to the corresponding value: 5V (or 3.3V on 3.3V boards) for HIGH, 0V (ground) for LOW.

- If the pin is configured as an INPUT, digitalWrite() will enable (HIGH) or disable (LOW) the internal pullup on the input pin. It is recommended to set the pinMode() to INPUT_PULLUP to enable the internal pull-up resistor. See the Digital Pins tutorial for more information.

- If you do not set the pinMode() to OUTPUT, and connect an LED to a pin, when calling digitalWrite(HIGH), the LED may appear dim. Without explicitly setting pinMode(), digitalWrite() will have enabled the internal pull-up resistor, which acts like a large current-limiting resistor.
#### Syntax
- digitalWrite(pin, value)

#### Parameters
- pin: the Arduino pin number
- value: HIGH or LOW.

#### Returns
- void
