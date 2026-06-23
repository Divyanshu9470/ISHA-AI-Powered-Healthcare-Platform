"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Star, Users, PlayCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutModal } from "@/components/payment/CheckoutModal";

interface CourseCardProps {
    id: string;
    title: string;
    instructor: string;
    thumbnail: string;
    duration: string;
    rating: number;
    students: number;
    category: string;
    price?: number;
}

export function CourseCard({
    id,
    title,
    instructor,
    thumbnail,
    duration,
    rating,
    students,
    category,
    price = 2999,
}: CourseCardProps) {
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    return (
        <div className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
            <div className="relative h-48 w-full bg-muted overflow-hidden">
                {thumbnail ? (
                    <img 
                        src={thumbnail} 
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-105 transition-transform duration-500" />
                )}
                <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-foreground">
                    {category}
                </div>
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    ₹{price.toLocaleString()}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">By {instructor}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6 mt-auto">
                    <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span>{rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{students}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={() => setIsCheckoutOpen(true)}
                    >
                        <ShoppingCart size={16} /> Buy
                    </Button>
                    <Link href={`/courses/${id}`}>
                        <Button className="w-full gap-2">
                            <PlayCircle size={16} /> Details
                        </Button>
                    </Link>
                </div>
            </div>

            <CheckoutModal 
                isOpen={isCheckoutOpen} 
                onClose={() => setIsCheckoutOpen(false)} 
                course={{ id, title, price }}
            />
        </div>
    );
}
