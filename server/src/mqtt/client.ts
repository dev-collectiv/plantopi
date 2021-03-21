import { connect } from 'mqtt';
import { startBroker } from './broker';

const MQTT_BROKER_IP = process.env.MQTT_BROKER_IP || 'localhost';
const MQTT_PORT = process.env.MQTT_PORT || 1883;

function mqttServer() {
  //start the mqtt client and set the route to listen to
  const mqttClient = connect(`mqtt://${MQTT_BROKER_IP}:${MQTT_PORT}`);

  //list of topics client is subscribed to
  let subscribedTopics: string[] = [];

  //for mocking purposes, the broker will be started from here
  startBroker();
  _startMqttClient();

  mqttClient.on('message', (topic, message, packet) => {
    console.log('topic: ', topic, 'payload: ', message.toString());
  });

  return { publishToTopic, subscribeToTopic, unsubscribeToTopic, getSubscribedTopics };

  function publishToTopic(topic: string, message: string) {
    mqttClient.publish(topic, message, { qos: 1 }, (err) => {
      if (err) {
        console.error(`An error occurred while trying to publish a message. Err: ${err}`);
      } else {
        console.log(`Successfully published message: ${message} to topic: ${topic}`);
      }
    });
  }

  function subscribeToTopic(topic: string) {
    const updatedTopics = [...subscribedTopics, topic];
    _updateSubscribedTopics(updatedTopics);

    mqttClient.subscribe(topic);
  }

  function unsubscribeToTopic(topic: string) {
    const updatedTopics = subscribedTopics.filter((_topic) => topic !== _topic);
    _updateSubscribedTopics(updatedTopics);

    mqttClient.subscribe(topic);
  }

  function getSubscribedTopics() {
    return subscribedTopics;
  }

  //mqtt client on connect
  function _startMqttClient() {
    mqttClient.on('connect', () => {
      console.log('MQTT client connected');
    });

    //TODO this is not showing error, it just doesn't start the server
    mqttClient.on('error', () => {
      console.log("MQTT client couldn't connect to broker");
    });
  }

  function _updateSubscribedTopics(updatedTopics: string[]) {
    subscribedTopics = updatedTopics;
  }
}

const client = mqttServer();

client.subscribeToTopic('status');

setInterval(() => {
  client.publishToTopic('action', '1');
}, 2000);

//TODO - client manager
// function clientManager() {}

//TODO - client factory
// function client() {}
