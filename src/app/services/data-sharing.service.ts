import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isNormalUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isSuperAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isGroupAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
}
