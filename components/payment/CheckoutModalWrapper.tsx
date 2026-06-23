"use client";

import { useState } from "react";
import { CheckoutModal } from "./CheckoutModal";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CheckoutModalWrapperProps {
  course: {
    id: string;
    title: string;
    price: number;
  };
}

export function CheckoutModalWrapper({ course }: CheckoutModalWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-white text-black hover:bg-slate-200 px-8 py-6 rounded-2xl font-bold text-lg transition-all flex items-center gap-2 group"
      >
        <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
        Unlock This Course — ₹{course.price.toLocaleString()}
      </Button>

      <CheckoutModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        course={course} 
      />
    </>
  );
}
