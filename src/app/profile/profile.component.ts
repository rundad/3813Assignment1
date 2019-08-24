import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData
  constructor(private router:Router) { }

  ngOnInit() {
    if(typeof(Storage) !== "undefined"){
      console.log("Storage ready");
      this.userData = JSON.parse(localStorage.getItem("userData"))
    }else{
      console.log("No storage supoort")
    }
  }


}
