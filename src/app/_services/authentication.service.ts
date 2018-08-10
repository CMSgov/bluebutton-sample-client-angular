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
import { myService } from '../_services/data.service';



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
    console.log("deh-body is " + body);

       const authorizationcode = 'authorization_code';
    
       const tokenparams = new HttpParams() 
          .set('client_id', 'A9KpF5TNqruy9O5ecaOsBOSfOXhtENaiOdtvnSjm')
          .set('client_secret', 'cu6NeYtrQfeDNFPbiNKOGJtPwaGQo3kuPpIPtXbBwPB2uNQ0GZLz3tZgIb8jt7yvwPf4Ysqy26DIeSBita7PtGsSccaWwZYO5NB5k9DBsQQ7qsQZSfxMGePJJY3IW8yp')
           .set('code', code)
            .set('grant_type', 'authorization_code')
            .set('redirect_uri', 'http://localhost:8082/login');
    
    //    const tokenparams = new HttpParams({fromString: 'client_id=A9KpF5TNqruy9O5ecaOsBOSfOXhtENaiOdtvnSjm&redirect_uri=http://localhost:8082/login&response_type=token'});
         const codeparams = new HttpParams({fromString: 'client_id=A9KpF5TNqruy9O5ecaOsBOSfOXhtENaiOdtvnSjm&redirect_uri=http://localhost:8082/login&response_type=code&state=8e896a59f0744a8e93bf2f1f13230be5'});
    
    return this.http.post<AuthToken>('https://sandbox.bluebutton.cms.gov/v1/o/token/?' + body,
         {
           headers, HttpHeaders  
            }, 
         )
//            .pipe(map(AuthToken => {
//                // login successful if there's a jwt token in the response
//              console.log("deh-authtoken " + AuthToken)
//                if (AuthToken && AuthToken.token) {
//                   console.log("deh-authtoken WAS FOUND " + AuthToken)
//                    // store user details and jwt token in local storage to keep user logged in between page refreshes
//                  localStorage.setItem('currentUser', JSON.stringify({ username, token: AuthToken.access_token}));
//             //       localStorage.setItem('currentUser', JSON.stringify(user));
//                }
//                console.log('deh-right before AuthToken return')
//                return AuthToken;
//            }));
    
    
  //   return this.http.post<any>('https://sandbox.bluebutton.cms.gov/v1/fhir/ExplanationOfBenefit/', { eobparams })
//        this.http.post <any>('https://sandbox.bluebutton.cms.gov/v1/o/token/?' + body,
//         {
//           headers, HttpHeaders  
//            }, 
//         )
       
          .subscribe(
      data => {
        console.log("Access_Token " + data.access_token);
        console.log("Expires " + data.expires_in);
        console.log("Token_Type: " + data.token_type);
         console.log("Scope: " + data.scope);
        console.log("Refresh_Token: " + data.refresh_token);
        localStorage.setItem('currentUser', JSON.stringify({ username, token: data.access_token}));
        console.log("after get token call-token being set to localStorage is " + JSON.stringify({ username, token: data.access_token}));   
         
         //retrieveFHIRData
        console.log("deh-in retrieveFHIRData");
  
        var headers = new HttpHeaders()
       .set('Content-Type', 'application/json');
  
        const eobparams = new HttpParams({fromString: 'patient=20140000010000'});
  
        return this.http.get<any>('https://sandbox.bluebutton.cms.gov/v1/fhir/ExplanationOfBenefit/'
     //   return this.http.get<any>('https://sandbox.bluebutton.cms.gov/v1/fhir/Patient/'
           )
         .subscribe(data => {
      //        let jsonObject = response.data;
            console.log("deh result from Blue Button API Call is " + JSON.stringify(data)); 
            localStorage.setItem('dehJSONData', JSON.stringify(data));
     //        console.log ("deh-jsonObject " + jsonObject);
              let jsonParsedObject = JSON.parse(JSON.stringify(data)) ;
             console.log ("deh-jsonParsedObject " + jsonParsedObject);
           
           let entry = data["entry"];

           let firstEntry = entry[1];
                   
          // pass in your object structure as array elements
           let pathArr = ['resource', 'billablePeriod', 'start'];
          const billablePeriodStart =  pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, firstEntry);
           console.log("deh-start billable period " + billablePeriodStart);
           
            let pathArr2 = ['resource', 'item', 0, 'service', 'coding', 0, 'code'];
          const hcpcsCode =  pathArr2.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, firstEntry);
           console.log("deh-hcpcs code " + hcpcsCode);
           
            
  //             eobBeneData.total = jsonParsedObject.entry.resource;
  //            console.log("dehid is " + eobBeneData.id + " dehtotal " + eobBeneData.total);
         
        
          router.navigate(['/home']);       
           }) 
            
   
            },
      err => {
        console.log("deh token error back received Error occured.");
        
       
      })
   
    
   
          
     //       .pipe(map((res:any) => {
                // login successful if there's a jwt token in the response
       //          console.log("after get token call" + res)
       //         if (res && res.token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
        //            localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));
        //          console.log("after get token call-token is " + JSON.stringify({ username, token: res.token }))
         //       }
         //   }));
    }
  
 
  
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}