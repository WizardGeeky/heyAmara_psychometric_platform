
import Link from 'next/link';
import { ShieldCheck, ArrowRight, BarChart3, Users2, BrainCircuit, Target, Sparkles, Orbit } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8fafc] modern-grid selection:bg-primary selection:text-white flex flex-col items-center">
      {/* Ambient Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#6467f2]/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#2bd4bd]/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-primary rounded-full animate-ping" />
        <div className="absolute bottom-[20%] right-[10%] w-1 h-1 bg-accent rounded-full animate-ping delay-700" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12 lg:py-20 flex-1 flex flex-col w-full">
        {/* Navigation / Brand Line */}
        <div className="flex justify-between items-center mb-8 sm:mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Sparkles size={18} fill="currentColor" className="sm:w-5 sm:h-5" />
            </div>
            <span className="text-lg sm:text-xl font-black tracking-tighter text-slate-900">HeyAmara</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Psychometric v4.0</span>
            <div className="h-4 w-[1px] bg-slate-100" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none flex items-center gap-2">
              <Orbit size={14} className="text-primary animate-spin-slow" />
              Live Analytics
            </span>
          </div>
        </div>

        {/* Central Hero & Content */}
        <div className="flex-1 flex flex-col justify-center py-8 sm:py-12">
          {/* Hero Section */}
          <div className="text-center max-w-5xl mx-auto mb-12 sm:mb-20 lg:mb-32">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-1.5 sm:py-2.5 bg-white/50 backdrop-blur-md border border-white/80 rounded-full text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-6 sm:mb-10 shadow-sm animate-in fade-in slide-in-from-top-4 duration-1000">
              <Sparkles size={14} fill="currentColor" className="text-primary animate-pulse sm:w-4 sm:h-4" />
              Intelligence Assessment
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-[-0.06em] leading-[0.85] mb-6 sm:mb-12">
              Talent <br />
              <span className="gradient-text italic">Synthesized.</span>
            </h1>

            <p className="text-base sm:text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium mb-8 sm:mb-16 opacity-80 px-4">
              Go beyond simple resumes. Our engine extracts the multi-dimensional behavioral patterns that predict high-performance leadership.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 px-4">
              <Link
                href="/test"
                className="btn-primary flex items-center gap-4 sm:gap-6 text-lg sm:text-2xl group w-full sm:w-auto justify-center px-8 sm:px-12 py-4 sm:py-6 rounded-2xl sm:rounded-[2rem] shadow-2xl shadow-primary/30"
              >
                Launch Assessment
                <Orbit size={24} className="group-hover:rotate-180 transition-transform duration-700 sm:w-7 sm:h-7" />
              </Link>
              <button className="btn-outline w-full sm:w-auto flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-xl rounded-2xl sm:rounded-[2rem] border-slate-200 hover:bg-white">
                Our Methodology
              </button>
            </div>
          </div>

          {/* Dimension Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10 mb-12 sm:mb-20 px-4">
            {[
              { icon: BrainCircuit, label: "Cognitive", desc: "Complex data processing & decision architecture", color: "from-blue-400 to-primary", badge: "Neural" },
              { icon: Target, label: "Behavior", desc: "Operational mapping & execution consistency", color: "from-emerald-400 to-accent", badge: "Dynamic" },
              { icon: BarChart3, label: "Motivation", desc: "facets of drive & target optimization", color: "from-orange-400 to-amber-500", badge: "Vector" },
              { icon: Users2, label: "Synergy", desc: "Collaborative resonance & social architecture", color: "from-indigo-400 to-purple-500", badge: "Link" },
            ].map((item, i) => (
              <div key={i} className="group relative active:scale-[0.98] transition-transform duration-200">
                {/* Modern Glow Background */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-2xl sm:rounded-[3rem] blur-xl opacity-0 group-hover:opacity-15 transition duration-700`} />

                <div className="relative glass-card p-6 sm:p-10 h-full flex flex-col items-start text-left rounded-2xl sm:rounded-[3rem] transition-all duration-700 border-white/60 hover:border-white hover:translate-y-[-8px]">
                  <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-[2rem] flex items-center justify-center mb-6 sm:mb-10 transition-all duration-700 group-hover:scale-110 group-hover:shadow-2xl ${i === 0 ? "bg-blue-50 text-blue-600 shadow-blue-500/10" :
                    i === 1 ? "bg-emerald-50 text-emerald-600 shadow-emerald-500/10" :
                      i === 2 ? "bg-orange-50 text-orange-600 shadow-orange-500/10" :
                        "bg-indigo-50 text-indigo-600 shadow-indigo-500/10"
                    }`}>
                    <item.icon size={32} className="sm:w-10 sm:h-10" />
                  </div>

                  <div className="space-y-3 sm:space-y-4 flex-1">
                    <h3 className={`text-2xl sm:text-3xl font-black uppercase tracking-tighter transition-colors leading-none ${i === 0 ? "text-blue-900 group-hover:text-blue-600" :
                      i === 1 ? "text-emerald-900 group-hover:text-emerald-600" :
                        i === 2 ? "text-orange-900 group-hover:text-orange-600" :
                          "text-indigo-900 group-hover:text-indigo-600"
                      }`}>
                      {item.label}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed opacity-70">
                      {item.desc}
                    </p>
                  </div>

                  <div className={`mt-6 sm:mt-10 pt-6 sm:pt-8 border-t w-full flex justify-between items-center transition-all duration-700 ${i === 0 ? "border-blue-100/50" :
                    i === 1 ? "border-emerald-100/50" :
                      i === 2 ? "border-orange-100/50" :
                        "border-indigo-100/50"
                    }`}>
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">Dimension Link</span>
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-700 transform group-hover:rotate-45 ${i === 0 ? "bg-blue-50 text-blue-600" :
                      i === 1 ? "bg-emerald-50 text-emerald-600" :
                        i === 2 ? "bg-orange-50 text-orange-600" :
                          "bg-indigo-50 text-indigo-600"
                      } group-hover:bg-primary group-hover:text-white`}>
                      <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof / Trust */}
        <div className="pt-8 sm:pt-12 border-t border-slate-100/50 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 pb-8 sm:pb-20 opacity-40">
          <div className="flex items-center gap-6 sm:gap-10 grayscale brightness-0 flex-wrap justify-center">
            <span className="text-xs sm:text-sm font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase">Vercel Edge</span>
            <span className="text-xs sm:text-sm font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase">OpenAI v4</span>
            <span className="text-xs sm:text-sm font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase">Tailwind Engine</span>
          </div>
          <p className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] sm:tracking-[0.4em] text-center">
            Amara Intelligence • Build for professional rigor
          </p>
        </div>
      </main>
    </div>
  );
}
