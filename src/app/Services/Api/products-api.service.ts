import {Injectable} from '@angular/core';
import {BaseApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {UserSessionService} from '../Models/user-session.service';
import {ProductsModelService} from '../Models/products-model.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService extends BaseApiService {

  constructor(public http: HttpClient, public userSession: UserSessionService, public model: ProductsModelService) {
    super(http, userSession);
  }

  public getProductsApi(params: any = null, save: boolean = true): Promise<any> {

    return new Promise((resolve, reject) => {

      return this.httpBaseCall('products', params, 'get').subscribe((response: any) => {

        if (save) {
          this.data = this.model.save(response.data);
        }

        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public getProductsFamApi(id, params = null): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.httpBaseCall('family/' + id + '/products', params, 'get').subscribe((response: any) => {
        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public deleteProductApi(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.deleteHttpCall('product/' + id).subscribe((response: any) => {
        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public consultProductsApi(id: number, params = null): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.httpBaseCall('product/' + id, params, 'get').subscribe((response: any) => {
        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public setProductsApi(product, endpoint): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postHttpCall(endpoint, product).subscribe((response: any) => {
        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public orderProdApi(id, params = null): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.httpBaseCall('family/' + id + '/products', params, 'get').subscribe((response: any) => {
        resolve(response);
      }, (err: any) => reject(err));
    });
  }
}
