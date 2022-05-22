import { Injectable } from '@angular/core';
import {BaseApiService} from './api.service';
import {UserSessionService} from '../Models/user-session.service';
import {HttpClient} from '@angular/common/http';
import {UserModelService} from '../Models/user-model.service';

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends BaseApiService {

  constructor(public userSession: UserSessionService, public http: HttpClient, public model: UserModelService) {
    super(http, userSession);
  }

  public updateUser(formUser): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postHttpCall('user', formUser).subscribe((response: any) => {
        if (response.data) {
          this.user = this.userSession.set(response.data);
        }
        resolve(response);
      }, (err: any) => reject(err));
    });
  }
}
