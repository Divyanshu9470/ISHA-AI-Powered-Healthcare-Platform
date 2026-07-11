"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Stethoscope, Eye, EyeOff, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess("Account created! Please log in.");
    }
    if (searchParams.get("error") === "OAuthAccountNotLinked") {
      setError("This email is already registered. Please log in with email & password.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Please check your credentials and try again.");
        setIsLoading(false);
      } else {
        router.push("/courses");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError("");
    await signIn("google", { callbackUrl: "/courses" });
    setIsGoogleLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 dark:bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal/10 dark:bg-teal/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[460px] bg-white dark:bg-slate-900/60 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800/50 p-10 relative z-10 backdrop-blur-xl"
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
          <h1 className="text-[28px] font-bold text-slate-950 dark:text-white tracking-tight">Sign into your account</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-light">Enter your credentials to access your courses.</p>
        </div>

        {/* Tab Switcher - Sign up vs Log in */}
        <div className="relative flex p-1.5 bg-slate-100 dark:bg-slate-950/60 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 max-w-[260px] mx-auto mt-8 mb-8">
          <Link
            href="/register"
            className="flex-1 text-center py-2.5 text-xs font-semibold rounded-xl text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-all duration-300"
          >
            Sign up
          </Link>
          <div className="flex-1 text-center py-2.5 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm border border-slate-200/10 dark:border-slate-850">
            Log in
          </div>
        </div>

        {success && (
          <div className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 p-3.5 rounded-2xl text-xs font-semibold text-center mb-4 border border-emerald-100 dark:border-emerald-500/20 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-3.5 rounded-2xl text-xs font-semibold text-center mb-6 border border-red-100 dark:border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3.5 border border-slate-200/80 dark:border-slate-800/50 rounded-2xl bg-slate-50 dark:bg-slate-950/40 text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none duration-300"
                placeholder="doctor@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Password</label>
              <a href="#" className="text-xs font-semibold text-primary hover:underline transition-all">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-4 pr-12 py-3.5 border border-slate-200/80 dark:border-slate-800/50 rounded-2xl bg-slate-50 dark:bg-slate-950/40 text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none duration-300"
                placeholder="••••••••"
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white py-4 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-primary/20 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>Sign in <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>



        <p className="mt-8 text-center text-[11px] text-slate-400 dark:text-slate-500 font-light leading-relaxed">
          By logging in, you agree to our{" "}
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

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}

