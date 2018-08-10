import { Component } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
  
  
  

export class AppComponent { }


export interface AuthToken {
    access_token: string,
    token_type: string,
    expires_in: number,
    refresh_token: string,
    scope: Array<string>
}