import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Credentials } from './credentials.interface';

const URL: string = 'http://localhost:3000/api/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    createUser(username: string, password: string): Promise<string> {
        const userData: Credentials = { username, password };
        return this.http.post<{ message: string }>(`${URL}/signup`, userData)
            .pipe(map(resp => resp?.message))
            .toPromise()
            .catch(error => Promise.resolve(error?.message))
    }
}
