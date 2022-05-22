import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {UserApiService} from '../../../Services/Api/user-api.service';
import {UserSessionService} from '../../../Services/Models/user-session.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {

  form: any;
  user: any;

  constructor(protected  modalCtrl: ModalController, protected userApi: UserApiService,
              protected  navPar: NavParams, protected toastCtrl: ToastController,
              protected alertCtrl: AlertController, public userSession: UserSessionService) {
  }

  ngOnInit() {
    this.user = this.userSession.get();

    this.form = {
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      address: this.user.address,
      oldPassword: null,
      password: null,
      password_confirmation: null
    };
  }

  updateUser(formUser) {
    this.userApi.updateUser(formUser).then((results: any) => {
      const message = results.message;

      if (results.data) {
        this.showToast(message);
        this.closeModal();
      } else {
        this.showAlert(message);
      }
    });
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

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
