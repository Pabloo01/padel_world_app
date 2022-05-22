import {Injectable} from '@angular/core';
import {BaseApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {UserSessionService} from '../Models/user-session.service';
import {FamilyModelService} from '../Models/family-model.service';

@Injectable({
  providedIn: 'root'
})
export class FamiliesApiService extends BaseApiService {

  constructor(public userSession: UserSessionService, public model: FamilyModelService, public http: HttpClient) {
    super(http, userSession);
  }

  public getFamiliesApi(params: any = null, save: boolean = true): Promise<any> {

    return new Promise((resolve, reject) => {

      return this.httpBaseCall('families', params, 'get').subscribe((response: any) => {

        if (save) {
          this.data = this.model.save(response.data);
        }

        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public deleteFamilyApi(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.deleteHttpCall('family/' + id).subscribe((response: any) => {
        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public setFamiliesApi(family, endpoint): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postHttpCall(endpoint, family).subscribe((response: any) => {
        resolve(response);
      }, (err: any) => reject(err));
    });
  }
}
