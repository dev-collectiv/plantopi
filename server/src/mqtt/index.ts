import { connect } from 'mqtt';

const MQTT_BROKER_IP = process.env.MQTT_BROKER_IP || '192.168.1.135';
const MQTT_PORT = process.env.MQTT_PORT || 1883;

function mqttClient() {
  //start the mqtt client and set the route to listen to
  const mqttClient = connect(`mqtt://${MQTT_BROKER_IP}:${MQTT_PORT}`);

  //list of topics client is subscribed to
  let subscribedTopics: string[] = [];

  _startMqttClient();

  mqttClient.on('message', (topic, message, packet) => {
    console.log('topic: ', topic, 'payload: ', message.toString());
  });

  return { publishToTopic, subscribeToTopic, unsubscribeToTopic, getSubscribedTopics };

  function publishToTopic(topic: string, message: object) {
    //buffered json object
    const buffer = Buffer.from(JSON.stringify(message));

    mqttClient.publish(topic, buffer, { qos: 1 }, (err) => {
      if (err) {
        console.error(`An error occurred while trying to publish a message. Err: ${err}`);
      } else {
        console.log(`Successfully published message to topic: ${topic}`);
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

    mqttClient.on('error', () => {
      console.log('MQTT client couldn\'t connect to broker');
    });
  }

  function _updateSubscribedTopics(updatedTopics: string[]) {
    subscribedTopics = updatedTopics;
  }
}

const client = mqttClient();

client.subscribeToTopic('status');

setInterval(() => {
  client.publishToTopic('action', {
    action: 'on',
    duration: 1,
    id: 'pump1'
  });
}, 5000);

export default mqttClient;
