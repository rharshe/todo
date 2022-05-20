import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username='rahul'
  password=''
  errorMessage='Invalid Credentials'
  invalidLogin=false

  constructor(private router:Router,
    private hardcodedAuthenticationService:HardcodedAuthenticationService,
    private basicAuthenticationService:BasicAuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogin(){
    //console.log(this.username);
    //console.log(this.password);
   // if(this.username==='rahul' && this.password==='dummy'){
     if(this.hardcodedAuthenticationService.authenticate(this.username,this.password)){
      this.router.navigate(['welcome',this.username])
      this.invalidLogin=false
    }
   
    else
    this.invalidLogin=true
  }

  handleBasicAuthLogin(){
   ///this would return observable..it is asyn call..need to subscribe to it.
     this.basicAuthenticationService.executeAuthenticationService(this.username,this.password)
        .subscribe(
          data=>{
            console.log(data)
            this.router.navigate(['welcome',this.username])
            this.invalidLogin=false
          },
          error=>{
            console.log(error)
            this.invalidLogin=true
          }
        )
  } 

  handleJWTAuthLogin(){
    ///this would return observable..it is asyn call..need to subscribe to it.
      this.basicAuthenticationService.executeJWTAuthenticationService(this.username,this.password)
         .subscribe(
           data=>{
             console.log(data)
             this.router.navigate(['welcome',this.username])
             this.invalidLogin=false
           },
           error=>{
             console.log(error)
             this.invalidLogin=true
           }
         )
   } 
     
    
  

}
