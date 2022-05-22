import { Injectable } from '@angular/core';
import {ModelService} from './model.service';

@Injectable({
  providedIn: 'root'
})
export class UserModelService extends ModelService {
  tableName = 'training_users';
}
