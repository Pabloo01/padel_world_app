import {Component, OnInit} from '@angular/core';
import {AlertController, IonItemSliding, ModalController, NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../../Services/Api/api.service';
import {AuthService} from '../../../Services/Api/auth.service';
import {RegisterPage} from '../register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: any;

  constructor(protected navCtrl: NavController,
              protected http: HttpClient,
              protected alertCtrl: AlertController,
              protected  modalCtrl: ModalController,
              protected authApi: AuthService) {
  }

  ngOnInit() {
    this.form = {
      email: null,
      password: null
    };

    if (this.authApi.userIsLogIn()) {
      this.goToApp();
    }
  }

  login(user) {
    this.authApi.login(user).then((response: ApiResponse) => {
      if (response.data) {
        this.goToApp();
      } else {
        this.showAlert(response.message);
      }
    });
  }

  async showAlert(messages) {
    const alert = await this.alertCtrl.create({
      header: 'Datos incorrectos',
      message: messages,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async goToSignUp() {
    const modal = await this.modalCtrl.create({
      component: RegisterPage
    });
    modal.onDidDismiss().then(() => {
    });
    return await modal.present();
  }

  goToApp() {
    this.navCtrl.navigateRoot(['app/tabs/products'], {animated: true});
  }
}
