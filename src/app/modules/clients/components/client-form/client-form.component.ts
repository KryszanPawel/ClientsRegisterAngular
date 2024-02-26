import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostClientForm } from 'src/app/modules/core/models/client.model';
import { ClientsService } from 'src/app/modules/core/services/clients.service';
import { FormsService } from 'src/app/modules/core/services/forms.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup<PostClientForm>;
  errorMessage = '';

  constructor(
    private formsService: FormsService,
    private clientsService: ClientsService,
    private router: Router,
  ) {}

  get controls() {
    return this.clientForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.clientForm = new FormGroup({
      firstname: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      surename: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      address: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      postcode: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  onAddClient() {
    this.clientsService.postClient(this.clientForm.getRawValue()).subscribe({
      next: (client) => {
        this.router.navigate(['/klienci']);
        this.errorMessage = '';
      },
      error: () => (this.errorMessage = 'Wystąpił błąd'),
    });
  }

  getErrorMessage(control: FormControl<string>) {
    return this.formsService.getErrorMessage(control);
  }
}
