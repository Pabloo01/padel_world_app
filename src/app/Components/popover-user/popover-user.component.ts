import {Component, OnInit} from '@angular/core';
import {UserSessionService} from '../../Services/Models/user-session.service';
import {AuthService} from '../../Services/Api/auth.service';
import {NavController, PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-popover-user',
  templateUrl: './popover-user.component.html',
  styleUrls: ['./popover-user.component.scss'],
})
export class PopoverUserComponent implements OnInit {

  user: any;

  constructor(
    protected popoverCtrl: PopoverController,
    public userSession: UserSessionService,
    protected authApi: AuthService,
    protected navCtrl: NavController,) {
    this.user = this.userSession.get();
  }

  ngOnInit() {
  }

  profile() {
    this.popoverCtrl.dismiss();
    this.navCtrl.navigateRoot(['app/tabs/profile'], {animated: true});
  }

  logout() {
    this.popoverCtrl.dismiss();
    this.authApi.logout(this.user).then(() => {
      this.navCtrl.navigateRoot(['login'], {animationDirection: 'back'});
    });
  }
}
