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

  //The login method which sends the login request to the server
  login(email:string, password:string){
    return this.http.post<user>(this.url + '/api/auth', {email: email, password:password});
  }

  //The method that sends the get users request to the server to get all the users
  getUsers(){
    return this.http.get(this.url + "/getUsers")
  }

  //The method that sends the createuser request to the server for creating a user
  createUser(user:any){
    return this.http.post(this.url + "/createUser", user);
  }

  //The method that sends the remove user request to the server for removing a user
  removeUser(objID: string){
    return this.http.post(this.url + "/removeUser", {objID:objID});
  }

  //The method that sends the get groups request to the server for get all the groups
  getGroups(username: string){
    return this.http.post(this.url + "/getGroups", {username:username})
  }

  //The method that sends the create group request to the server for creating a group
  createGroup(name: string, username:string){
    return this.http.post(this.url + "/createGroup", {name: name, username:username})
  }

  //The method that sends the remove group request to the server for remove a group
  removeGroup(name: string){
    return this.http.post(this.url + "/removeGroup", {name: name})
  }

  //The method that sends the create channel request to the server for creating a channel
  createChannel(group:string, channel:string, username: string){
    return this.http.post(this.url + "/createChannel", {group: group, channel: channel, username: username})
  }

  //The method that sends the get channel request to the server for get all the channels in the group
  getChannel(group: string){
    return this.http.post(this.url + "/getChannel", {group: group})
  }

  //The method that sends the remove channel request to the server for removing a channel in the group
  removeChannel(group:string, channel: string){
    return this.http.post(this.url + "/removeChannel", {group:group, channel:channel})
  }

  //The method that sends the get current user request to the server for getting the current user details
  getCurrentUser(username: string){
    return this.http.post(this.url + "/getCurrentUser", {username: username})
  }

  //The method that sends the invite user request to the server for inivting a user to a group
  inviteUser(group:string, username:string){
    return this.http.post(this.url + "/inviteUser", {group: group, username: username})
  }

  //The method that sends the get group users request to the server for getting all the users in the group
  getGroupUsers(group:string){
    return this.http.post(this.url + "/getGroupUsers", {group:group})
  }

  //The method that sends the kick user request to the server for kicking a user from the group
  kickUser(group: string, username:string){
    return this.http.post(this.url + "/kickUser", {group: group, username:username})
  }


  //The method that sends the get group user request to the server for getting users in the group
  gGroupUsers(group:string){
    return this.http.post(this.url + "/gGroupUsers", {group:group})
  }

  //The method that sends the get group channels to the server for getting channels in the group
  getGroupChannel(group:string){
    return this.http.post(this.url + "/getGroupChannel", {group:group})
  }

  //The method used to send the add user channel request to the server for adding a user to a channel in a group
  addUserChannel(group:string, username:string, channel:string){
    return this.http.post(this.url + '/addUserChannel', {group:group, username:username, channel:channel})
  }

  //The method thats send the get channel user request to the server for getting users in the channel
  getChannelUsers(group:string, channel:string){
    return this.http.post(this.url + "/getChannelUsers", {group:group, channel:channel})
  }

  //The method that sends the remove user from channel request to the server for removing a user from a channel
  rmUserFromChannel(group:string, username:string, channel:string){
    return this.http.post(this.url + "/rmUserFromChannel", {group:group, username:username, channel:channel})
  }

  //The method used to send the create with super request to the server for creating a user with super admin role
  createWithSuper(user: any){
    return this.http.post(this.url + "/createWithSuper", user)
  }

  //The method used to send the giveAssis request to the server for giving group assis role to a user
  giveAssis(group:string, username:string){
    return this.http.post(this.url + "/giveAssis", {group:group, username:username})
  }


  //The method used to send the giveSuper request to the server for giving super admin role to a user
  giveSuper(name:string){
    return this.http.post(this.url + "/giveSuper", {name: name})
  }

  //The method used to send the get channels request to the server for gettings channels in the group
  getChannels(group: string){
    return this.http.post(this.url + "/getChannels", {group: group})
  }

  //The method that used to send the request to server side for getting all the groups that the user have joined
  getUserGroups(username: string){
    return this.http.post(this.url + "/getUserGroups", {username: username})
  }
  
  //The method that used to send the request to server side for getting all the channels of the group
  getUserGroupChannels(group:string, username:string){
    return this.http.post(this.url + "/getUserGroupCh", {group: group, username:username})
  }

  imgupload(fd){
    return this.http.post<any>('/api/upload', fd)
  }
}
