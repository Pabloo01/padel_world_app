import {Component, OnInit} from '@angular/core';
import {
  AlertController,
  IonItemSliding,
  ModalController,
  NavController,
  NavParams,
  ToastController
} from '@ionic/angular';
import {PayApiService} from '../../../Services/Api/pay-api.service';
import {UserSessionService} from '../../../Services/Models/user-session.service';
import {CartApiService} from '../../../Services/Api/cart-api.service';
import {SetPaymentsPage} from '../../Payments/set-payments/set-payments.page';
import {UpdateUserPage} from '../../User/update-user/update-user.page';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  user: any;
  paymentUser: any;
  prodCart: any;
  paySelected: any;

  constructor(protected  modalCtrl: ModalController, protected payApi: PayApiService, protected cartApi: CartApiService,
              public userSession: UserSessionService, protected navCtrl: NavController, protected toastCtrl: ToastController
    , protected  navPar: NavParams, protected alertCtrl: AlertController) {
    this.user = this.userSession.get();
  }

  ngOnInit() {
    this.prodCart = this.navPar.get('data');

    this.getPay();
  }

  getPay() {
    this.payApi.getPayApi(this.user.id).then((results: any) => {
      this.paymentUser = results.data;
    });
  }

  buyCartItems() {
    if (this.checkPay(this.paySelected)) {
      this.cartApi.buyItemsCartApi(this.prodCart).then((results: any) => {
        this.navCtrl.navigateRoot(['/app/tabs/products']);
        this.showToast(results.message);
        this.closeModal();
      });
    } else {
      this.showAlert('Debes seleccionar un método de pago');
    }
  }

  checkPay(paySel) {
    if (paySel) {
      return true;
    } else {
      return false;
    }
  }

  async openModalPay(item = null, ionItemSliding?: IonItemSliding) {
    if (ionItemSliding) {
      ionItemSliding.close();
    }

    const modal = await this.modalCtrl.create({
      component: SetPaymentsPage
    });
    modal.onDidDismiss().then(() => {
      this.getPay();
    });
    return await modal.present();
  }

  async openUser() {
    const modal = await this.modalCtrl.create({
      component: UpdateUserPage
    });
    modal.onDidDismiss().then(() => {
      this.user = this.userSession.get();
    });
    return await modal.present();
  }

  async showAlert(messages) {
    const alert = await this.alertCtrl.create({
      header: 'Aviso',
      message: messages,
      buttons: ['OK'],
    });

    await alert.present();
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
}
