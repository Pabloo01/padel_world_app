import {Injectable} from '@angular/core';
import {BaseApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {UserSessionService} from '../Models/user-session.service';
import {ReviewsModelService} from '../Models/reviews-model.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsApiService extends BaseApiService {

  constructor(public http: HttpClient, public userSession: UserSessionService, public model: ReviewsModelService) {
    super(http, userSession);
  }

  public getReviewsApi(endpoint, params: any = null, save: boolean = true): Promise<any> {

    return new Promise((resolve, reject) => {

      return this.httpBaseCall(endpoint, params, 'get').subscribe((response: any) => {

        if (save) {
          this.data = this.model.save(response.data);
        }

        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public addReviewsApi(form): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postHttpCall('review', form).subscribe((response: any) => {
        this.data = this.model.save(response.data);
        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public editReviewsApi(form, idReview): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postHttpCall('review/' + idReview, form).subscribe((response: any) => {
        this.data = this.model.save(response.data);
        resolve(response);
      }, (err: any) => reject(err));
    });
  }

  public deleteReviewApi(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.deleteHttpCall('review/' + id).subscribe((response: any) => {
        this.data = this.model.delete();
        resolve(response);
      }, (err: any) => reject(err));
    });
  }
}
