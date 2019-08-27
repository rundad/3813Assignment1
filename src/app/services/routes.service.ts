import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface user{
  email:string;
  username: string;
  valid: boolean;
  role:string;
  groups:[string]
}


@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  url = "http://localhost:3000"
  constructor(private http: HttpClient) { }

  login(email:string){
    return this.http.post<user>(this.url + '/api/auth', {email: email});
  }

  getUsers(){
    return this.http.get(this.url + "/getUsers")
  }

  createUser(username: string, email: string){
    return this.http.post(this.url + "/createUser", {username: username, email: email});
  }

  removeUser(username: string){
    return this.http.post(this.url + "/removeUser", {username:username});
  }

  getGroups(){
    return this.http.get(this.url + "/getGroups")
  }

  createGroup(name: string, username:string){
    return this.http.post(this.url + "/createGroup", {name: name, username:username})
  }

  removeGroup(name: string){
    return this.http.post(this.url + "/removeGroup", {name: name})
  }

  createChannel(group:string, channel:string){
    return this.http.post(this.url + "/createChannel", {group: group, channel: channel})
  }

  getChannel(group: string){
    return this.http.post(this.url + "/getChannel", {group: group})
  }

  removeChannel(group:string, channel: string){
    return this.http.post(this.url + "/removeChannel", {group:group, channel:channel})
  }

  getCurrentUser(){
    return this.http.get(this.url + "/getCurrentUser")
  }
}
