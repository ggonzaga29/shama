import { logout } from "src/modules/auth/actions";
import { redirect } from "next/navigation";

export default function SignoutPage() {
  logout();
  redirect("/auth?message=You have been signed out successfully");
}
