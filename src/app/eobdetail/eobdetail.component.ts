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
      
        localStorage.setItem('claimId', urlClaimId);
      
        this.userService.getEOBDetail().pipe().subscribe(eobDetailArray => { 
            this.eobDetailArray = eobDetailArray;
          
        });
       

   
      
        
        
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