import { Injectable } from '@angular/core';
import {ModelService} from './model.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsModelService extends ModelService {
  tableName = 'training_reviews';
}
