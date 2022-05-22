import {Injectable} from '@angular/core';
import {BaseApiService} from './api.service';
import {PayModelService} from '../Models/pay-model.service';
import {UserSessionService} from '../Models/user-session.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PayApiService extends BaseApiService {

  constructor(public userSession: UserSessionService, public http: HttpClient, public model: PayModelService) {
    super(http, userSession);
  }

  public setPayApi(formPago, endpoint): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postHttpCall(endpoint, formPago).subscribe((response: any) => {
        this.data = this.model.save(response.data);
        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public getPayApi(id: number, params = null): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.httpBaseCall('payment/' + id, params, 'get').subscribe((response: any) => {
        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public deletePayApi(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.deleteHttpCall('payment/' + id).subscribe((response: any) => {
        resolve(response);
      }, (err: any) => reject(err));
    });
  }
}
