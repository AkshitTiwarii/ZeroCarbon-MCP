"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Users,
  Briefcase,
  Globe,
  Mail,
  Phone,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Award,
} from "lucide-react";
import NotchNavbar from "@/components/ui/notch-navbar";

interface SocialPlatform {
  platform: string;
  url: string;
}

const inputClass =
  "w-full pl-12 pr-4 py-3.5 bg-white dark:bg-surface/60 border border-neutral-200 dark:border-white/10 rounded-xl text-sm font-body-md text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent-green/60 focus:border-accent-green/40 transition-all duration-200 shadow-xs hover:border-neutral-300 dark:hover:border-white/20";

const selectClass =
  "w-full pl-12 pr-4 py-3.5 bg-white dark:bg-surface/60 border border-neutral-200 dark:border-white/10 rounded-xl text-sm font-body-md text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-green/60 focus:border-accent-green/40 transition-all duration-200 appearance-none cursor-pointer shadow-xs hover:border-neutral-300 dark:hover:border-white/20";

const labelClass =
  "block text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500 dark:text-text-muted mb-1.5 font-body-md";

export default function RequestDemoPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    size: "",
    employees: "",
    country: "",
    industry: "",
    companyWebsite: "",
    referralSource: "",
    contactName: "",
    email: "",
    phone: "",
    useCase: "",
  });

  const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatform[]>([
    { platform: "", url: "" },
  ]);

  const [consents, setConsents] = useState({
    dataCollection: false,
    termsAndPrivacy: false,
    principalRights: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSocialChange = (index: number, field: "platform" | "url", value: string) => {
    const updated = [...socialPlatforms];
    updated[index][field] = value;
    setSocialPlatforms(updated);
  };

  const addSocialPlatform = () => {
    setSocialPlatforms((prev) => [...prev, { platform: "", url: "" }]);
  };

  const removeSocialPlatform = (index: number) => {
    setSocialPlatforms((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckboxChange = (key: keyof typeof consents) => {
    setConsents((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isFormValid =
    formData.companyName.trim() !== "" &&
    formData.size !== "" &&
    formData.country !== "" &&
    formData.industry !== "" &&
    formData.contactName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    consents.dataCollection &&
    consents.termsAndPrivacy &&
    consents.principalRights;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] dark:bg-[#0b130e] text-neutral-900 dark:text-white transition-colors duration-300">
      <NotchNavbar />

      <main className="flex-1 relative pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-accent-green/8 dark:bg-accent-green/12 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-40 right-10 w-[350px] h-[280px] bg-emerald-400/8 dark:bg-emerald-400/12 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Breadcrumb row */}
          <div className="flex items-center gap-4 mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-green/20 bg-white dark:bg-surface-container/60 backdrop-blur-md text-xs font-bold font-body-md text-accent-green hover:bg-surface-mint dark:hover:bg-surface-container transition-all shadow-sm group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              Back to home
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="demo-form"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Hero heading */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 rounded-full border border-accent-green/20 bg-white dark:bg-surface-container/60 px-3.5 py-1.5 text-[10px] font-bold font-body-md uppercase tracking-[0.18em] text-accent-green mb-5 shadow-xs">
                    <Sparkles className="w-3 h-3" />
                    ZeroCarbon Enterprise
                  </div>
                  <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-primary dark:text-white leading-[1.1] mb-5">
                    Experience{" "}
                    <span className="text-accent-green">ZeroCarbon</span>{" "}
                    for Your Organization
                  </h1>
                  <p className="font-body-xl text-base sm:text-lg text-neutral-500 dark:text-text-muted max-w-xl mx-auto leading-relaxed">
                    Discover how ZeroCarbon streamlines carbon accounting, BRSR
                    compliance, and AI agent workflows with a personalized walkthrough.
                  </p>
                </div>

                {/* Form card */}
                <div className="bg-white dark:bg-surface-container/60 backdrop-blur-xl border border-neutral-200/80 dark:border-white/8 rounded-3xl shadow-xl overflow-hidden">
                  {/* Card header stripe */}
                  <div className="px-8 sm:px-10 py-6 border-b border-neutral-100 dark:border-white/8 bg-neutral-50/80 dark:bg-surface/40">
                    <h2 className="font-display-lg text-xl font-bold text-primary dark:text-white mb-1">
                      Schedule a Custom Demo
                    </h2>
                    <p className="text-sm font-body-md text-neutral-500 dark:text-text-muted">
                      Fill out the details below — our sustainability engineers will set up a
                      tailored session for your enterprise.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="px-8 sm:px-10 py-8 space-y-7">

                    {/* Section: Company */}
                    <div>
                      <p className="text-[10px] font-bold font-body-md uppercase tracking-[0.15em] text-accent-green mb-4">
                        Company Details
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Company Name */}
                        <div>
                          <label htmlFor="companyName" className={labelClass}>
                            Company Name <span className="text-accent-green">*</span>
                          </label>
                          <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-text-muted" />
                            <input
                              type="text"
                              id="companyName"
                              required
                              value={formData.companyName}
                              onChange={handleInputChange}
                              placeholder="e.g. Acme Corporation"
                              className={inputClass}
                            />
                          </div>
                        </div>

                        {/* Company Size */}
                        <div>
                          <label htmlFor="size" className={labelClass}>
                            Company Size <span className="text-accent-green">*</span>
                          </label>
                          <div className="relative">
                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-text-muted" />
                            <select
                              id="size"
                              required
                              value={formData.size}
                              onChange={handleInputChange}
                              className={selectClass}
                            >
                              <option value="" disabled className="bg-white dark:bg-surface">Select company size</option>
                              <option value="1-10" className="bg-white dark:bg-surface">1–10 employees</option>
                              <option value="11-50" className="bg-white dark:bg-surface">11–50 employees</option>
                              <option value="51-200" className="bg-white dark:bg-surface">51–200 employees</option>
                              <option value="201-1000" className="bg-white dark:bg-surface">201–1,000 employees</option>
                              <option value="1000+" className="bg-white dark:bg-surface">1,000+ employees</option>
                            </select>
                          </div>
                        </div>

                        {/* Exact Employees */}
                        <div>
                          <label htmlFor="employees" className={labelClass}>
                            Exact Employee Count{" "}
                            <span className="text-neutral-400 font-normal normal-case tracking-normal">
                              (optional)
                            </span>
                          </label>
                          <div className="relative">
                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-text-muted" />
                            <input
                              type="text"
                              id="employees"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              value={formData.employees}
                              onChange={handleInputChange}
                              placeholder="e.g. 150"
                              className={inputClass}
                            />
                          </div>
                        </div>

                        {/* Country */}
                        <div>
                          <label htmlFor="country" className={labelClass}>
                            Country <span className="text-accent-green">*</span>
                          </label>
                          <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-text-muted" />
                            <select
                              id="country"
                              required
                              value={formData.country}
                              onChange={handleInputChange}
                              className={selectClass}
                            >
                              <option value="" disabled className="bg-white dark:bg-surface">Select country</option>
                              <option value="India" className="bg-white dark:bg-surface">India 🇮🇳</option>
                              <option value="United States" className="bg-white dark:bg-surface">United States 🇺🇸</option>
                              <option value="United Kingdom" className="bg-white dark:bg-surface">United Kingdom 🇬🇧</option>
                              <option value="Germany" className="bg-white dark:bg-surface">Germany 🇩🇪</option>
                              <option value="Singapore" className="bg-white dark:bg-surface">Singapore 🇸🇬</option>
                              <option value="Other" className="bg-white dark:bg-surface">Other</option>
                            </select>
                          </div>
                        </div>

                        {/* Industry */}
                        <div>
                          <label htmlFor="industry" className={labelClass}>
                            Industry <span className="text-accent-green">*</span>
                          </label>
                          <div className="relative">
                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-text-muted" />
                            <select
                              id="industry"
                              required
                              value={formData.industry}
                              onChange={handleInputChange}
                              className={selectClass}
                            >
                              <option value="" disabled className="bg-white dark:bg-surface">Select industry</option>
                              <option value="Technology" className="bg-white dark:bg-surface">Technology & Software</option>
                              <option value="Manufacturing" className="bg-white dark:bg-surface">Manufacturing & Industrial</option>
                              <option value="Retail" className="bg-white dark:bg-surface">Retail & E-commerce</option>
                              <option value="Finance" className="bg-white dark:bg-surface">Finance & Banking</option>
                              <option value="Healthcare" className="bg-white dark:bg-surface">Healthcare & Life Sciences</option>
                              <option value="Energy" className="bg-white dark:bg-surface">Energy & Utilities</option>
                              <option value="Transportation" className="bg-white dark:bg-surface">Transportation & Logistics</option>
                              <option value="Other" className="bg-white dark:bg-surface">Other</option>
                            </select>
                          </div>
                        </div>

                        {/* Company Website */}
                        <div>
                          <label htmlFor="companyWebsite" className={labelClass}>
                            Company Website{" "}
                            <span className="text-neutral-400 font-normal normal-case tracking-normal">
                              (optional)
                            </span>
                          </label>
                          <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-text-muted" />
                            <input
                              type="url"
                              id="companyWebsite"
                              value={formData.companyWebsite}
                              onChange={handleInputChange}
                              placeholder="https://yourcompany.com"
                              className={inputClass}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-neutral-100 dark:border-white/8" />

                    {/* Social & Referral */}
                    <div className="space-y-5">
                      {/* Social platforms */}
                      <div>
                        <label className={labelClass}>
                          Social Media Handles{" "}
                          <span className="text-neutral-400 font-normal normal-case tracking-normal">
                            (optional)
                          </span>
                        </label>
                        <div className="space-y-2.5">
                          {socialPlatforms.map((item, index) => (
                            <div key={index} className="flex gap-2 items-center">
                              <input
                                type="text"
                                placeholder="Platform (e.g. LinkedIn)"
                                value={item.platform}
                                onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                                className="flex-1 px-4 py-3 bg-white dark:bg-surface/60 border border-neutral-200 dark:border-white/10 rounded-xl text-sm font-body-md text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent-green/60 transition-all"
                              />
                              <input
                                type="url"
                                placeholder="Profile URL"
                                value={item.url}
                                onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                                className="flex-1 px-4 py-3 bg-white dark:bg-surface/60 border border-neutral-200 dark:border-white/10 rounded-xl text-sm font-body-md text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent-green/60 transition-all"
                              />
                              {socialPlatforms.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeSocialPlatform(index)}
                                  className="p-2.5 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                                  title="Remove"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={addSocialPlatform}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-surface-mint/70 dark:bg-surface-container/80 hover:bg-surface-mint text-accent-green rounded-xl text-xs font-bold font-body-md transition-all border border-accent-green/15"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Add Another Platform
                          </button>
                        </div>
                      </div>

                      {/* Referral source */}
                      <div>
                        <label htmlFor="referralSource" className={labelClass}>
                          How Did You Hear About Us?
                        </label>
                        <div className="relative">
                          <select
                            id="referralSource"
                            value={formData.referralSource}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 bg-white dark:bg-surface/60 border border-neutral-200 dark:border-white/10 rounded-xl text-sm font-body-md text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-green/60 transition-all appearance-none cursor-pointer shadow-xs hover:border-neutral-300 dark:hover:border-white/20"
                          >
                            <option value="" className="bg-white dark:bg-surface">Select source</option>
                            <option value="LinkedIn" className="bg-white dark:bg-surface">LinkedIn</option>
                            <option value="Google Search" className="bg-white dark:bg-surface">Google Search</option>
                            <option value="Twitter/X" className="bg-white dark:bg-surface">Twitter (X)</option>
                            <option value="Peerlist" className="bg-white dark:bg-surface">Peerlist</option>
                            <option value="ProductHunt" className="bg-white dark:bg-surface">ProductHunt</option>
                            <option value="Other" className="bg-white dark:bg-surface">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-neutral-100 dark:border-white/8" />

                    {/* Section: Contact */}
                    <div>
                      <p className="text-[10px] font-bold font-body-md uppercase tracking-[0.15em] text-accent-green mb-4">
                        Primary Contact
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Contact Name */}
                        <div>
                          <label htmlFor="contactName" className={labelClass}>
                            Your Full Name <span className="text-accent-green">*</span>
                          </label>
                          <div className="relative">
                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-text-muted" />
                            <input
                              type="text"
                              id="contactName"
                              required
                              value={formData.contactName}
                              onChange={handleInputChange}
                              placeholder="Your Name"
                              className={inputClass}
                            />
                          </div>
                        </div>

                        {/* Work Email */}
                        <div>
                          <label htmlFor="email" className={labelClass}>
                            Work Email <span className="text-accent-green">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-text-muted" />
                            <input
                              type="email"
                              id="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="you@company.com"
                              className={inputClass}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="mt-5">
                        <label htmlFor="phone" className={labelClass}>
                          Phone Number <span className="text-accent-green">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-text-muted" />
                          <input
                            type="tel"
                            id="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210 / +1 (555) 000-0000"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      {/* Use Case */}
                      <div className="mt-5">
                        <label htmlFor="useCase" className={labelClass}>
                          How Can We Help?{" "}
                          <span className="text-neutral-400 font-normal normal-case tracking-normal">
                            (optional)
                          </span>
                        </label>
                        <textarea
                          id="useCase"
                          rows={4}
                          value={formData.useCase}
                          onChange={handleInputChange}
                          placeholder="Describe your carbon accounting, Scope 3 tracking, or BRSR compliance goals..."
                          className="w-full px-4 py-3.5 bg-white dark:bg-surface/60 border border-neutral-200 dark:border-white/10 rounded-xl text-sm font-body-md text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent-green/60 focus:border-accent-green/40 transition-all resize-none shadow-xs hover:border-neutral-300 dark:hover:border-white/20"
                        />
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-neutral-100 dark:border-white/8" />

                    {/* Privacy & Consent box */}
                    <div className="rounded-2xl border border-accent-green/20 dark:border-accent-green/20 bg-surface-mint/40 dark:bg-surface-container/60 p-5 space-y-4">
                      <div className="flex items-center gap-2 text-accent-green font-bold text-[10px] font-body-md uppercase tracking-[0.15em]">
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                        Global Privacy & Data Governance
                      </div>
                      <p className="text-xs font-body-md text-neutral-500 dark:text-text-muted leading-relaxed">
                        In accordance with GDPR, CCPA, and DPDP Act India, please
                        acknowledge our data collection terms:
                      </p>
                      <ul className="text-xs font-body-md text-neutral-500 dark:text-text-muted space-y-1.5 list-disc pl-4 leading-relaxed">
                        <li>
                          <strong className="text-neutral-700 dark:text-neutral-200">What we collect:</strong>{" "}
                          Company profile, contact info, work email, and technical requirements.
                        </li>
                        <li>
                          <strong className="text-neutral-700 dark:text-neutral-200">Why:</strong>{" "}
                          Exclusively for carbon accounting evaluation and custom demo setup. We never sell or share data.
                        </li>
                        <li>
                          <strong className="text-neutral-700 dark:text-neutral-200">Storage:</strong>{" "}
                          AES-256 encrypted and securely stored.
                        </li>
                      </ul>

                      <div className="space-y-3 pt-3 border-t border-accent-green/15 dark:border-white/8">
                        {[
                          {
                            key: "dataCollection" as const,
                            text: "I consent to the collection of my company and contact data for carbon calculation and custom demo configuration.",
                          },
                          {
                            key: "termsAndPrivacy" as const,
                            text: "I agree to the Terms of Service, Privacy Policy, and Data Security Framework.",
                          },
                          {
                            key: "principalRights" as const,
                            text: "I understand I can access, correct, or delete my data by emailing support@zerocarbon.org.in.",
                          },
                        ].map(({ key, text }) => (
                          <label key={key} className="flex items-start gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={consents[key]}
                              onChange={() => handleCheckboxChange(key)}
                              className="mt-0.5 w-4 h-4 rounded accent-accent-green cursor-pointer border-neutral-300 focus:ring-accent-green focus:ring-offset-0"
                            />
                            <span className="text-xs font-body-md text-neutral-600 dark:text-neutral-300 leading-normal select-none group-hover:text-accent-green transition-colors">
                              {text}{" "}
                              <span className="text-accent-green font-bold">*</span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className="w-full py-4 px-8 bg-primary dark:bg-accent-green text-white dark:text-primary font-bold font-body-md rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Processing Demo Request...
                        </>
                      ) : (
                        <>
                          Request Enterprise Demo
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>

                    <p className="text-[11px] font-body-md text-neutral-400 dark:text-text-muted text-center">
                      🔒 Zero spam. SOC2 Type II compliant · AES-256 encrypted.
                    </p>
                  </form>
                </div>
              </motion.div>
            ) : (
              /* Success state */
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-white dark:bg-surface-container/80 backdrop-blur-xl border border-accent-green/25 rounded-3xl p-10 sm:p-16 text-center shadow-2xl"
              >
                <div className="w-16 h-16 bg-accent-green/15 text-accent-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h2 className="font-display-lg text-3xl sm:text-4xl font-extrabold text-primary dark:text-white mb-3">
                  Demo Request Confirmed!
                </h2>
                <p className="font-body-xl text-base sm:text-lg text-neutral-500 dark:text-text-muted max-w-md mx-auto mb-8 leading-relaxed">
                  Thank you,{" "}
                  <span className="font-bold text-accent-green">{formData.contactName}</span>.
                  Our sustainability engineering team has received your request for{" "}
                  <span className="font-semibold text-primary dark:text-white">{formData.companyName}</span>.
                </p>

                <div className="bg-surface-mint/50 dark:bg-surface/60 rounded-2xl p-6 max-w-sm mx-auto mb-8 text-left border border-accent-green/15 space-y-3">
                  {[
                    "Assigned Lead Engineer review",
                    `Calendar invite sent to ${formData.email}`,
                    "Custom sandbox access token included in invite",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-body-md text-neutral-600 dark:text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/"
                    className="px-8 py-3.5 rounded-full bg-primary text-white dark:bg-accent-green dark:text-primary font-bold font-body-md text-sm hover:opacity-90 transition-all"
                  >
                    Return to Homepage
                  </Link>
                  <Link
                    href="/docs"
                    className="px-8 py-3.5 rounded-full border border-neutral-200 dark:border-white/15 text-neutral-700 dark:text-white font-bold font-body-md text-sm hover:bg-neutral-100 dark:hover:bg-white/8 transition-colors"
                  >
                    Explore Documentation
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enterprise partnerships */}
          <div className="mt-14 bg-white dark:bg-surface-container/50 border border-neutral-200/80 dark:border-white/8 rounded-3xl p-8 sm:p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-accent-green" />
              <h2 className="font-display-lg text-xl font-bold text-primary dark:text-white">
                Enterprise & Institutional Partnerships
              </h2>
            </div>
            <p className="text-sm font-body-md text-neutral-500 dark:text-text-muted mb-7 leading-relaxed">
              For large-scale deployments, custom MCP server integrations, or institutional
              carbon accounting, reach our specialized teams directly.
            </p>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
              {[
                {
                  icon: <Briefcase className="w-4 h-4 text-accent-green" />,
                  title: "Enterprise Sales",
                  desc: "Dedicated SLAs, custom data isolation, and multi-tenant telemetry pipelines.",
                },
                {
                  icon: <Building2 className="w-4 h-4 text-accent-green" />,
                  title: "Technical & MCP Partnerships",
                  desc: "API integrations, carbon offset API, and custom MCP tools.",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-neutral-50 dark:bg-surface/60 rounded-2xl p-5 border border-neutral-200 dark:border-white/8"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    {icon}
                    <h3 className="font-bold font-body-md text-sm text-primary dark:text-white">{title}</h3>
                  </div>
                  <p className="text-xs font-body-md text-neutral-500 dark:text-text-muted mb-3 leading-relaxed">{desc}</p>
                  <a
                    href="mailto:support@zerocarbon.org.in"
                    className="text-accent-green hover:underline font-bold font-body-md text-xs inline-flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3" />
                    support@zerocarbon.org.in
                  </a>
                </div>
              ))}
            </div>

            {/* MSME badge */}
            <div className="p-4 bg-neutral-50 dark:bg-surface/60 rounded-2xl border border-neutral-200 dark:border-white/8 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
              <p className="text-xs font-body-md text-neutral-600 dark:text-neutral-300 leading-relaxed">
                <strong className="text-accent-green">MSME-Registered Entity:</strong>{" "}
                ZeroCarbon is an MSME (Udyam) registered entity under Government of India
                guidelines, eligible for enterprise contracts and institutional carbon
                compliance frameworks.{" "}
                <span className="font-mono font-semibold">Udyam No: DL-11-0146882</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer — identical to main page */}
      <footer className="relative bg-primary text-white py-20 px-6 lg:px-12 overflow-hidden border-t border-white/5 select-none">
        {/* Giant Background watermark text (Otter.ai style) */}
        <div className="absolute bottom-[-5%] sm:bottom-[-8%] md:bottom-[-10%] left-1/2 -translate-x-1/2 pointer-events-none select-none w-full text-center overflow-hidden z-0">
          <span className="font-sans font-black text-[9.5vw] tracking-tighter leading-none text-[#092e1e] dark:text-[#092e1e]/85 uppercase block whitespace-nowrap">
            ZeroCarbon
          </span>
        </div>

        <div className="relative z-10 max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1 space-y-6">
            <div className="font-headline-lg text-[24px] font-bold text-white">ZeroCarbon MCP</div>
            <p className="font-body-md text-neutral-400">The AI-native OS for sustainable engineering teams.</p>
          </div>
          <div>
            <p className="font-label-caps text-accent-green mb-6 font-bold">Product</p>
            <ul className="space-y-4">
              <li><Link href="/#features" className="text-body-md text-neutral-400 hover:text-white transition-colors">Solutions</Link></li>
              <li><Link href="/#architecture" className="text-body-md text-neutral-400 hover:text-white transition-colors">Architecture</Link></li>
              <li><Link href="/request-demo" className="text-body-md text-accent-green font-semibold hover:text-white transition-colors">Request Demo</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-label-caps text-accent-green mb-6 font-bold">Resources</p>
            <ul className="space-y-4">
              <li><Link href="/docs" className="text-body-md text-neutral-400 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/docs#authentication" className="text-body-md text-neutral-400 hover:text-white transition-colors">API Reference</Link></li>
              <li><Link href="/#features" className="text-body-md text-neutral-400 hover:text-white transition-colors">Case Studies</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-label-caps text-accent-green mb-6 font-bold">Legal</p>
            <ul className="space-y-4">
              <li><a href="mailto:support@zerocarbon.org.in" className="text-body-md text-neutral-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="mailto:support@zerocarbon.org.in" className="text-body-md text-neutral-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><Link href="/#faq" className="text-body-md text-neutral-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
        <div className="relative z-10 max-w-container-max mx-auto mt-20 pt-10 border-t border-neutral-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-body-md text-neutral-400">
          <p className="text-center sm:text-left">© 2026 ZeroCarbon MCP. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" aria-label="ZeroCarbon MCP Public Portal" className="hover:text-white transition-colors text-neutral-400">
              <span className="material-symbols-outlined" aria-hidden="true">public</span>
            </Link>
            <Link href="/docs" aria-label="ZeroCarbon MCP Terminal Console" className="hover:text-white transition-colors text-neutral-400">
              <span className="material-symbols-outlined" aria-hidden="true">terminal</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
