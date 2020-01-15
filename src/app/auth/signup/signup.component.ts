import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
isLoading = false;
constructor(public authService: AuthService) {}

onSignUp(form: NgForm) {
  if (form.invalid) {
    return;
  }

  this.authService.createdUser(form.value.email, form.value.password);
}
}
