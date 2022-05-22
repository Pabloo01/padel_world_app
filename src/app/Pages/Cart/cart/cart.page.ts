import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../Services/Api/auth.service';
import {ModalController, NavController, ToastController} from '@ionic/angular';
import {UserSessionService} from '../../../Services/Models/user-session.service';
import {CartApiService} from '../../../Services/Api/cart-api.service';
import {OrderPage} from '../order/order.page';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cargando = true;
  lengthCart: any;
  user: any;
  productsCart: Array<any>;
  form: any;
  precioTot: number;

  constructor(protected authApi: AuthService, protected navCtrl: NavController, public userSession: UserSessionService,
              protected cartApi: CartApiService, protected toastCtrl: ToastController, protected  modalCtrl: ModalController) {
    this.user = this.userSession.get();
  }

  ngOnInit() {
    this.getProdCart();
    this.form = {
      cuantity: null
    };
  }

  ionViewDidEnter() {
    this.getProdCart();
  }

  ionViewWillEnter() {
    this.cargando = true;
  }

  ionViewDidLeave() {
    this.setCuantityLeave();
  }

  async getProdCart() {
    await this.cartApi.getProdCartApi(this.user.id).then((results: any) => {
      this.productsCart = results.data;
      this.lengthCart = this.productsCart.length;
      this.calcPrice();
      this.cargando = false;
    });
  }

  deleteItem(idItem) {
    this.cartApi.deleteItemApi(idItem).then((results: any) => {
      this.getProdCart();
      this.showToast(results.message);
    });
  }

  async addCuantity(idItem, cantidad, stock, nombre) {
    if (cantidad < stock) {
      cantidad++;

      for (let i = 0; i < this.productsCart.length; i++) {
        let id = this.productsCart[i].id;

        if (id === idItem) {
          this.productsCart[i].cuantity = cantidad;
          this.calcPrice();
        }
      }
    } else {
      this.showToast('No hay más ' + nombre + ' disponibles');
    }
  }

  subCuantity(idItem, cantidad) {
    if (cantidad > 1) {
      cantidad--;

      for (let i = 0; i < this.productsCart.length; i++) {
        let id = this.productsCart[i].id;

        if (id === idItem) {
          this.productsCart[i].cuantity = cantidad;
          this.calcPrice();
        }
      }
    }
  }

  calcPrice() {
    this.precioTot = 0;

    for (let i = 0; i < this.productsCart.length; i++) {
      this.precioTot += this.productsCart[i].cuantity * this.productsCart[i].product.price;
    }
  }

  setCuantity() {
    this.cartApi.cuantityApi(this.productsCart).then(() => {
      this.openToOrder();
    });
  }

  setCuantityLeave() {
    this.cartApi.cuantityApi(this.productsCart).then(() => {
    });
  }

  async openToOrder() {
    const modal = await this.modalCtrl.create({
      swipeToClose: true,
      component: OrderPage,
      componentProps: {
        data: this.productsCart
      }
    });
    modal.onDidDismiss().then(() => {
      this.getProdCart();
    });
    return await modal.present();
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
