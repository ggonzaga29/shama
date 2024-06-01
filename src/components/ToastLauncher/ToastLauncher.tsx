'use client';
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const ToastLauncher = () => {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const messageType = searchParams.get("messageType") ?? "success";

  if (message) {
    toast.success(message);
  }

  return null;
}

export default ToastLauncher;