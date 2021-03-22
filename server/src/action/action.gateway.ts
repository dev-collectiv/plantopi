import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3002)
export class ActionGateway implements OnGatewayConnection, OnGatewayDisconnect {

  // TODO: FIX ANY BY INITIALIZING SERVER FIRST
  @WebSocketServer() server: Server|any;

  private logger: Logger = new Logger('ActionGateway');

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    client.emit('testTopic', 'hi client, this is server');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('testTopic')
  handleMessage(client: Socket, payload: string): void {
    this.logger.log(payload);
    this.server.emit('msgToClient', 'server received msg');
  }
}