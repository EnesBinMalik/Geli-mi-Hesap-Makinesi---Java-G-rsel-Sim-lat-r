import React from 'react';
import { AppTab } from '../types';
import { Download, History, Code2, Terminal, Calculator, BookOpen } from 'lucide-react';
import { JAVA_SOURCE_CODE } from '../data/javaSource';

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  historyCount: number;
  onToggleHistory: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  historyCount,
  onToggleHistory,
}) => {
  const downloadJavaFile = () => {
    const blob = new Blob([JAVA_SOURCE_CODE], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'JavaPatika.java';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Calculator className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
              Gelişmiş Hesap Makinesi
            </span>
            <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
              Java Patika Projesi · <span className="text-indigo-400">Enes Öztürk</span>
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'terminal'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Konsol Simülatörü</span>
          </button>

          <button
            onClick={() => setActiveTab('visual')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'visual'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Görsel Modül</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'code'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Java Kodu</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'guide'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ödev Analizi</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & History */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleHistory}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="İşlem Geçmişi"
          >
            <History className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Geçmiş</span>
            {historyCount > 0 && (
              <span className="bg-indigo-600/40 text-indigo-300 text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={downloadJavaFile}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm shadow-indigo-600/30 transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Java İndir</span>
          </button>
        </div>
      </div>

      {/* Mobile subnavigation bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-900 bg-slate-950 px-2 py-1.5 overflow-x-auto">
        <button
          onClick={() => setActiveTab('terminal')}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs whitespace-nowrap rounded ${
            activeTab === 'terminal' ? 'bg-indigo-600/20 text-indigo-300 font-semibold' : 'text-slate-400'
          }`}
        >
          <Terminal className="w-3 h-3" />
          <span>Konsol</span>
        </button>
        <button
          onClick={() => setActiveTab('visual')}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs whitespace-nowrap rounded ${
            activeTab === 'visual' ? 'bg-indigo-600/20 text-indigo-300 font-semibold' : 'text-slate-400'
          }`}
        >
          <Calculator className="w-3 h-3" />
          <span>Görsel</span>
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs whitespace-nowrap rounded ${
            activeTab === 'code' ? 'bg-indigo-600/20 text-indigo-300 font-semibold' : 'text-slate-400'
          }`}
        >
          <Code2 className="w-3 h-3" />
          <span>Java</span>
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs whitespace-nowrap rounded ${
            activeTab === 'guide' ? 'bg-indigo-600/20 text-indigo-300 font-semibold' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-3 h-3" />
          <span>Ödev</span>
        </button>
      </div>
    </header>
  );
};
