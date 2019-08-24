import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Assignment1';

  constructor(private router: Router){

  }

  ngOnInit() {
    if(typeof(Storage) !== "undefined"){
      console.log("Storage ready");
    }else{
      console.log("No Storage Support");
    }
  }

  goProfile(){
    if(JSON.parse(sessionStorage.getItem("currentUsername")) === null){
      this.router.navigateByUrl("/login")
    }else{
      this.router.navigateByUrl("/profile")
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/login")
  }

}
