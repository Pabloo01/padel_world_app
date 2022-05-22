import {Component, OnInit} from '@angular/core';
import {AlertController, IonItemSliding, ModalController, NavController, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {AddFamiliesPage} from '../add-families/add-families.page';
import {FamiliesApiService} from '../../../Services/Api/families-api.service';
import {UserSessionService} from '../../../Services/Models/user-session.service';
import {AuthService} from '../../../Services/Api/auth.service';

@Component({
  selector: 'app-families-list',
  templateUrl: './families-list.page.html',
  styleUrls: ['./families-list.page.scss'],
})
export class FamiliesListPage implements OnInit {

  page: number;
  lengthFam: any;
  families: Array<any>;
  user: any;

  constructor(protected navCtrl: NavController, protected http: HttpClient, protected  modalCtrl: ModalController,
              protected alertCtrl: AlertController, protected toastCtrl: ToastController,
              protected familiesApi: FamiliesApiService, public userSession: UserSessionService,
              protected authApi: AuthService) {
    this.user = this.userSession.get();
  }

  async ngOnInit() {

    this.getFamilies();
  }

  async openModal(item = null, ionItemSliding?: IonItemSliding) {
    if (ionItemSliding) {
      ionItemSliding.close();
    }

    const modal = await this.modalCtrl.create({
      component: AddFamiliesPage,
      componentProps: {
        data: item
      }
    });
    modal.onDidDismiss().then(() => {
      this.getFamilies();
    });
    return await modal.present();
  }

  async confirmDeleteFamily(id, ionItemSliding?: IonItemSliding) {
    if (ionItemSliding) {
      ionItemSliding.close();
    }

    const alert = await this.alertCtrl.create({
      header: 'Esta familia será eliminada',
      message: 'Quieres eliminarlo?',
      buttons: [{text: 'Cancelar'}, {
        text: 'Confirmar', handler: () => {
          this.deleteFamily(id);
        }
      }],
    });

    await alert.present();
  }

  getFamilies() {
    this.familiesApi.getFamiliesApi().then((results: any) => {
      this.families = results.data;
      this.lengthFam = this.families.length;
    });
  }

  async deleteFamily(id) {
    this.familiesApi.deleteFamilyApi(id).then((results: any) => {
      const message = results.message;
      this.showToast(message);
      this.getFamilies();
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

  back() {
    this.modalCtrl.dismiss();
  }
}
