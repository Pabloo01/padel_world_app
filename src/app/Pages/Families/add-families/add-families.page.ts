import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {FamiliesApiService} from '../../../Services/Api/families-api.service';

@Component({
  selector: 'app-add-families',
  templateUrl: './add-families.page.html',
  styleUrls: ['./add-families.page.scss'],
})
export class AddFamiliesPage implements OnInit {

  form: any;
  family: any;

  constructor(protected  modalCtrl: ModalController, protected  navPar: NavParams, protected http: HttpClient,
              protected toastCtrl: ToastController, protected familiesApi: FamiliesApiService,
              protected alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.family = this.navPar.get('data');

    this.form = {
      id: null,
      name: null,
      description: null
    };

    if (this.family) {
      this.form.id = this.family.id;
      this.form.name = this.family.name;
      this.form.description = this.family.description;
    }
  }

  setFamily(family, id) {
    let endpoint = 'family';

    if (id) {
      endpoint = 'family/' + id;
    }

    this.familiesApi.setFamiliesApi(family, endpoint).then((results: any) => {
      const message = results.message;
      this.showToast(message);

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
