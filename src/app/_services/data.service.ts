import { Injectable } from '@angular/core';
import { EOB } from '../_models';
import { User} from '../_models';

@Injectable()
export class myService {
  public sharedData:EOB;

  constructor(){
//    this.sharedData = "String from myService";
  }

  setData (data) {
    this.sharedData = data;
  }
  getData () {
    return this.sharedData;
  }
}