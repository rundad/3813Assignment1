import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes.service';
import { Router } from '@angular/router';
import { DataSharingService } from "../services/data-sharing.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  username:string = ""
  email:string = ""
  create_role:string
  isSuperAdmin:boolean
  isGroupAdmin:boolean
  constructor(private routeService: RoutesService, private router:Router, private dataSharingService: DataSharingService) { }

  ngOnInit() {
    this.dataSharingService.isSuperAdmin.subscribe(value =>{
      this.isSuperAdmin = value
    })
    this.dataSharingService.isGroupAdmin.subscribe(value =>{
      this.isGroupAdmin = value
    })
  }

  createUser(){
    if(this.username !== "" && this.email !== ""){
      this.routeService.createUser(this.username, this.email).subscribe(data=>{
        console.log(data)
        if(data === true){
          alert("Successfully created a user")
        }else{
          alert("Error: User already exists")
        }
      })
    }else{
      alert("Missing user details!")
    }
  
  }

  createWithSuper(){
    this.routeService.createWithSuper(this.username, this.email, this.create_role).subscribe(data=>{
      if(data === true){
        alert("Create user with role: " + this.create_role)
      }else{
        alert("This user is already exist!")
      }
    })
  }

}
