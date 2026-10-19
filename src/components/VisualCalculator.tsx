import React, { useState } from 'react';
import { HistoryItem, OperationType } from '../types';
import { OPERATIONS } from '../data/javaSource';
import {
  Calculator,
  Percent,
  Square,
  Plus,
  Minus,
  X,
  Divide,
  Superscript,
  Hash,
  ArrowRight,
  Info,
  Check,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface VisualCalculatorProps {
  onAddHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
}

export const VisualCalculator: React.FC<VisualCalculatorProps> = ({ onAddHistory }) => {
  const [selectedOp, setSelectedOp] = useState<OperationType>('mod');

  // Mod State
  const [modDividend, setModDividend] = useState<number>(29);
  const [modDivisor, setModDivisor] = useState<number>(6);

  // Rectangle State
  const [rectA, setRectA] = useState<number>(8);
  const [rectB, setRectB] = useState<number>(14);

  // Power State
  const [powerBase, setPowerBase] = useState<number>(3);
  const [powerExp, setPowerExp] = useState<number>(4);

  // Factorial State
  const [factorialN, setFactorialN] = useState<number>(5);

  // Plus State (Dynamic number list)
  const [plusNumbers, setPlusNumbers] = useState<number[]>([15, 25, 40]);
  const [newPlusNum, setNewPlusNum] = useState<string>('');

  // Minus State
  const [minusNumbers, setMinusNumbers] = useState<number[]>([100, 25, 15]);
  const [newMinusNum, setNewMinusNum] = useState<string>('');

  // Times State
  const [timesNumbers, setTimesNumbers] = useState<number[]>([4, 5, 2]);
  const [newTimesNum, setNewTimesNum] = useState<string>('');

  // Divided State
  const [divNumbers, setDivNumbers] = useState<number[]>([100, 2, 5]);
  const [newDivNum, setNewDivNum] = useState<string>('');

  // Icon mapping
  const getOpIcon = (id: OperationType) => {
    switch (id) {
      case 'plus':
        return <Plus className="w-4 h-4 text-emerald-400" />;
      case 'minus':
        return <Minus className="w-4 h-4 text-amber-400" />;
      case 'times':
        return <X className="w-4 h-4 text-cyan-400" />;
      case 'divided':
        return <Divide className="w-4 h-4 text-purple-400" />;
      case 'power':
        return <Superscript className="w-4 h-4 text-blue-400" />;
      case 'factorial':
        return <Hash className="w-4 h-4 text-rose-400" />;
      case 'mod':
        return <Percent className="w-4 h-4 text-amber-400" />;
      case 'rectangle':
        return <Square className="w-4 h-4 text-indigo-400" />;
    }
  };

  // Helper calculations
  const calculateFactorial = (n: number): number => {
    if (n < 0) return 0;
    let res = 1;
    for (let i = 1; i <= n; i++) res *= i;
    return res;
  };

  const calculatePower = (b: number, e: number): number => {
    return Math.pow(b, e);
  };

  return (
    <div className="space-y-6">
      {/* Operation Tabs Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {OPERATIONS.map((op) => {
          const isSelected = selectedOp === op.id;
          return (
            <button
              key={op.id}
              onClick={() => setSelectedOp(op.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                isSelected
                  ? 'bg-indigo-950/60 border-indigo-500/80 shadow-md shadow-indigo-950/50 text-white'
                  : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-800/80 mb-1.5">
                {getOpIcon(op.id)}
              </div>
              <span className="text-xs font-semibold whitespace-nowrap">
                {op.number}. {op.id === 'rectangle' ? 'Dikdörtgen' : op.id === 'factorial' ? 'Faktöriyel' : op.title.replace(' İşlemi', '').replace(' Hesaplama', '')}
              </span>
              {op.isHomework && (
                <span className="mt-1 text-[9px] font-medium text-amber-300/90 bg-amber-950/50 px-1.5 py-0.2 rounded border border-amber-800/40">
                  ÖDEV
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage for Selected Operation */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 sm:p-7 shadow-xl">
        {/* ========================================================= */}
        {/* 7. MOD ALMA (ÖDEV 1) */}
        {/* ========================================================= */}
        {selectedOp === 'mod' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-amber-400 bg-amber-950/60 border border-amber-800/50 px-2 py-0.5 rounded">
                    Ödev Fonksiyonu 1 · Enes Öztürk
                  </span>
                  <span className="text-xs text-slate-400 font-mono">static void mod()</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                  7. Mod Alma (Kalan Bulma İşlemi)
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Bölünen sayının bir bölen sayıya bölünmesinden sonra arta kalan değeri (modulus: <code className="text-amber-300 font-mono">%</code>) hesaplar.
                </p>
              </div>

              <button
                onClick={() => {
                  if (modDivisor !== 0) {
                    onAddHistory({
                      operation: 'Mod Alma (Ödev 1)',
                      expression: `${modDividend} % ${modDivisor}`,
                      result: modDividend % modDivisor,
                      source: 'visual',
                    });
                  }
                }}
                disabled={modDivisor === 0}
                className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Geçmişe Kaydet</span>
              </button>
            </div>

            {/* Inputs & Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                <label className="block text-xs font-semibold text-slate-300">
                  Bölünen Sayı (A): <span className="text-amber-400 font-mono text-sm">{modDividend}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={modDividend}
                  onChange={(e) => setModDividend(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Değer Gir:</span>
                  <input
                    type="number"
                    value={modDividend}
                    onChange={(e) => setModDividend(Number(e.target.value))}
                    className="w-24 bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                  />
                  <div className="flex gap-1">
                    {[17, 29, 50, 100].map((v) => (
                      <button
                        key={v}
                        onClick={() => setModDividend(v)}
                        className="px-2 py-0.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono"
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <label className="block text-xs font-semibold text-slate-300">
                    Bölen Sayı (B): <span className="text-cyan-400 font-mono text-sm">{modDivisor}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={modDivisor}
                    onChange={(e) => setModDivisor(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Değer Gir:</span>
                    <input
                      type="number"
                      value={modDivisor}
                      onChange={(e) => setModDivisor(Number(e.target.value))}
                      className="w-24 bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
                    />
                    <div className="flex gap-1">
                      {[3, 4, 6, 7, 10].map((v) => (
                        <button
                          key={v}
                          onClick={() => setModDivisor(v)}
                          className="px-2 py-0.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono"
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {modDivisor === 0 && (
                  <div className="flex items-center gap-2 p-2.5 bg-rose-950/40 border border-rose-800/60 rounded text-xs text-rose-300">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>Java kuralı: Bölen sayı 0 olamaz! Mod işlemi tanımsızdır.</span>
                  </div>
                )}
              </div>

              {/* Mathematical breakdown & Visual remainder boxes */}
              <div className="space-y-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-mono">Matematiksel Açılım</span>
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-sm">
                    {modDivisor === 0 ? (
                      <span className="text-rose-400">Tanımsız (Bölen = 0)</span>
                    ) : (
                      <div className="space-y-1.5">
                        <div className="text-slate-300">
                          <span className="text-amber-400 font-bold">{modDividend}</span> = (
                          <span className="text-cyan-400 font-bold">{modDivisor}</span> ×{' '}
                          <span className="text-indigo-400 font-bold">
                            {Math.floor(modDividend / modDivisor)}
                          </span>
                          ) +{' '}
                          <span className="text-emerald-400 font-bold text-base">
                            {modDividend % modDivisor}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">
                          Formül: <span className="text-slate-300">Bölünen = (Bölen × Bölüm) + Kalan</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Big Result Card */}
                <div className="p-4 bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/30 rounded-xl border border-amber-800/40">
                  <span className="text-xs text-slate-400">Java Çıktısı (System.out.println):</span>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                    Sonuç (Kalan) : {modDivisor === 0 ? 'Tanımsız' : modDividend % modDivisor}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Java Kodu: <code className="text-amber-300 font-mono">int result = {modDividend} % {modDivisor};</code>
                  </div>
                </div>

                {/* Visual blocks visualization */}
                {modDivisor > 0 && modDividend <= 60 && (
                  <div>
                    <span className="text-xs text-slate-400 block mb-1.5">
                      Görsel Dağılım: {Math.floor(modDividend / modDivisor)} Tam Grup ({modDivisor}&apos;şerli) + {modDividend % modDivisor} Kalan Blok
                    </span>
                    <div className="flex flex-wrap gap-2 p-2 bg-slate-950 rounded border border-slate-800/80">
                      {Array.from({ length: Math.floor(modDividend / modDivisor) }).map((_, groupIdx) => (
                        <div
                          key={groupIdx}
                          className="flex gap-0.5 p-1 bg-cyan-950/50 border border-cyan-800/40 rounded"
                          title={`Grup ${groupIdx + 1} (${modDivisor} adet)`}
                        >
                          {Array.from({ length: modDivisor }).map((__, bIdx) => (
                            <span key={bIdx} className="w-2.5 h-3 bg-cyan-500/80 rounded-[1px] inline-block" />
                          ))}
                        </div>
                      ))}
                      {modDividend % modDivisor > 0 && (
                        <div
                          className="flex gap-0.5 p-1 bg-emerald-950/60 border border-emerald-600/60 rounded"
                          title={`Kalan: ${modDividend % modDivisor} adet`}
                        >
                          {Array.from({ length: modDividend % modDivisor }).map((__, rIdx) => (
                            <span key={rIdx} className="w-2.5 h-3 bg-emerald-400 rounded-[1px] inline-block shadow-sm shadow-emerald-500/50" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 8. DİKDÖRTGEN ALAN VE ÇEVRE (ÖDEV 2) */}
        {/* ========================================================= */}
        {selectedOp === 'rectangle' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 px-2 py-0.5 rounded">
                    Ödev Fonksiyonu 2 · Enes Öztürk
                  </span>
                  <span className="text-xs text-slate-400 font-mono">static void rectangle()</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                  8. Dikdörtgen Alan ve Çevre Hesabı
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Verilen iki kenar uzunluğuyla çevre (<code className="text-indigo-300 font-mono">2 * (a + b)</code>) ve alan (<code className="text-emerald-300 font-mono">a * b</code>) hesaplar.
                </p>
              </div>

              <button
                onClick={() => {
                  if (rectA > 0 && rectB > 0) {
                    const per = 2 * (rectA + rectB);
                    const area = rectA * rectB;
                    onAddHistory({
                      operation: 'Dikdörtgen (Ödev 2)',
                      expression: `a=${rectA}, b=${rectB}`,
                      result: `Çevre: ${per}, Alan: ${area}`,
                      source: 'visual',
                    });
                  }
                }}
                disabled={rectA <= 0 || rectB <= 0}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Geçmişe Kaydet</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Controls Column */}
              <div className="lg:col-span-5 space-y-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-300">
                        1. Kenar (a - Kısa Kenar)
                      </label>
                      <span className="text-indigo-400 font-mono text-sm font-bold">{rectA} birim</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={rectA}
                      onChange={(e) => setRectA(Math.max(1, Number(e.target.value)))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400">Giriş:</span>
                      <input
                        type="number"
                        min="1"
                        value={rectA}
                        onChange={(e) => setRectA(Math.max(1, Number(e.target.value)))}
                        className="w-20 bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-sm font-mono text-white focus:outline-none focus:border-indigo-500"
                      />
                      <div className="flex gap-1">
                        {[5, 8, 12].map((val) => (
                          <button
                            key={val}
                            onClick={() => setRectA(val)}
                            className="px-2 py-0.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono"
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-300">
                        2. Kenar (b - Uzun Kenar)
                      </label>
                      <span className="text-cyan-400 font-mono text-sm font-bold">{rectB} birim</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="40"
                      value={rectB}
                      onChange={(e) => setRectB(Math.max(1, Number(e.target.value)))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400">Giriş:</span>
                      <input
                        type="number"
                        min="1"
                        value={rectB}
                        onChange={(e) => setRectB(Math.max(1, Number(e.target.value)))}
                        className="w-20 bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
                      />
                      <div className="flex gap-1">
                        {[10, 14, 20].map((val) => (
                          <button
                            key={val}
                            onClick={() => setRectB(val)}
                            className="px-2 py-0.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono"
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Result KPI cards */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-indigo-950/40 border border-indigo-800/40 rounded-xl">
                    <span className="text-[11px] text-indigo-300 font-medium">Çevre Formülü</span>
                    <div className="text-xs font-mono text-slate-400 mt-0.5">2 × ({rectA} + {rectB})</div>
                    <div className="text-xl font-bold font-mono text-indigo-300 mt-1">
                      {2 * (rectA + rectB)} <span className="text-xs font-normal text-slate-400">birim</span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl">
                    <span className="text-[11px] text-emerald-300 font-medium">Alan Formülü</span>
                    <div className="text-xs font-mono text-slate-400 mt-0.5">{rectA} × {rectB}</div>
                    <div className="text-xl font-bold font-mono text-emerald-300 mt-1">
                      {rectA * rectB} <span className="text-xs font-normal text-slate-400">br²</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                  <div>System.out.println(&quot;Dikdörtgenin Çevresi : &quot; + {2 * (rectA + rectB)});</div>
                  <div>System.out.println(&quot;Dikdörtgenin Alanı   : &quot; + {rectA * rectB});</div>
                </div>
              </div>

              {/* Geometry SVG Interactive Visualizer */}
              <div className="lg:col-span-7 bg-[#070b12] rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center relative min-h-[320px]">
                <div className="absolute top-3 left-3 text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                  <Square className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Ölçekli Geometrik Çizim</span>
                </div>

                {/* SVG Canvas */}
                <div className="w-full max-w-sm h-64 flex items-center justify-center">
                  {(() => {
                    // Normalize dimensions to fit nicely within 280x200
                    const maxAllowedW = 240;
                    const maxAllowedH = 160;
                    const maxVal = Math.max(rectA, rectB);
                    const scale = Math.min(maxAllowedW / Math.max(rectB, rectA), maxAllowedH / Math.min(rectA, rectB));

                    const svgW = Math.max(60, Math.min(260, rectB * scale));
                    const svgH = Math.max(40, Math.min(180, rectA * scale));

                    return (
                      <svg width="280" height="200" viewBox="0 0 280 200" className="overflow-visible">
                        <defs>
                          <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="0.8" />
                          </pattern>
                        </defs>

                        {/* Centered rectangle group */}
                        <g transform={`translate(${(280 - svgW) / 2}, ${(200 - svgH) / 2})`}>
                          {/* Area Fill */}
                          <rect
                            x="0"
                            y="0"
                            width={svgW}
                            height={svgH}
                            fill="url(#gridPattern)"
                            className="transition-all duration-300"
                          />
                          <rect
                            x="0"
                            y="0"
                            width={svgW}
                            height={svgH}
                            fill="rgba(99, 102, 241, 0.12)"
                            stroke="rgba(99, 102, 241, 0.9)"
                            strokeWidth="2.5"
                            rx="4"
                            className="transition-all duration-300"
                          />

                          {/* Top label: Long edge B */}
                          <text
                            x={svgW / 2}
                            y="-10"
                            textAnchor="middle"
                            className="text-xs font-mono font-bold fill-cyan-400"
                          >
                            b = {rectB} birim
                          </text>

                          {/* Left label: Short edge A */}
                          <text
                            x="-12"
                            y={svgH / 2 + 4}
                            textAnchor="end"
                            className="text-xs font-mono font-bold fill-indigo-400"
                          >
                            a = {rectA}
                          </text>

                          {/* Center Area Text */}
                          <text
                            x={svgW / 2}
                            y={svgH / 2 - 4}
                            textAnchor="middle"
                            className="text-sm font-bold font-mono fill-emerald-400"
                          >
                            Alan: {rectA * rectB} br²
                          </text>
                          <text
                            x={svgW / 2}
                            y={svgH / 2 + 14}
                            textAnchor="middle"
                            className="text-[11px] font-mono fill-slate-400"
                          >
                            Çevre: {2 * (rectA + rectB)} br
                          </text>
                        </g>
                      </svg>
                    );
                  })()}
                </div>

                <div className="text-[11px] text-slate-500 font-mono text-center mt-2">
                  Köşegen Uzunluğu (d) ≈ <span className="text-slate-300 font-bold">{Math.sqrt(rectA * rectA + rectB * rectB).toFixed(2)}</span> birim (Pisagor)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 6. FAKTÖRİYEL HESAPLAMA */}
        {/* ========================================================= */}
        {selectedOp === 'factorial' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-slate-400 font-mono">static void factorial()</span>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                  6. Faktöriyel Hesaplama
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Girilen <code className="text-rose-300 font-mono">n</code> sayısının 1&apos;den kendisine kadar olan sayıların çarpımını (<code className="text-rose-300 font-mono">n!</code>) hesaplar.
                </p>
              </div>

              <button
                onClick={() => {
                  onAddHistory({
                    operation: 'Faktöriyel',
                    expression: `${factorialN}!`,
                    result: calculateFactorial(factorialN),
                    source: 'visual',
                  });
                }}
                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Geçmişe Kaydet</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                <label className="block text-xs font-semibold text-slate-300">
                  Hesaplanacak Sayı (n): <span className="text-rose-400 font-mono text-base font-bold">{factorialN}!</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={factorialN}
                  onChange={(e) => setFactorialN(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Değer Seç:</span>
                  {[0, 1, 3, 5, 7, 10].map((v) => (
                    <button
                      key={v}
                      onClick={() => setFactorialN(v)}
                      className={`px-2.5 py-1 text-xs rounded font-mono ${
                        factorialN === v ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {v}!
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-mono">Çarpım Açılımı</span>
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-sm break-all text-slate-300">
                    {factorialN === 0 ? (
                      <span>0! = 1 (Özel tanım)</span>
                    ) : (
                      <span>
                        {factorialN}! ={' '}
                        {Array.from({ length: factorialN }, (_, i) => factorialN - i).join(' × ')} ={' '}
                        <span className="text-rose-400 font-bold">{calculateFactorial(factorialN)}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-rose-950/40 to-slate-900 rounded-xl border border-rose-800/40">
                  <span className="text-xs text-slate-400">Java Çıktısı (Sonuç):</span>
                  <div className="text-3xl font-bold font-mono text-rose-400 mt-1">
                    {calculateFactorial(factorialN)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. ÜSLÜ SAYI HESAPLAMA */}
        {/* ========================================================= */}
        {selectedOp === 'power' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-slate-400 font-mono">static void power()</span>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                  5. Üslü Sayı Hesaplama
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Taban değerinin girilen üs kadar kendisiyle çarpılmasını (<code className="text-blue-300 font-mono">base^exp</code>) hesaplar.
                </p>
              </div>

              <button
                onClick={() => {
                  onAddHistory({
                    operation: 'Üslü Sayı',
                    expression: `${powerBase}^${powerExp}`,
                    result: calculatePower(powerBase, powerExp),
                    source: 'visual',
                  });
                }}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Geçmişe Kaydet</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Taban Değeri: <span className="text-blue-400 font-mono text-base font-bold">{powerBase}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={powerBase}
                    onChange={(e) => setPowerBase(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Üs Değeri: <span className="text-cyan-400 font-mono text-base font-bold">{powerExp}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={powerExp}
                    onChange={(e) => setPowerExp(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-mono">Çarpım Döngüsü Mantığı</span>
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-sm break-all text-slate-300">
                    {powerExp === 0 ? (
                      <span>{powerBase}⁰ = 1</span>
                    ) : (
                      <span>
                        {powerBase}<sup>{powerExp}</sup> ={' '}
                        {Array.from({ length: powerExp }, () => powerBase).join(' × ')} ={' '}
                        <span className="text-blue-400 font-bold">{calculatePower(powerBase, powerExp)}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-950/40 to-slate-900 rounded-xl border border-blue-800/40">
                  <span className="text-xs text-slate-400">Java Çıktısı (Sonuç):</span>
                  <div className="text-3xl font-bold font-mono text-blue-400 mt-1">
                    {calculatePower(powerBase, powerExp)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 1. TOPLAMA İŞLEMİ */}
        {/* ========================================================= */}
        {selectedOp === 'plus' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-slate-400 font-mono">static void plus()</span>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                  1. Toplama İşlemi
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Kullanıcıdan sırayla sayı alır, <code className="text-emerald-300 font-mono">0</code> girilene kadar toplar.
                </p>
              </div>

              <button
                onClick={() => {
                  const sum = plusNumbers.reduce((a, b) => a + b, 0);
                  onAddHistory({
                    operation: 'Toplama',
                    expression: plusNumbers.join(' + '),
                    result: sum,
                    source: 'visual',
                  });
                }}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Geçmişe Kaydet</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-slate-300 block">Sayı Ekle (0 bitirir kuralı):</span>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={newPlusNum}
                    onChange={(e) => setNewPlusNum(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newPlusNum !== '') {
                        setPlusNumbers([...plusNumbers, Number(newPlusNum)]);
                        setNewPlusNum('');
                      }
                    }}
                    placeholder="Sayı girin"
                    className="flex-1 bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={() => {
                      if (newPlusNum !== '') {
                        setPlusNumbers([...plusNumbers, Number(newPlusNum)]);
                        setNewPlusNum('');
                      }
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded"
                  >
                    Ekle
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {plusNumbers.map((val, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-md font-mono text-xs text-slate-200"
                    >
                      <span>{val}</span>
                      <button
                        onClick={() => setPlusNumbers(plusNumbers.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-400 ml-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {plusNumbers.length === 0 && (
                    <span className="text-xs text-slate-500">Henüz sayı eklenmedi.</span>
                  )}
                </div>
              </div>

              <div className="space-y-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-mono">Toplama Zinciri</span>
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-sm text-slate-300">
                    {plusNumbers.join(' + ')} ={' '}
                    <span className="text-emerald-400 font-bold">
                      {plusNumbers.reduce((a, b) => a + b, 0)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-950/40 to-slate-900 rounded-xl border border-emerald-800/40">
                  <span className="text-xs text-slate-400">Java Çıktısı (Sonuç):</span>
                  <div className="text-3xl font-bold font-mono text-emerald-400 mt-1">
                    {plusNumbers.reduce((a, b) => a + b, 0)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. ÇIKARMA İŞLEMİ */}
        {/* ========================================================= */}
        {selectedOp === 'minus' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-slate-400 font-mono">static void minus()</span>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                  2. Çıkarma İşlemi
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  İlk sayıdan sonraki girilen sayıları sırayla eksiltir.
                </p>
              </div>

              <button
                onClick={() => {
                  if (minusNumbers.length > 0) {
                    const diff = minusNumbers.reduce((acc, curr, idx) => (idx === 0 ? curr : acc - curr), 0);
                    onAddHistory({
                      operation: 'Çıkarma',
                      expression: minusNumbers.join(' - '),
                      result: diff,
                      source: 'visual',
                    });
                  }
                }}
                className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Geçmişe Kaydet</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-slate-300 block">Sayı Dizisi:</span>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={newMinusNum}
                    onChange={(e) => setNewMinusNum(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newMinusNum !== '') {
                        setMinusNumbers([...minusNumbers, Number(newMinusNum)]);
                        setNewMinusNum('');
                      }
                    }}
                    placeholder="Sayı girin"
                    className="flex-1 bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={() => {
                      if (newMinusNum !== '') {
                        setMinusNumbers([...minusNumbers, Number(newMinusNum)]);
                        setNewMinusNum('');
                      }
                    }}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium rounded"
                  >
                    Ekle
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {minusNumbers.map((val, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-1 px-2.5 py-1 border rounded-md font-mono text-xs ${
                        idx === 0
                          ? 'bg-amber-950/60 border-amber-700/80 text-amber-300'
                          : 'bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span>{idx === 0 ? `Başlangıç: ${val}` : `-${val}`}</span>
                      <button
                        onClick={() => setMinusNumbers(minusNumbers.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-400 ml-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-mono">Çıkarma Zinciri</span>
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-sm text-slate-300">
                    {minusNumbers.join(' - ')} ={' '}
                    <span className="text-amber-400 font-bold">
                      {minusNumbers.reduce((acc, curr, idx) => (idx === 0 ? curr : acc - curr), 0)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-amber-950/40 to-slate-900 rounded-xl border border-amber-800/40">
                  <span className="text-xs text-slate-400">Java Çıktısı (Sonuç):</span>
                  <div className="text-3xl font-bold font-mono text-amber-400 mt-1">
                    {minusNumbers.reduce((acc, curr, idx) => (idx === 0 ? curr : acc - curr), 0)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. ÇARPMA İŞLEMİ */}
        {/* ========================================================= */}
        {selectedOp === 'times' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-slate-400 font-mono">static void times()</span>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                  3. Çarpma İşlemi
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Sayıları birbiriyle çarpar. <code className="text-cyan-300 font-mono">1</code> bitirir, <code className="text-cyan-300 font-mono">0</code> yutan elemandır ve sonucu sıfırlar.
                </p>
              </div>

              <button
                onClick={() => {
                  const prod = timesNumbers.reduce((a, b) => a * b, 1);
                  onAddHistory({
                    operation: 'Çarpma',
                    expression: timesNumbers.join(' × '),
                    result: prod,
                    source: 'visual',
                  });
                }}
                className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Geçmişe Kaydet</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-slate-300 block">Çarpan Ekle:</span>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={newTimesNum}
                    onChange={(e) => setNewTimesNum(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newTimesNum !== '') {
                        setTimesNumbers([...timesNumbers, Number(newTimesNum)]);
                        setNewTimesNum('');
                      }
                    }}
                    placeholder="Sayı girin"
                    className="flex-1 bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => {
                      if (newTimesNum !== '') {
                        setTimesNumbers([...timesNumbers, Number(newTimesNum)]);
                        setNewTimesNum('');
                      }
                    }}
                    className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium rounded"
                  >
                    Ekle
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {timesNumbers.map((val, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-md font-mono text-xs text-slate-200"
                    >
                      <span>{val}</span>
                      <button
                        onClick={() => setTimesNumbers(timesNumbers.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-400 ml-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-mono">Çarpım İfadesi</span>
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-sm text-slate-300">
                    {timesNumbers.join(' × ')} ={' '}
                    <span className="text-cyan-400 font-bold">
                      {timesNumbers.reduce((a, b) => a * b, 1)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-cyan-950/40 to-slate-900 rounded-xl border border-cyan-800/40">
                  <span className="text-xs text-slate-400">Java Çıktısı (Sonuç):</span>
                  <div className="text-3xl font-bold font-mono text-cyan-400 mt-1">
                    {timesNumbers.reduce((a, b) => a * b, 1)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. BÖLME İŞLEMİ */}
        {/* ========================================================= */}
        {selectedOp === 'divided' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-slate-400 font-mono">static void divided()</span>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                  4. Bölme İşlemi
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  İlk sayıyı sonraki bölenlere sırayla böler. Sıfıra bölme durumunu engeller.
                </p>
              </div>

              <button
                onClick={() => {
                  if (divNumbers.length > 0) {
                    const result = divNumbers.reduce((acc, curr, idx) => (idx === 0 ? curr : acc / curr), 0);
                    onAddHistory({
                      operation: 'Bölme',
                      expression: divNumbers.join(' / '),
                      result: Number(result.toFixed(4)),
                      source: 'visual',
                    });
                  }
                }}
                className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Geçmişe Kaydet</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-slate-300 block">Bölünen ve Bölenler:</span>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={newDivNum}
                    onChange={(e) => setNewDivNum(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newDivNum !== '') {
                        setDivNumbers([...divNumbers, Number(newDivNum)]);
                        setNewDivNum('');
                      }
                    }}
                    placeholder="Sayı girin"
                    className="flex-1 bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={() => {
                      if (newDivNum !== '') {
                        setDivNumbers([...divNumbers, Number(newDivNum)]);
                        setNewDivNum('');
                      }
                    }}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium rounded"
                  >
                    Ekle
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {divNumbers.map((val, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-1 px-2.5 py-1 border rounded-md font-mono text-xs ${
                        idx === 0
                          ? 'bg-purple-950/60 border-purple-700/80 text-purple-300'
                          : 'bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span>{idx === 0 ? `Bölünen: ${val}` : `/ ${val}`}</span>
                      <button
                        onClick={() => setDivNumbers(divNumbers.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-400 ml-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-mono">Bölme İfadesi</span>
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-sm text-slate-300">
                    {divNumbers.join(' / ')} ={' '}
                    <span className="text-purple-400 font-bold">
                      {divNumbers
                        .reduce((acc, curr, idx) => (idx === 0 ? curr : acc / curr), 0)
                        .toFixed(4)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-950/40 to-slate-900 rounded-xl border border-purple-800/40">
                  <span className="text-xs text-slate-400">Java Çıktısı (Sonuç - double):</span>
                  <div className="text-3xl font-bold font-mono text-purple-400 mt-1">
                    {divNumbers
                      .reduce((acc, curr, idx) => (idx === 0 ? curr : acc / curr), 0)
                      .toFixed(4)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
