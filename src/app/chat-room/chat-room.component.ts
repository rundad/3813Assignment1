import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesService } from '../services/routes.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  group_name:string;
  channel_name:string
  constructor(private activatedRoute: ActivatedRoute, private router:Router, private routeService:RoutesService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
         params => {this.group_name = params.get('group');}
    );
    this.activatedRoute.paramMap.subscribe(
         params => {this.channel_name = params.get('channel');}
    );
  }

}
