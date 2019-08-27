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
  constructor(private router: Router, private dataSharingService:DataSharingService){
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
  });
  }

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

  goProfile(){
    if(JSON.parse(localStorage.getItem("currentUsername")) === null){
      this.router.navigateByUrl("/login")
    }else{
      this.router.navigateByUrl("/profile")
    }
  }

  logout(){
    localStorage.clear();
    this.dataSharingService.isUserLoggedIn.next(false);
    this.router.navigateByUrl("/login")
  }

  goManage(){
    if(JSON.parse(localStorage.getItem("userData")) === null){
      this.router.navigateByUrl("/login")
    }else if((JSON.parse(localStorage.getItem("userData")).role === "Super") || (JSON.parse(localStorage.getItem("userData")).role === "Group Admin")){
      this.router.navigateByUrl("/management")
    }else{
      alert("You don't have permission to manage")
    }
  }
}
