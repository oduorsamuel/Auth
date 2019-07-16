import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router'
import {AuthenticationService} from './authentication.service'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth:AuthenticationService, private router:Router) { }
  canActivate(){
    if(!this.auth.isLoggedIn()){
      this.router.navigateByUrl('/')
      return false
    }
    return true
  }
}
