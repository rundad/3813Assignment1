import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes.service';
import { Router } from '@angular/router';
import { parse } from 'url';
import { DataSharingService } from "../services/data-sharing.service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups;
  group_name:string = ""
  group_channel:string = ""
  channel_name:string = ""
  remove_group:string = ""
  remove_channel:string = ""
  channels;
  isGroupAssis:boolean;
  isNormalUser: boolean;
  constructor(private routeService: RoutesService, private router:Router, private dataSharingService: DataSharingService) { }

  //The function will be called when the component loads
  //Get the groups by sending the getGroups request to the server side
  //Get the data status using the data sharing service and store them into variables
  ngOnInit() {
    this.routeService.getGroups().subscribe(data =>{
      this.groups = data
      console.log(this.groups)
    })
    this.dataSharingService.isGroupAssis.subscribe(value =>{
      this.isGroupAssis = value
    })
    this.dataSharingService.isNormalUser.subscribe(value =>{
      this.isNormalUser = value
    })
  }

  //The function used to create group by sending a request to the server
  createGroup(){
    if(this.group_name !== ""){
      this.routeService.createGroup(this.group_name, JSON.parse(localStorage.getItem("currentUsername"))).subscribe(data =>{
        console.log(data)
        if(data === true){
          this.ngOnInit();
          
        }else{
          alert("Error: This group is already exist")
        }
        this.group_name = ""
      })
    }else{
      alert("Missing group details!")
    }
  }

  //The function used to remove group by sending a remove group request to the server
  //Parameter: name - the name of the group which will also be sent to the server with the request
  //If the send back data is true, reload component and pop message
  removeGroup(name:string){
    if(confirm("Are you sure to Group: " + name + "?")) {
      this.routeService.removeGroup(name).subscribe(data =>{
        console.log(data)
        if(data === true){
          this.ngOnInit();
          alert("Removed Group: " + name)
        }
      })
    }
  }

  //The function used to create channel by sending a create channel request to the server
  //if sent back data is true, reload component and pop message, if is false pop error message
  //input validation
  createChannel(){
    console.log(this.group_channel)
    if(this.group_channel !== "null" && this.channel_name !== ""){
      this.routeService.createChannel(this.group_channel, this.channel_name).subscribe(data =>{
        console.log(data)
        if(data === true){
          this.ngOnInit();
          alert("Created Channel: " + this.channel_name)
        }else{
          alert("Error: This channel is already exist in Group: " + this.group_channel)
        }
      })
    }else{
      alert("Missing group or channel details!")
    }
    
  }

  //The function used to get the channels in the group by sending a get channel request to the server with the group name
  getChannel(){
    this.routeService.getChannel(this.remove_group).subscribe(data =>{
      this.channels = data
    })
  }

  // removeChannel(){
  //   if(confirm("Are you sure to remove Channel: " + this.remove_channel +  " from " + "Group: " + this.remove_group + "?")) {
  //     this.routeService.removeChannel(this.remove_group, this.remove_channel).subscribe(data =>{
  //       console.log(data)
  //       if(data === true){
  //         this.ngOnInit();
  //         alert("Removed Channel: " + this.remove_channel + " from " + "Group: " + this.remove_group)
  //       }
  //     })
  //   }
  // }

  //The function used to remove a user from the group by sending a remove user from group request to the server
  //Parameters: group - the name of the group, username - the name of the user
  removeUserFromGroup(group:string, username:string){
    if(confirm("Kick user: " + username + " out of group: " + group + "?")){
      this.routeService.kickUser(group, username).subscribe(data=>{
        if(data === true){
          this.ngOnInit();
        }
      })
    }
  }

  //The function used to give user Group Assis role to user by sending giveAssis request to the server
  //Parameter: group: the name of the group, username - the name of the user
  giveGroupAssis(group:string, username:string){
    this.routeService.giveAssis(group, username).subscribe(data=>{
      if(data === true){
        alert("Provided group assis role to user: " + username)
        this.ngOnInit();
      }else{
        alert("You cannot assign group assis role to Super and Group Admin")
      }
    })
  }

  //The function used to view the channels by using navigateByURL method to direct the user to the channels component
  //Parameter: group - the name of the group
  viewChannels(group:string){
    this.router.navigateByUrl("/channels/" + group)
  }
}
