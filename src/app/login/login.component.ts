import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataSharingService } from "../services/data-sharing.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = ""
  password = ""

  constructor(private router: Router, private routeService: RoutesService, private dataSharingService: DataSharingService) { }

  ngOnInit() {
  }

  //The function which will be called when a user clicked the login button in login page
  //Check if the user exist by sending the data and the auth login request to the server side
  //check the send back data role and update the data status that defined in the data sharing service
  //Store the data into the local storage
  //Check the valid property, if true navigate to the profile page, if not pop message
  login(){
    if(this.email !== "" && this.password !== ""){
      this.routeService.login(this.email, this.password).subscribe(data=>{
        console.log(data)
        if(data[0].valid === false){
          this.dataSharingService.isUserLoggedIn.next(true);
          if(data[0].role === "user"){
            this.dataSharingService.isNormalUser.next(true);
          }else if(data[0].role === "Super"){
            
            this.dataSharingService.isSuperAdmin.next(true);
          }else if(data[0].role === "Group Admin"){
            this.dataSharingService.isGroupAdmin.next(true);
          }else if(data[0].role === "Group Assis"){
            this.dataSharingService.isGroupAssis.next(true);
          }
          sessionStorage.setItem("currentUsername", JSON.stringify(data[0].username));
          sessionStorage.setItem("userImage", JSON.stringify(data[0].image))
          sessionStorage.setItem("userData", JSON.stringify(data));
          this.router.navigateByUrl("/profile")
        }else if(data[0].valid === true){
          alert("Email and password were incorrect")
        }
    
      }, (err: HttpErrorResponse) => {
        alert("Error: " + err)
      })
    }else{
      alert("Login details are missing")
    }


  }

}
