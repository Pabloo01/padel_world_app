import {Component, OnInit} from '@angular/core';
import {NavController, ModalController, IonItemSliding, AlertController} from '@ionic/angular';
import {ToastController} from '@ionic/angular';
import {AddProductsPage} from '../add-products/add-products.page';
import {HttpClient} from '@angular/common/http';
import {ProductsApiService} from '../../../Services/Api/products-api.service';
import {AuthService} from '../../../Services/Api/auth.service';
import {UserSessionService} from '../../../Services/Models/user-session.service';
import {FamiliesApiService} from '../../../Services/Api/families-api.service';
import {ConsultProductsPage} from '../consult-products/consult-products.page';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.page.html',
  styleUrls: ['./products-list.page.scss'],
})

export class ProductsListPage implements OnInit {

  pageSave: boolean;
  page: number;
  productsNotFilter: any;
  lengthProd: any;
  searchProduct: string = '';
  products: Array<any>;
  allProducts: Array<any>;
  families: Array<any>;
  familySelected: any;
  familySave: any;
  orderTo: any;
  user: any;

  constructor(protected navCtrl: NavController, protected  modalCtrl: ModalController,
              protected alertCtrl: AlertController, protected http: HttpClient, protected toastCtrl: ToastController,
              protected productsApi: ProductsApiService, protected authApi: AuthService,
              public userSession: UserSessionService, protected familiesApi: FamiliesApiService,
              private route: ActivatedRoute, private router: Router) {
    this.user = this.userSession.get();
  }

  ngOnInit() {
    this.orderTo = -1;

    this.familySelected = this.families;

    this.listData();
  }

  ionViewDidEnter() {
    this.getProducts();
    this.getFamilies();
  }

  ionViewWillEnter() {
    this.familySelected = this.families;

    this.route.queryParams.subscribe(params => {
      this.familySelected = parseInt(params['familyId'], 10);

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          'familyId': null
        }
      });
    }).unsubscribe();

    if (!this.familySelected) {
      this.familySelected = this.familySave;
    } else {
      this.searchProduct = '';
    }
  }

  ionViewDidLeave() {
    this.familySave = this.familySelected;
  }

  async listData() {
    this.products = await this.productsApi.model.list();
    this.allProducts = await this.productsApi.model.list();
  }

  async setFilterProducts() {
    if (this.productsNotFilter) {
      this.products = this.productsNotFilter;
    } else {
      this.products = this.allProducts;
    }

    if (this.searchProduct !== '') {
      this.products = this.products.filter(product => {
        return product.name.toLowerCase().indexOf(this.searchProduct.toLowerCase()) > -1;
      });

      if (!this.pageSave) {
        this.page = 1;
      }
    }

    if (this.orderTo) {
      this.orderProd(this.orderTo);
    }

    this.lengthProd = this.products.length;
  }

  async openModal(item = null) {
    const modal = await this.modalCtrl.create({
      component: AddProductsPage,
      componentProps: {
        data: item
      }
    });
    modal.onDidDismiss().then(() => {
      this.pageSave = true;
      this.getProducts();
    });
    return await modal.present();
  }

  async openModalProd(idProd) {
    const modal = await this.modalCtrl.create({
      swipeToClose: true,
      component: ConsultProductsPage,
      componentProps: {
        id: idProd
      }
    });
    modal.onDidDismiss().then(() => {
    });
    return await modal.present();
  }

  async confirmDeleteProduct(id) {
    const alert = await this.alertCtrl.create({
      header: 'Este producto será eliminado',
      message: 'Quieres eliminarlo?',
      buttons: [{text: 'Cancelar'}, {
        text: 'Confirmar', handler: () => {
          this.deleteProductSer(id);
        }
      }],
    });

    await alert.present();
  }

  orderProd(item) {
    if (!this.pageSave) {
      this.page = 1;
    } else {
      this.pageSave = false;
    }

    switch (item) {
      case -1:
        this.products.sort((a, b) => (a.id > b.id) ? 1 : -1);
        break;
      case 0:
        this.products.sort((a, b) => (a.name > b.name) ? 1 : -1);
        break;
      case 1:
        this.products.sort((a, b) => (a.price > b.price) ? 1 : -1);
        break;
      case 2:
        this.products.sort((a, b) => (a.stock > b.stock) ? 1 : -1);
        break;
    }
  }

  getProducts() {
    this.productsApi.getProductsApi().then((results: any) => {
      this.allProducts = results.data;
      this.products = this.allProducts;
      this.lengthProd = this.products.length;

      if (this.familySelected) {
        this.filterProduct(this.familySelected);
      }

      if (this.orderTo) {
        this.orderProd(this.orderTo);
      }
    });
  }

  getFamilies() {
    this.familiesApi.getFamiliesApi().then((results: any) => {
      this.families = results.data;
    });
  }

  async filterProduct(famId) {
    if (!famId || famId === -1) {
      this.products = this.allProducts;
    } else {
      this.familySelected = famId;
      this.products = this.allProducts.filter(product => {
        return product.family === famId;
      });
    }

    this.productsNotFilter = this.products;

    if (this.searchProduct !== '') {
      await this.setFilterProducts();
    }

    if (!this.pageSave) {
      this.page = 1;
    }

    this.lengthProd = this.products.length;
  }

  deleteProductSer(id) {
    this.productsApi.deleteProductApi(id).then((results: any) => {
      const message = results.message;
      this.showToast(message);
      this.pageSave = true;
      this.getProducts();
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
}
