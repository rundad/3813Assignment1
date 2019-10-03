import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes.service';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  group:string = ""
  channel:string = ""
  group_names;
  channel_names;
  //currentroom:string = ""

  messagecontent:string;
  messages:string[] = [];
  rooms = [];
  roomnotice: string ="";
  currentroom: string = ""
  isinRoom = false;
  numusers: number = 0;
  userData;
  selectedfile;
  imagepath = ""
  selectedfilename
  constructor(private router:Router, private routeService: RoutesService, private socketService: SocketService) { }

  //The function that will be called when the componnet loads
  //Get all the groups that user have joined by send a getUserGroups request
  ngOnInit() {
    this.routeService.getUserGroups(JSON.parse(sessionStorage.getItem("currentUsername"))).subscribe(data=>{
      console.log(data)
      this.group_names = data
    })
    this.socketService.initSocket();
    this.socketService.getMessage((m)=>{this.messages.push(m)})
    console.log(this.messages)
    this.socketService.notice((msg)=>{this.roomnotice = msg})
    this.socketService.joined((msg)=>{this.currentroom = msg
      if(this.currentroom !== ""){
        this.isinRoom = true
      }else{
        this.isinRoom = false;
      }
    })

  }
  //The function that will be called when a group have been selected
  //Get the channels of the selected group by calling the method in route service to send a request to the server side
  gUserGrChannel(){
    this.routeService.getUserGroupChannels(this.group, JSON.parse(sessionStorage.getItem("currentUsername"))).subscribe(data =>{
      console.log(data)
      this.channel_names = data
    })
   
  }

  
  //The function that will be called when user clicked join room button
  //join the room with group and channel combine as the room id
  //request for number of users in the room and get the number
  joinroom(){
    this.socketService.joinroom(this.group + this.channel)
    this.socketService.reqnumusers(this.group + this.channel)
    this.socketService.getnumusers((res)=>{this.numusers = res});
    //this.socketService.joined((msg)=>{this.currentroom = msg})
    //this.router.navigateByUrl("/chat-room/" + this.group + "/" + this.channel)

  }

  //The function that will be called when the user clicked the leave room button
  //Call the leave room method to leave the room
  //request number of users in the room and get the number
  leaveroom(){
    this.socketService.leaveroom(this.currentroom)
    this.socketService.reqnumusers(this.currentroom)
    this.socketService.getnumusers((res)=>{this.numusers = res})
    this.currentroom = ""
    this.isinRoom = false
    this.numusers = 0
    this.roomnotice = ""
    this.messages = []
  }

  //The function that will be called when the user clicked send to send message
  //check mesasge content is empty
  //check is there a image
  //call send method to send message
  chat(){
    if(this.messagecontent){
      console.log(this.selectedfilename)
      if(this.selectedfilename === undefined){
        this.selectedfilename = ""
      }else{
        this.onUpload();
      }
      this.socketService.send({message: this.messagecontent, username:JSON.parse(sessionStorage.getItem("currentUsername")), userimage:JSON.parse(sessionStorage.getItem("userImage")), image:this.selectedfilename, group: this.group, channel: this.channel})

      this.messagecontent = ""
    }else{
      console.log("No Message")
    }
    this.selectedfilename = undefined
  }

  //get upload image and store the value to variables
  onFileSelected(event){
      this.selectedfile = event.target.files[0];
      this.selectedfilename = event.target.files[0].name
  }

  //create new form data and append the data to form data object
  //call imageupload method to upload the image
  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedfile, this.selectedfile.name)
    this.routeService.imageupload(fd).subscribe(res=>{
      this.imagepath = res.data.filename
    })
  }
}
