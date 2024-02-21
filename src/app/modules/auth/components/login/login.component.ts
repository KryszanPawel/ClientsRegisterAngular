import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserLoginData } from 'src/app/modules/core/models/user.model';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  userData: UserLoginData = {
    username: '',
    userPassword: '',
  };

  errorMessage = '';

  constructor(private authService: AuthService) {}
  onLogin(form: NgForm) {
    this.authService.login(this.userData).subscribe({
      next: (value) => {
        console.log(value);
        if (value.length === 0) {
          this.errorMessage = 'Podano nieprawidłowe dane logowania';
        }
      },
      error: (err) => (this.errorMessage = 'Wystąpił błąd'),
    });
  }
}
