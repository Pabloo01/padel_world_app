import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {ProductsApiService} from '../../../Services/Api/products-api.service';
import {FamiliesApiService} from '../../../Services/Api/families-api.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
})
export class AddProductsPage implements OnInit {

  file: any;
  form: any;
  product: any;
  families: Array<any>;

  constructor(protected  modalCtrl: ModalController, protected  navPar: NavParams, protected http: HttpClient,
              protected toastCtrl: ToastController, protected productsApi: ProductsApiService,
              protected familiesApi: FamiliesApiService, protected alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.product = this.navPar.get('data');
    this.getFamilies();

    this.form = {
      id: null,
      family_id: null,
      name: null,
      description: null,
      price: null,
      stock: null,
      image: null
    };

    if (this.product) {
      this.form.id = this.product.id;
      this.form.name = this.product.name;
      this.form.price = this.product.price;
      this.form.description = this.product.description;
      this.form.stock = this.product.stock;
      this.form.image = this.product.image;
    }
  }

  getFamilies() {
    this.familiesApi.getFamiliesApi().then((results: any) => {
      this.families = results.data;

      if (this.product) {
        this.form.family_id = this.product.family;
      }
    });
  }

  setProduct(product, id) {
    let endpoint = 'product';
    if (id) {
      endpoint = 'product/' + id;
    }

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('stock', product.stock);
    formData.append('family_id', product.family_id);
    formData.append('image', this.file);

    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });

    this.productsApi.setProductsApi(object, endpoint).then((results: any) => {
      const message = results.message;

      if (results.data) {
        this.showToast(message);
        this.closeModal();
      } else {
        this.showAlert(message);
      }
    });
  }

  onFileSelected(e) {
    const reader = new FileReader();

    reader.onloadend = () => {
      this.file = reader.result;
    };

    reader.readAsDataURL(e.target.files[0]);
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
