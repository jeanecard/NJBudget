import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { InitialisationService } from '../service/initialisation.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: InitialisationService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        let token = this.authService.getUserName();
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Background-Id': token
        });
        request = request.clone({ headers: headers });

        return next.handle(request);
    }
}
