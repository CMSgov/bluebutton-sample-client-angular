import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpHeaders} from "@angular/common/http";
import {HttpParams} from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { User } from '../_models';
import { EOB } from '../_models';
import { EOBDetail } from '../_models';
import { RemoteAppInfoService } from './remoteappinfo.service';

@Injectable({ providedIn: 'root' })
export class UserService {
     users: User[] = [];
     claimId: string;
     apiInfo = {};
    constructor(private http: HttpClient,
                private _remoteAppInfoService: RemoteAppInfoService) { }

  
   retrieveFHIRData() {
       this._remoteAppInfoService.remoteApp.subscribe(res => this.apiInfo = res);

       // var apiEndPoint = "https://sandbox.bluebutton.cms.gov/v1" ;
       // var client_id = "wv6iY7Ni2J1aoeUID87xYIGxKFU7oaDjdxxwneZl";

       var headers = new HttpHeaders()
       .set('Content-Type', 'application/json');
  
       const eobparams = new HttpParams({fromString: 'patient=20140000010000'});
  
       return this.http.get<any>(this.apiInfo['remoteApiEndPoint'] + '/fhir/ExplanationOfBenefit/'
      //  return this.http.get<any>('https://sandbox.bluebutton.cms.gov/v1/fhir/Patient/'
           )
         .subscribe(data => {                
           })
   
    }
  
  
   getNestedObject (nestedObj, pathArr)  {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}
  
    getAll() { 
        return this.http.get<EOB[]>('/api/users');
    }
  
     getEOBDetail() { 
        return this.http.get<EOBDetail[]>('/api/eobdetail');
    }  
  
  setClaimId(claimId){
      this.claimId = claimId;
  }
   getClaimId(){
      return this.claimId;
  }
}

