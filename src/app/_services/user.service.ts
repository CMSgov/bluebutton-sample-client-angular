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
        console.log("deh-in retrieveFHIRData");
  
        var headers = new HttpHeaders()
       .set('Content-Type', 'application/json');
  
        const eobparams = new HttpParams({fromString: 'patient=20140000010000'});
  
       return this.http.get<any>('https://sandbox.bluebutton.cms.gov/v1/fhir/ExplanationOfBenefit/'
      //  return this.http.get<any>('https://sandbox.bluebutton.cms.gov/v1/fhir/Patient/'
           )
         .subscribe(data => {
      //        let jsonObject = response.data;
            console.log("deh result from Blue Button API Call is " + JSON.stringify(data)); 
     //        console.log ("deh-jsonObject " + jsonObject);
//              let jsonParsedObject = JSON.parse(JSON.stringify(data)) ;
//             console.log ("deh-jsonParsedObject " + jsonParsedObject);
//               let eobBeneData = new User();
//               eobBeneData.id = jsonParsedObject.id; 
//           
//           let entry = data["entry"];
//
//           let firstEntry = entry[1];
//                   
//          // pass in your object structure as array elements
//           let pathArr = ['resource', 'billablePeriod', 'start'];
//          const billablePeriodStart =  pathArr.reduce((obj, key) =>
//        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, firstEntry);
//           console.log("deh-start billable period " + billablePeriodStart);
//           
//            let pathArr2 = ['resource', 'item', 0, 'service', 'coding', 0, 'code'];
//          const hcpcsCode =  pathArr2.reduce((obj, key) =>
//        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, firstEntry);
//           console.log("deh-hcpcs code " + hcpcsCode);
           
   //        let users = { id: 1, username: 'test', password: 'test', firstName: 'Dave', lastName: 'Holdgrafer' };
    //       this.router.navigate(['/home']);   
// to access nested array, just pass in array index as an element the path array.
//const city = getNestedObject(user, ['personalInfo', 'addresses', 0, 'city']);
// this will return the city from the first address item.


    //       console.log("deh-resource " + firstEntry["resource"].array.find(currentItem => {
             
   //        }););
            
           
          
           })
    
//            .subscribe(
//          data => {
//       
//               console.log("deh result from Blue Button API Call is " + JSON.stringify(data)); 
//                return throwError({ error: { message: 'good blue button call' } });  
//              },
//          err => {
//               console.log("deh error back from Blue Button API Call.")
//             return throwError({ error: { message: 'bad blue button call' } }); 
//             })      
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

