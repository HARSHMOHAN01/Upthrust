"use client";

import React, { useState } from "react";
import { ContactSectionContent } from "@/types/content";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, Activity } from "lucide-react";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

interface ContactFormProps {
  content: ContactSectionContent;
}

export function ContactForm({ content }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    service: content.fields.find((f) => f.name === "service")?.options?.[0] || "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [lastGtmEvent, setLastGtmEvent] = useState<Record<string, unknown> | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = "Please enter your email.";
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid work email address.";
    }
    if (!formData.service) {
      errs.service = "Please select a service.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please describe your project brief.";
    } else if (formData.message.trim().length < 5) {
      errs.message = "Brief must be at least 5 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (!response.ok) {
        setErrors({ general: resData.error || "Submission failed. Please try again." });
        setIsSubmitting(false);
        return;
      }

      // Record success state
      setSubmissionId(resData.submissionId);
      setIsSuccess(true);
      setIsSubmitting(false);

      // Trigger GTM conversion event
      const gtmPayload = {
        event: "form_submit",
        formId: "contact-form",
        submissionId: resData.submissionId,
        service: formData.service,
        timestamp: new Date().toISOString(),
      };

      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(gtmPayload);
        setLastGtmEvent(gtmPayload);
        console.log("🎯 GTM Conversion Event Fired:", gtmPayload);
      }
    } catch {
      setErrors({ general: "Network error. Please check your connection and try again." });
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      service: content.fields.find((f) => f.name === "service")?.options?.[0] || "",
      message: "",
    });
    setErrors({});
    setIsSuccess(false);
    setSubmissionId(null);
  };

  if (isSuccess) {
    return (
      <div className="bg-zinc-950/80 border border-zinc-800 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-brand-orange/10 border border-brand-orange/30 rounded-full flex items-center justify-center mb-6 text-brand-orange">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        
        <h3
          className="text-2xl sm:text-3xl font-extrabold text-white mb-3"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {content.successTitle}
        </h3>
        
        <p className="text-zinc-300 text-sm sm:text-base max-w-md mx-auto mb-6">
          {content.successMessage}
        </p>

        {submissionId && (
          <div className="inline-block bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 mb-8">
            Reference ID: <span className="text-brand-orange font-bold">{submissionId}</span>
          </div>
        )}

        {/* Live GTM Event Notification Badge */}
        {lastGtmEvent && (
          <div className="w-full max-w-md bg-zinc-900/90 border border-brand-orange/40 rounded-2xl p-4 mb-8 text-left">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-orange uppercase mb-2">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>GTM DataLayer Event Triggered</span>
            </div>
            <pre className="text-[11px] font-mono text-zinc-300 bg-black/60 p-2.5 rounded-lg overflow-x-auto">
              {JSON.stringify(lastGtmEvent, null, 2)}
            </pre>
          </div>
        )}

        <button
          type="button"
          onClick={resetForm}
          className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors border border-zinc-700"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-zinc-950/80 border border-zinc-800/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl flex flex-col gap-6"
      aria-label="Contact and project brief form"
    >
      {errors.general && (
        <div className="p-4 bg-red-950/50 border border-red-800/80 rounded-2xl flex items-center gap-3 text-red-200 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
          <span>{errors.general}</span>
        </div>
      )}

      {/* Full Name */}
      <div className="space-y-2">
        <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
          Your Name <span className="text-brand-orange">*</span>
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="e.g. Elena Rostova"
          aria-required="true"
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className={`w-full px-4 py-3.5 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all ${
            errors.fullName ? "border-red-500 ring-1 ring-red-500" : "border-zinc-800 focus:border-brand-orange"
          }`}
        />
        {errors.fullName && (
          <p id="fullName-error" className="text-xs text-red-400 font-medium">
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
          Work Email <span className="text-brand-orange">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="elena@hyperscale.com"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`w-full px-4 py-3.5 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all ${
            errors.email ? "border-red-500 ring-1 ring-red-500" : "border-zinc-800 focus:border-brand-orange"
          }`}
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-red-400 font-medium">
            {errors.email}
          </p>
        )}
      </div>

      {/* Service Selection */}
      <div className="space-y-2">
        <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
          Service of Interest <span className="text-brand-orange">*</span>
        </label>
        <div className="relative">
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            aria-required="true"
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "service-error" : undefined}
            className={`w-full px-4 py-3.5 bg-zinc-900/90 border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all appearance-none cursor-pointer ${
              errors.service ? "border-red-500" : "border-zinc-800 focus:border-brand-orange"
            }`}
          >
            {content.fields
              .find((f) => f.name === "service")
              ?.options?.map((opt) => (
                <option key={opt} value={opt} className="bg-zinc-900 text-white">
                  {opt}
                </option>
              ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 text-xs">
            ▼
          </div>
        </div>
        {errors.service && (
          <p id="service-error" className="text-xs text-red-400 font-medium">
            {errors.service}
          </p>
        )}
      </div>

      {/* Project Brief Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
          Project Brief & Goals <span className="text-brand-orange">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your brand goals, scope, and anticipated timelines..."
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full px-4 py-3.5 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all resize-none ${
            errors.message ? "border-red-500 ring-1 ring-red-500" : "border-zinc-800 focus:border-brand-orange"
          }`}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-red-400 font-medium">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 bg-brand-orange hover:bg-brand-orangeHover disabled:bg-zinc-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-200 shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>TRANSMITTING BRIEF...</span>
          </>
        ) : (
          <>
            <span>{content.submitButtonText}</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      {/* GTM Integration Note */}
      <p className="text-[11px] font-mono text-zinc-500 text-center">
        * Submissions automatically push a verified <span className="text-zinc-400 font-bold">form_submit</span> conversion event to Google Tag Manager.
      </p>
    </form>
  );
}
