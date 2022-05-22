import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavController, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../../Services/Api/api.service';
import {AuthService} from '../../../Services/Api/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: any;
  user: Array<any>;

  constructor(protected navCtrl: NavController, protected toastCtrl: ToastController, protected http: HttpClient,
              protected alertCtrl: AlertController, protected authApi: AuthService,
              protected  modalCtrl: ModalController,) {
  }

  ngOnInit() {
    this.form = {
      id: null,
      name: null,
      email: null,
      phone: null,
      address: null,
      password: null,
      password_confirmation: null
    };

    if (this.authApi.userIsLogIn()) {
      this.goToApp();
    }
  }

  showToast(messages) {
    this.toastCtrl.create({
      message: messages,
      duration: 2000,
    }).then((toastData) => {
      toastData.present();
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

  signUp(user) {
    this.authApi.register(user).then((response: ApiResponse) => {
      this.user = response.data;
      const message = response.message;

      if (this.user) {
        this.modalCtrl.dismiss();
        this.showToast(message);
        this.goToApp();
      } else {
        this.showAlert(message);
      }
    });
  }

  goToApp() {
    this.navCtrl.navigateRoot(['app/tabs/products'], {animated: true});
  }

  return() {
    this.modalCtrl.dismiss();
  }
}
