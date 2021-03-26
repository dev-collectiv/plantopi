import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

import { ActionService } from './action.service';
import { MqttRequestDto } from './dto/mqtt.dto';

@WebSocketGateway(3002)
export class ActionGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor (private readonly actionService: ActionService) {};

  private logger: Logger = new Logger('ActionGateway');

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    client.emit('testTopic', 'hi client, this is server');
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
}