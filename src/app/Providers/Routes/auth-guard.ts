import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {NavController} from '@ionic/angular';
import {AuthService} from '../../Services/Api/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private navCtl: NavController, private auth: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.userIsLogIn()) {
      return true;
    } else {
      this.navCtl.navigateRoot([''], {animated: false, animationDirection: 'forward'});
      return false;
    }
  }
}
