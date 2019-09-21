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

  group_name:string;
  channel_name:string;
  messages:string[] = [];
  ioConnection:any;
  messagecontent:string;
  constructor(private activatedRoute: ActivatedRoute, private router:Router, private routeService:RoutesService, private socketService: SocketService) { }

  //The function that will be called when the component loads
  //Get the group name and channel name from the url parameters
  ngOnInit() {
    this.initIoConnection();
    this.activatedRoute.paramMap.subscribe(
         params => {this.group_name = params.get('group');}
    );
    this.activatedRoute.paramMap.subscribe(
         params => {this.channel_name = params.get('channel');}
    );
  }

  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage().subscribe((message:string)=>{
      this.messages.push(message);
    });

  }

  private chat(){
    if(this.messagecontent){
      this.socketService.send(this.messagecontent);
      this.messagecontent = null;
    }else{
      console.log("no message")
    }
  }

}
