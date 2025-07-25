import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import AddTransactionForm from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";


const AddTransactionPage = async ({ searchParams }) => {
  const accounts = await getUserAccounts();
  const { edit: editId } = await searchParams;

  console.log(editId);
  

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="max-w-3xl mx-auto px-5 bg-gradient-to-br from-white/90 to-blue-50/90 dark:from-slate-900/90 dark:to-indigo-900/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title ">{editId ? "Edit" : "Add"} Transaction</h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}

export default AddTransactionPage;