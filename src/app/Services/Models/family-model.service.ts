import {Injectable} from '@angular/core';
import {ModelService} from './model.service';

@Injectable({
  providedIn: 'root'
})
export class FamilyModelService extends ModelService {
  tableName = 'training_families';
}
