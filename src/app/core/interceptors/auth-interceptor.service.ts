import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token: string = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdWxpYW4uYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFkbWluaXN0cmFkb3IiLCJpZCI6MzIsImlhdCI6MTcyODM0ODUzNywiZXhwIjo4NjQwMTcyODM0ODUzN30.plOK9O3EAf9bq3H1uAlp_b13Upq3FxW9VeepcI7-NGo";

        let request = req;

        if (token) {
            request = req.clone({
                setHeaders: {
                    authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }

}