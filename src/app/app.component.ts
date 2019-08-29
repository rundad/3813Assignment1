import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from "./services/data-sharing.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Assignment1';

  isUserLoggedIn: boolean
  isNormalUser: boolean
  //Get data status from data sharing service and store them into variables
  constructor(private router: Router, private dataSharingService:DataSharingService){
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
  });
    this.dataSharingService.isNormalUser.subscribe(value =>{
      this.isNormalUser = value
    })
  }

  //The function which will be called when the components loads, update user login status
  ngOnInit() {
    if(typeof(Storage) !== "undefined"){
      console.log("Storage ready");
    }else{
      console.log("No Storage Support");
    }
    if(JSON.parse(localStorage.getItem("currentUsername")) !== null){
      this.dataSharingService.isUserLoggedIn.next(true);
    }
  }

  //The function will be called when user want to go to the profile
  //Check if user have logged in or not, if logged in go to profile, else go to login
  goProfile(){
    if(JSON.parse(localStorage.getItem("currentUsername")) === null){
      this.router.navigateByUrl("/login")
    }else{
      this.router.navigateByUrl("/profile")
    }
  }

  //The function will be called when the user log out, update data status in data sharing service
  //Navigate to login component
  logout(){
    localStorage.clear();
    this.dataSharingService.isUserLoggedIn.next(false);
    this.dataSharingService.isNormalUser.next(false);
    this.dataSharingService.isGroupAdmin.next(false);
    this.dataSharingService.isSuperAdmin.next(false);
    this.dataSharingService.isGroupAssis.next(false);
    this.router.navigateByUrl("/login")
  }

  //The function that navigate to the manage componnet if user data is not empty, else go to login
  goManage(){
    if(JSON.parse(localStorage.getItem("userData")) === null){
      this.router.navigateByUrl("/login")
    }else if((JSON.parse(localStorage.getItem("userData")).role === "Super") || (JSON.parse(localStorage.getItem("userData")).role === "Group Admin")){
      this.router.navigateByUrl("/management")
    }else{
      alert("You don't have permission to manage")
    }
  }

  //The function will be called when the user click the users tab
  //Navigate to users if the user is logged in, else go to login componenet 
  goUsers(){
    if(JSON.parse(localStorage.getItem("currentUsername")) === null){
      this.router.navigateByUrl("/login")
    }else{
      this.router.navigateByUrl("/users")
    }
  }

  //The function will be called when the user clicked the groups tab
  //Navigate to groups component if user logged in, else go to login component 
  goGroups(){
    if(JSON.parse(localStorage.getItem("currentUsername")) === null){
      this.router.navigateByUrl("/login")
    }else{
      this.router.navigateByUrl("/groups")
    }
  }
}
