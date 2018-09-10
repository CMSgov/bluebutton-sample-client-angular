import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../_models';
import { EOB} from '../_models';
import { EOBDetail} from '../_models';
import { ListFormat } from "typescript";
import { UserService } from '../_services';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    users: User[] = [];
    eobs: EOB[] = [];
     adjudication =  [];
   itemAdjudication = [[]];
    beneId: string;
    claimId: string;
    claimIndex: number;
  
  
    constructor(
      userService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let testUser = { id: 1, username: 'test', password: 'test', firstName: 'Dave', lastName: 'Holdgrafer' };
       
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
                if (request.body.username === testUser.username && request.body.password === testUser.password) {
                    // if login details are valid return 200 OK with a fake jwt token
                    return of(new HttpResponse({ status: 200, body: { token: 'fake-jwt-token' } }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // get users
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
                 
                let eobsFormattedData = this.formatEOBData();
             
                 return of(new HttpResponse({ status: 200, body: [eobsFormattedData] }));
                
            }

             // get EOB Detail
            if (request.url.endsWith('/api/eobdetail') && request.method === 'GET') {
                 
                let eobDetailData = this.formatEOBDetail();
                 return of(new HttpResponse({ status: 200, body: [eobDetailData] }));
                
            }
            // pass through any requests not handled above
        
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
  
  formatEOBData() {
         let jsonData = JSON.parse(localStorage.getItem('eobJSONData'));
         
         let jsonParsedObject = JSON.parse(JSON.stringify(jsonData)) ;
      
         let eobNew = new EOB();
    
         for (var i=0; i<1; i++){
              let entry = jsonData["entry"];        
              let eobEntry = entry[i];
           
              this.beneId = this.getNestedObject(eobEntry, ['resource', 'patient', 'reference']) ;
              var index = this.beneId.indexOf( "/" ); 
              eobNew.beneId = this.beneId.substr(index + 1,15);
           
           // these are hardcoded for now just for display purposes
              eobNew.firstName = 'John';
              eobNew.lastName = 'Doe';
              eobNew.birthDate = '2014-06-01';
          
          
              //billable period - start
              eobNew.billablePeriodStart1 = this.getNestedObject(eobEntry, ['resource', 'billablePeriod', 'start']) ;
            
             //billable period - end
          
              eobNew.billablePeriodEnd1 = this.getNestedObject(eobEntry, ['resource', 'billablePeriod', 'end']) ;
            
              // claim id and type (i.e. carrier)          
             
              this.claimId = this.getNestedObject(eobEntry, ['resource', 'id']) ;
              var index = this.claimId.indexOf( "-" ); 
              eobNew.claimId1 = this.claimId.substr(index + 1,10);
              eobNew.claimType1 = this.claimId.substr(0,index);
         
           // claim_type_cd and claim_type_cd display          
             
             eobNew.claimTypeCd1 = this.getNestedObject(eobEntry, ['resource', 'type', 'coding', 0, 'code']) ;
             eobNew.claimTypeCdDisplay1 = this.getNestedObject(eobEntry, ['resource', 'type', 'coding', 0, 'display']) ;
             
 
          }
 
          for (var i=1; i<2; i++){
              let entry = jsonData["entry"];        
              let eobEntry = entry[i];
          
              //billable period - start         
              eobNew.billablePeriodStart2 = this.getNestedObject(eobEntry, ['resource', 'billablePeriod', 'start']) ;
             
             //billable period - end           
              eobNew.billablePeriodEnd2 = this.getNestedObject(eobEntry, ['resource', 'billablePeriod', 'end']) ;
           
              // claim id and type (i.e. carrier)                      
              this.claimId = this.getNestedObject(eobEntry, ['resource', 'id']) ;
              var index = this.claimId.indexOf( "-" ); 
              eobNew.claimId2 = this.claimId.substr(index + 1,10);
              eobNew.claimType2 = this.claimId.substr(0,index);
                      
           // claim_type_cd and claim_type_cd display                    
             eobNew.claimTypeCd2 = this.getNestedObject(eobEntry, ['resource', 'type', 'coding', 0, 'code']) ;          
             eobNew.claimTypeCdDisplay2 = this.getNestedObject(eobEntry, ['resource', 'type', 'coding', 0, 'display']) ;      
           
          }
    
     for (var i=2; i<3; i++){
              let entry = jsonData["entry"];        
              let eobEntry = entry[i];
          
              //billable period - start
              eobNew.billablePeriodStart3 = this.getNestedObject(eobEntry, ['resource', 'billablePeriod', 'start']) ;
             
             //billable period - end
              eobNew.billablePeriodEnd3 = this.getNestedObject(eobEntry, ['resource', 'billablePeriod', 'end']) ;
           
              // claim id and type (i.e. carrier)          
              this.claimId = this.getNestedObject(eobEntry, ['resource', 'id']) ;
              var index = this.claimId.indexOf( "-" ); 
              eobNew.claimId3 = this.claimId.substr(index + 1,10);
              eobNew.claimType3 = this.claimId.substr(0,index);
                      
           // claim_type_cd and claim_type_cd display          
             eobNew.claimTypeCd3 = this.getNestedObject(eobEntry, ['resource', 'type', 'coding', 0, 'code']) ;
             eobNew.claimTypeCdDisplay3 = this.getNestedObject(eobEntry, ['resource', 'type', 'coding', 0, 'display']) ;      
           
          }
         
           return eobNew;
  }
  
  formatEOBDetail ()  {
       let jsonData = JSON.parse(localStorage.getItem('eobJSONData'));
        

         let jsonParsedObject = JSON.parse(JSON.stringify(jsonData)) ;
        
         let eobDetail = new EOBDetail();   
                       
           for (var i=0; i<99; i++){
              let entry = jsonData["entry"];        
              let eobEntry = entry[i];
           
              this.beneId = this.getNestedObject(eobEntry, ['resource', 'patient', 'reference']) ;
              var index = this.beneId.indexOf( "/" ); 
              eobDetail.beneId = this.beneId.substr(index + 1,15);
             
              this.claimId = this.getNestedObject(eobEntry, ['resource', 'id']) ;
              var index = this.claimId.indexOf( "-" ); 
              eobDetail.claimId = this.claimId.substr(index + 1,10);
           
             
             
              if (localStorage.getItem('claimId') == this.claimId.substr(index + 1,10)){
                  
                   this.claimIndex = i;
            
                  
                   i = 100 
                 // return eobDetail;
              } else {
                continue;
              }  
         }
            
            
         let entry = jsonData["entry"];              
         let eobClaimEntry = entry[this.claimIndex];   
    
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
       //   payment amount   
       eobDetail.paymentAmount = this.getNestedObject(eobClaimEntry, ['resource', 'payment', 'amount', 'value']) ;
     //   provider   
       eobDetail.provider = this.getNestedObject(eobClaimEntry, ['resource', 'careTeam', 0, 'provider', 'identifier', 'value']) ;
    // diagnosis Primary
     eobDetail.diagnosisPrimary = this.getNestedObject(eobClaimEntry, ['resource', 'diagnosis', 0, 'diagnosisCodeableConcept' ,'coding', 0, 'code']) ;    
    
       eobDetail.firstName = 'John'
       eobDetail.lastName = 'Doe'
     
       let adjudication = this.getNestedObject(eobClaimEntry, ['resource', 'item', 0, 'adjudication']) ;
     
      eobDetail.itemHcpcsCode1 = this.getNestedObject(eobClaimEntry, ['resource', 'item', 0, 'service', 'coding', 0, 'code']) ;
       eobDetail.adjudicationDisplay1 = this.getNestedObject(eobClaimEntry, ['resource', 'item', 0, 'adjudication', 3, 'category', 'coding', 0, 'display']) ;
        eobDetail.adjudicationAmount1 = this.getNestedObject(eobClaimEntry, ['resource', 'item', 0, 'adjudication', 3, 'amount', 'value']) ;
    eobDetail.adjudicationDisplay1B = this.getNestedObject(eobClaimEntry, ['resource', 'item', 0, 'adjudication', 1, 'category', 'coding', 0, 'display']) ;
        eobDetail.adjudicationAmount1B = this.getNestedObject(eobClaimEntry, ['resource', 'item', 0, 'adjudication', 1, 'amount', 'value']) ;
            eobDetail.itemMtusCode1 = this.getNestedObject(eobClaimEntry, ['resource', 'item', 0, 'extension', 0, 'valueCoding',  'code']) ;
    eobDetail.itemBetosCodeDisplay1 = this.getNestedObject(eobClaimEntry, ['resource', 'item', 0, 'extension', 2, 'valueCoding',  'display']) ;
         eobDetail.itemBetosCode1 = this.getNestedObject(eobClaimEntry, ['resource', 'item', 0, 'extension', 2, 'valueCoding',  'code']) ;
 
    eobDetail.adjudicationDisplay2 = this.getNestedObject(eobClaimEntry, ['resource', 'item', 1, 'adjudication', 3, 'category', 'coding', 0, 'display']) ;
        eobDetail.adjudicationAmount2 = this.getNestedObject(eobClaimEntry, ['resource', 'item', 1, 'adjudication', 3, 'amount', 'value']) ;
    eobDetail.adjudicationDisplay2B = this.getNestedObject(eobClaimEntry, ['resource', 'item', 1, 'adjudication', 1, 'category', 'coding', 0, 'display']) ;
        eobDetail.adjudicationAmount2B = this.getNestedObject(eobClaimEntry, ['resource', 'item', 1, 'adjudication', 1, 'amount', 'value']) ;
            eobDetail.itemMtusCode2 = this.getNestedObject(eobClaimEntry, ['resource', 'item', 1, 'extension', 0, 'valueCoding',  'code']) ;
    eobDetail.itemBetosCodeDisplay2 = this.getNestedObject(eobClaimEntry, ['resource', 'item', 1, 'extension', 2, 'valueCoding',  'display']) ;
         eobDetail.itemBetosCode2 = this.getNestedObject(eobClaimEntry, ['resource', 'item', 1, 'extension', 2, 'valueCoding',  'code']) ;
      
       return eobDetail;
           
  }
  
getNestedObject (nestedObj, pathArr)  {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
  }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};