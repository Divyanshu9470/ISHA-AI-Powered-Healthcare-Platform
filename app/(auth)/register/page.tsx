"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, Eye, EyeOff, ArrowRight, Loader2, Globe, MapPin, School, Hash, ChevronDown, ChevronUp } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [university, setUniversity] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOptional, setShowOptional] = useState(false);
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, phone, country, state, university, rollNumber }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      // Success, redirect to login page with registered flag
      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 dark:bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal/10 dark:bg-teal/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[460px] bg-white dark:bg-slate-900/60 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800/50 p-10 relative z-10 my-10 backdrop-blur-xl"
      >
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-105">
              <Stethoscope className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Isha<span className="text-primary">Med</span>
            </span>
          </Link>
          <h1 className="text-[28px] font-bold text-slate-950 dark:text-white tracking-tight">Create your account</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-light">Sign up and get 1 month free trial</p>
        </div>

        {/* Tab Switcher - Sign up vs Log in */}
        <div className="relative flex p-1.5 bg-slate-100 dark:bg-slate-950/60 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 max-w-[260px] mx-auto mt-8 mb-8">
          <div className="flex-1 text-center py-2.5 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm border border-slate-200/10 dark:border-slate-850">
            Sign up
          </div>
          <Link
            href="/login"
            className="flex-1 text-center py-2.5 text-xs font-semibold rounded-xl text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-all duration-300"
          >
            Log in
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-3.5 rounded-2xl text-xs font-semibold text-center mb-6 border border-red-100 dark:border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Full name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-3.5 border border-slate-200/80 dark:border-slate-800/50 rounded-2xl bg-slate-50 dark:bg-slate-950/40 text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none duration-300"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3.5 border border-slate-200/80 dark:border-slate-800/50 rounded-2xl bg-slate-50 dark:bg-slate-950/40 text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none duration-300"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
            <div className="relative">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full px-4 py-3.5 border border-slate-200/80 dark:border-slate-800/50 rounded-2xl bg-slate-50 dark:bg-slate-950/40 text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none duration-300"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-4 pr-12 py-3.5 border border-slate-200/80 dark:border-slate-800/50 rounded-2xl bg-slate-50 dark:bg-slate-950/40 text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none duration-300"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Repeat the password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-4 pr-12 py-3.5 border border-slate-200/80 dark:border-slate-800/50 rounded-2xl bg-slate-50 dark:bg-slate-950/40 text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none duration-300"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Academic Info - Collapsible Accordion */}
          <div className="border border-slate-200/50 dark:border-slate-800/50 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
            <button
              type="button"
              onClick={() => setShowOptional(!showOptional)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-900/40 transition-all duration-300"
            >
              <span>ACADEMIC PROFILE DETAILS (OPTIONAL)</span>
              {showOptional ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            <AnimatePresence>
              {showOptional && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4 space-y-4 border-t border-slate-200/20 dark:border-slate-800/20 pt-3"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Country</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="block w-full px-3 py-2 border border-slate-200/80 dark:border-slate-800/50 rounded-xl bg-white dark:bg-slate-950/40 text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-xs font-medium focus:ring-1 focus:ring-primary focus:border-transparent transition-all outline-none duration-300"
                          placeholder="e.g. India"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">State</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="block w-full px-3 py-2 border border-slate-200/80 dark:border-slate-800/50 rounded-xl bg-white dark:bg-slate-950/40 text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-xs font-medium focus:ring-1 focus:ring-primary focus:border-transparent transition-all outline-none duration-300"
                          placeholder="e.g. Delhi"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">University / College</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        className="block w-full px-3 py-2 border border-slate-200/80 dark:border-slate-800/50 rounded-xl bg-white dark:bg-slate-950/40 text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-xs font-medium focus:ring-1 focus:ring-primary focus:border-transparent transition-all outline-none duration-300"
                        placeholder="e.g. AIIMS Delhi"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Registration / Roll Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        className="block w-full px-3 py-2 border border-slate-200/80 dark:border-slate-800/50 rounded-xl bg-white dark:bg-slate-950/40 text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-xs font-medium focus:ring-1 focus:ring-primary focus:border-transparent transition-all outline-none duration-300"
                        placeholder="e.g. REG123456"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white py-4 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-primary/20 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>Sign up <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        {/* Social Signups */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            type="button"
            onClick={() => alert("Google sign-in is coming soon!")}
            className="flex items-center justify-center py-3.5 px-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/50 bg-white dark:bg-slate-950/40 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61a5.66 5.66 0 0 1-2.45 3.72v3.08h3.95c2.31-2.13 3.64-5.27 3.64-8.65z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.95-3.08c-1.1.74-2.51 1.18-4.01 1.18-3.09 0-5.71-2.09-6.64-4.9H1.32v3.19A12 12 0 0 0 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.36 14.29a7.2 7.2 0 0 1 0-4.58V6.52H1.32a12 12 0 0 0 0 10.96l4.04-3.19z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42A12 12 0 0 0 1.32 6.52l4.04 3.19c.93-2.8 3.55-4.96 6.64-4.96z"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => alert("Apple sign-in is coming soon!")}
            className="flex items-center justify-center py-3.5 px-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/50 bg-white dark:bg-slate-950/40 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all duration-300"
          >
            <svg className="w-5 h-5 fill-current text-slate-950 dark:text-white" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.5-.63.73-1.18 1.87-1.03 2.98 1.12.09 2.26-.57 2.96-1.42z" />
            </svg>
          </button>
        </div>

        <p className="mt-8 text-center text-[11px] text-slate-400 dark:text-slate-500 font-light leading-relaxed">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="font-semibold text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-semibold text-primary hover:underline">
            Privacy Policy
          </Link>.
        </p>
      </motion.div>
    </div>
  );
}
