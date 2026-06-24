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
import { RemoteAppInfoService } from "../_services/remoteappinfo.service";


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
    bb_url: string;
    error = '';
    apiInfo = {};

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private _remoteAppInfoService: RemoteAppInfoService) {}

    ngOnInit() {

        this._remoteAppInfoService.remoteApp.subscribe(res => this.apiInfo = res);
        // var apiEndPoint = "https://sandbox.bluebutton.cms.gov/v1" ;
        // var apiEndPoint = this.apiInfo['remoteApiEndPoint'];
        // var client_id = "wv6iY7Ni2J1aoeUID87xYIGxKFU7oaDjdxxwneZl";
        // var client_id = this.apiInfo['client_id'];
        this.bb_url = this.apiInfo['remoteApiEndPoint']
            + "/o/authorize/?client_id="
            + this.apiInfo['client_id']
            + "&redirect_uri="
            + encodeURI(this.apiInfo['redirect_uri'])
            + "&response_type=code"
            + "&state=test1";

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();
       
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      
        var index = this.returnUrl.indexOf( "code" ); 
        this.code = this.returnUrl.substr(index + 5, 30)
      
        this.code = this.route.snapshot.queryParams['code'];
      
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

        this.authenticationService.getBlueButtonToken(this.f.username.value, this.f.password.value, this.code, this.router);
    }
  
  onClickMe() {
        return throwError("on click error");
    }

}
