import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    isLoading: boolean;

    constructor(private authService: AuthService) { }

    onSignup(form: NgForm): void {
        this.authService.createUser(form?.value?.login, form?.value?.password)
    }
}
