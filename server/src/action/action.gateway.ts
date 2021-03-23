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
  handleActionMessage(client: Socket, payload: string): void {
    this.logger.log('Duration received: ' + payload);
    client.emit('action', 'Server received duration: ' + payload); // send feedback to front end

    this.actionService.publishActionToIOT(payload);
    this.actionService.giveStatusUpdatesTo(client);
  }
}