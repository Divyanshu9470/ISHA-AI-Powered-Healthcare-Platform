"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, Smartphone, Building, Wallet, X, 
  CheckCircle2, Loader2, Globe, ShieldCheck, 
  ChevronRight, Lock, Sparkles, Receipt
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id: string;
    title: string;
    price: number;
    currency?: string;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function CheckoutModal({ isOpen, onClose, course }: CheckoutModalProps) {
  const [step, setStep] = useState<'methods' | 'processing' | 'success'>('methods');
  const [selectedMethod, setSelectedMethod] = useState<string>("upi");
  const [isIndia, setIsIndia] = useState(true);
  
  const handlePayment = async () => {
    setStep('processing');
    
    try {
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course.id,
          amount: course.price,
          currency: isIndia ? "INR" : "USD",
        }),
      });
      
      if (res.status === 401) {
        window.location.href = "/login?callbackUrl=" + encodeURIComponent(window.location.pathname);
        return;
      }

      const order = await res.json();
      
      if (!res.ok) throw new Error(order.error || "Failed to create payment order");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dummy_id",
        amount: order.amount,
        currency: order.currency,
        name: "IshaMed",
        description: `Premium Enrollment: ${course.title}`,
        image: "/logo.png",
        order_id: order.id,
        handler: async function (response: any) {
          setStep('processing');
          const verifyRes = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: course.id,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.status === "SUCCESS") {
            setStep('success');
          } else {
            alert("Verification failed. Please check your transaction history.");
            setStep('methods');
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#0f172a",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error: any) {
      console.error("Payment failed:", error);
      alert(error.message || "Something went wrong.");
      setStep('methods');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl"
      />

      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-[#0f172a] border border-white/10 w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10"
      >
        {/* Animated Header Gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-600/20 to-transparent pointer-events-none" />

        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors z-20">
          <X className="w-6 h-6" />
        </button>

        <div className="p-10 relative z-10">
          <AnimatePresence mode="wait">
            {step === 'methods' && (
              <motion.div 
                key="methods"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-600/20 p-2 rounded-xl">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-blue-400 font-bold text-sm tracking-widest uppercase">Premium Enrollment</span>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">
                  Checkout <span className="text-slate-500">—</span> {course.title}
                </h2>

                <div className="flex bg-slate-900/50 p-1.5 rounded-2xl mb-8 border border-white/5">
                  <button 
                    onClick={() => setIsIndia(true)}
                    className={cn("flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2", isIndia ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-400 hover:text-white")}
                  >
                    Domestic (₹)
                  </button>
                  <button 
                    onClick={() => setIsIndia(false)}
                    className={cn("flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2", !isIndia ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-400 hover:text-white")}
                  >
                    International ($)
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {isIndia ? (
                    <>
                      <PaymentMethod 
                        id="upi" icon={Smartphone} label="UPI / PhonePe" 
                        selected={selectedMethod === "upi"} onSelect={setSelectedMethod} 
                      />
                      <PaymentMethod 
                        id="card" icon={CreditCard} label="Cards" 
                        selected={selectedMethod === "card"} onSelect={setSelectedMethod} 
                      />
                      <PaymentMethod 
                        id="netbanking" icon={Building} label="Netbanking" 
                        selected={selectedMethod === "netbanking"} onSelect={setSelectedMethod} 
                      />
                      <PaymentMethod 
                        id="wallet" icon={Wallet} label="Wallets" 
                        selected={selectedMethod === "wallet"} onSelect={setSelectedMethod} 
                      />
                    </>
                  ) : (
                    <>
                      <PaymentMethod 
                        id="card" icon={CreditCard} label="Global Cards" 
                        selected={selectedMethod === "card"} onSelect={setSelectedMethod} 
                      />
                      <PaymentMethod 
                        id="paypal" icon={Globe} label="PayPal" 
                        selected={selectedMethod === "paypal"} onSelect={setSelectedMethod} 
                      />
                    </>
                  )}
                </div>

                <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl mb-8">
                  <div className="flex justify-between items-center text-slate-400 mb-1">
                    <span className="text-sm font-medium">Payable Amount</span>
                    <span className="text-xs uppercase tracking-widest">Secure Checkout</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-4xl font-bold text-white tracking-tighter">
                      {isIndia ? "₹" : "$"}{course.price.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-1.5 text-green-500 text-sm font-bold bg-green-500/10 px-3 py-1 rounded-full">
                      <Lock className="w-3 h-3" /> SSL Secured
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handlePayment}
                  className="group relative w-full overflow-hidden bg-white text-black py-5 rounded-2xl font-black text-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  Confirm & Pay <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-center text-slate-500 text-xs mt-6 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Powered by Razorpay Secure Payment Gateway
                </p>
              </motion.div>
            )}

            {step === 'processing' && (
              <motion.div 
                key="processing"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-24 text-center"
              >
                <div className="relative w-20 h-20 mx-auto mb-10">
                  <Loader2 className="w-full h-full text-blue-500 animate-spin absolute inset-0" />
                  <div className="absolute inset-4 bg-blue-500/20 rounded-full animate-pulse" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Initializing Vault</h3>
                <p className="text-slate-400 text-lg">Communicating with the payment provider...</p>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div 
                key="success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-4xl font-black text-white mb-4 tracking-tighter">Purchase Complete</h3>
                <p className="text-slate-400 text-lg mb-10">Lifetime access granted for {course.title}.</p>
                
                <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[2rem] mb-10 text-left relative overflow-hidden">
                  <Receipt className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 -rotate-12" />
                  <div className="relative z-10">
                    <div className="flex justify-between mb-4 border-b border-white/5 pb-4">
                      <span className="text-slate-500 font-medium">Transaction ID</span>
                      <span className="text-white font-mono">TXN_ISH_{Math.random().toString(36).substring(7).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-slate-500">Amount Paid</span>
                      <span className="text-white">₹{course.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => window.location.href = `/courses/${course.id}`}
                  className="w-full bg-white text-black py-5 rounded-2xl font-black text-xl hover:scale-[1.02] transition-all"
                >
                  Access Your Lectures Now
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

function PaymentMethod({ id, icon: Icon, label, selected, onSelect }: any) {
  return (
    <button 
      onClick={() => onSelect(id)}
      className={cn(
        "w-full flex items-center gap-4 p-5 rounded-3xl border transition-all",
        selected 
          ? "bg-blue-600/10 border-blue-500 text-white shadow-lg shadow-blue-500/5" 
          : "bg-slate-900/40 border-white/5 text-slate-500 hover:bg-slate-900/80 hover:border-white/10"
      )}
    >
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all", selected ? "bg-blue-600 text-white" : "bg-white/5")}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="font-bold text-sm tracking-wide">{label}</span>
      {selected && <div className="ml-auto w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]" />}
    </button>
  );
}
