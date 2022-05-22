import {Injectable} from '@angular/core';
import {ModelService} from './model.service';

@Injectable({
  providedIn: 'root'
})

export class PayModelService extends ModelService {
  tableName = 'training_pay';
}
