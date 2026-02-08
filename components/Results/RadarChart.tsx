
'use client';

import React from 'react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';
import { Scores } from '@/lib/psychometric-engine';

interface RadarChartProps {
    scores: Scores;
}

export function RadarChartComponent({ scores }: RadarChartProps) {
    const data = [
        { subject: 'Cognitive', A: scores.cognitive, fullMark: 100 },
        { subject: 'Behavior', A: scores.behavior, fullMark: 100 },
        { subject: 'Motivation', A: scores.motivation, fullMark: 100 },
        { subject: 'Collaboration', A: scores.collaboration, fullMark: 100 },
    ];

    const renderCustomAxisTick = (props: any) => {
        const { x, y, payload } = props;
        const score = data.find(d => d.subject === payload.value)?.A;

        let dyLabel = -15;
        let dyScore = 5;

        // Adjust vertically for top/bottom items
        if (y < 200) { dyLabel = -20; dyScore = -5; }
        if (y > 200) { dyLabel = 15; dyScore = 30; }

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={dyLabel}
                    textAnchor="middle"
                    fill="#475569"
                    className="text-[10px] font-bold uppercase tracking-widest"
                >
                    {payload.value}
                </text>
                <text
                    x={0}
                    y={0}
                    dy={dyScore}
                    textAnchor="middle"
                    fill="#6366f1"
                    className="text-[14px] font-black"
                >
                    {score}%
                </text>
            </g>
        );
    };

    return (
        <div className="w-full h-[350px] md:h-[450px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
                    <PolarGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={renderCustomAxisTick}
                    />
                    <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        ticks={[25, 50, 75, 100] as any}
                        tick={{ fill: '#cbd5e1', fontSize: 10, fontWeight: 'bold' }}
                        axisLine={false}
                    />
                    <Radar
                        name="Candidate Profile"
                        dataKey="A"
                        stroke="#6366f1"
                        strokeWidth={4}
                        fill="url(#radarGradient)"
                        fillOpacity={0.6}
                        animationDuration={2000}
                    />
                    <defs>
                        <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#2bd4bd" stopOpacity={0.4} />
                        </linearGradient>
                    </defs>
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
