import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from 'src/user/events/user-created.event';

@Injectable()
export class EventService {
  
  constructor(
    private eventEmitter: EventEmitter2
  ){}

  emitUserCreated(userCreated:UserCreatedEvent){
    this.eventEmitter.emit('user.created', userCreated)
  }

  
}
