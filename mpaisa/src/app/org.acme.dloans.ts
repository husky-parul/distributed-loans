import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.dloans{
   export class Users extends Participant {
      id: string;
      firstName: string;
      lastName: string;
      address: string;
      assetWorth: number;
      rating: number;
      walletAmt: number;
      password:string;
   }
   export class LegalAdvisor extends Participant {
      id: string;
      firstName: string;
      lastName: string;
      walletAmount: number;
      loansApproved: Loans[];
   }
   export class Loans extends Asset {
      id: string;
      loanAmt: number;
      outstandingAmt: number;
      borrower: Users;
      lenders: Users[];
      premiuim: number;
      startDate: Date;
      endDate: Date;
      status: LoanStatus;
      payDay:Date;
   }
   export enum LoanStatus {
      ontrack,
      deliquient,
      alerted,
   }

   export class PoolMoney extends Transaction {
      id: string;
      amtPooled: number;
      percentage: number;
     
   }
// }
