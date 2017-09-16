import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { LegalAdvisor } from '../org.acme.dloans';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class LegalAdvisorService {

	
		private NAMESPACE: string = 'LegalAdvisor';
	



    constructor(private dataService: DataService<LegalAdvisor>) {
    };

    public getAll(): Observable<LegalAdvisor[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<LegalAdvisor> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<LegalAdvisor> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<LegalAdvisor> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<LegalAdvisor> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
