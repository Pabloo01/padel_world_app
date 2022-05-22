import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  tableName = 'training_users_session';
  data: any;

  constructor() {
    this.data = JSON.parse(localStorage.getItem(this.tableName)) || [];
  }

  get() {
    return this.data;
  }

  set(data) {
    this.data = data;
    localStorage.setItem(this.tableName, JSON.stringify(data));

    return this.data;
  }

  delete() {
    this.data = null;
    localStorage.setItem(this.tableName, JSON.stringify([]));

    return this.data;
  }
}
