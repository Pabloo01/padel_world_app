import {Injectable} from '@angular/core';
import {ModelService} from './model.service';

@Injectable({
  providedIn: 'root'
})

export class CartModelService extends ModelService {
  tableName = 'training_cart';
}
