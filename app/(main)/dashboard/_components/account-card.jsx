"use client";

import { updateDefaultAccount, deleteAccount } from '@/actions/accounts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import useFetch from '@/hooks/use-fetch';
import { ArrowDownRight, ArrowUpRight, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const AccountCard = ({ account }) => {

    const{name , type, balance, id, isDefault } = account;
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const {
      loading: updateDefaultloading,
      fn: updateDefaultFn,
      data: updatedAccount,
      error,
    } = useFetch(updateDefaultAccount);

    const {
      loading: deleteLoading,
      fn: deleteAccountFn,
      data: deleteResult,
      error: deleteError,
    } = useFetch(deleteAccount);

    const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id);
  };

  const handleDeleteAccount = async () => {
    if (deleteLoading) return;
    await deleteAccountFn(id);
    setShowDeleteDialog(false);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount,updateDefaultloading]);

  useEffect(() => {
    if (deleteResult?.success) {
      toast.success("Account deleted successfully");
    }
  }, [deleteResult]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError.message || "Failed to delete account");
    }
  }, [deleteError]);

  return (
    <Card className="hover:shadow-md transition-shadow group relative">
        {/* Delete Button - appears on hover */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDeleteDialog(true);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the account "{name}"? This action cannot be undone.
                {account._count?.transactions > 0 && (
                  <>
                    <br />
                    <br />
                    <strong className="text-red-600">
                      Warning: This account has {account._count.transactions} transaction(s). 
                      You must delete all transactions first.
                    </strong>
                  </>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                className="bg-red-600 hover:bg-red-700"
              >
                {deleteLoading ? "Deleting..." : "Delete Account"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium capitalize light-mode-text">{name}</CardTitle>
            <Switch 
              checked={isDefault}
              onClick={handleDefaultChange} 
              disabled={updateDefaultloading}
            />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold light-mode-text">
            ${parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-xs light-mode-muted">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm light-mode-muted">
            <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
        </CardFooter>
        </Link>
    </Card>
  );
};

export default AccountCard;
