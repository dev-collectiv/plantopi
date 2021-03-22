import { connect } from 'mqtt';
import { MqttDto } from '../action/dto/mqtt.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MqttService {
  MQTT_BROKER_IP = process.env.MQTT_BROKER_IP || '192.168.1.135';
  MQTT_PORT = process.env.MQTT_PORT || 1883;

  //start the mqtt client and set the route to listen to
  mqttClient = connect(`mqtt://${this.MQTT_BROKER_IP}:${this.MQTT_PORT}`);

  //list of topics client is subscribed to
  subscribedTopics: string[] = [];

  constructor () {
    this._startMqttClient();
  }

  subscribeToTopic(topic: string) {
    const updatedTopics = [...this.subscribedTopics, topic];
    this._updateSubscribedTopics(updatedTopics);

    this.mqttClient.subscribe(topic);
  }

  unsubscribeToTopic(topic: string) {
    const updatedTopics = this.subscribedTopics.filter((_topic) => topic !== _topic);
    this._updateSubscribedTopics(updatedTopics);

    this.mqttClient.subscribe(topic);
  }

  getSubscribedTopics() {
    return this.subscribedTopics;
  }

  _updateSubscribedTopics(updatedTopics: string[]) {
    this.subscribedTopics = updatedTopics;
  }

  publishToTopic(topic: string, message: MqttDto) {
    //buffered json object
    const buffer = Buffer.from(JSON.stringify(message));

    this.mqttClient.publish(topic, buffer, { qos: 1 }, (err) => {
      if (err) {
        console.error(`An error occurred while trying to publish a message. Err: ${err}`);
      } else {
        console.log(`Successfully published message to topic: ${topic}`);
      }
    });
  }

  _startMqttClient() {
    this.mqttClient.on('connect', () => {
      console.log('MQTT client connected');
    });

    this.mqttClient.on('error', () => {
      console.log('MQTT client couldn\'t connect to broker');
    });
  }
}
