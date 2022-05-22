import {Component, OnInit} from '@angular/core';
import {UserSessionService} from '../../Services/Models/user-session.service';
import {AuthService} from '../../Services/Api/auth.service';
import {ModalController, NavController, MenuController} from '@ionic/angular';
import {UpdateUserPage} from '../../Pages/User/update-user/update-user.page';
import {ListPayPage} from '../../Pages/Payments/list-payments/list-pay.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  user: any;

  constructor(public userSession: UserSessionService, protected authApi: AuthService, protected navCtrl: NavController,
              protected  modalCtrl: ModalController, protected menu: MenuController) {
    this.user = this.userSession.get();
  }

  ngOnInit() {
  }

  async openUser() {
    this.menu.close('menu-content');

    const modal = await this.modalCtrl.create({
      component: UpdateUserPage
    });
    modal.onDidDismiss().then(() => {
      this.user = this.userSession.get();
    });
    return await modal.present();
  }

  async goToPay() {
    this.menu.close('menu-content');

    const modal = await this.modalCtrl.create({
      component: ListPayPage
    });
    modal.onDidDismiss().then(() => {
    });
    return await modal.present();
  }

  outToApp() {
    this.menu.close('menu-content');

    this.authApi.logout(this.user).then(() => {
      this.navCtrl.navigateRoot(['login'], {animationDirection: 'back'});
    });
  }

}
