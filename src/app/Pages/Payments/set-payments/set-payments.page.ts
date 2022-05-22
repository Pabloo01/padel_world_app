import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavController, NavParams, ToastController} from '@ionic/angular';
import {CartApiService} from '../../../Services/Api/cart-api.service';
import {PayApiService} from '../../../Services/Api/pay-api.service';
import {UserSessionService} from '../../../Services/Models/user-session.service';

@Component({
  selector: 'app-set-payments',
  templateUrl: './set-payments.page.html',
  styleUrls: ['./set-payments.page.scss'],
})
export class SetPaymentsPage implements OnInit {

  user: any;
  payForm: any;
  payment: any;

  constructor(public userSession: UserSessionService, protected  modalCtrl: ModalController, protected toastCtrl: ToastController,
              protected payApi: PayApiService, protected  navPar: NavParams, protected cartApi: CartApiService,
              protected navCtrl: NavController, protected alertCtrl: AlertController) {
    this.user = this.userSession.get();
  }

  ngOnInit() {
    this.payment = this.navPar.get('data');

    this.payForm = {
      id: null,
      user_id: this.user.id,
      iban: null,
      name: null,
      expiration_month: null,
      expiration_year: null,
      cvv: null,
    };

    if (this.payment) {
      this.payForm = {
        id: this.payment.id,
        user_id: this.payment.user_id,
        iban: this.payment.iban,
        name: this.payment.name,
        expiration_month: this.payment.expiration_month,
        expiration_year: this.payment.expiration_year,
        cvv: this.payment.cvv
      };
    }
  }

  setPay(payment, id) {
    this.payForm.iban = Number.parseInt(payment.iban.replaceAll('-', ''), 10);

    let endpoint = 'payment';
    if (id) {
      endpoint = 'payment/' + id;
    }

    this.payApi.setPayApi(payment, endpoint).then((results: any) => {
      const message = results.message;

      if (results.data) {
        this.showToast(message);
        this.closeModal();
      } else {
        this.showAlert(message);
      }
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
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

}
