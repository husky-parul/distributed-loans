/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Apply for loan
 * @param {org.acme.dloans.LoanApplication} tranx 
 * @transaction
 */

function loanApplication(tranx) {
    return getParticipantRegistry('org.acme.dloans.Users')
    .then (function (brRegistry){
      return brRegistry.get(tranx.borrower)
      .then(function(br){
          return getAssetRegistry('org.acme.dloans.Loans')
          .then(function(registry){
              var factory = getFactory();
              var t_loans = factory.newResource('org.acme.dloans', 'Loans', tranx.id);
              t_loans.borrower=br;
              t_loans.loanAmt=tranx.amt;
              t_loans.documents = tranx.documents;
              t_loans.outstandingAmt=0;
              console.log('Application: ');
              return registry.add(t_loans);
            })
          })
        });
     }


/**
 * Loan approval
 * @param {org.acme.dloans.LoanVerification} tranx 
 * @transaction
 */
function loanVerification(tranx){
    return getAssetRegistry('org.acme.dloans.Loans')
    .then(function(loanRegistry){
        return loanRegistry.get(tranx.id)
        .then(function(loan){
            loan.comments=tranx.comments;
            loan.status=tranx.status;
            console.log('Loan updated with: '+tranx.comments +tranx.status);
            return loanRegistry.update(loan);
        })
    })
}

/**
 * send Notification
 * @param {org.acme.dloans.SendNotification} tranx 
 * @transaction
 */

function sendNotification(tranx){
    return getAssetRegistry('org.acme.dloans.Loans')
    .then(function(loanRegistry){
        return query('unsanctionedLoans')
        .then(function(results){
            results.forEach(function(result) {
                console.log('_________RESULT_______'+result)

            })
        })
    })

}

/**
 * send Notification
 * @param {org.acme.dloans.PoolMoney} tranx 
 * @transaction
 */

function poolMoney(tranx){
    return getAssetRegistry('org.acme.dloans.Loans')
    .then(function(loanRegistry){
        return loanRegistry.get(tranx.id)
        .then(function(loan){
            return getParticipantRegistry('org.acme.dloans.Users')
            .then (function(pRegistry){
                return pRegistry.get(tranx.lenderId)
                .then(function(user){
                    var t_loan=loan;
                    var currentBalance=loan.outstandingAmt;
                    loan.outstandingAmt=tranx.amtPooled + currentBalance;
                    if (loan.outstandingAmt != loan.loanAmt){
                        loan.status='incompleteFunds';
                        user.wallet=user.wallet-tranx.amtPooled;
                    }else{
                        loan.status='sanctioned'
                    }
                    console.log('Loan updated with: '+tranx.amtPooled +loan.outstandingAmt);
                    if (user.password==tranx.password){
                        return loanRegistry.update(loan);
                    }else{
                        return loanRegistry.update(t_loan);
                    }
                    
                })
            })
        })
    })
}

/**
 * pay premium
 * @param {org.acme.dloans.PayPremium} tranx 
 * @transaction
 */

function payPremium(tranx){
    return getAssetRegistry('org.acme.dloans.Loans')
    .then(function(loanRegistry){
        return loanRegistry.get(tranx.id)
        .then(function(loan){
            return getParticipantRegistry('org.acme.dloans.Users')
            .then(function(uRegistry){
                var lenders=loans.lenders;
                lenders.forEach(function(lender) {
                    console.log(lender);
                    per=lender.pe
                });
            })


        })
    })
    

}