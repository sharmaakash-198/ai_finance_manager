"use client";

import { createTransaction, updateTransaction } from '@/actions/transaction';
import { transactionSchema } from '@/app/lib/schema';
import CreateAccountDrawer from '@/components/create-account-drawer';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import useFetch from '@/hooks/use-fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { ReceiptScanner } from './receipt-scanner';

const AddTransactionForm = ({ accounts, categories ,
    editMode = false,
    initialData = null,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");

    // Initialize useForm, add control for Controller, and fix defaultValues key casing
    const {
        control,
        register,
        setValue,
        handleSubmit,
        formState: { errors },
        watch,
        getValues,
        reset,
    } = useForm({
        resolver: zodResolver(transactionSchema),
        defaultValues: 
        editMode && initialData
        ? {
            type: initialData.type,
            amount: initialData.amount.toString(),
            description: initialData.description,
            accountId: initialData.accountId,
            category: initialData.category,
            date: new Date(initialData.date),
            isRecurring: initialData.isRecurring,
            ...(initialData.recurringInterval && {
              recurringInterval: initialData.recurringInterval,
            }),
        }
        : {
            type: "EXPENSE",
            amount: "",
            description: "",
            accountId: accounts.find((ac) => ac.isDefault)?.id || "",
            date: new Date(),
            isRecurring: false,
            category: "",           // Add missing default value
            recurringInterval: undefined,  // Add missing default value for recurring interval
        }
    });

    const { loading: transactionLoading, fn: transactionFn, data: transactionResult 

    } = useFetch(editMode ? updateTransaction : createTransaction);

    const type = watch("type");
    const isRecurring = watch("isRecurring");
    const date = watch("date");

    const onSubmit = async (data) => {
        console.log("Submitting form with data:", data);
        const formData = {
            ...data,
            amount: parseFloat(data.amount),
        };
        if(editMode){
            transactionFn(editId, formData);
        }else {
            transactionFn(formData);
        }
        transactionFn(formData);
    };


    useEffect(() => {
        if (transactionResult?.success && !transactionLoading) {
            toast.success(
                editMode ? "Transaction updated successfully"
            : "Transaction created successfully");
            reset();
            router.push(`/account/${transactionResult.data.accountId}`);
        }
    }, [transactionResult, transactionLoading, editMode]);

    const filteredCategories = categories.filter((category) => category.type === type);

    const handleScanComplete = (scannedData) => {
        if (scannedData) {
            setValue("amount", scannedData.amount.toString());
            setValue("date", new Date(scannedData.date));
            if (scannedData.description) {
                setValue("description", scannedData.description);
            }
            if (scannedData.category) {
                setValue("category", scannedData.category);
            }
        }
    };

    return (
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            {/* Receipt Scanner - Only show in create mode */}
            {!editMode && < ReceiptScanner onScanComplete={handleScanComplete} /> }

            {/* Type - controlled via Controller */}
            <div className='space-y-2'>
                <label className='text-sm font-medium light-mode-text'>Type</label>
                <Controller
                    control={control}
                    name="type"
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="EXPENSE">Expense</SelectItem>
                                <SelectItem value="INCOME">Income</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.type && <p className='text-sm text-red-500'>{errors.type.message}</p>}
            </div>

            {/* Amount & Account */}
            <div className='grid gap-6 md:grid-cols-2'>
                <div className='space-y-2'>
                    <label className='text-sm font-medium light-mode-text'>Amount</label>
                    <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("amount")}
                    />
                    {errors.amount && <p className='text-sm text-red-500'>{errors.amount.message}</p>}
                </div>

                <div className='space-y-2'>
                    <label className='text-sm font-medium light-mode-text'>Account</label>
                    <Controller
                        control={control}
                        name="accountId"
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Account" />
                                </SelectTrigger>
                                <SelectContent>
                                    {accounts.map((account) => (
                                        <SelectItem key={account.id} value={account.id}>
                                            {account.name} (${parseFloat(account.balance).toFixed(2)})
                                        </SelectItem>
                                    ))}
                                    <CreateAccountDrawer>
                                        <Button
                                            variant="ghost"
                                            className='w-full select-none items-center text-sm outline-none'
                                        >
                                            Create Account
                                        </Button>
                                    </CreateAccountDrawer>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.accountId && <p className='text-sm text-red-500'>{errors.accountId.message}</p>}
                </div>
            </div>

            {/* Category */}
            <div className='space-y-2'>
                <label className='text-sm font-medium light-mode-text'>Category</label>
                <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {filteredCategories.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.category && <p className='text-sm text-red-500'>{errors.category.message}</p>}
            </div>

            {/* Date */}
            <div className='space-y-2'>
                <label className='text-sm font-medium light-mode-text'>Date</label>
                <Controller
                    control={control}
                    name="date"
                    render={({ field }) => (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant='outline' className='w-full pl-3 text-left font-normal'>
                                    {field.value ? format(field.value, "PPP") : <span>Pick a Date</span>}
                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto p-0' align='start'>
                                <Calendar
                                    mode='single'
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    )}
                />
                {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
            </div>

            {/* Description */}
            <div className='space-y-2'>
                <label className='text-sm font-medium light-mode-text'>Description</label>
                <Input placeholder='Enter Description' {...register("description")} />
                {errors.description && <p className='text-sm text-red-500'>{errors.description.message}</p>}
            </div>

            {/* Recurring Transaction Switch */}
            <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                    <label
                        htmlFor="isRecurring"
                        className="text-base font-medium cursor-pointer light-mode-text"
                    >
                        Recurring Transaction
                    </label>
                    <p className="text-sm light-mode-muted">
                        Set up a recurring schedule for this transaction
                    </p>
                </div>
                <Controller
                    control={control}
                    name="isRecurring"
                    render={({ field }) => (
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    )}
                />
            </div>

            {/* Recurring Interval */}
            {isRecurring && (
                <div className='space-y-2'>
                    <label className='text-sm font-medium light-mode-text'>Recurring Interval</label>
                    <Controller
                        control={control}
                        name="recurringInterval"
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value || undefined}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Interval" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='DAILY'>Daily</SelectItem>
                                    <SelectItem value='WEEKLY'>Weekly</SelectItem>
                                    <SelectItem value='MONTHLY'>Monthly</SelectItem>
                                    <SelectItem value='YEARLY'>Yearly</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.recurringInterval && <p className='text-sm text-red-500'>{errors.recurringInterval.message}</p>}
                </div>
            )}

            {/* Buttons */}
            <div className='flex gap-4'>
                <Button
                    type='button'
                    variant='outline'
                    className='w-full'
                    onClick={() => router.back()}
                >
                    Cancel
                </Button>
                <Button
                    type='submit'
                    className='w-full'
                    disabled={transactionLoading}>
                {transactionLoading ? (
                    <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    {editMode ? "Updating..." : "Creating..."}
                    </>
                )
                : 
                editMode ? (
                    "Update Transaction"
                ) : (
                    "Create Transaction"
                )}
                </Button>
            </div>
        </form>
    );
};

export default AddTransactionForm;
