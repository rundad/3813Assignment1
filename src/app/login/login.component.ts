import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = ""
  password = ""

  constructor(private router: Router, private routeService: RoutesService) { }

  ngOnInit() {
  }

  login(){
    this.routeService.login(this.email).subscribe(data=>{
      const json_data = JSON.stringify(data)
      if(data.valid === true){
        this.router.navigateByUrl("/profile")
      }else{
        alert("Email and password were incorrect")
      }
      localStorage.setItem("currentUsername", JSON.stringify(data.username));
      localStorage.setItem("userData", JSON.stringify(data));
    }, (err: HttpErrorResponse) => {
      alert("Error: " + err)
    })

  }

}
