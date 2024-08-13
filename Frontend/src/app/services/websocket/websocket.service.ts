import { Injectable, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService implements OnInit {
  socket = io('http://localhost:7000');

  constructor() {
    this.getMessage();
  }

  ngOnInit(): void {}

  sendMessage(message: string) {
    this.socket.emit('sendMessage', message);
  }

  getMessage() {
    this.socket.on('message', (message) => {
      console.log(message);
    });
  }
}
