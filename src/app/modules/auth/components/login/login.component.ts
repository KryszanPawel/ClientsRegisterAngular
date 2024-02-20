import { Component } from '@angular/core';
import { UserLoginData } from 'src/app/modules/core/models/user.model';

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
  onLogin(form: any) {
    console.log(form);
    console.log(this.userData);
  }
}
