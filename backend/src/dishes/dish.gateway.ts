import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class DishGateway {
  @WebSocketServer()
  server: Server;

  sendDishNotification(message: string) {
    this.server.emit('dish', {
      type: 'dishChosen',
      message: `New dish chosen: ${message}`,
    });
  }

  sendDishCancelNotification(dishId: string, message: string) {
    this.server.emit('dish', {
      type: 'dishCancel',
      dishId,
      message: `Dish ${message} has been cancelled`,
    });
  }

  sendDishUpdateNotification(dishId: string, message: string) {
    this.server.emit('dish', {
      type: 'dishUpdate',
      dishId,
      message: `Dish ${message} has been updated`,
    });
  }
}