import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData:Object = {
    username: "",
    email: "",
    password: "",
    role: "",
    groups: [],
    valid: false,

  }
  username;
  test;
  constructor(private router:Router, private routeService: RoutesService) { }

  ngOnInit() {
    this.routeService.getCurrentUser().subscribe(data =>{
      this.userData = data
      console.log(this.userData)
    })
    // this.userData = JSON.parse(localStorage.getItem("userData"))
    // console.log(this.userData)
  }


}
