'use server';
import db from '@/lib/prisma';

export async function deleteUser(userId: string) {
  try {
    await db.user.delete({
      where: { id: userId },
    });

    return {
      success: true,
      msg: 'تم حذف المستخدم بنجاح',
    };
  } catch (error: any) {
    console.error('Error deleting user:', error);

    let msg = 'فشل في حذف المستخدم';

    if (error.code === 'P2014') {
      msg = 'لا يمكن حذف المستخدم لأنه مرتبط بطلبات';
    }

    return {
      success: false,
      msg,
    };
  }
}








