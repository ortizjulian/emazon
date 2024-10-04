import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token: string = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdWxpYW4uYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFkbWluaXN0cmFkb3IiLCJpZCI6MzIsImlhdCI6MTcyODA3MDI5OCwiZXhwIjo4NjQwMTcyODA3MDI5OH0.5kKkZgWpS_6NWR9a6fm99e49Hzy-UPBnQxFbjQN-ZgY";

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