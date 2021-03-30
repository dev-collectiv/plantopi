import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ActionService } from './action.service';
import { MqttRequestDto } from './dto/mqtt.dto';


@WebSocketGateway(3002)
export class ActionGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor (private readonly actionService: ActionService) {};

  private logger: Logger = new Logger('ActionGateway');

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    client.emit('testTopic', 'hi client, this is server');

    this.actionService.sensorEventEmitter.on('readingSaved', (sensorData: any) => {
      client.emit('sensors', sensorData);
      console.log('emitted sensor data to client');
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('action')
  handleActionMessage(client: Socket, payload: MqttRequestDto): void {
    this.logger.log('Duration received: ' + payload.duration);
    client.emit('action', 'Server received duration: ' + payload.duration); // send feedback to front end

    this.actionService.publishActionToIOT(payload);
    this.actionService.giveStatusUpdatesTo(client, payload);
  }

  // @OnEvent('readingSaved')
  // handleSensorReadingEvent(payload: any, client: Socket) {
  //   console.log('event noticed');
  //   console.log('client is:');
  //   console.log(client);
  //   console.log('client connected:');
  //   console.log(client.connected);
  //   if (client && client.connected) {
  //     client.emit('sensors', payload);
  //     console.log('sensor data sent to socket');
  //   }
  // }
}