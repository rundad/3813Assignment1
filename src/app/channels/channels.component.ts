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

  rmUserFromChannel(username:string, channel:string){
    this.routeService.rmUserFromChannel(this.group_name, username, channel).subscribe(data=>{
      if(data === true){
        alert("Removed user: " + username + " from channel: " + channel + " in group: " + this.group_name)
        this.ngOnInit();
      }
    })
  }

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
