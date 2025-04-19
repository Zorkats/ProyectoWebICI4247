import { Component, OnInit } from '@angular/core';
import {
  UserService,
  User,
  UserStats,
  SecurityInfo
} from '../../core/services/user.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User | null = null;
  stats: UserStats[] = [];
  security: SecurityInfo = {
    lastPwdChange: new Date().toISOString(),
    twoFA: false
  };

  defaultAvatar = 'assets/img/default-avatar.png';

  constructor(private userSrv: UserService, private router: Router) {}

  ngOnInit() {
    this.userSrv.loadProfile().subscribe((u) => (this.user = u));
    this.userSrv.loadStats().subscribe((s) => (this.stats = s));
    this.userSrv.loadSecurity().subscribe((sec) => (this.security = sec));
  }

  onEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  goToChangePassword() {
    this.router.navigate(['/change-password']);
  }

  toggle2FA() {
    if (this.security) {
      this.security.twoFA = !this.security.twoFA;
      this.userSrv.update2FA(this.security.twoFA).subscribe();
    }
  }
}
