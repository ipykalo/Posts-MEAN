import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private sessionService: SessionService) { }

	intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
		const authReq: HttpRequest<object> = request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.sessionService.getToken()}`
			}
		});
		return next.handle(authReq);
	}
}
