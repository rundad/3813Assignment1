import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
const SERVER_URL = 'http://localhost:3000/chat';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  constructor() { }

  public initSocket(): void{
    this.socket = io(SERVER_URL);
  }

  joinroom(selroom):void{
    this.socket.emit("joinRoom", selroom)
  }

  leaveroom(selroom):void{
    this.socket.emit("leaveroom", selroom)
  }

  joined(next){
    this.socket.on("joined", res=>next(res))
  }

  reqnumusers(selroom){
    this.socket.emit("numusers", selroom)
  }

  getnumusers(next){
    this.socket.on("numusers", res=>next(res))
  }

  notice(next){
    this.socket.on('notice', res=>next(res))
  }

  send(message: string):void{
    this.socket.emit('message', message);
  }

  // onMessage():Observable<any>{
  //   let observable = new Observable(observer =>{
  //     this.socket.on('message', (data:string)=> observer.next(data));
  //   });
  //   return observable
  // }
  getMessage(next){
    this.socket.on('message', (message)=>next(message))
  }
}
