import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Users } from '../org.acme.dloans';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class UsersService {

	
		private NAMESPACE: string = 'Users';
	



    constructor(private dataService: DataService<Users>) {
    };

    public getAll(): Observable<Users[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Users> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Users> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Users> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Users> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
