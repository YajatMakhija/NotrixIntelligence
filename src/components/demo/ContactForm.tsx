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
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <p className="font-serif text-2xl text-[#f5f5f0]">Thank you.</p>
        <p className="mt-3 text-sm text-[#f5f5f0]/65">
          Your email client should open shortly. We&apos;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#f5f5f0] placeholder:text-[#f5f5f0]/30 outline-none transition-colors focus:border-white/30";

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
            <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
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
            <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
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
            <p className="mt-1 text-xs text-red-400">{errors.company.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("role", { required: "Role is required" })}
            placeholder="Role"
            className={inputClass}
          />
          {errors.role && (
            <p className="mt-1 text-xs text-red-400">{errors.role.message}</p>
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
          <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
        )}
      </div>

      <SubmitButton variant="dark">Talk to us</SubmitButton>

      <p className="text-xs text-[#f5f5f0]/40">
        Or email us directly at{" "}
        <a href={`mailto:${SITE.email}`} className="underline hover:text-[#f5f5f0]/60">
          {SITE.email}
        </a>
        . We don&apos;t share your data.
      </p>
    </form>
  );
}
