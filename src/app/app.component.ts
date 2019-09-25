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
    if((localStorage.getItem("currentUsername")) !== null){
      this.dataSharingService.isUserLoggedIn.next(true);
    }

  }

  //The function will be called when user want to go to the profile
  //Check if user have logged in or not, if logged in go to profile, else go to login
  goProfile(){
    if(JSON.parse(sessionStorage.getItem("currentUsername")) === null){
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

  //The function will be called when the user click the users tab
  //Navigate to users if the user is logged in, else go to login componenet 
  goUsers(){
    console.log()
    if(JSON.parse(sessionStorage.getItem("currentUsername")) === null){
      this.router.navigateByUrl("/login")
    }else{
      this.router.navigateByUrl("/users")
    }
  }

  //The function will be called when the user clicked the groups tab
  //Navigate to groups component if user logged in, else go to login component 
  goGroups(){
    if(JSON.parse(sessionStorage.getItem("currentUsername")) === null){
      this.router.navigateByUrl("/login")
    }else{
      this.router.navigateByUrl("/groups")
    }
  }

  //The function that will be called when the Chat button on the nav bar have been clicked
  //Take the user to the chat component
  goChat(){
    if(JSON.parse(sessionStorage.getItem("currentUsername")) === null){
      this.router.navigateByUrl("/login")
    }else{
      this.router.navigateByUrl("/chat")
    }
  }
}
