//TODO - refactor into MqttActionDto
export interface MqttRequestDto {
  id: string,
  action: string,
  duration: number
};

export interface MqttStatusDto {
  id: string,
  status: string,
  time: number
}