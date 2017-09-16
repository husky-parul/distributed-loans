import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from './Users.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Users',
	templateUrl: './Users.component.html',
	styleUrls: ['./Users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      id = new FormControl("", Validators.required);
  
      firstName = new FormControl("", Validators.required);
  
      lastName = new FormControl("", Validators.required);
  
      address = new FormControl("", Validators.required);
  
      assetWorth = new FormControl("", Validators.required);
  
      rating = new FormControl("", Validators.required);
  
      walletAmt = new FormControl("", Validators.required);
  
      

  constructor(private serviceUsers:UsersService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          id:this.id,
        
    
        
          firstName:this.firstName,
        
    
        
          lastName:this.lastName,
        
    
        
          address:this.address,
        
    
        
          assetWorth:this.assetWorth,
        
    
        
          rating:this.rating,
        
    
        
          walletAmt:this.walletAmt
        
    
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceUsers.getAll()
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
      $class: "org.acme.dloans.Users",
      
        
          "id":this.id.value,
        
      
        
          "firstName":this.firstName.value,
        
      
        
          "lastName":this.lastName.value,
        
      
        
          "address":this.address.value,
        
      
        
          "assetWorth":this.assetWorth.value,
        
      
        
          "rating":this.rating.value,
        
      
        
          "walletAmt":this.walletAmt.value
        
      
    };

    this.myForm.setValue({
      
        
          "id":null,
        
      
        
          "firstName":null,
        
      
        
          "lastName":null,
        
      
        
          "address":null,
        
      
        
          "assetWorth":null,
        
      
        
          "rating":null,
        
      
        
          "walletAmt":null
        
      
    });

    return this.serviceUsers.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "id":null,
        
      
        
          "firstName":null,
        
      
        
          "lastName":null,
        
      
        
          "address":null,
        
      
        
          "assetWorth":null,
        
      
        
          "rating":null,
        
      
        
          "walletAmt":null 
        
      
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
      $class: "org.acme.dloans.Users",
      
        
          
        
    
        
          
            "firstName":this.firstName.value,
          
        
    
        
          
            "lastName":this.lastName.value,
          
        
    
        
          
            "address":this.address.value,
          
        
    
        
          
            "assetWorth":this.assetWorth.value,
          
        
    
        
          
            "rating":this.rating.value,
        
    
        
          
            "walletAmt":this.walletAmt.value
          
        
    
    };

    return this.serviceUsers.updateAsset(form.get("id").value,this.asset)
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

    return this.serviceUsers.deleteAsset(this.currentId)
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

    return this.serviceUsers.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "id":null,
          
        
          
            "firstName":null,
          
        
          
            "lastName":null,
          
        
          
            "address":null,
          
        
          
            "assetWorth":null,
          
        
          
            "rating":null,
          
        
          
            "walletAmt":null 
          
        
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
      
        if(result.address){
          formObject.address = result.address;
        }else{
          formObject.address = null;
        }
      
        if(result.assetWorth){
          formObject.assetWorth = result.assetWorth;
        }else{
          formObject.assetWorth = null;
        }
      
        if(result.rating){
          formObject.rating = result.rating;
        }else{
          formObject.rating = null;
        }
      
        if(result.walletAmt){
          formObject.walletAmt = result.walletAmt;
        }else{
          formObject.walletAmt = null;
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
        
      
        
          "address":null,
        
      
        
          "assetWorth":null,
        
      
        
          "rating":null,
        
      
        
          "walletAmt":null 
        
      
      });
  }

}
