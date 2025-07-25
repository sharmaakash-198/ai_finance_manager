import { getAccountWithTransactions } from '@/actions/accounts'
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import TransactionTable from '../_components/transaction-table';
import { BarLoader } from 'react-spinners';
import AccountChart from '../_components/account-chart';


export default async function Page({ params }) {
  const { id }  = await params;

  const accountData = await getAccountWithTransactions(id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;


  return (
    <div className="space-y-8 px-5 bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-indigo-900/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <div className='flex gap-4 items-end justify-between'>
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold gradient-title capitalize">{account.name}</h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold"> ${parseFloat(account.balance).toFixed(2)} </div>
          <p className="text-sm text-muted-foreground">{account._count.transactions} Transactions </p>
        </div>
      </div>
      {/*Chart section*/}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <AccountChart transactions={transactions} />
      </Suspense>

      {/*Transactions section*/}
      <Suspense fallback={<BarLoader classname='mt-4' width="100%" color="#4f46e5" />}>
        <TransactionTable transactions={transactions} />
      </Suspense>

    </div>

  )
}

