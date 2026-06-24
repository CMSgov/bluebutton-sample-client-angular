import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class RemoteAppInfoService {

    private remoteAppInfo = new BehaviorSubject<any>({
            'systemOwner': 'CMS Blue Button 2.0 API',
            'remoteApiEndPoint': "https://sandbox.bluebutton.cms.gov/v1",
            'client_id': "<your_client_id>",
            'client_secret': "<your_client_secret>",
            'redirect_uri': "http://localhost:8082/login"
    });
    remoteApp = this.remoteAppInfo.asObservable();

    constructor() { }

    changeEndPoint(remoteApp) {
        this.remoteAppInfo.next(remoteApp)
    }

}


