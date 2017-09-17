import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { PoolMoney } from '../org.acme.dloans';
import { Http, Response } from '@angular/http';


import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class PoolMoneyService {
    private NAMESPACE: string = 'PoolMoney';
    constructor(private dataService: DataService<PoolMoney>) {
    };

    public poolMoney(itemToAdd: any): Observable<PoolMoney> {
        return this.dataService.poolMoney(this.NAMESPACE,itemToAdd);
    }

   
   

}
