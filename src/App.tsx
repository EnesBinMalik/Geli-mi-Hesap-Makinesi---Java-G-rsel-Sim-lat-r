import React, { useState } from 'react';
import { AppTab, HistoryItem } from './types';
import { Header } from './components/Header';
import { JavaTerminal } from './components/JavaTerminal';
import { VisualCalculator } from './components/VisualCalculator';
import { JavaCodeViewer } from './components/JavaCodeViewer';
import { AssignmentGuide } from './components/AssignmentGuide';
import { HistoryDrawer } from './components/HistoryDrawer';
import { Terminal, Calculator, Code2, BookOpen, CheckCircle, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('terminal');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Calculation history
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    {
      id: 'init-1',
      timestamp: '07:05:12',
      operation: 'Mod Alma (Ödev 1)',
      expression: '27 % 4',
      result: 3,
      source: 'terminal',
    },
    {
      id: 'init-2',
      timestamp: '07:05:40',
      operation: 'Dikdörtgen Alan & Çevre (Ödev 2)',
      expression: 'Kısa: 7, Uzun: 15',
      result: 'Çevre: 44, Alan: 105',
      source: 'visual',
    },
  ]);

  const addHistoryItem = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newItem: HistoryItem = {
      ...item,
      id: Math.random().toString(36).substring(7),
      timestamp: timeStr,
    };
    setHistoryItems((prev) => [newItem, ...prev.slice(0, 49)]);
  };

  const clearHistory = () => {
    setHistoryItems([]);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={historyItems.length}
        onToggleHistory={() => setIsHistoryOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Project Context & Attribution Bar */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
              <CheckCircle className="w-3.5 h-3.5" /> Ödev Tamamlandı
            </span>
            <span className="text-slate-300 font-medium">
              7- Mod Alma &amp; 8- Dikdörtgen Alan/Çevre Hesabı metotları eklendi
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span>Hazırlayan &amp; İmza:</span>
            <span className="text-indigo-300 font-semibold bg-indigo-950/50 border border-indigo-800/40 px-2 py-0.5 rounded">
              Enes Öztürk
            </span>
          </div>
        </div>

        {/* Tab Views */}
        {activeTab === 'terminal' && (
          <JavaTerminal onAddHistory={addHistoryItem} />
        )}

        {activeTab === 'visual' && (
          <VisualCalculator onAddHistory={addHistoryItem} />
        )}

        {activeTab === 'code' && (
          <JavaCodeViewer />
        )}

        {activeTab === 'guide' && (
          <AssignmentGuide />
        )}
      </main>

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        items={historyItems}
        onClear={clearHistory}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-6 text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Patika.dev Java 101</span>
            <span>·</span>
            <span>Gelişmiş Hesap Makinesi</span>
            <span>·</span>
            <span className="text-indigo-400 font-medium">Enes Öztürk</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>8 Fonksiyonlu Gelişmiş Hesap Makinesi</span>
            <span>·</span>
            <button
              onClick={() => setActiveTab('code')}
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              JavaPatika.java Kaynak Kodu
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
