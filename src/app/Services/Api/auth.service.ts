import {Injectable} from '@angular/core';
import {ApiResponse, BaseApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {UserSessionService} from '../Models/user-session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {

  constructor(public http: HttpClient, public userSession: UserSessionService) {
    super(http, userSession);
  }

  public login(form: LoginRequest): Promise<any> {

    return new Promise((resolve, reject) => {

      return this.httpBaseCall('login', form).subscribe((response: any) => {

        this.user = this.userSession.set(response.data);
        resolve(response);

      }, (err: any) => {

        reject(err);

      });
    });
  }

  public register(form: RegisterRequest): Promise<any> {

    return new Promise((resolve, reject) => {

      return this.httpBaseCall('register', form).subscribe((response: any) => {

        this.user = this.userSession.set(response.data);
        resolve(response);

      }, (err: any) => {

        reject(err);

      });
    });
  }

  logout(user): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      return this.httpBaseCall('logout', {user}).subscribe(
        (response: ApiResponse) => {
          this.deleteUserSession();
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public updateUserSession(data) {
    this.user = this.userSession.set(data);
    return this.user;
  }

  public deleteUserSession() {
    this.user = this.userSession.delete();
  }

  public userIsLogIn(): boolean {
    this.user = this.userSession.get();
    return this.user && 'id' in this.user && 'token' in this.user;
  }
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password?: string;
  password_confirmation: string;
  phone: number;
  address: string;
}

// export interface PasswordChangeRequest {
//   pass: string;
//   new_pass: string;
//   new_pass2: string;
// }

