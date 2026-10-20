'use client';

import { FormEvent, ReactNode, useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shared/ui/dialog';

const demoEvent = 'notrix:open-demo';

export function NotrixDemoTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(demoEvent))}
    >
      {children}
    </button>
  );
}

export function NotrixDemoDialog() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const show = () => {
      setSubmitted(false);
      setOpen(true);
    };
    window.addEventListener(demoEvent, show);
    return () => window.removeEventListener(demoEvent, show);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="border-neutral-200 bg-white text-neutral-950 sm:rounded-2xl">
        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto size-10 text-primary-600" />
            <DialogTitle className="mt-4 text-2xl">
              Request received
            </DialogTitle>
            <DialogDescription className="mx-auto mt-3 max-w-sm text-neutral-600">
              Thanks. We&apos;ll use {email} to follow up about a Notrix pilot.
            </DialogDescription>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 h-11 rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Book a Notrix demo</DialogTitle>
              <DialogDescription className="text-neutral-600">
                Tell us about your team and the knowledge problem you want to
                solve.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="mt-2 space-y-4">
              <label className="block text-sm font-medium">
                Name
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className="mt-2 h-11 w-full rounded-xl border border-neutral-200 px-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>
              <label className="block text-sm font-medium">
                Work email
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-neutral-200 px-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>
              <label className="block text-sm font-medium">
                Company
                <input
                  required
                  name="company"
                  autoComplete="organization"
                  className="mt-2 h-11 w-full rounded-xl border border-neutral-200 px-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>
              <label className="block text-sm font-medium">
                What problem are you trying to solve?{' '}
                <span className="font-normal text-neutral-500">Optional</span>
                <textarea
                  name="problem"
                  rows={4}
                  className="mt-2 w-full resize-none rounded-xl border border-neutral-200 p-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>
              <button
                type="submit"
                className="h-11 w-full rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                Request a demo
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
