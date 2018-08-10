import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        console.log ("deh- in jwtinterceptor");
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
       console.log ("deh- in jwtinterceptor- current user token is " + (localStorage.getItem('currentUser')));
        if (currentUser && currentUser.token) {
           console.log("deh- in jwtinterceptor with a token " + currentUser.token)
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}