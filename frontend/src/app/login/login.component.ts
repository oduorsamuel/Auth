import { Component, OnInit } from '@angular/core';
import {AuthenticationService, TokenPayload} from './../authentication.service';
import {Router} from '@angular/router'
import { routerNgProbeToken } from '@angular/router/src/router_module';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: TokenPayload={
    _id:'',
    first_name: '',
    last_name:'',
    email:'',
    password:'',

  }
  constructor(private route:Router, private auth:AuthenticationService) { }

  ngOnInit() {
  }

  login(){
    this.auth.login(this.credentials).subscribe(()=>{
      this.route.navigateByUrl('/profile')
    })
    err=>{
      console.log(err)
    }
  }

}
