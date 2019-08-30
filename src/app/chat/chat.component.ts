import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes.service';
import { Router } from '@angular/router';

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
  constructor(private router:Router, private routeService: RoutesService) { }

  ngOnInit() {
    this.routeService.getUserGroups().subscribe(data=>{
      console.log(data)
      this.group_names = data
    })
  }
  gUserGrChannel(){
    this.routeService.getUserGroupChannels(this.group).subscribe(data =>{
      console.log(data)
      this.channel_names = data
    })
   
  }

  joinRoom(){

  }

}
