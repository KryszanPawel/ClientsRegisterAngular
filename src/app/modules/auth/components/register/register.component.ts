import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostUser } from 'src/app/modules/core/models/user.model';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  hide = true;
  errorMessage = '';

  registerForm = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.email,
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ],
      nonNullable: true,
    }),
    username: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    // hobbies: new FormArray([
    //   new FormControl(''),
    //   new FormControl(''),
    //   new FormControl(''),
    // ]),
  });

  sub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  get controls() {
    return this.registerForm.controls;
  }

  // get hobbies() {
  //   return this.registerForm.get('hobbies') as FormArray;
  // }

  onRegister() {
    const userData: PostUser = this.registerForm.getRawValue();
    this.authService.register(userData).subscribe({
      next: (value) => this.router.navigate(['/logowanie']),
      error: (error) => (this.errorMessage = 'Wystąpił bład'),
    });

    // console.log(this.registerForm.getRawValue());
  }

  ngOnInit(): void {
    // this.sub = this.registerForm.controls.email.valueChanges.subscribe({
    //   next: (text) => console.log(text),
    // });
    console.log('');
    // this.registerForm.controls.email.disable();
    // this.controls.username.addValidators(Validators.minLength(5));
    // this.registerForm.patchValue({
    //   email: 'test@ad',
    // });
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
    // console.log(this.sub);
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'Wartość nie może byc pusta';
    }
    if (control.hasError('minlength')) {
      return 'Wartość jest zbyt krótka';
    }
    if (control.hasError('maxlength')) {
      return 'Wartość jest zbyt długa';
    }

    return control.hasError('email')
      ? 'Nieprawidłowy adres email: example@example.com'
      : '';
  }
}
