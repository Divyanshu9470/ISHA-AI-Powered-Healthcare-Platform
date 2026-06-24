"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number; // Index of correct option
}

const QUESTIONS_BY_CATEGORY: { [key: string]: Question[] } = {
    Anatomy: [
        {
            id: 1,
            question: "Which of the following is NOT a bone of the upper limb?",
            options: ["Humerus", "Radius", "Femur", "Ulna"],
            correctAnswer: 2,
        },
        {
            id: 2,
            question: "The pectoral girdle consists of which bones?",
            options: ["Scapula and Clavicle", "Sternum and Ribs", "Humerus and Scapula", "Clavicle and Sternum"],
            correctAnswer: 0,
        },
        {
            id: 3,
            question: "Which muscle is the primary abductor of the arm?",
            options: ["Pectoralis Major", "Deltoid", "Latissimus Dorsi", "Trapezius"],
            correctAnswer: 1,
        },
    ],
    Pathology: [
        {
            id: 1,
            question: "Which type of cellular adaptation is characterized by an increase in cell size?",
            options: ["Hyperplasia", "Hypertrophy", "Atrophy", "Metaplasia"],
            correctAnswer: 1,
        },
        {
            id: 2,
            question: "What is the hallmark of irreversible cell injury?",
            options: ["Cellular swelling", "Fatty change", "Amorphous densities in mitochondria / membrane rupture", "Ribosomal detachment"],
            correctAnswer: 2,
        },
        {
            id: 3,
            question: "Which type of necrosis is most commonly seen in brain infarcts?",
            options: ["Coagulative", "Liquefactive", "Caseous", "Fat necrosis"],
            correctAnswer: 1,
        },
    ],
    Physiology: [
        {
            id: 1,
            question: "What is the primary site of aldosterone action in the nephron?",
            options: ["Proximal Convoluted Tubule", "Loop of Henle", "Distal Convoluted Tubule and Collecting Duct", "Glomerulus"],
            correctAnswer: 2,
        },
        {
            id: 2,
            question: "Which of the following causes a right shift in the oxygen-hemoglobin dissociation curve?",
            options: ["Decreased temperature", "Decreased 2,3-BPG", "Increased pH", "Increased PCO2"],
            correctAnswer: 3,
        },
    ],
    Pharmacology: [
        {
            id: 1,
            question: "What is the primary mechanism of action of Warfarin?",
            options: ["Inhibits thrombin directly", "Inhibits factor Xa", "Vitamin K Antagonist", "Activates antithrombin III"],
            correctAnswer: 2,
        },
        {
            id: 2,
            question: "Which antibiotic is most classically associated with tendonitis and Achilles tendon rupture?",
            options: ["Ciprofloxacin", "Amoxicillin", "Doxycycline", "Erythromycin"],
            correctAnswer: 0,
        },
    ],
    Biochemistry: [
        {
            id: 1,
            question: "Which enzyme is the rate-limiting step of Glycolysis?",
            options: ["Hexokinase", "Phosphofructokinase-1 (PFK-1)", "Pyruvate Kinase", "Glucose-6-Phosphatase"],
            correctAnswer: 1,
        },
        {
            id: 2,
            question: "What is the primary product of the pentose phosphate pathway?",
            options: ["NADH", "FADH2", "NADPH and Ribose-5-phosphate", "ATP"],
            correctAnswer: 2,
        },
    ],
    General: [
        {
            id: 1,
            question: "What is the normal pH range of arterial blood?",
            options: ["7.00 - 7.10", "7.35 - 7.45", "7.50 - 7.60", "6.85 - 6.95"],
            correctAnswer: 1,
        },
    ]
};

interface QuizProps {
    category?: string;
}

export function Quiz({ category }: QuizProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const questions = QUESTIONS_BY_CATEGORY[category || "General"] || QUESTIONS_BY_CATEGORY["General"];
    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);
        if (index === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResult(true);
        }
    };

    const handleRetry = () => {
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setShowResult(false);
    };

    if (!currentQuestion) {
        return <div className="p-8 text-center text-muted-foreground">No quiz available for this topic yet.</div>;
    }

    if (showResult) {
        return (
            <div className="bg-card border border-border rounded-xl p-8 text-center animate-in zoom-in duration-300">
                <h3 className="text-2xl font-bold mb-4">Quiz Completed!</h3>
                <div className="text-6xl font-bold text-primary mb-2">{Math.round((score / questions.length) * 100)}%</div>
                <p className="text-muted-foreground mb-6">You scored {score} out of {questions.length}</p>
                <Button onClick={handleRetry} className="gap-2">
                    <RefreshCcw size={16} /> Retry Quiz
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">{category || "Module"} Quiz</h3>
                <span className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</span>
            </div>

            <div className="mb-6">
                <h4 className="text-lg font-medium mb-4">{currentQuestion.question}</h4>
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionSelect(index)}
                            disabled={isAnswered}
                            className={cn(
                                "w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center justify-between",
                                isAnswered
                                    ? index === currentQuestion.correctAnswer
                                        ? "bg-green-500/10 border-green-500 text-green-700 dark:text-green-400"
                                        : index === selectedOption
                                            ? "bg-red-500/10 border-red-500 text-red-700 dark:text-red-400"
                                            : "bg-muted/30 border-transparent opacity-60"
                                    : "bg-muted/30 border-transparent hover:bg-primary/5 hover:border-primary/50"
                            )}
                        >
                            <span>{option}</span>
                            {isAnswered && index === currentQuestion.correctAnswer && <CheckCircle size={20} className="text-green-500" />}
                            {isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer && <XCircle size={20} className="text-red-500" />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <Button onClick={handleNext} disabled={!isAnswered}>
                    {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                </Button>
            </div>
        </div>
    );
}
