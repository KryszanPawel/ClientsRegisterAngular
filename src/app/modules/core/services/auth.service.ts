import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  GetUserResponse,
  PostUser,
  PostUserResponse,
  User,
  UserLoginData,
} from '../models/user.model';
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
    return this.client.get<GetUserResponse[]>(`${this.apiUrl}/users`).pipe(
      map((userArr) =>
        userArr.filter(
          (user) =>
            user.username == userData.username &&
            user.password == userData.userPassword,
        ),
      ),
      map((userArr) =>
        userArr.map((user) => new User(user.email, user.username)),
      ),
      tap((useArr) => this.handleAuthentication(useArr)),
    );
  }

  isLoggedIn(): boolean {
    return !!this.user.getValue();
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/logowanie']);
    localStorage.removeItem('user');
  }

  autologin() {
    const userData: {
      email: string;
      username: string;
    } = JSON.parse(localStorage.getItem('user') as string);

    if (!userData) {
      return;
    }

    const user = new User(userData.username, userData.username);
    this.user.next(user);
  }

  private handleAuthentication(userArr: User[]) {
    if (userArr.length === 0) return;
    const user: User = userArr[0];
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));

    this.router.navigate(['/klienci']);
  }

  register(userData: PostUser): Observable<PostUserResponse> {
    return this.client.post<PostUserResponse>(`${this.apiUrl}/users`, userData);
  }
}
