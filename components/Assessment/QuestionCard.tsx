
import React from 'react';
import { Question } from '@/lib/psychometric-engine';
import { Target } from 'lucide-react';

interface QuestionCardProps {
    question: Question;
    value: number;
    onChange: (value: number) => void;
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center gap-3 mb-8 opacity-40">
                <Target size={18} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Decision Point</span>
            </div>

            <div className="mb-14">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                    {question.text}
                </h3>
            </div>

            <div className="space-y-16">
                {/* Mobile Slider View */}
                <div className="lg:hidden space-y-12 bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/50 shadow-sm">
                    <div className="relative pt-1">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            value={value}
                            onChange={(e) => onChange(parseInt(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex justify-between w-full px-1 mt-6">
                            {[1, 2, 3, 4, 5].map((val) => (
                                <div key={val} className="flex flex-col items-center">
                                    <div className={`w-2.5 h-2.5 rounded-full mb-3 transition-all duration-300 ${value === val ? 'bg-primary scale-150 shadow-lg shadow-primary/40' : 'bg-slate-200'}`} />
                                    <span className={`text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${value === val ? 'text-primary' : 'text-slate-300'}`}>
                                        {val === 3 ? 'Neutral' : ''}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className={`space-y-3 p-6 rounded-2xl transition-all duration-500 border ${value < 3 ? 'bg-white border-primary/20 shadow-xl shadow-primary/5' : 'bg-transparent border-transparent opacity-30 blur-[0.5px]'}`}>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Alpha Profile</p>
                            <p className="text-base font-bold text-slate-800 leading-relaxed">
                                {question.lowLabel}
                            </p>
                        </div>
                        <div className={`space-y-3 p-6 rounded-2xl text-right transition-all duration-500 border ${value > 3 ? 'bg-white border-primary/20 shadow-xl shadow-primary/5' : 'bg-transparent border-transparent opacity-30 blur-[0.5px]'}`}>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Beta Profile</p>
                            <p className="text-base font-bold text-slate-800 leading-relaxed">
                                {question.highLabel}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Desktop Grid Selection View */}
                <div className="hidden lg:grid grid-cols-5 gap-6">
                    {[1, 2, 3, 4, 5].map((val) => (
                        <button
                            key={val}
                            onClick={() => onChange(val)}
                            className={`group relative p-8 rounded-[2rem] border-2 transition-all duration-500 flex flex-col items-center justify-between text-center min-h-[14rem] ${value === val
                                    ? 'bg-white border-primary shadow-[0_20px_50px_-12px_rgba(100,103,242,0.15)] scale-[1.05] z-20'
                                    : 'bg-white/50 border-white/50 backdrop-blur-sm hover:border-primary/20 hover:bg-white hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5'
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${value === val ? 'bg-primary text-white shadow-lg shadow-primary/30 rotate-0' : 'bg-slate-50 text-slate-300 rotate-6 group-hover:rotate-0'
                                }`}>
                                <span className="text-xl font-black">{val}</span>
                            </div>

                            <div className="space-y-2 flex-1 flex flex-col justify-center">
                                <p className={`text-[11px] font-black uppercase tracking-[0.15em] transition-colors leading-tight ${value === val ? 'text-primary' : 'text-slate-400'
                                    }`}>
                                    {val === 1 ? 'Strongly Reject' :
                                        val === 2 ? 'Inclined Left' :
                                            val === 3 ? 'Pure Neutral' :
                                                val === 4 ? 'Inclined Right' :
                                                    'Strongly Align'}
                                </p>
                            </div>

                            <div className={`mt-4 px-4 py-1 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-500 transform ${value === val ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                }`}>
                                Set Point
                            </div>
                        </button>
                    ))}
                </div>

                <div className="hidden lg:grid grid-cols-2 gap-16 mt-12">
                    <div className={`p-8 rounded-[2.5rem] transition-all duration-700 border-2 ${value < 3 ? 'bg-white border-primary/20 shadow-2xl shadow-primary/10 scale-[1.03]' : 'bg-white/20 border-white/40 opacity-20 blur-[1px]'}`}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Synthesis Branch: Left</p>
                        </div>
                        <p className="text-xl font-bold text-slate-800 leading-relaxed">
                            {question.lowLabel}
                        </p>
                    </div>
                    <div className={`p-8 rounded-[2.5rem] text-right transition-all duration-700 border-2 ${value > 3 ? 'bg-white border-primary/20 shadow-2xl shadow-primary/10 scale-[1.03]' : 'bg-white/20 border-white/40 opacity-20 blur-[1px]'}`}>
                        <div className="flex items-center gap-4 mb-6 justify-end">
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Synthesis Branch: Right</p>
                            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                        </div>
                        <p className="text-xl font-bold text-slate-800 leading-relaxed">
                            {question.highLabel}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
