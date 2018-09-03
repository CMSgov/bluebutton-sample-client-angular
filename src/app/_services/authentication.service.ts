import { AuthToken } from "../app.component";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {HttpParams} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_models';
import { EOB} from '../_models';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>('/api/authenticate', { username: username, password: password })
            .pipe(map((res:any) => {
                // login successful if there's a jwt token in the response
                if (res && res.token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));
                }
            }));
    }
  
  getBlueButtonToken(username: string, password: string, code: string, router: Router) {
   
   var headers = new HttpHeaders()
       .set('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.set('grant_type', 'authorization_code');
     urlSearchParams.set('redirect_uri', 'http://localhost:8082/login');
    urlSearchParams.set('client_id', 'A9KpF5TNqruy9O5ecaOsBOSfOXhtENaiOdtvnSjm');
     urlSearchParams.set('client_secret', 'cu6NeYtrQfeDNFPbiNKOGJtPwaGQo3kuPpIPtXbBwPB2uNQ0GZLz3tZgIb8jt7yvwPf4Ysqy26DIeSBita7PtGsSccaWwZYO5NB5k9DBsQQ7qsQZSfxMGePJJY3IW8yp');
     urlSearchParams.set('code', code);

    let body = urlSearchParams.toString();
   
    
    return this.http.post<AuthToken>('https://sandbox.bluebutton.cms.gov/v1/o/token/?' + body,
         {
           headers, HttpHeaders  
            }, 
         )
       
          .subscribe(
            data => {     
            localStorage.setItem('currentUser', JSON.stringify({ username, token: data.access_token}));     
            //retrieveFHIRData
  
           var headers = new HttpHeaders()
               .set('Content-Type', 'application/json');
  
            const eobparams = new HttpParams({fromString: 'patient=20140000010000'});
  
           return this.http.get<any>('https://sandbox.bluebutton.cms.gov/v1/fhir/ExplanationOfBenefit/')
             .subscribe(eobReturneddata => {
                     // store EOB data  
                    localStorage.setItem('eobJSONData', JSON.stringify(eobReturneddata));                
                    return this.http.get<any>('https://sandbox.bluebutton.cms.gov/v1/fhir/Patient/')
                       .subscribe(patientReturnedData => {
                        // store Patient data  
                           localStorage.setItem('patientJSONData', JSON.stringify(patientReturnedData));      
                           router.navigate(['/home']);       
                       })                        
                 })         
                  },
            err => {
                  
            })
   
    }
  
 
  
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}