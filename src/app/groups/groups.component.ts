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
  group_channel:string = ""
  channel_name:string = ""
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
        this.group_name = ""
      })
    }else{
      alert("Missing group details!")
    }
  }

  removeGroup(name:string){
    if(confirm("Are you sure to Group: " + name + "?")) {
      this.routeService.removeGroup(name).subscribe(data =>{
        console.log(data)
        if(data === true){
          this.ngOnInit();
          alert("Removed Group: " + name)
        }
      })
    }
  }

  createChannel(){
    console.log(this.group_channel)
    if(this.group_channel !== "null" && this.channel_name !== ""){
      this.routeService.createChannel(this.group_channel, this.channel_name).subscribe(data =>{
        console.log(data)
        if(data === true){
          this.ngOnInit();
          alert("Created Channel: " + this.channel_name)
        }else{
          alert("Error: This channel is already exist in Group: " + this.group_channel)
        }
      })
    }else{
      alert("Missing group or channel details!")
    }
    
  }

}
