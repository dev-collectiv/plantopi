import { connect } from 'mqtt';
import { Server } from 'aedes';
import { createServer } from 'net';

const broker = Server();
const server = createServer(broker.handle);
const PORT = 1883;

function mqttServer() {
  //start the mqtt client and set the route to listen to
  const mqttClient = connect(`mqtt://localhost:${PORT}`);

  (async function bootstrap() {
    try {
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

  //backlog: alert when new client subscribes
  broker.on('subscribe', function (subscriptions, client) {
    if (client) {
      console.log('subscribe from client', subscriptions, client.id);
    }
  });

  //broker listen to server
  async function startBroker() {
    return server.listen(PORT, function () {
      console.log(`MQTT Broker started on port ${PORT}`);
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

  return { publishToTopic, subscribeToTopic, PORT };
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
