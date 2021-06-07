import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    isLoading: boolean;

    constructor(private authService: AuthService, private router: Router) { }

    onLogin(form: NgForm): void {
        this.authService.login(form.value.login, form.value.password)
            .then(isLogin => {
                if (isLogin) {
                    this.router.navigate(['/posts']);
                }
            });
    }
}
