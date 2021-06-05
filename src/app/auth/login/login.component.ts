import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm): void {
    const login = form.value.login
    const pass = form.value.password
  }
}
