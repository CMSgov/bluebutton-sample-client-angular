import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { EOB } from '../_models';
import { UserService } from '../_services';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { of, throwError } from 'rxjs';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
     users: User[] = [];
     eobsArray =  [];
  

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.retrieveFHIRData();
       console.log ("after retrieveFHIRData call ");
      
      
      this.userService.getAll().pipe().subscribe(eobsArray => { 
            this.eobsArray = eobsArray; 
        });
      
      
      
      console.log ("after getAllUser service call eobs " + this.eobsArray.length);
      
  //   let testUser = { id: 1, username: 'test', password: 'test', firstName: 'Dave', lastName: 'Holdgrafer' };  
   //    return of(new HttpResponse({ status: 200, body: [testUser] }));
     
   
      
        
        
    }
}