import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  name='';
  welcomeMessageFromService='';
  constructor(private route:ActivatedRoute,private service:WelcomeDataService) { }

  ngOnInit(): void {
    this.name=this.route.snapshot.params['name'];
   // console.log(this.route.snapshot.params['name']);
  }

  getWelcomeMessage(){
    console.log(this.service.executeHelloWorldBeanService());

    this.service.executeHelloWorldBeanService().subscribe(
      response=>this.handleSuccessfulResponse(response),
      error=>this.handleErrorResponse(error)
    )
    console.log('last line of getwelcomemessage')
   // console.log("get welcome message")
  }

  getWelcomeMessageWithParameter(){
    console.log(this.service.executeHelloWorldBeanService());

    this.service.executeHelloWorldBeanServiceWithPathVariable(this.name).subscribe(
      response=>this.handleSuccessfulResponse(response),
      error=>this.handleErrorResponse(error)
    )
    console.log('last line of getwelcomemessage')
   // console.log("get welcome message")
  }

  handleSuccessfulResponse(response:any){
    this.welcomeMessageFromService=response.message;
    //console.log(response);
  }

  handleErrorResponse(response:any){
    console.log(response)
    this.welcomeMessageFromService=response.error.message
  }

}
