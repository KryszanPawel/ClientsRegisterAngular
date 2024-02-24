import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User | null = null;
  userSub$!: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub$ = this.authService.user.subscribe({
      next: (value) => (this.user = value),
    });
  }

  ngOnDestroy(): void {
    this.userSub$.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}
