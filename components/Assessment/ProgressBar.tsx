
import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
    const percentage = Math.round((current / total) * 100);

    return (
        <div className="w-full mb-12">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-1">Current Depth</span>
                    <span className="text-2xl font-black text-slate-900 leading-none">{current} <span className="text-slate-300">/ {total}</span></span>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] block mb-1">Signal Index</span>
                    <span className="text-2xl font-black text-primary leading-none">{percentage}%</span>
                </div>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-1 border border-slate-50">
                <div
                    className="bg-primary h-full border border-white/20 rounded-full transition-all duration-700 ease-out shadow-sm"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
}
