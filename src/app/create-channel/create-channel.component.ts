import { Component, OnInit } from '@angular/core';
import { DataSharingService } from "../services/data-sharing.service";
import { RoutesService } from '../services/routes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent implements OnInit {

  groups;
  group_channel:string = ""
  channel_name:string = ""
  constructor(private routeService: RoutesService, private router:Router, private dataSharingService: DataSharingService) { }

  //The function that will be called when the component loads
  //Get all the groups that the user have control with by calling the method in through route service and send the request to the server side
  ngOnInit() {
    this.routeService.getGroups().subscribe(data =>{
      this.groups = data
      console.log(this.groups)
    })
  }
  
  //The function that will be called when the create channel button have been clicked in the create channel form
  //Send the request to the server side to create a new channel by calling the method through route service
  createChannel(){
    console.log(this.group_channel)
    if(this.group_channel !== "null" && this.channel_name !== ""){
      this.routeService.createChannel(this.group_channel, this.channel_name).subscribe(data =>{
        console.log(data)
        if(data === true){
          alert("Created Channel: " + this.channel_name)
        }else{
          alert("Error: This channel is already exist in Group: " + this.group_channel)
        }
      })
    }else{
      alert("Missing group or channel details!")
    }
    
  }

}
