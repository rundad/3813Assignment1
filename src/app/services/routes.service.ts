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

  inviteUser(group:string, username:string){
    return this.http.post(this.url + "/inviteUser", {group: group, username: username})
  }

  getGroupUsers(group:string){
    return this.http.post(this.url + "/getGroupUsers", {group:group})
  }

  kickUser(group: string, username:string){
    return this.http.post(this.url + "/kickUser", {group: group, username:username})
  }

  gGroupUsers(group:string){
    return this.http.post(this.url + "/gGroupUsers", {group:group})
  }

  getGroupChannel(group:string){
    return this.http.post(this.url + "/getGroupChannel", {group:group})
  }

  addUserChannel(group:string, username:string, channel:string){
    return this.http.post(this.url + '/addUserChannel', {group:group, username:username, channel:channel})
  }

  getChannelUsers(group:string, channel:string){
    return this.http.post(this.url + "/getChannelUsers", {group:group, channel:channel})
  }

  rmUserFromChannel(group:string, username:string, channel:string){
    return this.http.post(this.url + "/rmUserFromChannel", {group:group, username:username, channel:channel})
  }

  createWithSuper(username: string, email: string, role:string){
    return this.http.post(this.url + "/createWithSuper", {username: username, email: email, role: role})
  }

  giveAssis(group:string, username:string){
    return this.http.post(this.url + "/giveAssis", {group:group, username:username})
  }
}
