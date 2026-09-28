import React, { useEffect, useState } from 'react';
import { 
  Terminal, 
  Sparkles, 
  Zap, 
  ExternalLink, 
  Github, 
  Mail, 
  MessageSquare, 
  Database, 
  Cpu, 
  CheckCircle2,
  CircleAlert,
  Flame,
  ArrowRight,
  Code2,
  Server
} from 'lucide-react';
import { supabase } from './lib/supabase';

export function App() {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; out: string }>>([
    { cmd: 'whoami', out: 'blake — 10x Full-Stack AI Engineer & Founder @ Vibecode Maxxing' },
    { cmd: 'ara status', out: '🟢 Ara SWE Agent Connected | Automated PRs & Verification Loop Active' },
    { cmd: 'help', out: 'Available commands: about, stack, vibes, ara, contact, clear' }
  ]);
  const [vibeStats, setVibeStats] = useState({ totalProjects: 5, totalStars: 588, avgScore: '98.8' });
  const [databaseStatus, setDatabaseStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    async function loadStats() {
      try {
        const { data, error } = await supabase.from('vibes').select('vibe_score, stars');
        if (error) throw error;
        setDatabaseStatus('connected');
        if (data && data.length > 0) {
          const stars = data.reduce((acc, v) => acc + (v.stars || 0), 0);
          const avg = (data.reduce((acc, v) => acc + (v.vibe_score || 0), 0) / data.length).toFixed(1);
          setVibeStats({ totalProjects: data.length, totalStars: stars, avgScore: avg });
        }
      } catch (e) {
        setDatabaseStatus('error');
        console.error('Error fetching stats', e);
      }
    }
    loadStats();
  }, []);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let out = '';
    switch (cmd) {
      case 'about':
        out = 'Blake is a high-velocity software engineer testing next-gen autonomous coding platforms (Ara). Builds micro-SaaS and AI tools in single sessions with Supabase and Gemini Flash.';
        break;
      case 'stack':
        out = '• Frontend: React 19, Vite, Tailwind CSS, TypeScript\n• Backend & DB: Supabase (Postgres + RLS + Realtime)\n• AI Engine: Google Gemini 2.0 Flash (sub-500ms reasoning)\n• Deployment: Vercel Global Edge Network\n• Agent: Ara SWE Digital Twin Loop';
        break;
      case 'vibes':
        out = `Found ${vibeStats.totalProjects} active vibe projects on Supabase cluster. Highest rated: "Aesthetic Neural Canvas" (100) & "Vibecode Maxxing Hub" (99).`;
        break;
      case 'ara':
        out = 'Ara (https://ara.so) is Blake’s primary autonomous software engineer loop. Scans local codebases, syncs environment secrets, and generates verified code changes.';
        break;
      case 'contact':
        out = 'Email: qa-runner@ara.so | Slack: @blake in Ara Workspace | GitHub: qa-runner-web';
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'help':
        out = 'Available commands: about, stack, vibes, ara, contact, clear';
        break;
      default:
        out = `command not found: "${cmd}". Type "help" for a list of commands.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: terminalInput, out }]);
    setTerminalInput('');
  };

  return (
    <div className="min-h-screen bg-[#07070b] text-slate-100 flex flex-col selection:bg-purple-500 selection:text-black">
      {/* Navigation */}
      <nav className="border-b border-slate-800/80 bg-[#0c0c14]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-black text-base shadow-lg shadow-purple-500/20">
              B
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">BLAKE.DEV</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-800/50">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              🟢 Vibecoding Live
            </div>
            <a
              href="https://github.com/qa-runner-web"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">qa-runner-web</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-purple-300 border border-purple-500/30 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            10x AI Full-Stack Engineer & Vibecoder
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            I build & ship software at <br />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              maximum vibe velocity.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Hey, I'm <strong className="text-white">Blake</strong> (<code className="text-cyan-300 font-mono text-sm">qa-runner@ara.so</code>). 
            I build high-leverage products using autonomous AI coding agents (Ara), Google Gemini 2.0 Flash, Supabase PostgreSQL, and Vercel edge infrastructure.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://github.com/qa-runner-web/vibecoding-company"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-black font-bold text-sm shadow-xl shadow-purple-500/20 transition-all"
            >
              <Zap className="w-4 h-4" />
              Explore Vibecode Maxxing
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:qa-runner@ara.so"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-sm font-semibold transition-all"
            >
              <Mail className="w-4 h-4" />
              Contact Blake
            </a>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="border-y border-slate-800/80 bg-[#0b0b12] py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#11111a] border border-slate-800/80">
            <span className="text-xs text-slate-400 font-mono">Shipped Projects</span>
            <div className="text-2xl font-black text-white mt-1">{vibeStats.totalProjects}</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#11111a] border border-slate-800/80">
            <span className="text-xs text-slate-400 font-mono">Avg Vibe Score</span>
            <div className="text-2xl font-black text-amber-400 mt-1 flex items-center gap-1">
              {vibeStats.avgScore} <Zap className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#11111a] border border-slate-800/80">
            <span className="text-xs text-slate-400 font-mono">Total Stars</span>
            <div className="text-2xl font-black text-cyan-400 mt-1">{vibeStats.totalStars} ★</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#11111a] border border-slate-800/80">
            <span className="text-xs text-slate-400 font-mono">Database Status</span>
            <div
              role="status"
              aria-live="polite"
              className={`text-xs font-mono mt-2 flex items-center gap-1.5 ${
                databaseStatus === 'connected' ? 'text-emerald-400' : databaseStatus === 'error' ? 'text-rose-400' : 'text-slate-400'
              }`}
            >
              {databaseStatus === 'connected' ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : databaseStatus === 'error' ? (
                <CircleAlert className="w-4 h-4" />
              ) : (
                <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
              )}
              {databaseStatus === 'connected' ? 'Supabase Connected' : databaseStatus === 'error' ? 'Supabase Unavailable' : 'Checking Supabase…'}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Terminal */}
      <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full flex-1">
        <div className="rounded-2xl bg-[#0e0e16] border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
          {/* Terminal Window Header */}
          <div className="px-4 py-3 bg-[#151522] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-slate-400 ml-2 font-semibold">blake@workstation:~ (qa-runner@ara.so)</span>
            </div>
            <span className="text-[11px] text-slate-500">zsh</span>
          </div>

          {/* Terminal Body */}
          <div className="p-5 space-y-3 min-h-[220px]">
            {terminalHistory.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-purple-400">➜</span>
                  <span className="text-slate-500">~</span>
                  <span className="text-white font-bold">{item.cmd}</span>
                </div>
                <div className="text-slate-300 whitespace-pre-wrap pl-4 leading-relaxed font-mono">
                  {item.out}
                </div>
              </div>
            ))}

            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-2">
              <span className="text-purple-400 font-bold">➜</span>
              <span className="text-slate-500">~</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type a command (e.g. stack, vibes, ara, about, contact)..."
                className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-600 font-mono text-xs"
                autoFocus
              />
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#09090e] py-6 px-4 text-center text-xs font-mono text-slate-500">
        <p>© 2026 Blake (QA Runner) • Powered by Supabase, Gemini 2.0 & Ara</p>
      </footer>
    </div>
  );
}
export default App;
