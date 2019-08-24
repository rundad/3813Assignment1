import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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


}
