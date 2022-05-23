import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthService} from '../../../Services/Api/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    autoplay: true
  };

  constructor(protected navCtrl: NavController, protected authApi: AuthService) {
  }

  ngOnInit() {
    if (this.authApi.userIsLogIn()) {
      this.goToApp();
    }
  }

  goToApp() {
    this.navCtrl.navigateRoot(['app/tabs/products']);
  }

  goToLogin() {
    this.navCtrl.navigateRoot(['login'], {animated: true});
  }
}
