import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoansService } from './Loans.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Loans',
	templateUrl: './Loans.component.html',
	styleUrls: ['./Loans.component.css'],
  providers: [LoansService]
})
export class LoansComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      id = new FormControl("", Validators.required);
  
      loanAmt = new FormControl("", Validators.required);
  
      outstandingAmt = new FormControl("", Validators.required);
  
      borrower = new FormControl("", Validators.required);
  
      lenders = new FormControl("", Validators.required);
  
      premiuim = new FormControl("", Validators.required);
  
      startDate = new FormControl("", Validators.required);
  
      endDate = new FormControl("", Validators.required);
  
      status = new FormControl("", Validators.required);
      payDay = new FormControl("", Validators.required);
  


  constructor(private serviceLoans:LoansService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          id:this.id,
        
    
        
          loanAmt:this.loanAmt,
        
    
        
          outstandingAmt:this.outstandingAmt,
        
    
        
          borrower:this.borrower,
        
    
        
          lenders:this.lenders,
        
    
        
          premiuim:this.premiuim,
        
    
        
          startDate:this.startDate,
        
    
        
          endDate:this.endDate,
        
    
        
          status:this.status,
          payDay:this.payDay
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceLoans.getAll()
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
      $class: "org.acme.dloans.Loans",
      
        
          "id":this.id.value,
        
      
        
          "loanAmt":this.loanAmt.value,
        
      
        
          "outstandingAmt":this.outstandingAmt.value,
        
      
        
          "borrower":this.borrower.value,
        
      
        
          "lenders":this.lenders.value,
        
      
        
          "premiuim":this.premiuim.value,
        
      
        
          "startDate":this.startDate.value,
        
      
        
          "endDate":this.endDate.value,
        
      
        
          "status":this.status.value,
          "payDay":this.payDay.value,
        
      
    };

    this.myForm.setValue({
      
        
          "id":null,
        
      
        
          "loanAmt":null,
        
      
        
          "outstandingAmt":null,
        
      
        
          "borrower":null,
        
      
        
          "lenders":null,
        
      
        
          "premiuim":null,
        
      
        
          "startDate":null,
        
      
        
          "endDate":null,
        
      
        
          "status":null,
          "payDay":null,
          
        
      
    });

    return this.serviceLoans.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "id":null,
        
      
        
          "loanAmt":null,
        
      
        
          "outstandingAmt":null,
        
      
        
          "borrower":null,
        
      
        
          "lenders":null,
        
      
        
          "premiuim":null,
        
      
        
          "startDate":null,
        
      
        
          "endDate":null,
        
      
        
          "status":null,
          "payDay":null,
          "premuim":null
        
      
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
      $class: "org.acme.dloans.Loans",
      
        
          
        
    
        
          
            "loanAmt":this.loanAmt.value,
          
        
    
        
          
            "outstandingAmt":this.outstandingAmt.value,
          
        
    
        
          
            "borrower":this.borrower.value,
          
        
    
        
          
            "lenders":this.lenders.value,
          
        
    
        
          
            "premiuim":this.premiuim.value,
          
        
    
        
          
            "startDate":this.startDate.value,
          
        
    
        
          
            "endDate":this.endDate.value,
          
        
    
        
          
            "status":this.status.value,
            "payDay":this.payDay.value
          
        
    
    };

    return this.serviceLoans.updateAsset(form.get("id").value,this.asset)
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

payPremuim(form: any): Promise<any> {

    this.asset = {
      $class: "org.acme.dloans.Loans",
        "id":this.id.value,
          
          "premiuim":this.premiuim.value
         
    
    };

 
    return this.serviceLoans.payPremium(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      
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


  deleteAsset(): Promise<any> {

    return this.serviceLoans.deleteAsset(this.currentId)
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

    return this.serviceLoans.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "id":null,
          
        
          
            "loanAmt":null,
          
        
          
            "outstandingAmt":null,
          
        
          
            "borrower":null,
          
        
          
            "lenders":null,
          
        
          
            "premiuim":null,
          
        
          
            "startDate":null,
          
        
          
            "endDate":null,
          
        
          
            "status":null,
            "payDay":null
          
        
      };



      
        if(result.id){
          formObject.id = result.id;
        }else{
          formObject.id = null;
        }
      
        if(result.loanAmt){
          formObject.loanAmt = result.loanAmt;
        }else{
          formObject.loanAmt = null;
        }
      
        if(result.outstandingAmt){
          formObject.outstandingAmt = result.outstandingAmt;
        }else{
          formObject.outstandingAmt = null;
        }
      
        if(result.borrower){
          formObject.borrower = result.borrower;
        }else{
          formObject.borrower = null;
        }
      
        if(result.lenders){
          formObject.lenders = result.lenders;
        }else{
          formObject.lenders = null;
        }
      
        if(result.premiuim){
          formObject.premiuim = result.premiuim;
        }else{
          formObject.premiuim = null;
        }
      
        if(result.startDate){
          formObject.startDate = result.startDate;
        }else{
          formObject.startDate = null;
        }
      
        if(result.endDate){
          formObject.endDate = result.endDate;
        }else{
          formObject.endDate = null;
        }
      
        if(result.status){
          formObject.status = result.status;
        }else{
          formObject.status = null;
        }

         if(result.payDay){
          formObject.payDay = result.payDay;
        }else{
          formObject.status = null;
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
        
      
        
          "loanAmt":null,
        
      
        
          "outstandingAmt":null,
        
      
        
          "borrower":null,
        
      
        
          "lenders":null,
        
      
        
          "premiuim":null,
        
      
        
          "startDate":null,
        
      
        
          "endDate":null,
        
      
        
          "status":null ,
          "payDay":null
        
      
      });
  }

}
