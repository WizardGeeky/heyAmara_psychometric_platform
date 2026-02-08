
export type DimensionKey = 'cognitive' | 'behavior' | 'motivation' | 'collaboration';

export interface Question {
  id: string;
  dimension: DimensionKey;
  text: string;
  lowLabel: string;
  highLabel: string;
  weight: number; // For future complexity, currently 1
}

// Load questions from JSON file
import questionsData from '@/data/questions.json';
export const ASSESSMENT_QUESTIONS: Question[] = questionsData.questions as Question[];


export interface Scores {
  cognitive: number;
  behavior: number;
  motivation: number;
  collaboration: number;
}

export interface AssessmentResult {
  scores: Scores;
  traits: Record<DimensionKey, {
    label: string;
    description: string;
    level: 'Low' | 'Moderate' | 'High';
  }>;
  interpretation: string;
  strengths: string[];
  risks: string[];
  bestFitRoles: string[];
  hiringSignal: string;
  cultureAlignment: number;
  responses?: Record<string, number>;
  questions: Question[];
}

export function calculateScores(responses: Record<string, number>): Scores {
  const scores: Scores = {
    cognitive: 0,
    behavior: 0,
    motivation: 0,
    collaboration: 0
  };

  const counts: Record<DimensionKey, number> = {
    cognitive: 0,
    behavior: 0,
    motivation: 0,
    collaboration: 0
  };

  ASSESSMENT_QUESTIONS.forEach(q => {
    const val = responses[q.id] || 3; // Default to neutral if missing
    scores[q.dimension] += val;
    counts[q.dimension]++;
  });

  // Normalize 1-5 scale (Sum of 3 questions: 3-15) to 0-100
  // Formula: ((Sum - (Count * 1)) / (Count * 4)) * 100
  Object.keys(scores).forEach(key => {
    const k = key as DimensionKey;
    const raw = scores[k];
    const count = counts[k];
    const normalized = ((raw - count) / (count * 4)) * 100;
    scores[k] = Number(normalized.toFixed(1));
  });

  return scores;
}

export function generateAnalysis(scores: Scores): AssessmentResult {
  const traits: AssessmentResult['traits'] = {
    cognitive: {
      label: scores.cognitive > 66 ? 'Data-Driven Strategist' : scores.cognitive < 33 ? 'Intuitive Creative' : 'Balanced Thinker',
      description: scores.cognitive > 66 ? 'Strong emphasis on empirical evidence and logical validation.' : scores.cognitive < 33 ? 'Relies on pattern recognition and rapid intuition.' : 'Balances data with situational context.',
      level: getLevel(scores.cognitive)
    },
    behavior: {
      label: scores.behavior > 66 ? 'Methodical Optimizer' : scores.behavior < 33 ? 'Agile Explorer' : 'Structured Flexible',
      description: scores.behavior > 66 ? 'Prefers clear frameworks and rigorous planning.' : scores.behavior < 33 ? 'Thrives in ambiguity and autonomous environments.' : 'Appreciates structure but adapts as needed.',
      level: getLevel(scores.behavior)
    },
    motivation: {
      label: scores.motivation > 66 ? 'High-Velocity Driver' : scores.motivation < 33 ? 'Stability Guardian' : 'Reliable Contributor',
      description: scores.motivation > 66 ? 'Driven by challenging targets and constant growth.' : scores.motivation < 33 ? 'Values consistency, reliability, and established mastery.' : 'Steady motivation with a focus on output quality.',
      level: getLevel(scores.motivation)
    },
    collaboration: {
      label: scores.collaboration > 66 ? 'Synergy Catalyst' : scores.collaboration < 33 ? 'Independent Expert' : 'Collaborative Peer',
      description: scores.collaboration > 66 ? 'Focused on collective success and team harmony.' : scores.collaboration < 33 ? 'Excels in focused, individual deep work.' : 'Effective in both group and solo settings.',
      level: getLevel(scores.collaboration)
    }
  };

  // Trait Interaction Analysis
  let interpretation = "";
  const strengths = [];
  const risks = [];
  const bestFitRoles = [];

  // Interaction: High Autonomy (Low Behavior) + High Motivation
  if (scores.behavior < 35 && scores.motivation > 70) {
    interpretation = "A high-agency individual who thrives on solving complex, unmapped problems with minimal supervision. They are self-starters who don't wait for permission.";
    strengths.push("Exceptional initiative", "High comfort with ambiguity", "Result-oriented autonomy");
    bestFitRoles.push("Product Owner", "Founder-Member", "R&D Lead");
  } else if (scores.behavior > 65 && scores.motivation > 70) {
    interpretation = "A disciplined high-performer who excels when given a rigorous framework to dominate. They turn complex systems into reliable outcomes.";
    strengths.push("Operational excellence", "Systematic scaling", "Reliable execution");
    bestFitRoles.push("Operations Manager", "Systems Architect", "Project Lead");
  } else {
    interpretation = "A versatile professional who can bridge the gap between structured tasks and independent initiative, prioritizing according to immediate needs.";
    strengths.push("Adaptability", "Contextual awareness", "Balanced decision making");
    bestFitRoles.push("Account Manager", "Full Stack Engineer", "Consultant");
  }

  // Dimension-based Strengths
  if (scores.cognitive > 70) strengths.push("Rigorous analytical precision");
  if (scores.collaboration > 70) strengths.push("Strong team-bonding capability");
  if (scores.collaboration < 30) strengths.push("High focus and deep-work depth");

  // Risks
  if (scores.behavior > 80) risks.push("May struggle with rapid pivots or lack of documentation");
  if (scores.behavior < 20) risks.push("May resist necessary standardization or reporting");
  if (scores.motivation > 80) risks.push("Risk of burnout if targets aren't constantly moving");
  if (scores.cognitive < 30) risks.push("May overlook critical edge cases in complex data");

  // Roles
  if (scores.collaboration > 70) bestFitRoles.push("Community Manager", "HR Generalist");
  if (scores.cognitive > 70) bestFitRoles.push("Data Analyst", "Risk Researcher");

  return {
    scores,
    traits,
    interpretation,
    strengths,
    risks,
    bestFitRoles,
    hiringSignal: generateHiringSignal(scores),
    cultureAlignment: Number((Object.values(scores).reduce((a, b) => a + b, 0) / 4).toFixed(1)),
    questions: ASSESSMENT_QUESTIONS
  };
}

function getLevel(score: number): 'Low' | 'Moderate' | 'High' {
  if (score < 33) return 'Low';
  if (score > 66) return 'High';
  return 'Moderate';
}

function generateHiringSignal(scores: Scores): string {
  if (scores.motivation > 70 && scores.behavior > 60) return "High Execution Reliability - Best for established teams needing scale.";
  if (scores.motivation > 70 && scores.behavior < 40) return "High Growth Catalyst - Best for early-stage or innovation units.";
  if (scores.collaboration > 70 && scores.cognitive > 60) return "Strategic Collaborator - Best for leadership or cross-functional roles.";
  return "Balanced Generalist - High situational adaptability across various departments.";
}
