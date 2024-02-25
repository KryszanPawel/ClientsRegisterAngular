import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Client,
  ClientResponse,
  PostClient,
  GetClientsResponse,
} from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getClients(
    pageIndex: number,
    itemsPerPage: number,
    sortDiretcion: string,
    sortColumnName: string,
    value = '',
  ): Observable<GetClientsResponse> {
    let params = new HttpParams()
      .append('_page', pageIndex)
      .append('_limit', itemsPerPage);
    params = sortColumnName
      ? params.append('_sort', sortColumnName).append('_order', sortDiretcion)
      : params;

    params = value ? params.append('firstname_like', value) : params;
    return this.http
      .get<ClientResponse[]>(this.apiUrl + '/clients', {
        params,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (!response.body) return { clients: [], totalCount: 0 };

          const clientsArr: Client[] = response.body.map(
            (clientResponse) =>
              new Client(
                clientResponse.id,
                clientResponse.firstname,
                clientResponse.surename,
                clientResponse.email,
                clientResponse.address,
                clientResponse.postcode,
              ),
          );
          const totalCount = Number(response.headers.get('X-Total-Count'));
          return {
            clients: clientsArr,
            totalCount: totalCount,
          };
        }),
      );
  }

  postClient(clientData: PostClient): Observable<Client> {
    return this.http
      .post<ClientResponse>(this.apiUrl + '/clients', clientData)
      .pipe(
        map(
          (clientResponse) =>
            new Client(
              clientResponse.id,
              clientResponse.firstname,
              clientResponse.surename,
              clientResponse.email,
              clientResponse.address,
              clientResponse.postcode,
            ),
        ),
      );
  }
}
