import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Loans } from '../org.acme.dloans';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class LoansService {

	
		private NAMESPACE: string = 'Loans';
	



    constructor(private dataService: DataService<Loans>) {
    };

    public getAll(): Observable<Loans[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Loans> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Loans> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Loans> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Loans> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

    public payPremium(itemToUpdate: any): Observable<Loans> {
      console.log('Pay: '+itemToUpdate);
      return this.dataService.payPremium('PayPremuim', itemToUpdate);
    }

}
