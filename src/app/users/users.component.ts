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
  constructor(private routeService: RoutesService, private router: Router) { }

  ngOnInit() {
    this.routeService.getUsers().subscribe(data =>{
      this.users = data
      console.log(this.users)
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
}