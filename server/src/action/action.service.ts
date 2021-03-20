import { Injectable } from '@nestjs/common';
import { ActionDto } from './dto/action.dto';

@Injectable()
export class ActionService {
  // constructor () {}  WILL INJECT MQTT PROVIDER HERE

  // requestAction(action: ActionDto) {

  // PUBLISH MSG TO MQTT VIA PROVIDER

  // RESPOND TO CLIENT WITH "REQUEST INITIATED", CLOSE CONNECTION, PROVIDE UPDATE VIA WEB SOCKETS || CONTINUE BELOW

  // START CHECKING EXTERNAL QUEUE W SET INTERVAL (IF SUB IS EVENT BASED, OTHERWISE LISTENING TO PORT??)

  // ONCE DONE MSG (OFF) IS RECEIVED, REPLY TO HTTP REQUEST

  // }
}
