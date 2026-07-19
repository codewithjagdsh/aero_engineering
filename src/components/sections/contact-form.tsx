"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products } from "@/lib/data/products";

type FormState = {
  name: string;
  company: string;
  phone: string;
  email: string;
  requirement: string;
  message: string;
};

const initial: FormState = {
  name: "",
  company: "",
  phone: "",
  email: "",
  requirement: "",
  message: "",
};

/** UI-only contact form with client validation; ready for future API wiring. */
export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.phone.trim()) next.phone = "Phone is required";
    else if (!/^[+\d\s()-]{8,}$/.test(form.phone))
      next.phone = "Enter a valid phone number";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email";
    if (!form.requirement) next.requirement = "Select a requirement";
    if (!form.message.trim()) next.message = "Please describe your requirement";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm(initial);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-10 text-center shadow-soft">
        <CheckCircle2 className="size-14 text-electric" />
        <h3 className="mt-4 font-heading text-2xl font-bold text-navy dark:text-white">
          Enquiry received
        </h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Thank you. Our team will review your requirement and get back to you
          shortly.
        </p>
        <Button
          className="mt-6 rounded-full"
          onClick={() => setStatus("idle")}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name} htmlFor="name">
          <Input
            id="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your full name"
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field label="Company" error={errors.company} htmlFor="company">
          <Input
            id="company"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="Company name"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" error={errors.phone} htmlFor="phone">
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            aria-invalid={!!errors.phone}
          />
        </Field>
        <Field label="Email" error={errors.email} htmlFor="email">
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
          />
        </Field>
      </div>

      <Field label="Requirement" error={errors.requirement} htmlFor="requirement">
        <Select
          value={form.requirement}
          onValueChange={(v) => update("requirement", v ?? "")}
        >
          <SelectTrigger id="requirement" aria-invalid={!!errors.requirement} className="w-full">
            <SelectValue placeholder="Select product or service" />
          </SelectTrigger>
          <SelectContent>
            {products.map((p) => (
              <SelectItem key={p.slug} value={p.slug}>
                {p.name}
              </SelectItem>
            ))}
            <SelectItem value="dumbwaiters">
              Dumbwaiters for Restaurants, Cloud Kitchens, Hospitals
            </SelectItem>
            <SelectItem value="custom">
              Custom Material Handling Lifting Solutions
            </SelectItem>
            <SelectItem value="maintenance">Maintenance / Support</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field label="Message" error={errors.message} htmlFor="message">
        <Textarea
          id="message"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us about capacity, floors, site location, and timeline…"
          rows={5}
          aria-invalid={!!errors.message}
        />
      </Field>

      {status === "error" && (
        <p className="text-sm text-destructive" role="alert">
          Something went wrong while sending your enquiry. Please try again, or
          call us directly.
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="h-12 w-full rounded-full bg-navy text-base font-semibold text-white hover:bg-steel dark:bg-electric dark:text-navy"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Request Quote"
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
