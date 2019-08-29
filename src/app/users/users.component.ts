import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes.service';
import { Router } from '@angular/router';
import { DataSharingService } from "../services/data-sharing.service";

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
  rm_channel_group:string = ""
  rm_channel_username:string = ""
  rm_channel_name:string = ""
  rm_group_channels;
  channel_users;
  isSuperAdmin: boolean;
  create_role:string
  isGroupAdmin:boolean;
  isGroupAssis:boolean;
  constructor(private routeService: RoutesService, private router: Router, private dataSharingService: DataSharingService) { }

  //The function will be called when the components loads
  //Get the data status from the data sharing service and store them into variables
  //Get users and groups by sending request to the server
  ngOnInit() {
    this.routeService.getUsers().subscribe(data =>{
      this.users = data
      console.log(this.users)
    })
    this.routeService.getGroups().subscribe(data =>{
      this.groups = data
      console.log(this.groups)
    })
    this.dataSharingService.isSuperAdmin.subscribe(value =>{
      this.isSuperAdmin = value
    })
    this.dataSharingService.isGroupAdmin.subscribe(value =>{
      this.isGroupAdmin = value
    })
    this.dataSharingService.isGroupAssis.subscribe(value =>{
      this.isGroupAssis = value
    })
  }

  //The function used to create user by calling the create user method in the route Service
  //Check inputs are empty or not
  //If the send back data is true reload the component, else pop error message
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

  //The function used to remove a user
  //parameter: username - the name of user
  //Pop confirmation message for removing a user
  //If the send back data is true, reload component and pop message, else display message
  removeUser(username:string){

    if(confirm("Are you sure to remove User: " + username + "?")) {
      this.routeService.removeUser(username).subscribe(data =>{
        if(data === true){
          alert("Removed User: " + username)
          this.ngOnInit();
        }else{
          alert("This user is Super Admin, Super Admin cannot be removed")
        }
      })
    }
  }

  //The function use to invite a user to a group
  //If the send back data is true, reload the component and else pop message
  inviteUser(){
    this.routeService.inviteUser(this.add_group, this.add_username).subscribe(data=>{
      if(data === true){
        this.ngOnInit();
      }else{
        alert(this.add_username + " already in Group: " + this.add_group)
      }
    })
  }

  //The functio nsue to get group users and store the user into a variable
  getGroupUsers(){
    this.routeService.getGroupUsers(this.remove_group).subscribe(data=>{
      this.group_users = data
    })
  }

  // removeUserFromGroup(){
  //   this.routeService.kickUser(this.remove_group, this.remove_username).subscribe(data=>{
  //     if(data === true){
  //       this.ngOnInit();
  //     }
  //   })
  // }

  //The function use to get group users and store the users into a variable and also called get group channels function
  gGroupUsers(){
    this.routeService.gGroupUsers(this.channel_group).subscribe(data=>{
      this.channel_group_users = data
    })
    this.getGroupChannel();
  }

  //The function used to get the channels in the group and store the data into the variable
  getGroupChannel(){
    this.routeService.getGroupChannel(this.channel_group).subscribe(data=>{
      this.group_channels = data
    })
  }

  //The function used to add a user to a channel
  //If the send back data is true, pop message and reload component, else pop message
  addUserToChannel(){
    this.routeService.addUserChannel(this.channel_group, this.channel_username, this.channel_name).subscribe(data=>{
      if(data === true){
        alert("Added " + this.channel_username + " to channel: " + this.channel_name)
        this.ngOnInit();
      }else{
        alert(this.channel_username + " already in " + this.channel_name + " in " + this.channel_group)
      }
    })
  }

  //Used for remove user from channel
  // channelUsers(){
  //   this.routeService.getChannelUsers(this.rm_channel_group, this.rm_channel_name).subscribe(data =>{
  //     this.channel_users = data
  //   })
  // }

  //Used for remove user from channel
  // groupChannel(){
  //   this.routeService.getGroupChannel(this.rm_channel_group).subscribe(data=>{
  //     this.rm_group_channels = data
  //   })
  // }

  //Used for remove user from channel
  // rmUserFromChannel(){
  //   this.routeService.rmUserFromChannel(this.rm_channel_group, this.rm_channel_username, this.rm_channel_name).subscribe(data =>{
  //     if(data === true){
  //       alert("Removed user: " + this.rm_channel_username + " from channel: " + this.rm_channel_name + " in group: " + this.rm_channel_group)
  //       this.ngOnInit();
  //     }
  //   })
  // }

  //The function used to create user with super admin role
  //If the send back data is true reload component and pop message, else pop message
  createWithSuper(){
    this.routeService.createWithSuper(this.username, this.email, this.create_role).subscribe(data=>{
      if(data === true){
        alert("Create user with role: " + this.create_role)
        this.ngOnInit();
      }else{
        alert("This user is already exist!")
      }
    })
  }

  //The function use to give a user super admin role
  //Parameter: name - the name of user
  //Confirmation to the action
  //If send back data is true, reload component and pop message, else pop message
  giveSuperRole(name:string){

    if(confirm("Are you sure to give this user: " + name + " Super Admin privileges?")) {
      this.routeService.giveSuper(name).subscribe(data=>{
        if(data === true){
          alert("User: " + name + " has became a Super Admin")
          this.ngOnInit();
        }else if(data === false){
          alert("Cannot have more than 2 Super Admins")
        }
      })
    }
  
  }
}
