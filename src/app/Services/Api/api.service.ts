import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {UserSessionService} from '../Models/user-session.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiService {
  public data: any;
  protected user: any;
  protected baseUrl: string = 'https://api.training.yurest.com/api/';
  protected apiBaseUrl: string = 'https://api.training.yurest.com/api/';

  protected constructor(public http: HttpClient, public userSession: UserSessionService) {
    this.user = this.userSession.get();
  }

  public httpCall(endpoint: string, params: any = null, type: string = 'post', oldApi: boolean = false): Observable<any> {

    this.setApiBaseUrl(oldApi);

    if (type === 'post') {
      return this.postHttpCall(endpoint, params);
    }

    return this.getHttpCall(endpoint, params);
  }

  public httpBaseCall(endpoint, params = null, type = 'post'): Observable<ApiResponse> {
    this.apiBaseUrl = this.baseUrl;

    if (type === 'post') {
      return this.postHttpCall(endpoint, params);
    }

    return this.getHttpCall(endpoint, params);
  }


  public postHttpCall(endpoint, params): Observable<any> {
    return this.http.post(this.apiBaseUrl + endpoint, params);
  }


  public getHttpCall(endpoint, param = null): Observable<any> {
    return this.http.get(this.apiBaseUrl + endpoint, {params: param});
  }

  public putHttpCall(endpoint, params): Observable<any> {
    return this.http.put(this.apiBaseUrl + endpoint, params);
  }

  public deleteHttpCall(endpoint, params = null): Observable<any> {
    return this.http.delete(this.apiBaseUrl + endpoint, {body: params});
  }

  private setApiBaseUrl(oldApi) {
    this.user = this.userSession.get();

    if (this.user && 'id' in this.user) {
      if (oldApi) {
        this.apiBaseUrl = this.user.api;
      } else {
        this.apiBaseUrl = this.user.new_api;
      }
    } else {
      this.apiBaseUrl = this.baseUrl;
    }
  }
}

export interface ApiResponse {
  status: number;
  tipe?: string;
  message: string;
  duracion: number;
  data: any;
}
