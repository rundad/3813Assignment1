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
}
