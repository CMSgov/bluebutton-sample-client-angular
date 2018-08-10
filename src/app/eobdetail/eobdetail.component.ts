import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { EOB } from '../_models';
import { EOBDetail } from '../_models';
import { UserService } from '../_services';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {Params} from '@angular/router';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({templateUrl: 'eobdetail.component.html'})
export class EOBDetailComponent implements OnInit {
 
  users: User[] = [];
     eobsArray =  [];
     eobDetailArray =  [];
     eobForm: FormGroup;
     loading = false;
     submitted = false;
     returnUrl: string;
     claimId: string;
     code: string;
     error = '';
     urlClaimId: string;
     claimIndex: number;
     names = [];
    
    
    

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router) {}
     

    ngOnInit() {
      
        let url = this.route.snapshot.url;
        let urlClaimId = url[1].path.slice(0,10);
        console.log("deh in eobdetail - queryparams is " + urlClaimId);
        localStorage.setItem('claimId', urlClaimId);
      
        this.userService.getEOBDetail().pipe().subscribe(eobDetailArray => { 
            this.eobDetailArray = eobDetailArray;
            this.names = ['Ben', 'Nate', 'Austin', 'Yiannis', 'Matt M', 'Matt B']; 
        });
       
//        let jsonData = JSON.parse(localStorage.getItem('dehJSONData'));
//        console.log ('jsonData in eobdetail ' + jsonData); 
//
//         let jsonParsedObject = JSON.parse(JSON.stringify(jsonData)) ;
//          console.log ("deh-jsonParsedObject " + jsonParsedObject);
//         let eobDetail = new EOBDetail();
//    
//         for (var i=0; i<99; i++){
//              let entry = jsonData["entry"];        
//              let eobEntry = entry[i];
//           
//   
//             
//              this.claimId = this.getNestedObject(eobEntry, ['resource', 'id']) ;
//              var index = this.claimId.indexOf( "-" ); 
//              eobDetail.claimId = this.claimId.substr(index + 1,10);
//            console.log("deh in eobdetail-claim id  " + i + " " + eobDetail.claimId);
//              if (urlClaimId == this.claimId.substr(index + 1,10)){
//                   console.log("deh in eobdetail-FOUND claim id  -claim id  " + i + " " + eobDetail.claimId);
//                   this.claimIndex = i;
//             
//                   i = 100 
//             
//              } else {
//                continue;
//              }
             
           
//              pathArr2.length = 0;
//              pathArr2 = ['resource', 'item', 0, 'service', 'coding', 0, 'code'];
//              const hcpcsCode =  pathArr2.reduce((obj, key) =>
//                     (obj && obj[key] !== 'undefined') ? obj[key] : undefined, eobEntry);
//              console.log("deh-hcpcs code in fake back end " + hcpcsCode);
 //         }
       
//        this.userService.retrieveFHIRData();
//       console.log ("after retrieveFHIRData call ");

       
//      
      
    //  return eobDetail;
    
    //   this.router.navigate(['/eobdetail/:clientId']);  
  //     return of(new HttpResponse({ status: 200, body: [eobDetail] }));
     //  return eobDetail;
      
  //   let testUser = { id: 1, username: 'test', password: 'test', firstName: 'Dave', lastName: 'Holdgrafer' };  
   //    return of(new HttpResponse({ status: 200, body: [testUser] }));
     
   
      
        
        
    }
  formatEOBDetail (eobDetail: EOBDetail, eobClaimEntry: any)  {
       // status     
        eobDetail.claimStatus = this.getNestedObject(eobClaimEntry, ['resource', 'status']) ;
      //billable period - start         
        eobDetail.billablePeriodStart = this.getNestedObject(eobClaimEntry, ['resource', 'billablePeriod', 'start']) ;
       
       //billable period - end           
        eobDetail.billablePeriodEnd = this.getNestedObject(eobClaimEntry, ['resource', 'billablePeriod', 'end']) ;
     
        // claim id and type (i.e. carrier)                      
        this.claimId = this.getNestedObject(eobClaimEntry, ['resource', 'id']) ;
        var index = this.claimId.indexOf( "-" ); 
        eobDetail.claimId = this.claimId.substr(index + 1,10);
        eobDetail.claimType = this.claimId.substr(0,index);
                
     // claim_type_cd and claim_type_cd display                    
       eobDetail.claimTypeCd = this.getNestedObject(eobClaimEntry, ['resource', 'type', 'coding', 0, 'code']) ;          
       eobDetail.claimTypeCdDisplay = this.getNestedObject(eobClaimEntry, ['resource', 'type', 'coding', 0, 'display']) ;
    
       return eobDetail;
           
  }
  
  getNestedObject (nestedObj, pathArr)  {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
  }
  
  
}