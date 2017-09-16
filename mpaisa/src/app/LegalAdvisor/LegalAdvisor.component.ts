import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LegalAdvisorService } from './LegalAdvisor.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-LegalAdvisor',
	templateUrl: './LegalAdvisor.component.html',
	styleUrls: ['./LegalAdvisor.component.css'],
  providers: [LegalAdvisorService]
})
export class LegalAdvisorComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      id = new FormControl("", Validators.required);
  
      firstName = new FormControl("", Validators.required);
  
      lastName = new FormControl("", Validators.required);
  
      walletAmount = new FormControl("", Validators.required);
  
      loansApproved = new FormControl("", Validators.required);
  
      

  constructor(private serviceLegalAdvisor:LegalAdvisorService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          id:this.id,
        
    
        
          firstName:this.firstName,
        
    
        
          lastName:this.lastName,
        
    
        
          walletAmount:this.walletAmount,
        
    
        
          loansApproved:this.loansApproved
        
    
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceLegalAdvisor.getAll()
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
  }

  addAsset(form: any): Promise<any> {

    this.asset = {
      $class: "org.acme.dloans.LegalAdvisor",
      
        
          "id":this.id.value,
        
      
        
          "firstName":this.firstName.value,
        
      
        
          "lastName":this.lastName.value,
        
      
        
          "walletAmount":this.walletAmount.value,
        
      
        
          "loansApproved":this.loansApproved.value
        
      
    };

    this.myForm.setValue({
      
        
          "id":null,
        
      
        
          "firstName":null,
        
      
        
          "lastName":null,
        
      
        
          "walletAmount":null,
        
      
        
          "loansApproved":null
        
      
    });

    return this.serviceLegalAdvisor.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "id":null,
        
      
        
          "firstName":null,
        
      
        
          "lastName":null,
        
      
        
          "walletAmount":null,
        
      
        
          "loansApproved":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.dloans.LegalAdvisor",
      
        
          
        
    
        
          
            "firstName":this.firstName.value,
          
        
    
        
          
            "lastName":this.lastName.value,
          
        
    
        
          
            "walletAmount":this.walletAmount.value,
          
        
    
        
          
            "loansApproved":this.loansApproved.value
          
        
    
    };

    return this.serviceLegalAdvisor.updateAsset(form.get("id").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
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
  }


  deleteAsset(): Promise<any> {

    return this.serviceLegalAdvisor.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
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
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceLegalAdvisor.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "id":null,
          
        
          
            "firstName":null,
          
        
          
            "lastName":null,
          
        
          
            "walletAmount":null,
          
        
          
            "loansApproved":null
          
        
      };



      
        if(result.id){
          formObject.id = result.id;
        }else{
          formObject.id = null;
        }
      
        if(result.firstName){
          formObject.firstName = result.firstName;
        }else{
          formObject.firstName = null;
        }
      
        if(result.lastName){
          formObject.lastName = result.lastName;
        }else{
          formObject.lastName = null;
        }
      
        if(result.walletAmount){
          formObject.walletAmount = result.walletAmount;
        }else{
          formObject.walletAmount = null;
        }
      
        if(result.loansApproved){
          formObject.loansApproved = result.loansApproved;
        }else{
          formObject.loansApproved = null;
        }
      
      

      this.myForm.setValue(formObject);

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

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "id":null,
        
      
        
          "firstName":null,
        
      
        
          "lastName":null,
        
      
        
          "walletAmount":null,
        
      
        
          "loansApproved":null 
        
      
      });
  }

}
