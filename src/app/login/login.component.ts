import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,} from "@angular/forms";
import { AuthService } from '../service/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fromlogin! : FormGroup;
  constructor( private fb : FormBuilder, private authService: AuthService, private router : Router ){}
  ngOnInit(): void {
    this.fromlogin=this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control("")
    })
  }
  handleLogin(){
    let username = this.fromlogin.value.username;
    let pwd= this.fromlogin.value.password
    this.authService.login(username,pwd).subscribe({
      next : data =>{
        this.authService.loadProfile(data);
        this.router.navigateByUrl("/admin")
      },
      error : err=>{
        console.log(err);
      }
    })
  }
}