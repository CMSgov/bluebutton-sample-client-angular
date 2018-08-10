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
      
      
      
      this.userService.getAll().pipe().subscribe(eobsArray => { 
            this.eobsArray = eobsArray; 
        });
           
    }
}