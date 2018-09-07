import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import {User} from "../_models";


// @Injectable({ providedIn: 'root' })
// export class RemoteAppInfo {
//    constructor() {}
//        appinfo: [];
//
//         store(key, value)
//         {
//             this.appinfo[key] = value;
//             // return;
//         }
//     ,
//         get(key)
//         {
//             return this.appinfo[key];
//         }
//     ,
//         set()
//         {
//             this.appinfo['remoteApiEndPoint'] = "https://sandbox.bluebutton.cms.gov/v1";
//             this.appinfo['client_id'] = "wv6iY7Ni2J1aoeUID87xYIGxKFU7oaDjdxxwneZl";
//             this.appinfo['client_secret'] = "zVB7RMviCCDyy4kFbeCyw9afdGDi39kxNXUbiS4srtYGgiVkyYJmCbOYo6mMuuaFlzumzxZtLk0zvhp905id1f1OBBnkMIWoQlIpE07OY3hG4q6LeKCq8DNrl6A8nD0X";
//             return;
//         }
// };

@Injectable()

export class RemoteAppInfoService {

    private remoteAppInfo = new BehaviorSubject<any>({
            'systemOwner': 'CMS Blue Button 2.0 API',
            'remoteApiEndPoint': "https://sandbox.bluebutton.cms.gov/v1",
            'client_id': "wv6iY7Ni2J1aoeUID87xYIGxKFU7oaDjdxxwneZl",
            'client_secret': "zVB7RMviCCDyy4kFbeCyw9afdGDi39kxNXUbiS4srtYGgiVkyYJmCbOYo6mMuuaFlzumzxZtLk0zvhp905id1f1OBBnkMIWoQlIpE07OY3hG4q6LeKCq8DNrl6A8nD0X",
            'redirect_uri': "http://localhost:8082/login"

    });
    remoteApp = this.remoteAppInfo.asObservable();

    constructor() { }

    changeEndPoint(remoteApp) {
        this.remoteAppInfo.next(remoteApp)
    }

}


