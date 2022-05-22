import {Component, OnInit} from '@angular/core';
import {UserSessionService} from '../../../Services/Models/user-session.service';
import {UpdateUserPage} from '../update-user/update-user.page';
import {ModalController} from '@ionic/angular';
import {ListPayPage} from '../../Payments/list-payments/list-pay.page';
import {CartApiService} from '../../../Services/Api/cart-api.service';
import {FamiliesListPage} from '../../Families/families-list/families-list.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any;
  productsPurch: any;
  lengthProdPurch: any;
  page: number;

  constructor(
    public userSession: UserSessionService,
    protected  modalCtrl: ModalController,
    protected cartApi: CartApiService) {
  }

  ngOnInit() {
    this.user = this.userSession.get();
    this.getProdPurch();
  }

  ionViewDidEnter() {
    this.user = this.userSession.get();
  }

  getProdPurch() {
    this.cartApi.getProdPurchApi(this.user.id).then((results: any) => {
      let productsFilter = new Array();

      for (let i = 0; i < results.data.length; i++) {
        if (results.data[i].product) {
          productsFilter.push(results.data[i]);
        }
      }

      this.productsPurch = productsFilter;
      this.lengthProdPurch = this.productsPurch.length;
    });
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

  async goToPay() {
    const modal = await this.modalCtrl.create({
      component: ListPayPage
    });
    modal.onDidDismiss().then(() => {
    });
    return await modal.present();
  }

  async openFam() {
    const modal = await this.modalCtrl.create({
      component: FamiliesListPage
    });
    modal.onDidDismiss().then(() => {
    });
    return await modal.present();
  }
}
