import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export abstract class ModelService {
  abstract tableName: string;
  private stg: Storage | null = null;
  public data: any;

  constructor(public storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    this.stg = await this.storage.create();
  }

  public async list(ID = null): Promise<any> {
    let val = await this.storage.get(this.tableName);
    const aux = JSON.parse(val);
    if (ID) {
      return aux.find((item) => {
        return item.id == ID;
      });
    } else {
      return aux;
    }
  }

  public save(data): Promise<any> {
    this.data = data;
    return this.storage
      .set(this.tableName, JSON.stringify(data))
      .then((val) => {
        return this.data;
      });
  }


  async add(data): Promise<any> {
    let datas = await this.list();

    if (datas) {
      datas.push(data);
      return this.save(datas);
    } else {
      return this.data;
    }
  }

  public delete() {
    this.data = null;
    this.storage.remove(this.tableName);
  }
}
