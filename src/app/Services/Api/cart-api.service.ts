import {Injectable} from '@angular/core';
import {BaseApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {UserSessionService} from '../Models/user-session.service';
import {CartModelService} from '../Models/cart-model.service';

@Injectable({
  providedIn: 'root'
})
export class CartApiService extends BaseApiService {

  constructor(public userSession: UserSessionService, public http: HttpClient, public model: CartModelService) {
    super(http, userSession);
  }

  public addProdCart(formProd, save: boolean = true): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postHttpCall('cart/item', formProd).subscribe((response: any) => {

        if (save) {
          this.data = this.model.save(response.data);
        }

        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public getProdCartApi(id: number, params = null): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.httpBaseCall('cart/items/' + id, params, 'get').subscribe((response: any) => {
        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public getProdPurchApi(id: number, params = null): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.httpBaseCall('orders/' + id, params, 'get').subscribe((response: any) => {
        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public checkItemInCartApi(idUser: number, idProd: number, params = null): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.httpBaseCall('cart/' + idUser + '/' + idProd, params, 'get').subscribe((response: any) => {
        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public deleteItemApi(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.deleteHttpCall('cart/item/' + id).subscribe((response: any) => {
        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public addCuantityApi(idItem, cantidad): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postHttpCall('cart/item/' + idItem, cantidad).subscribe((response: any) => {
        this.data = this.model.save(response.data);
        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public cuantityApi(prodCart): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postHttpCall('cart/items', prodCart).subscribe((response: any) => {
        this.data = this.model.save(response.data);
        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public buyItemsCartApi(items): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postHttpCall('cart/buy/', items).subscribe((response: any) => {
        this.data = this.model.save(response.data);
        resolve(response);
      }, (err: any) => reject(err));
    });
  }
}
