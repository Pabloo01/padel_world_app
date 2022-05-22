import {Component, OnInit} from '@angular/core';
import {
  AlertController,
  ModalController,
  NavController,
  NavParams,
  ToastController,
  PopoverController
} from '@ionic/angular';
import {ProductsApiService} from '../../../Services/Api/products-api.service';
import {CartApiService} from '../../../Services/Api/cart-api.service';
import {UserSessionService} from '../../../Services/Models/user-session.service';
import {ReviewsApiService} from '../../../Services/Api/reviews-api.service';
import {PopoverComponent} from '../../../Components/popover/popover.component';

@Component({
  selector: 'app-consult-products',
  templateUrl: './consult-products.page.html',
  styleUrls: ['./consult-products.page.scss'],
})
export class ConsultProductsPage implements OnInit {

  lengthReview: any;
  idReview: any;
  addReviewCheck = false;
  idProduct: any;
  product: any;
  reviews: any;
  user: any;
  form: any;
  formReview: any;
  productCart: boolean;

  constructor(protected  navPar: NavParams, protected productsApi: ProductsApiService,
              protected  modalCtrl: ModalController, protected cartApi: CartApiService,
              public userSession: UserSessionService, protected toastCtrl: ToastController,
              protected navCtrl: NavController, protected reviewsApi: ReviewsApiService,
              protected alertCtrl: AlertController, protected popoverCtrl: PopoverController) {
    this.user = this.userSession.get();
  }

  ngOnInit() {
    this.idProduct = this.navPar.get('id');
    this.listData();
    this.checkItemInCart();
    this.getReviews();

    this.form = {
      id: null,
      product_id: this.idProduct,
      user_id: this.user.id,
      cuantity: 1
    };

    this.formReview = {
      id: null,
      product_id: this.idProduct,
      user_id: this.user.id,
      score: null,
      comments: null
    };
  }

  ionViewDidEnter() {
    this.consultProduct();
  }

  async listData() {
    this.product = await this.productsApi.model.list(this.idProduct);
  }

  async consultProduct() {
    this.productsApi.consultProductsApi(this.idProduct).then((results: any) => {
      this.product = results.data;
    });
  }

  getReviews() {
    const endpoint = 'product/reviews/' + this.idProduct;
    this.reviewsApi.getReviewsApi(endpoint).then((results: any) => {
      this.reviews = results.data;
      this.lengthReview = this.reviews.length;
      this.reviews.sort((a, b) => (a.post_date < b.post_date) ? 1 : -1);
    });
  }

  setReview(form) {
    for (let i = 0; i < this.reviews.length; i++) {
      if (this.user.id === this.reviews[i].user.id) {
        this.idReview = this.reviews[i].id;
        this.addReviewCheck = true;
      }
    }

    if (!this.addReviewCheck) {
      this.reviewsApi.addReviewsApi(form).then((results: any) => {

        if (results.data) {
          this.showToast(results.message);
          this.getReviews();
          this.formReview = {
            score: null,
            comments: null
          };
        } else {
          this.showAlert(results.message);
        }
      });
    } else {
      this.alertRepeatReview(form, this.idReview);
    }
  }

  addCart() {
    this.cartApi.addProdCart(this.form).then((results: any) => {
      this.showToast(results.message);
      this.closeModal();
    });
  }

  checkItemInCart() {
    this.cartApi.checkItemInCartApi(this.user.id, this.idProduct).then((results: any) => {
      this.productCart = results.data;
    });
  }

  async openPopover(event, item) {
    const popover = await this.popoverCtrl.create({
      event,
      component: PopoverComponent,
      componentProps: {
        data: item
      }
    });

    popover.onDidDismiss().then(() => {
      let data = window.localStorage.getItem('formReview');

      if (data !== 'null') {
        this.formReview = JSON.parse(data);
      }
      this.getReviews();
    });
    await popover.present();
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

  async alertRepeatReview(form, idReview) {
    const alert = await this.alertCtrl.create({
      header: 'Ya has hecho una valoración',
      message: 'Quieres editar tu valoración?',
      buttons: [{text: 'Volver'}, {
        text: 'Editar', handler: () => {
          this.reviewsApi.editReviewsApi(form, idReview).then((result: any) => {

            if (result.data) {
              this.showToast(result.message);
              this.getReviews();
              this.formReview = {
                score: null,
                comments: null
              };
            } else {
              this.showAlert(result.message);
            }
          });
        }
      }],
    });

    await alert.present();
  }

  goToCart() {
    this.closeModal();
    this.navCtrl.navigateRoot(['app/tabs/cart']);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
