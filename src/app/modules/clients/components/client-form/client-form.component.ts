import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import {
  Client,
  PostClientForm,
} from 'src/app/modules/core/models/client.model';
import { ClientsService } from 'src/app/modules/core/services/clients.service';
import { FormsService } from 'src/app/modules/core/services/forms.service';
import { ClientValidators } from 'src/app/modules/shared/validators/client.validators';
import { postcodeValidator } from 'src/app/modules/shared/validators/postcode.validator';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup<PostClientForm>;
  errorMessage = '';
  @Input() editMode = false;
  @Input() client!: Client;
  @Output() closeDialog = new EventEmitter<void>();
  observer: Observer<unknown> = {
    next: (client) => {
      if (this.editMode) {
        this.emitCloseDialog();
      }
      this.router.navigate(['/klienci']);
      this.errorMessage = '';
    },
    error: () => (this.errorMessage = 'Wystąpił błąd'),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    complete: () => {},
  };

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
      firstname: new FormControl(this.editMode ? this.client.firstname : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      surename: new FormControl(this.editMode ? this.client.surename : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl(this.editMode ? this.client.email : '', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      address: new FormControl(this.editMode ? this.client.address : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      postcode: new FormControl(this.editMode ? this.client.postcode : '', {
        nonNullable: true,
        validators: [Validators.required, ClientValidators.postcode],
      }),
    });
  }

  onAddClient() {
    if (this.editMode) {
      this.clientsService
        .putClient(this.clientForm.getRawValue(), this.client.id)
        .subscribe(this.observer);
      return;
    }
    this.clientsService
      .postClient(this.clientForm.getRawValue())
      .subscribe(this.observer);
  }

  getErrorMessage(control: FormControl<string>) {
    return this.formsService.getErrorMessage(control);
  }

  emitCloseDialog() {
    this.closeDialog.emit();
  }
}
