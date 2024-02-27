import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor() {}

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
    if (control.hasError('invalidPostcode')) {
      return 'Kod pocztowy powinien być w formacie XX-XXX';
    }
    return control.hasError('email')
      ? 'Nieprawidłowy adres email: example@example.com'
      : '';
  }
}
