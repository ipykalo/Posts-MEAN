import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Helper } from 'src/app/helper';
import { URLS } from 'src/environments/environment';
import { IAuthData } from '../interfaces/auth-data.interface';
import { Credentials } from '../interfaces/credentials.interface';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private timerId: NodeJS.Timeout;

    constructor(
        private http: HttpClient,
        private sessionService: SessionService,
        private router: Router
    ) { }

    initAuth(): void {
        !this.sessionService.isActiveToken && this.logout();
    }

    createUser(username: string, password: string): Promise<string> {
        const userData: Credentials = { username, password };
        return this.http.post<{ message: string }>(Helper.url(URLS.SIGNUP), userData)
            .pipe(map(resp => resp?.message))
            .toPromise()
            .catch(() => Promise.resolve(''))
    }

    login(username: string, password: string): Promise<boolean> {
        const userData: Credentials = { username, password };
        return this.http.post<{ message: string, token: string, expiresIn: number, userId: string }>(Helper.url(URLS.LOGIN), userData)
            .pipe(map(resp => {
                if (resp?.token) {
                    const authData: IAuthData = {
                        token: resp?.token,
                        expiresIn: resp?.expiresIn,
                        userId: resp.userId,
                        timestamp: Date.now()
                    }
                    this.sessionService.saveAuthData(authData);
                    this.sessionService.notify(true);
                }
                this.setIdleTimeout(resp?.expiresIn);
                return true;
            }))
            .toPromise()
            .catch(() => Promise.resolve(false))
    }

    logout(): void {
        this.sessionService.clearToken();
        this.router.navigate(['/login']);
        clearTimeout(this.timerId);
    }

    private setIdleTimeout(time: number): void {
        this.timerId = setTimeout(this.logout.bind(this), time * 1000);
    }
}
