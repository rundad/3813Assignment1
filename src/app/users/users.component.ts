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
    });

  }

  //The function used to remove a user
  //parameter: username - the name of user
  //Pop confirmation message for removing a user
  //If the send back data is true, reload component and pop message, else display message
  removeUser(objID:string){

    if(confirm("Are you sure to remove this user ?")) {
      this.routeService.removeUser(objID).subscribe(data =>{
        if(data === true){
          alert("Successfully removed user")
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
          alert("User is already a super admin")
        }
      })
    }
  
  }
}
