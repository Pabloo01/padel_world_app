import {Injectable} from '@angular/core';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse, HttpClient
} from '@angular/common/http';
import {UserSessionService} from '../../Services/Models/user-session.service';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {NavController, ToastController} from '@ionic/angular';

@Injectable()
export class InterceptorProvider implements HttpInterceptor {

  user: any;

  constructor(private navCtl: NavController, private userService: UserSessionService, private toastCtrl: ToastController) {
    this.user = this.userService.get();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addToken(request)).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {}
      }, (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.userService.delete();
            this.navCtl.navigateRoot([''], {animated: false, animationDirection: 'forward'});
            this.showToast(error.message);
          }
        }
      }));
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    this.user = this.userService.get();

    if (this.user && 'id' in this.user && 'token' in this.user) {
      let clone: HttpRequest<any>;

      clone = request.clone({
        setParams: {
          'user-key': this.user.id
        },
        setHeaders: {
          Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.user.token + ''
        }
      });

      return clone;
    }

    return request;
  }

  private showToast(messages) {
    this.toastCtrl.create({
      message: messages,
      duration: 2000,
    }).then((toastData) => {
      toastData.present();
    });
  }
}
