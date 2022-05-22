import {Component, OnInit} from '@angular/core';
import {NavController, PopoverController} from '@ionic/angular';
import {UserSessionService} from '../../Services/Models/user-session.service';
import {AuthService} from '../../Services/Api/auth.service';
import {PopoverUserComponent} from '../popover-user/popover-user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  user: any;

  constructor(
    protected navCtrl: NavController,
    public userSession: UserSessionService,
    protected authApi: AuthService,
    protected popoverCtrl: PopoverController) {
    this.user = this.userSession.get();
  }

  ngOnInit() {
  }

  cart() {
    this.navCtrl.navigateRoot(['app/tabs/cart'], {animated: true});
  }

  home() {
    this.navCtrl.navigateRoot(['app/tabs/products'], {animated: true});
  }

  async openPopover(event) {
    const popover = await this.popoverCtrl.create({
      event,
      component: PopoverUserComponent
    });

    await popover.present();
  }

}
