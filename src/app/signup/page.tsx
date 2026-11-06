import { redirect } from "next/navigation";
import { notrixAppUrl } from "@/lib/notrix-app-url";

export default function SignupPage() { redirect(notrixAppUrl("/signup")); }
