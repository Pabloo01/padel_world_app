import {Component, OnInit} from '@angular/core';
import {AlertController, NavParams, PopoverController} from '@ionic/angular';
import {ReviewsApiService} from '../../Services/Api/reviews-api.service';
import {UserSessionService} from '../../Services/Models/user-session.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  user: any;
  review: any;
  form: any;

  constructor(protected  navPar: NavParams, protected alertCtrl: AlertController,
              protected reviewsApi: ReviewsApiService, protected popoverCtrl: PopoverController,
              public userSession: UserSessionService) {
    this.user = this.userSession.get();
  }

  ngOnInit() {
    this.review = this.navPar.get('data');
  }

  updateReview() {
    this.form = {
      id: this.review.id,
      product_id: this.review.product.id,
      user_id: this.user.id,
      score: this.review.score,
      comments: this.review.comments
    };

    window.localStorage.setItem('formReview', JSON.stringify(this.form));
    this.popoverCtrl.dismiss();
  }

  deleteReview() {
    this.reviewsApi.deleteReviewApi(this.review.id).then(() => {
      window.localStorage.setItem('formReview', null);
      this.popoverCtrl.dismiss();
    });
  }

  async alertConfirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Esta valoración será eliminada',
      message: 'Quieres eliminarla?',
      buttons: [{text: 'Cancelar'}, {
        text: 'Eliminar', handler: () => {
          this.deleteReview();
        }
      }],
    });

    await alert.present();
  }

}
