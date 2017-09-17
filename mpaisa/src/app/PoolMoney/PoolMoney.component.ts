import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PoolMoneyService } from './PoolMoney.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Application',
	templateUrl: './PoolMoney.component.html',
	styleUrls: ['./PoolMoney.component.css'],
  providers: [PoolMoneyService]
})
export class PoolMoneyComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
  
      id = new FormControl("", Validators.required);
      amtPooled = new FormControl("", Validators.required);
      percentage= new FormControl("", Validators.required);
     

  constructor(private serviceApplication:PoolMoneyService, fb: FormBuilder) {
    this.myForm = fb.group({
    
          id:this.id,
          amtPooled:this.amtPooled,
          percentage:this.percentage
        
    });
  };

  ngOnInit(): void {
     
  }

  

/*  loadAll(): Promise<any> {
    
    let tempList = [];
    return this.serviceApplication.getTransactions()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }*/
  

poolMoney(form: any): Promise<any> {

    this.asset = {
      $class: "org.acme.dloans.PoolMoney",
          "id":this.id.value,
          "amtPooled":this.amtPooled.value,
          "percentage":this.percentage.value
        
    
    };

    this.myForm.setValue({
      
        
          "id":null,
          "amtPooled":null,
          "percentage":null
      
    });

    return this.serviceApplication.poolMoney(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "id":null,
          "amtPooled":null,
          "percentage":null
        
      
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = "error in else: "+error;
        }
    });
  }

 

  resetForm(): void{
    this.myForm.setValue({

      "id":null,
      "amtPooled":null,
      "percentage":null
      
      });
  }

}
