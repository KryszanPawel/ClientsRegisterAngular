import { PrefixNot } from '@angular/compiler';
import { Component, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-phone-control',
  templateUrl: './phone-control.component.html',
  styleUrls: ['./phone-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PhoneControlComponent,
      multi: true,
    },
  ],
})
export class PhoneControlComponent implements ControlValueAccessor, OnDestroy {
  numberPrefixControl = new FormControl('');
  numberControl = new FormControl('');
  sub = new Subscription();

  onChange = (value: string | null) => {};
  onTouch = () => {};

  constructor() {
    this.sub.add(
      combineLatest([
        this.numberPrefixControl.valueChanges,
        this.numberControl.valueChanges,
      ]).subscribe(([prefix, number]) => {
        if (prefix && number) {
          this.onChange(`+${prefix}${number}`);
        } else {
          this.onChange(null);
        }
      }),
    );
  }

  writeValue(value: string): void {
    value = value.replace('+', '');
    const prefix = value.slice(0, 2);
    const number = value.slice(2);
    this.numberControl.setValue(number);
    this.numberPrefixControl.setValue(prefix);
  }
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.numberPrefixControl.disable();
      this.numberControl.disable();
    } else {
      this.numberPrefixControl.enable();
      this.numberControl.enable();
    }
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }
}
