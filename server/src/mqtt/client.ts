import { connect } from 'mqtt';
import { startBroker } from './broker';

const MQTT_PORT = process.env.MQTT_PORT || 1883;

function mqttServer() {
  //start the mqtt client and set the route to listen to
  const mqttClient = connect(`mqtt://localhost:${MQTT_PORT}`);

  (async function bootstrap() {
    try {
      //for mocking purposes, the broker will be started from here
      await startBroker();
      await startMqttClient();
    } catch (error) {
      console.log('ERROR: ', error);
      console.log('Will retry to reconnect in 5 seconds');
      //retry connection in 5s
      setTimeout(() => {
        bootstrap();
      }, 5000);
    }
  })();

  mqttClient.on('message', (topic, message, packet) => {
    console.log('topic: ', topic, 'payload: ', message.toString());
  });

  function subscribeToTopic(topic: string) {
    mqttClient.subscribe(topic);
  }

  function unsubscribeToTopic(topic: string) {
    mqttClient.subscribe(topic);
  }

  function publishToTopic(topic: string, message: string) {
    mqttClient.publish(topic, message, { qos: 1 }, (err) => {
      if (err) {
        console.error(`An error occurred while trying to publish a message. Err: ${err}`);
      } else {
        // console.log(`Successfully published message: ${message} to topic: ${topic}`);
      }
    });
  }

  //mqtt client on connect
  async function startMqttClient() {
    mqttClient.on('connect', () => {
      console.log('MQTT Client Connected!');
    });

    //TODO this is not showing error, it just doesn't start the server
    mqttClient.on('error', (err) => {
      console.log(err);
      return Promise.reject("couldn't connect to mqtt client");
    });
  }

  return { publishToTopic, subscribeToTopic };
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
