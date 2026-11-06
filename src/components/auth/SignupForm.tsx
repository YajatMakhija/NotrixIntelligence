"use client";

import Link from "next/link";
import { FormEvent, useActionState, useState } from "react";
import { createWorkspace, type SignupState } from "@/app/signup/actions";
import { Icon } from "@/components/ui/Icon";

type Account = { fullName: string; email: string; password: string };

export function SignupForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [account, setAccount] = useState<Account>({ fullName: "", email: "", password: "" });
  const [state, action, pending] = useActionState(createWorkspace, null as SignupState);

  function continueToCompany(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setStep(2);
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-[12px] font-medium text-[var(--blue)]">Step {step} of 2</p>
          <h2 className="mt-1 text-[22px] font-medium tracking-tight text-[var(--ink)]">
            {step === 1 ? "Create your administrator account" : "Tell us about your company"}
          </h2>
        </div>
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-1.5 w-10 rounded-full bg-[var(--blue)]" />
          <span className={`h-1.5 w-10 rounded-full ${step === 2 ? "bg-[var(--blue)]" : "bg-[var(--line)]"}`} />
        </div>
      </div>

      {step === 1 ? (
        <form onSubmit={continueToCompany} className="space-y-5">
          <AuthField label="Full name" name="fullName" autoComplete="name" value={account.fullName} onChange={(value) => setAccount({ ...account, fullName: value })} />
          <AuthField label="Company email" name="email" type="email" autoComplete="email" value={account.email} onChange={(value) => setAccount({ ...account, email: value })} />
          <AuthField label="Create password" name="password" type="password" autoComplete="new-password" minLength={8} value={account.password} onChange={(value) => setAccount({ ...account, password: value })} hint="Use at least 8 characters." />
          <button type="submit" className="auth-primary">Continue <Icon name="arrowRight" /></button>
        </form>
      ) : (
        <form action={action} className="space-y-5">
          <input type="hidden" name="fullName" value={account.fullName} />
          <input type="hidden" name="email" value={account.email} />
          <input type="hidden" name="password" value={account.password} />
          <div className="grid gap-5 sm:grid-cols-2">
            <AuthField label="Company name" name="companyName" autoComplete="organization" />
            <label className="auth-field-wrap"><span>Legal structure</span><select name="companyType" className="auth-field" required defaultValue=""><option value="" disabled>Select type</option><option>Private Limited</option><option>Public Limited</option><option>Proprietorship</option><option>Partnership / LLP</option><option>Nonprofit</option><option>Other</option></select></label>
            <label className="auth-field-wrap"><span>Employees</span><select name="employees" className="auth-field" required defaultValue=""><option value="" disabled>Company size</option><option>1–10</option><option>11–50</option><option>51–200</option><option>201–500</option><option>501–1,000</option><option>1,001+</option></select></label>
            <AuthField label="Country or region" name="country" autoComplete="country-name" />
            <label className="auth-field-wrap"><span>Your role</span><select name="role" className="auth-field" required defaultValue=""><option value="" disabled>Select role</option><option>Founder / Owner</option><option>Executive</option><option>Operations</option><option>IT / Security</option><option>Engineering</option><option>Sales / Success</option><option>Other</option></select></label>
            <label className="auth-field-wrap"><span>First use case</span><select name="primaryGoal" className="auth-field" required defaultValue=""><option value="" disabled>Select a goal</option><option>Company-wide knowledge search</option><option>Customer intelligence</option><option>Employee onboarding</option><option>Workflow automation</option><option>Engineering knowledge</option><option>Sales enablement</option></select></label>
          </div>
          <label className="flex items-start gap-3 text-[13px] leading-relaxed text-[var(--body)]"><input name="terms" type="checkbox" required className="mt-1 accent-[var(--blue)]" /><span>I agree to the <Link href="/legal/terms" className="text-[var(--ink)] underline">Terms</Link> and acknowledge the <Link href="/legal/privacy" className="text-[var(--ink)] underline">Privacy Policy</Link>.</span></label>
          {state && <p role="alert" className="text-[13px] text-[#a33a31]">{state.message}</p>}
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button type="button" onClick={() => setStep(1)} className="auth-secondary">Back</button>
            <button type="submit" disabled={pending} className="auth-primary flex-1">{pending ? "Creating workspace…" : "Create preview workspace"}<Icon name="arrowRight" /></button>
          </div>
        </form>
      )}
    </div>
  );
}

function AuthField({ label, hint, onChange, ...props }: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & { label: string; hint?: string; onChange?: (value: string) => void }) {
  return <label className="auth-field-wrap"><span>{label}</span><input {...props} required className="auth-field" onChange={onChange ? (event) => onChange(event.target.value) : undefined} />{hint && <small>{hint}</small>}</label>;
}
