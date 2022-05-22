import {Component, OnInit} from '@angular/core';
import {UserSessionService} from '../../../Services/Models/user-session.service';
import {
  AlertController,
  IonItemSliding,
  ModalController,
  NavController,
  NavParams,
  ToastController
} from '@ionic/angular';
import {PayApiService} from '../../../Services/Api/pay-api.service';
import {CartApiService} from '../../../Services/Api/cart-api.service';
import {SetPaymentsPage} from '../set-payments/set-payments.page';

@Component({
  selector: 'app-pay',
  templateUrl: './list-pay.page.html',
  styleUrls: ['./list-pay.page.scss'],
})
export class ListPayPage implements OnInit {

  lengthPay: any;
  user: any;
  payForm: any;
  paymentUser: any;

  constructor(public userSession: UserSessionService, protected  modalCtrl: ModalController, protected toastCtrl: ToastController,
              protected payApi: PayApiService, protected  navPar: NavParams, protected cartApi: CartApiService,
              protected navCtrl: NavController, protected alertCtrl: AlertController) {
    this.user = this.userSession.get();
  }

  ngOnInit() {
    this.getPay();
  }

  getPay() {
    this.payApi.getPayApi(this.user.id).then((results: any) => {
      this.paymentUser = results.data;
      this.lengthPay = this.paymentUser.length;
    });
  }

  async openModalPay(item = null, ionItemSliding?: IonItemSliding) {
    if (ionItemSliding) {
      ionItemSliding.close();
    }

    const modal = await this.modalCtrl.create({
      component: SetPaymentsPage,
      componentProps: {
        data: item
      }
    });
    modal.onDidDismiss().then(() => {
      this.getPay();
    });
    return await modal.present();
  }

  async confirmDeletePay(id, ionItemSliding?: IonItemSliding) {
    if (ionItemSliding) {
      ionItemSliding.close();
    }

    const alert = await this.alertCtrl.create({
      header: 'Este método será eliminado',
      message: 'Quieres eliminarlo?',
      buttons: [{text: 'Cancelar'}, {
        text: 'Confirmar', handler: () => {
          this.deletePay(id);
        }
      }],
    });

    await alert.present();
  }

  deletePay(id) {
    this.payApi.deletePayApi(id).then((results: any) => {
      this.getPay();
      this.showToast(results.message);
    });
  }

  back() {
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
}
