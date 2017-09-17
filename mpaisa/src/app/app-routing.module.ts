import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoolMoneyComponent } from './PoolMoney/PoolMoney.component'
import { HomeComponent } from './home/home.component';

import { LoansComponent } from './Loans/Loans.component';

import { UsersComponent } from './Users/Users.component';

import { LegalAdvisorComponent } from './LegalAdvisor/LegalAdvisor.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
    { path: 'Loans', component: LoansComponent},
    
    { path: 'Users', component: UsersComponent},

    { path: 'LegalAdvisor', component: LegalAdvisorComponent},
    { path: 'PoolMoney', component: PoolMoneyComponent},
		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
