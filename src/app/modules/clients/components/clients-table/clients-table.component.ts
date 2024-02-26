import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ClientsService } from '../../../core/services/clients.service';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  startWith,
  switchMap,
} from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../../../core/models/client.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent implements AfterViewInit, OnDestroy {
  sub = new Subscription();
  displayedColumns: string[] = [
    'lp',
    'firstname',
    'surename',
    'email',
    'buttons',
  ];
  dataSource!: MatTableDataSource<Client>;
  totalCount!: number;
  filterValue = new FormControl('', { nonNullable: true });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientsService: ClientsService) {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub.add(
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            const pageIndex = this.paginator.pageIndex + 1;
            const itemsPerPage = this.paginator.pageSize;
            const sortDiretcion = this.sort.direction;
            const columnName = this.sort.active;
            return this.clientsService.getClients(
              pageIndex,
              itemsPerPage,
              sortDiretcion,
              columnName,
            );
          }),
          map((data) => {
            this.totalCount = data.totalCount;
            return data.clients;
          }),
        )
        .subscribe((clients) => {
          this.dataSource = new MatTableDataSource<Client>(clients);
        }),
    );

    this.sub.add(
      this.filterValue.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe({
          next: (value) => {
            const val = value?.trim();
            this.applyFilter(val);
          },
        }),
    );
  }

  applyFilter(value: string) {
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    const pageIndex = this.paginator.pageIndex + 1;
    const itemsPerPage = this.paginator.pageSize;
    const sortDiretcion = this.sort.direction;
    const columnName = this.sort.active;
    return this.clientsService
      .getClients(pageIndex, itemsPerPage, sortDiretcion, columnName, value)
      .subscribe({
        next: (data) => {
          this.totalCount = data.totalCount;
          this.dataSource = new MatTableDataSource(data.clients);
        },
      });
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }
}
