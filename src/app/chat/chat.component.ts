import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes.service';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  group:string = ""
  channel:string = ""
  group_names;
  channel_names;
  currentroom:string = ""
  constructor(private router:Router, private routeService: RoutesService, private socketService: SocketService) { }

  //The function that will be called when the componnet loads
  //Get all the groups that user have joined by send a getUserGroups request
  ngOnInit() {
    this.socketService.initSocket();
    this.routeService.getUserGroups().subscribe(data=>{
      console.log(data)
      this.group_names = data
    })
  }
  //The function that will be called when a group have been selected
  //Get the channels of the selected group by calling the method in route service to send a request to the server side
  gUserGrChannel(){
    this.routeService.getUserGroupChannels(this.group).subscribe(data =>{
      console.log(data)
      this.channel_names = data
    })
   
  }

  //The function that will be called when the user have clicked the join room button
  //Take the user to the chat room
  // joinRoom(){
  //   this.router.navigateByUrl("/chat-room/" + this.group + "/" + this.channel)
  // }

  joinroom(){
    this.socketService.joinroom(this.group + this.channel)
    this.socketService.joined((msg)=>{this.currentroom = msg})
    this.router.navigateByUrl("/chat-room/" + this.group + "/" + this.channel)

  }
}
