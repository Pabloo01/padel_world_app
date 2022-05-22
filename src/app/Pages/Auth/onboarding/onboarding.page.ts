import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthService} from '../../../Services/Api/auth.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {


  constructor(protected navCtrl: NavController, protected authApi: AuthService) {
  }

  ngOnInit() {
    this.goToLogin();

    if (this.authApi.userIsLogIn()) {
      this.goToApp();
    }
  }

  goToLogin() {
    setTimeout(() => {
      this.navCtrl.navigateRoot(['login'], {animated: true});
    }, 2000);
  }

  goToApp() {
    this.navCtrl.navigateRoot(['app/tabs/products']);
  }
}
