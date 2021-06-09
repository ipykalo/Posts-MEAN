import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    isLoading: boolean;

    constructor(private authService: AuthService, private router: Router) { }

    onSignup(form: NgForm): void {
        this.isLoading = true;
        this.authService.createUser(form?.value?.login, form?.value?.password)
            .then((resp: string) => {
                if (resp) {
                    this.router.navigate(['/login']);
                }
                this.isLoading = false;
            });
    }
}
