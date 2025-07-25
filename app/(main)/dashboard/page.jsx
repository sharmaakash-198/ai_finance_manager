import { getDashboardData, getUserAccounts } from '@/actions/dashboard';
import CreateAccountDrawer from '@/components/create-account-drawer';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import React, { Suspense } from 'react'
import AccountCard from './_components/account-card';
import BudgetProgress from './_components/budget-progress';
import { getCurrentBudget } from '@/actions/budget';
import { DashboardOverview } from './_components/transaction-overview';

async function DashboardPage() {
  const accounts = await getUserAccounts();


  const defaultAccount = accounts?.find((account) => account.isDefault);

  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  const transactions = await getDashboardData();
  
  return (
    <div className='space-y-8 bg-gradient-to-br from-white/80 to-blue-50/80 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black backdrop-blur-sm rounded-xl p-6 shadow-lg'>

          {/*budget progress bar*/}
      
      {defaultAccount && <BudgetProgress
      initialBudget={budgetData?.budget}
      currentExpenses={budgetData?.currentExpenses || 0}
      />
      }

      {/*overview of transactions*/}
      <Suspense fallback={"Loading Overview..."}>
        <DashboardOverview
        accounts={accounts}
        transactions={transactions || []}
        />
      </Suspense>

      {/*accounts grid*/}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 '>
        <CreateAccountDrawer>
          <Card className='hover:shadow-md transition-shadow cursor-pointer border-dashed'>
            <CardContent className='flex flex-col items-center justify-center light-mode-muted h-full pt-5'>
              <Plus className='h-10 w-10 mb-2' />
              <p className='text-sm font-medium'>Add New Account</p>

            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {accounts.length > 0 && accounts?.map((account) => {
          return <AccountCard key={account.id} account={account} />;
        })}
      </div>
    </div>
  )
}

export default DashboardPage;
