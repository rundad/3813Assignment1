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
  constructor(private routeService: RoutesService, private router:Router, private dataSharingService: DataSharingService) { }

  ngOnInit() {
    this.routeService.getGroups().subscribe(data =>{
      this.groups = data
      console.log(this.groups)
    })
    this.dataSharingService.isGroupAssis.subscribe(value =>{
      this.isGroupAssis = value
    })
  }

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

  getChannel(){
    this.routeService.getChannel(this.remove_group).subscribe(data =>{
      this.channels = data
    })
  }

  removeChannel(){
    if(confirm("Are you sure to remove Channel: " + this.remove_channel +  " from " + "Group: " + this.remove_group + "?")) {
      this.routeService.removeChannel(this.remove_group, this.remove_channel).subscribe(data =>{
        console.log(data)
        if(data === true){
          this.ngOnInit();
          alert("Removed Channel: " + this.remove_channel + " from " + "Group: " + this.remove_group)
        }
      })
    }
  }

  removeUserFromGroup(group:string, username:string){
    this.routeService.kickUser(group, username).subscribe(data=>{
      if(data === true){
        alert("Kick user: " + username + " out of group: " + group + "?")
        this.ngOnInit();
      }
    })
    console.log(group, username)
  }

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
}
