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
    this.routeService.login(this.email).subscribe(data=>{
      if(data.valid === true){
        this.dataSharingService.isUserLoggedIn.next(true);
        if(data.role === "user"){
          this.dataSharingService.isNormalUser.next(true);
        }else if(data.role === "Super"){
          
          this.dataSharingService.isSuperAdmin.next(true);
        }else if(data.role === "Group Admin"){
          this.dataSharingService.isGroupAdmin.next(true);
        }else if(data.role === "Group Assis"){
          this.dataSharingService.isGroupAssis.next(true);
        }
        localStorage.setItem("currentUsername", JSON.stringify(data.username));
        localStorage.setItem("userData", JSON.stringify(data));
        this.router.navigateByUrl("/profile")
      }else{
        alert("Email and password were incorrect")
      }
  
    }, (err: HttpErrorResponse) => {
      alert("Error: " + err)
    })

  }

}
