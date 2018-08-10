import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpHeaders} from "@angular/common/http";
import {HttpParams} from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { User } from '../_models';
import { EOB } from '../_models';
import { EOBDetail } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
     users: User[] = [];
     claimId: string;
    constructor(private http: HttpClient) { }

  
   retrieveFHIRData() {
  
        var headers = new HttpHeaders()
       .set('Content-Type', 'application/json');
  
        const eobparams = new HttpParams({fromString: 'patient=20140000010000'});
  
       return this.http.get<any>('https://sandbox.bluebutton.cms.gov/v1/fhir/ExplanationOfBenefit/'
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

