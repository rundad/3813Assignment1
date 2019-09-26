import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes.service';
import { Router } from '@angular/router';
import { DataSharingService } from "../services/data-sharing.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username:string = ""
  email:string = ""
  role: string = "user"
  password: string = ""
  create_role:string = ""
  isSuperAdmin;
  isGroupAdmin;
  selectedfile = null;
  selectedfilename = null;
  imagepath = ""

  constructor(private routeService: RoutesService, private router:Router, private dataSharingService: DataSharingService) { }

  ngOnInit() {
    this.dataSharingService.isSuperAdmin.subscribe(value =>{
      this.isSuperAdmin = value
    })
    this.dataSharingService.isGroupAdmin.subscribe(value =>{
      this.isGroupAdmin = value
    })
  }

   //The function that will be called when the create user button have been clicked in the created user form
  //Send a request to the server side to create a new user by calling the method in route service
  createUser(){
    if(this.username !== "" && this.email !== ""){
      this.routeService.createUser({username: this.username, email:this.email, password: this.password, role: this.role, groups: [], adminGroupList:[], valid:false}).subscribe(data=>{
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

  //The function that will be called when the create user button have been clicked in the create user form
  //only the super admin have clicked the button can access to the this form and function
  //Send a request to server side to create a user by calling the method through route service
  createWithSuper(){
    this.routeService.createWithSuper({username: this.username, email: this.email, password: this.password, role: this.create_role, groups: [], adminGroupList:[], valid:false}).subscribe(data=>{
      if(data === true){
        alert("Create user with role: " + this.create_role)
      }else{
        alert("This user is already exist!")
      }
    })
  }

  onFileSelected(event){
    console.log(event.target.files[0])
    this.selectedfilename = event.target.files[0];
  }
}
