import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups;
  group_name:string = ""
  constructor(private routeService: RoutesService, private router:Router) { }

  ngOnInit() {
    this.routeService.getGroups().subscribe(data =>{
      this.groups = data
      console.log(this.groups)
    })
  }

  createGroup(){
    if(this.group_name !== ""){
      this.routeService.createGroup(this.group_name).subscribe(data =>{
        console.log(data)
        if(data === true){
          this.ngOnInit();
        }else{
          alert("Error: This group is already exist")
        }
      })
    }else{
      alert("Missing group details!")
    }
  }

}
