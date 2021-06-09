import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Credentials } from './credentials.interface';
import { SessionService } from './session.service';

const URL: string = 'http://localhost:3000/api/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private sessionService: SessionService,
        private router: Router
    ) { }

    createUser(username: string, password: string): Promise<string> {
        const userData: Credentials = { username, password };
        return this.http.post<{ message: string }>(`${URL}/signup`, userData)
            .pipe(map(resp => resp?.message))
            .toPromise()
            .catch(() => Promise.resolve(''))
    }

    login(username: string, password: string): Promise<boolean> {
        const userData: Credentials = { username, password };
        return this.http.post<{ message: string, token: string, expiresIn: number }>(`${URL}/login`, userData)
            .pipe(map(resp => {
                if (resp?.token) {
                    this.sessionService.saveToken(resp.token);
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
    }

    private setIdleTimeout(time: number): void {
        setTimeout(this.logout.bind(this), time * 1000);
    }
}
