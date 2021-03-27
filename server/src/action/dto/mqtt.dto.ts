//TODO - refactor into MqttActionDto

export interface MqttRequestDto {
  id: string,
  action: string,
  duration: number
};

export interface MqttStatusDto {
  id: string,
  status: 'on' | 'off',
  time: number
}

export interface MqttSensorDto {
  id: string,
  reading: number,
  time: number
}