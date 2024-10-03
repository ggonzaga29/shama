'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

const ToastLauncher = () => {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  useEffect(() => {
    if (message) {
      toast.success(message);
    }

    return () => {
      toast.dismiss();
    };
  }, []);

  return null;
};

export default ToastLauncher;
