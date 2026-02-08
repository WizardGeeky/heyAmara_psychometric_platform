
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ASSESSMENT_QUESTIONS, calculateScores } from '@/lib/psychometric-engine';
import { ProgressBar } from '@/components/Assessment/ProgressBar';
import { QuestionCard } from '@/components/Assessment/QuestionCard';
import { ChevronRight, ChevronLeft, Send, ShieldCheck, Mail, ArrowRight, BrainCircuit, Sparkles } from 'lucide-react';

export default function AssessmentPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [responses, setResponses] = useState<Record<string, number>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Load state if email already exists
    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        try {
            const res = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (data.status === 'completed') {
                localStorage.setItem('hey_amara_results', JSON.stringify({
                    email,
                    responses: data.userData.responses,
                    scores: data.userData.scores,
                    timestamp: data.userData.timestamp
                }));
                router.push(`/results?u=${encodeURIComponent(email)}`);
                return;
            }

            if (data.status === 'in-progress') {
                const savedResponses = data.userData.responses || {};
                setResponses(savedResponses);
                const answeredCount = Object.keys(savedResponses).length;
                setCurrentStep(Math.min(answeredCount, ASSESSMENT_QUESTIONS.length - 1));
            } else {
                const initial: Record<string, number> = {};
                ASSESSMENT_QUESTIONS.forEach(q => initial[q.id] = 3);
                setResponses(initial);
            }

            setIsEmailSubmitted(true);
        } catch (err) {
            console.error("Failed to check user", err);
        } finally {
            setIsLoading(false);
        }
    };

    const syncProgress = async (newResponses: Record<string, number>, isComplete = false) => {
        try {
            await fetch('/api/user', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    responses: newResponses,
                    isCompleted: isComplete
                })
            });
        } catch (err) {
            console.error("Failed to sync progress", err);
        }
    };

    const handleNext = () => {
        if (currentStep < ASSESSMENT_QUESTIONS.length - 1) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            syncProgress(responses);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const updateResponse = (value: number) => {
        const qId = ASSESSMENT_QUESTIONS[currentStep].id;
        setResponses(prev => ({ ...prev, [qId]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const finalScores = calculateScores(responses);

        await syncProgress(responses, true);

        localStorage.setItem('hey_amara_results', JSON.stringify({
            email,
            responses,
            scores: finalScores,
            timestamp: new Date().toISOString()
        }));

        // Send email with results
        try {
            await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    scores: finalScores
                })
            });
        } catch (error) {
            console.error('Failed to send email:', error);
            // Continue to results page even if email fails
        }

        setTimeout(() => {
            router.push(`/results?u=${encodeURIComponent(email)}`);
        }, 1500);
    };

    const currentQuestion = ASSESSMENT_QUESTIONS[currentStep];
    const isLastStep = currentStep === ASSESSMENT_QUESTIONS.length - 1;

    if (!isEmailSubmitted) {
        return (
            <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center px-4 relative overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px]" />

                <div className="max-w-md w-full relative z-10 card-premium p-8 md:p-14 animate-in fade-in zoom-in duration-700">
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mx-auto mb-8 shadow-inner ring-1 ring-primary/20">
                            <BrainCircuit size={42} />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4 leading-none">Identity Check</h2>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Professional Authentication v4.0</p>
                    </div>

                    <form onSubmit={handleEmailSubmit} className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email for data persistence</label>
                            <div className="relative group">
                                <Mail className="absolute left-6 top-12 md:top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@organization.com"
                                    className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-8 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-slate-800"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-lg"
                        >
                            {isLoading ? 'Processing...' : 'Access Report Data'}
                            {!isLoading && <ArrowRight size={22} />}
                        </button>
                    </form>

                    <div className="mt-12 flex items-center gap-4 justify-center">
                        <div className="h-[1px] flex-1 bg-slate-100" />
                        <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.4em]">Amara Secured Protocol</p>
                        <div className="h-[1px] flex-1 bg-slate-100" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] modern-grid py-20 px-6 relative flex flex-col items-center">
            {/* Ambient Background Glows */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#6467f2]/10 rounded-full blur-[120px] animate-pulse" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#2bd4bd]/10 rounded-full blur-[100px] animate-pulse" />

            <div className="max-w-5xl mx-auto relative z-10 w-full mb-20">
                <div className="glass-card rounded-[2rem] md:rounded-[3rem] p-6 sm:p-12 md:p-20 overflow-hidden relative border-white/50 shadow-2xl shadow-primary/5">
                    {/* Header Progress */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#6467f2]/10 border border-[#6467f2]/20 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm">
                            <Sparkles size={12} fill="currentColor" />
                            Dimensions Scanning
                        </div>
                        <h1 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">
                            Talent Pattern <span className="gradient-text">Analysis</span>
                        </h1>
                        <div className="bg-slate-50 inline-block px-4 py-1.5 rounded-full border border-slate-100">
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest truncate max-w-[250px]">
                                {email}
                            </p>
                        </div>
                    </div>

                    <ProgressBar current={currentStep + 1} total={ASSESSMENT_QUESTIONS.length} />

                    <div className="mt-14">
                        <QuestionCard
                            question={currentQuestion}
                            value={responses[currentQuestion.id] || 3}
                            onChange={updateResponse}
                        />

                        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6 mt-14">
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 0 || isSubmitting}
                                className="w-full sm:w-auto flex items-center justify-center gap-3 text-slate-400 font-black text-xs uppercase tracking-[0.2em] hover:text-slate-800 transition-colors disabled:opacity-0"
                            >
                                <ChevronLeft size={18} />
                                Previous Step
                            </button>

                            <div className="w-full sm:w-auto">
                                {isLastStep ? (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="btn-primary bg-[#2bd4bd] shadow-accent/20 w-full sm:w-auto py-5 px-12 flex items-center justify-center gap-3"
                                    >
                                        {isSubmitting ? 'Generating Signals...' : <><Send size={20} /> Finalize Intelligence</>}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        className="btn-primary w-full sm:w-auto py-5 px-12 flex items-center justify-center gap-3"
                                    >
                                        Next Dimension
                                        <ChevronRight size={22} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center flex-col items-center gap-4 opacity-30 group cursor-default">
                    <div className="h-12 w-[1 px] bg-slate-300 group-hover:bg-primary transition-colors" />
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.5em] group-hover:text-primary transition-colors">
                        Computational Integrity v4.0.2
                    </p>
                </div>
            </div>
        </div>
    );
}
