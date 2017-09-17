import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PoolMoneyComponent } from './PoolMoney/PoolMoney.component'

import { LoansComponent } from './Loans/Loans.component';
import { UsersComponent } from './Users/Users.component';
import { LegalAdvisorComponent } from './LegalAdvisor/LegalAdvisor.component';

@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    PoolMoneyComponent,
    
    LoansComponent,
    UsersComponent,
    LegalAdvisorComponent
		
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    Configuration,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
