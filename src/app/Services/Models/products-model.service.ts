import {Injectable} from '@angular/core';
import {ModelService} from './model.service';

@Injectable({
  providedIn: 'root'
})

export class ProductsModelService extends ModelService {
  tableName = 'training_products';
}
