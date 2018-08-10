import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Params} from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../_services';
import { HttpParams } from '@angular/common/http';
import { of, throwError } from 'rxjs';


export interface AuthToken {
    access_token: string,
    token_type: string,
    expires_in: number,
    refresh_token: string,
    scope: Array<string>
}

@Component({templateUrl: 'login.component.html'})
  
  
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    code: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();
        console.log("deh - In ngOnInit")
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
       console.log("deh - returnUrl is " + this.returnUrl);
      
      
 
      var index = this.returnUrl.indexOf( "code" ); 
      this.code = this.returnUrl.substr(index + 5, 30)
        console.log("indexOf found code :" + index );   
      console.log("code is " + this.code );   
      
      
    console.log("deh-code value is" + this.code);
    console.log("deh code value2" + this.route.snapshot.queryParams['code'])
      
      this.code = this.route.snapshot.queryParams['code'];
      
       console.log("deh code value really is " + this.route.snapshot.queryParams['code'])
    

   

    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
  //      this.authenticationService.login(this.f.username.value, this.f.password.value)

           this.authenticationService.getBlueButtonToken(this.f.username.value, this.f.password.value, this.code, this.router);
        console.log("deh-in login-before navigate-returnUrl is " + this.returnUrl);
    
//    .pipe(first())
//            .subscribe(
//                data => {
//                  console.log ('deh-data returned back to loginComponent ' + data)
//                    this.router.navigate([this.returnUrl]);
//                },
//                error => {
//                    this.error = error;
//                    this.loading = false;
//                });
    }
  
  onClickMe() {
        return throwError("on click error");
    }
  
 
  
  
  

}
