export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    
  
        
}

export class EOB {
    id: number;
    beneId: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    hcpcsCode: string;
  billablePeriodStart1;
   billablePeriodEnd1;
  billablePeriodStart2;
   billablePeriodEnd2;
  billablePeriodStart3;
   billablePeriodEnd3;
  claimId1: string;
  claimId2: string;
  claimId3: string;
  claimType1: string;
  claimType2: string;
  claimType3: string;
  claimTypeCd1: string;
  claimTypeCd2: string;
  claimTypeCd3: string;
  claimTypeCdDisplay1: string;
  claimTypeCdDisplay2: string;
  claimTypeCdDisplay3: string;
  
        
}

export class EOBDetail {
    id: number;
    beneId: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
   claimId: string;
   claimStatus: string;
  claimType: string; 
  claimTypeCd: string;
  claimTypeCdDisplay: string;
  
  paymentAmount: number;
  provider: string;
  diagnosisPrimary: string;
    hcpcsCode: string;
  billablePeriodStart: string;
   billablePeriodEnd: string;
  adjudicationDisplay1: string;
  adjudicationAmount1: number;
  adjudicationDisplay1B: string;
  adjudicationAmount1B: number;
  adjudicationDisplay2: string;
  adjudicationAmount2: number;
  adjudicationDisplay2B: string;
  adjudicationAmount2B: number;
  
  
  nameArray: string[]
  itemHcpcsCode1: string;
  itemHcpcsCode2: string;
  itemMtusCode1: string;
   itemMtusCode2: string;
  itemBetosCodeDisplay1: string;
   itemBetosCodeDisplay2: string;
  itemBetosCode1: string;
   itemBetosCode2: string;
 
  
        
}
