import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class HelloWorldBean{
  constructor(public message:string){}
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http:HttpClient) { }

  executeHelloWorldBeanService(){
     return this.http.get<HelloWorldBean>('http://localhost:8088/hello-world-bean');
      //console.log('execute Hello World Bean service')
  }

//http://localhost:8088/hello-world/path-variable/rahul
executeHelloWorldBeanServiceWithPathVariable(name:any){
  // let basicAuthHeaderString=this.createBasicAuthenticationHttpHeader();

  // let headers =new HttpHeaders({
  //   Authorization: basicAuthHeaderString
  // })

  return this.http.get<HelloWorldBean>
  (`http://localhost:8088/hello-world/path-variable/${name}`,
 // {headers}
  );
   //console.log('execute Hello World Bean service')
}

// createBasicAuthenticationHttpHeader(){
//   let username='username';
//   let password='password';
//   let basicAuthHeaderString= 'Basic '+ window.btoa(username+':'+password)
//   return basicAuthHeaderString
// }
//Access to XMLHttpRequest at 'http://localhost:8088/hello-world/path-variable/in28minutes' 
//from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' 
//header is present on the requested resource.

// Access to XMLHttpRequest at 'http://localhost:8088/hello-world/path-variable/in28minutes' 
// from origin 'http://localhost:4200' has been blocked by CORS policy: 
// Response to preflight request doesn't pass access control check: 
// No 'Access-Control-Allow-Origin' header is present on the requested resource.


}
