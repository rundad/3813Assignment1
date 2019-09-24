import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesService } from '../services/routes.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  private socket;
  group_name:string;
  channel_name:string;
  //messages:string[] = [];
  ioConnection:any;

  messagecontent:string;
  messages:string[] = [];
  rooms = [];
  roomnotice: string ="";
  currentroom: string = ""
  isinRoom = false;
  numuser: number = 0;
  constructor(private activatedRoute: ActivatedRoute, private router:Router, private routeService:RoutesService, private socketService: SocketService) { 
    //this.socketService.joinroom(this.group_name + this.channel_name)
  }

  //The function that will be called when the component loads
  //Get the group name and channel name from the url parameters
  ngOnInit() {
    this.socketService.initSocket();
    this.socketService.getMessage((m)=>{this.messages.push(m)})
    this.socketService.notice((msg)=>{this.roomnotice = msg})
    //this.socketService.joined((msg)=>{this.currentroom = msg})
    console.log(this.currentroom)
    this.activatedRoute.paramMap.subscribe(
         params => {this.group_name = params.get('group');}
    );
    this.activatedRoute.paramMap.subscribe(
         params => {this.channel_name = params.get('channel');}
    );
    this.socketService.reqnumusers(this.group_name + this.channel_name)
    this.socketService.getnumusers((res)=>{ this.numuser = res})
  }

  // private initIoConnection(){
  //   this.socketService.initSocket();
  //   this.ioConnection = this.socketService.onMessage().subscribe((message:string)=>{
  //     this.messages.push(message);
  //   });

  // }

  private chat(){
    if(this.messagecontent){
      this.socketService.send(this.messagecontent);
      this.messagecontent = null;
    }else{
      console.log("no message")
    }
  }

  leaveroom(){
    this.socketService.leaveroom(this.currentroom)
    this.socketService.reqnumusers(this.currentroom)
    this.socketService.getnumusers((res)=>{this.numuser = res})
    this.currentroom = ""
    this.numuser = 0
    this.roomnotice = ""
    this.messages = []
  }

}
