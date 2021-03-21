import { Server } from 'aedes';
import { createServer } from 'net';

const broker = Server();
const server = createServer(broker.handle);

const MQTT_PORT = process.env.MQTT_PORT || 1883;

//broker listen to server
export async function startBroker() {
  return server.listen(MQTT_PORT, function () {
    console.log(`MQTT Broker started on port ${MQTT_PORT}`);
  });
}

//backlog: alert garden manager when new client subscribes
broker.on('subscribe', function (subscriptions, client) {
  if (client) {
    console.log('subscribe from client', subscriptions, client.id);
  }
});
