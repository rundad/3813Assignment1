import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users;
  username:string = ""
  email:string = ""
  groups
  add_group:string = ""
  add_username:string = ""
  remove_group:string = ""
  remove_username:string = ""
  group_users;
  channel_group:string = ""
  channel_username:string = ""
  channel_group_users;
  channel_name:string = ""
  group_channels;

  constructor(private routeService: RoutesService, private router: Router) { }

  ngOnInit() {
    this.routeService.getUsers().subscribe(data =>{
      this.users = data
      console.log(this.users)
    })
    this.routeService.getGroups().subscribe(data =>{
      this.groups = data
      console.log(this.groups)
    })
  }

  createUser(){
    if(this.username !== "" && this.email !== ""){
      this.routeService.createUser(this.username, this.email).subscribe(data=>{
        console.log(data)
        if(data === true){
          this.ngOnInit();
        }else{
          alert("Error: User already exists")
        }
      })
    }else{
      alert("Missing user details!")
    }
  
  }

  removeUser(username:string){

    if(confirm("Are you sure to remove User: " + username + "?")) {
      this.routeService.removeUser(username).subscribe(data =>{
        if(data === true){
          this.ngOnInit();
        }
      })
    }
  }

  inviteUser(){
    this.routeService.inviteUser(this.add_group, this.add_username).subscribe(data=>{
      if(data === true){
        this.ngOnInit();
      }else{
        alert(this.add_username + " already in Group: " + this.add_group)
      }
    })
  }

  getGroupUsers(){
    this.routeService.getGroupUsers(this.remove_group).subscribe(data=>{
      this.group_users = data
    })
  }

  removeUserFromGroup(){
    this.routeService.kickUser(this.remove_group, this.remove_username).subscribe(data=>{
      if(data === true){
        this.ngOnInit();
      }
    })
  }

  gGroupUsers(){
    this.routeService.gGroupUsers(this.channel_group).subscribe(data=>{
      this.channel_group_users = data
    })
    this.getGroupChannel();
  }

  getGroupChannel(){
    this.routeService.getGroupChannel(this.channel_group).subscribe(data=>{
      this.group_channels = data
    })
  }

  addUserToChannel(){
    this.routeService.addUserChannel(this.channel_group, this.channel_username, this.channel_name).subscribe(data=>{
      if(data === true){
        this.ngOnInit();
      }else{
        alert(this.channel_username + " already in " + this.channel_name + " in " + this.channel_group)
      }
    })
  }
}
