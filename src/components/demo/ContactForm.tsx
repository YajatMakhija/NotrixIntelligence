"use client";

import { useForm } from "react-hook-form";
import { SubmitButton } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const subject = encodeURIComponent(`Demo request from ${data.company}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\nRole: ${data.role}\n\nWhat to automate:\n${data.message}`,
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    reset();
  };

  if (isSubmitSuccessful) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <p className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          Thank you.
        </p>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          Your email client should open shortly. We&apos;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none transition-colors focus:border-[var(--brand-primary)]/50";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            className={inputClass}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-[var(--status-error)]">{errors.name.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
            type="email"
            placeholder="Work email"
            className={inputClass}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-[var(--status-error)]">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <input
            {...register("company", { required: "Company is required" })}
            placeholder="Company"
            className={inputClass}
          />
          {errors.company && (
            <p className="mt-1 text-xs text-[var(--status-error)]">{errors.company.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("role", { required: "Role is required" })}
            placeholder="Role"
            className={inputClass}
          />
          {errors.role && (
            <p className="mt-1 text-xs text-[var(--status-error)]">{errors.role.message}</p>
          )}
        </div>
      </div>

      <div>
        <textarea
          {...register("message", { required: "Please tell us what you'd like to automate" })}
          placeholder="What would you automate?"
          rows={4}
          className={`${inputClass} resize-none`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-[var(--status-error)]">{errors.message.message}</p>
        )}
      </div>

      <SubmitButton variant="accent">Get in touch</SubmitButton>

      <p className="text-xs text-[var(--text-secondary)]">
        Or email us directly at{" "}
        <a
          href={`mailto:${SITE.email}`}
          className="text-[var(--brand-primary)] underline hover:text-[var(--brand-primary-hover)]"
        >
          {SITE.email}
        </a>
        . We don&apos;t share your data.
      </p>
    </form>
  );
}
