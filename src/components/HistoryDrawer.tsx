import React from 'react';
import { HistoryItem } from '../types';
import { X, Trash2, History, Copy, Check } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: HistoryItem[];
  onClear: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onClear,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyItem = (item: HistoryItem) => {
    navigator.clipboard.writeText(`${item.operation}: ${item.expression} = ${item.result}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-slate-950 border-l border-slate-800 h-full flex flex-col shadow-2xl z-10">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Hesaplama Geçmişi</h3>
            <span className="text-xs text-slate-500 font-mono">({items.length})</span>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClear}
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-900 transition-colors"
                title="Geçmişi Temizle"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <History className="w-10 h-10 stroke-1 mb-2 text-slate-600" />
              <p className="text-sm font-medium text-slate-400">Henüz hesaplama yapılmadı</p>
              <p className="text-xs text-slate-500 mt-1">
                Konsolda veya Görsel modülde işlem yaptığınızda burada listelenecektir.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-1.5 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-indigo-400">{item.operation}</span>
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="font-mono">{item.timestamp}</span>
                    <span className="text-[10px] px-1 py-0.2 rounded bg-slate-800 text-slate-400">
                      {item.source === 'terminal' ? 'CLI' : 'GUI'}
                    </span>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-300 break-all">
                  {item.expression}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                  <span className="text-sm font-bold font-mono text-emerald-400">
                    = {item.result}
                  </span>

                  <button
                    onClick={() => handleCopyItem(item)}
                    className="p-1 text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
                    title="İşlemi Kopyala"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/40 text-[11px] text-slate-500 text-center">
          JavaPatika · Enes Öztürk
        </div>
      </div>
    </div>
  );
};
