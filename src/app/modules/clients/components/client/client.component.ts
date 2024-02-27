import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Client } from 'src/app/modules/core/models/client.model';
import { ClientsService } from 'src/app/modules/core/services/clients.service';
import { DeleteClientDialogComponent } from './delete-client-dialog/delete-client-dialog.component';
import { EditClientDialogComponent } from './edit-client-dialog/edit-client-dialog.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  client!: Client;

  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => this.clientsService.getClient(+params['id'])))
      .subscribe({ next: (client) => (this.client = client) });
  }

  openDialog() {
    const dialogRef = this.matDialog.open(DeleteClientDialogComponent, {
      data: {
        client: this.client,
      },
    });
  }

  openEditDialog() {
    const dialogRef = this.matDialog.open(EditClientDialogComponent, {
      data: {
        client: this.client,
      },
      width: '600px',
      maxWidth: '600px',
    });
  }
}
