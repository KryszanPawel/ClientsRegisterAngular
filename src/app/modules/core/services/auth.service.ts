import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetUserResponse, User, UserLoginData } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  user = new BehaviorSubject<User | null>(null);
  constructor(
    private client: HttpClient,
    private router: Router,
  ) {}

  login(userData: UserLoginData): Observable<User[]> {
    return this.client
      .get<GetUserResponse[]>(`${this.apiUrl}/users`)
      .pipe(
        map((userArr) =>
          userArr.filter(
            (user) =>
              user.username == userData.username &&
              user.password == userData.userPassword,
          ),
        ),
      )
      .pipe(
        map((userArr) =>
          userArr.map((user) => new User(user.email, user.username)),
        ),
      );
  }

  private handleAuthentication(userArr: User[]) {
    if (userArr.length === 0) return;
    const user: User = userArr[0];
    this.user.next(user);
  }
}
