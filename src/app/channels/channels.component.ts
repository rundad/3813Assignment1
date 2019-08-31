import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesService } from '../services/routes.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {

  group_name: string = ""
  group_channels;
  channel_group_users;
  channel_username:string = ""
  channel_name:string = ""
  constructor(private activatedRoute: ActivatedRoute, private router:Router, private routeService:RoutesService) { }

  //The function that will be called when the component loads
  //Get the group parameter from the url and store into a variable
  //Make http request to server side to get the group channels and group users
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
         params => {this.group_name = params.get('group');}
    );

    this.routeService.getChannels(this.group_name).subscribe(data =>{
      this.group_channels = data;
    })

    this.routeService.gGroupUsers(this.group_name).subscribe(data=>{
      this.channel_group_users = data
    })

  }

  //The function that will be called when the remove channel button have been clicked
  //Call the removeChannel method to request remove channel to server side and remove a channel
  removeChannel(channel:string){
    if(confirm("Are you sure to remove Channel: " + channel +  " from " + "Group: " + this.group_name + "?")){
      this.routeService.removeChannel(this.group_name, channel).subscribe(data=>{
        if(data === true){
          alert("Channel has been removed")
          this.router.navigateByUrl("/groups")
        }
      })
    }
    
  }

  //The function that will be called when the remove user button have been clicked inside a channel
  //Call the emUserFromChannel method to request remove user from channel to server side to remove user from channel
  rmUserFromChannel(username:string, channel:string){
    this.routeService.rmUserFromChannel(this.group_name, username, channel).subscribe(data=>{
      if(data === true){
        alert("Removed user: " + username + " from channel: " + channel + " in group: " + this.group_name)
        this.ngOnInit();
      }
    })
  }

  //The function that will be called when the Add user button have been clicked inside a channel
  //Call the addUserChannel method to request add user to channel to server side to add user to a channel
  addUserToChannel(){
    this.routeService.addUserChannel(this.group_name, this.channel_username, this.channel_name).subscribe(data=>{
      if(data === true){
        alert("Added " + this.channel_username + " to channel: " + this.channel_name)
        this.ngOnInit();
      }else{
        alert(this.channel_username + " already in " + this.channel_name + " in " + this.group_name)
      }
    })
 
  }

}
