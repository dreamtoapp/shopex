'use client';

import { useState } from 'react';

import { toast } from 'sonner';

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

import { deleteUser } from '../actions/deleteUser';

interface DeleteUserAlertProps {
  userId: string;
  children: React.ReactNode;
}

export default function DeleteUserAlert({ userId, children }: DeleteUserAlertProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteUser(userId);

    toast[res.success ? 'success' : 'error'](res.msg);

    setLoading(false);

    if (res.success) {
      window.location.reload();
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
          <AlertDialogDescription>
            لا يمكن التراجع عن هذا الإجراء. سيتم حذف المستخدم نهائيًا.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>إلغاء</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading}>
            {loading ? 'جارٍ الحذف...' : 'حذف'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
