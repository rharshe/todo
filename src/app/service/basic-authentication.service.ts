import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { API_URL } from '../app.constants';

export const TOKEN='token';
export const AUTHENTICATED_USER='authenticatedUser'

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http:HttpClient) { }

  executeJWTAuthenticationService(username:any,password:any){
   
    return this.http.post<any>
    (`${API_URL}/authenticate`,{
      username,
      password
    }).pipe(
      map(
        data=>{
          sessionStorage.setItem(AUTHENTICATED_USER,username);
          sessionStorage.setItem(TOKEN,`Bearer ${data.token}`);
          return data
        }
      )
    );
  }

  executeAuthenticationService(username:any,password:any){
    let basicAuthHeaderString= 'Basic '+ window.btoa(username+':'+password)
  
    let headers =new HttpHeaders({
      Authorization: basicAuthHeaderString
    })
    //if response is success add session using pipe 
    return this.http.get<AuthenticationBean>
    (`${API_URL}/basicauth`,
    {headers}).pipe(
      map(
        data=>{
          sessionStorage.setItem(AUTHENTICATED_USER,username);
          sessionStorage.setItem(TOKEN,basicAuthHeaderString);
          return data
        }
      )
    );
  }

  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }
  getAuthenticatedToken():any{
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN)
  }

  createBasicAuthenticationHttpHeader(){
    let username='username';
    let password='password';
    let basicAuthHeaderString= 'Basic '+ window.btoa(username+':'+password)
    return basicAuthHeaderString
  }

  isUserLoggedIn(){
    let user=sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user===null);
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

}

export class AuthenticationBean{
  constructor(public message:string){}
}