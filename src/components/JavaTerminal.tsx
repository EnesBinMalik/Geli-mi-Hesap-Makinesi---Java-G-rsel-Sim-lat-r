import React, { useState, useEffect, useRef } from 'react';
import { HistoryItem } from '../types';
import { Terminal, Play, RotateCcw, Trash2, Send, CornerDownLeft, Sparkles, CheckCircle2 } from 'lucide-react';

interface JavaTerminalProps {
  onAddHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
}

interface TerminalLine {
  id: string;
  type: 'output' | 'input' | 'prompt' | 'system' | 'error' | 'success';
  text: string;
}

type StepState =
  | { state: 'MENU' }
  | { state: 'PLUS'; step: number; runningSum: number; numbers: number[] }
  | { state: 'MINUS_COUNT' }
  | { state: 'MINUS_NUMS'; count: number; currentIdx: number; result: number; numbers: number[] }
  | { state: 'TIMES'; step: number; runningProduct: number; numbers: number[] }
  | { state: 'DIVIDED_COUNT' }
  | { state: 'DIVIDED_NUMS'; count: number; currentIdx: number; result: number; numbers: number[] }
  | { state: 'POWER_BASE' }
  | { state: 'POWER_EXP'; base: number }
  | { state: 'FACTORIAL' }
  | { state: 'MOD_NUM' }
  | { state: 'MOD_DIVISOR'; number: number }
  | { state: 'RECT_A' }
  | { state: 'RECT_B'; a: number }
  | { state: 'EXITED' };

const INITIAL_LINES: TerminalLine[] = [
  { id: '1', type: 'system', text: 'Enes@PatikaDev:~/JavaProjects/AdvancedCalculator$ javac JavaPatika.java' },
  { id: '2', type: 'system', text: 'Enes@PatikaDev:~/JavaProjects/AdvancedCalculator$ java JavaPatika' },
  { id: '3', type: 'system', text: '==================================================' },
  { id: '4', type: 'system', text: '   GELİŞMİŞ HESAP MAKİNESİ (JavaPatika)' },
  { id: '5', type: 'system', text: '   Hazırlayan: Enes Öztürk' },
  { id: '6', type: 'system', text: '==================================================' },
  { id: '7', type: 'output', text: '1- Toplama İşlemi\n2- Çıkarma İşlemi\n3- Çarpma İşlemi\n4- Bölme işlemi\n5- Üslü Sayı Hesaplama\n6- Faktoriyel Hesaplama\n7- Mod Alma (ÖDEV)\n8- Dikdörtgen Alan ve Çevre Hesabı (ÖDEV)\n0- Çıkış Yap' },
  { id: '8', type: 'prompt', text: 'Lütfen bir işlem seçiniz :' },
];

export const JavaTerminal: React.FC<JavaTerminalProps> = ({ onAddHistory }) => {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);
  const [inputValue, setInputValue] = useState('');
  const [stepState, setStepState] = useState<StepState>({ state: 'MENU' });
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const menuText = '1- Toplama İşlemi\n2- Çıkarma İşlemi\n3- Çarpma İşlemi\n4- Bölme işlemi\n5- Üslü Sayı Hesaplama\n6- Faktoriyel Hesaplama\n7- Mod Alma\n8- Dikdörtgen Alan ve Çevre Hesabı\n0- Çıkış Yap';

  // Auto scroll
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const addLine = (type: TerminalLine['type'], text: string) => {
    setLines((prev) => [...prev, { id: Math.random().toString(36).substring(7), type, text }]);
  };

  const showMenuAndPrompt = () => {
    addLine('output', menuText);
    addLine('prompt', 'Lütfen bir işlem seçiniz :');
    setStepState({ state: 'MENU' });
  };

  const handleInputSubmit = (valueToProcess?: string) => {
    const rawVal = (valueToProcess !== undefined ? valueToProcess : inputValue).trim();
    if (rawVal === '') return;

    // Echo input
    addLine('input', rawVal);
    if (valueToProcess === undefined) {
      setInputValue('');
    }

    const num = Number(rawVal);
    const isNum = !isNaN(num);

    switch (stepState.state) {
      case 'MENU': {
        if (!isNum || !Number.isInteger(num) || num < 0 || num > 8) {
          addLine('error', 'Yanlış bir değer girdiniz, tekrar deneyiniz.');
          addLine('prompt', 'Lütfen bir işlem seçiniz :');
          return;
        }

        switch (num) {
          case 1:
            addLine('system', '--- [1] Toplama İşlemi Seçildi ---');
            addLine('prompt', '1. sayı :');
            setStepState({ state: 'PLUS', step: 1, runningSum: 0, numbers: [] });
            break;
          case 2:
            addLine('system', '--- [2] Çıkarma İşlemi Seçildi ---');
            addLine('prompt', 'Kaç adet sayı gireceksiniz :');
            setStepState({ state: 'MINUS_COUNT' });
            break;
          case 3:
            addLine('system', '--- [3] Çarpma İşlemi Seçildi ---');
            addLine('prompt', '1. sayı :');
            setStepState({ state: 'TIMES', step: 1, runningProduct: 1, numbers: [] });
            break;
          case 4:
            addLine('system', '--- [4] Bölme İşlemi Seçildi ---');
            addLine('prompt', 'Kaç adet sayı gireceksiniz :');
            setStepState({ state: 'DIVIDED_COUNT' });
            break;
          case 5:
            addLine('system', '--- [5] Üslü Sayı Hesaplama Seçildi ---');
            addLine('prompt', 'Taban değeri giriniz :');
            setStepState({ state: 'POWER_BASE' });
            break;
          case 6:
            addLine('system', '--- [6] Faktöriyel Hesaplama Seçildi ---');
            addLine('prompt', 'Sayı giriniz :');
            setStepState({ state: 'FACTORIAL' });
            break;
          case 7:
            addLine('system', '--- [7] Mod Alma (ÖDEV - Enes Öztürk) ---');
            addLine('prompt', 'Bölünen sayıyı giriniz :');
            setStepState({ state: 'MOD_NUM' });
            break;
          case 8:
            addLine('system', '--- [8] Dikdörtgen Alan ve Çevre Hesabı (ÖDEV - Enes Öztürk) ---');
            addLine('prompt', '1. Kenar uzunluğunu giriniz (Kısa Kenar) :');
            setStepState({ state: 'RECT_A' });
            break;
          case 0:
            addLine('system', 'Programdan çıkış yapıldı. Güle güle! (Hazırlayan: Enes Öztürk)');
            setStepState({ state: 'EXITED' });
            break;
        }
        break;
      }

      // 1. PLUS
      case 'PLUS': {
        if (!isNum) {
          addLine('error', 'Lütfen geçerli bir sayı giriniz:');
          addLine('prompt', `${stepState.step}. sayı :`);
          return;
        }
        if (num === 0) {
          const finalResult = stepState.runningSum;
          addLine('success', `Sonuç : ${finalResult}`);
          onAddHistory({
            operation: 'Toplama',
            expression: stepState.numbers.length > 0 ? stepState.numbers.join(' + ') : '0',
            result: finalResult,
            source: 'terminal',
          });
          showMenuAndPrompt();
        } else {
          const newSum = stepState.runningSum + num;
          const nextStep = stepState.step + 1;
          const newNumbers = [...stepState.numbers, num];
          setStepState({
            state: 'PLUS',
            step: nextStep,
            runningSum: newSum,
            numbers: newNumbers,
          });
          addLine('prompt', `${nextStep}. sayı :`);
        }
        break;
      }

      // 2. MINUS COUNT
      case 'MINUS_COUNT': {
        if (!isNum || num <= 0) {
          addLine('error', 'Lütfen 0\'dan büyük bir adet giriniz:');
          addLine('prompt', 'Kaç adet sayı gireceksiniz :');
          return;
        }
        setStepState({
          state: 'MINUS_NUMS',
          count: Math.floor(num),
          currentIdx: 1,
          result: 0,
          numbers: [],
        });
        addLine('prompt', '1. sayı :');
        break;
      }

      // 2. MINUS NUMS
      case 'MINUS_NUMS': {
        if (!isNum) {
          addLine('error', 'Lütfen geçerli bir sayı giriniz:');
          addLine('prompt', `${stepState.currentIdx}. sayı :`);
          return;
        }
        const updatedNumbers = [...stepState.numbers, num];
        let currentResult = stepState.result;

        if (stepState.currentIdx === 1) {
          currentResult = num;
        } else {
          currentResult -= num;
        }

        if (stepState.currentIdx >= stepState.count) {
          addLine('success', `Sonuç : ${currentResult}`);
          onAddHistory({
            operation: 'Çıkarma',
            expression: updatedNumbers.join(' - '),
            result: currentResult,
            source: 'terminal',
          });
          showMenuAndPrompt();
        } else {
          const nextIdx = stepState.currentIdx + 1;
          setStepState({
            ...stepState,
            currentIdx: nextIdx,
            result: currentResult,
            numbers: updatedNumbers,
          });
          addLine('prompt', `${nextIdx}. sayı :`);
        }
        break;
      }

      // 3. TIMES
      case 'TIMES': {
        if (!isNum) {
          addLine('error', 'Lütfen geçerli bir sayı giriniz:');
          addLine('prompt', `${stepState.step}. sayı :`);
          return;
        }
        if (num === 1) {
          // Break identity
          const finalResult = stepState.runningProduct;
          addLine('success', `Sonuç : ${finalResult}`);
          onAddHistory({
            operation: 'Çarpma',
            expression: stepState.numbers.length > 0 ? stepState.numbers.join(' × ') : '1',
            result: finalResult,
            source: 'terminal',
          });
          showMenuAndPrompt();
        } else if (num === 0) {
          // Zero terminates and results in 0
          addLine('success', `Sonuç : 0`);
          onAddHistory({
            operation: 'Çarpma',
            expression: [...stepState.numbers, 0].join(' × '),
            result: 0,
            source: 'terminal',
          });
          showMenuAndPrompt();
        } else {
          const newProduct = stepState.runningProduct * num;
          const nextStep = stepState.step + 1;
          setStepState({
            state: 'TIMES',
            step: nextStep,
            runningProduct: newProduct,
            numbers: [...stepState.numbers, num],
          });
          addLine('prompt', `${nextStep}. sayı :`);
        }
        break;
      }

      // 4. DIVIDED COUNT
      case 'DIVIDED_COUNT': {
        if (!isNum || num <= 0) {
          addLine('error', 'Lütfen 0\'dan büyük bir adet giriniz:');
          addLine('prompt', 'Kaç adet sayı gireceksiniz :');
          return;
        }
        setStepState({
          state: 'DIVIDED_NUMS',
          count: Math.floor(num),
          currentIdx: 1,
          result: 0,
          numbers: [],
        });
        addLine('prompt', '1. sayı :');
        break;
      }

      // 4. DIVIDED NUMS
      case 'DIVIDED_NUMS': {
        if (!isNum) {
          addLine('error', 'Lütfen geçerli bir sayı giriniz:');
          addLine('prompt', `${stepState.currentIdx}. sayı :`);
          return;
        }

        if (stepState.currentIdx !== 1 && num === 0) {
          addLine('error', 'Böleni 0 giremezsiniz.');
          addLine('prompt', `${stepState.currentIdx}. sayı :`);
          return;
        }

        let nextResult = stepState.result;
        if (stepState.currentIdx === 1) {
          nextResult = num;
        } else {
          nextResult /= num;
        }

        const updatedNumbers = [...stepState.numbers, num];

        if (stepState.currentIdx >= stepState.count) {
          addLine('success', `Sonuç : ${nextResult}`);
          onAddHistory({
            operation: 'Bölme',
            expression: updatedNumbers.join(' / '),
            result: Number(nextResult.toFixed(4)),
            source: 'terminal',
          });
          showMenuAndPrompt();
        } else {
          const nextIdx = stepState.currentIdx + 1;
          setStepState({
            ...stepState,
            currentIdx: nextIdx,
            result: nextResult,
            numbers: updatedNumbers,
          });
          addLine('prompt', `${nextIdx}. sayı :`);
        }
        break;
      }

      // 5. POWER BASE
      case 'POWER_BASE': {
        if (!isNum) {
          addLine('error', 'Lütfen geçerli bir taban değeri giriniz:');
          addLine('prompt', 'Taban değeri giriniz :');
          return;
        }
        setStepState({ state: 'POWER_EXP', base: num });
        addLine('prompt', 'Üs değeri giriniz :');
        break;
      }

      // 5. POWER EXP
      case 'POWER_EXP': {
        if (!isNum) {
          addLine('error', 'Lütfen geçerli bir üs değeri giriniz:');
          addLine('prompt', 'Üs değeri giriniz :');
          return;
        }
        const base = stepState.base;
        const exp = num;
        let result = 1;
        for (let i = 1; i <= exp; i++) {
          result *= base;
        }
        addLine('success', `Sonuç : ${result}`);
        onAddHistory({
          operation: 'Üslü Sayı',
          expression: `${base}^${exp}`,
          result,
          source: 'terminal',
        });
        showMenuAndPrompt();
        break;
      }

      // 6. FACTORIAL
      case 'FACTORIAL': {
        if (!isNum || num < 0 || !Number.isInteger(num)) {
          addLine('error', 'Lütfen sıfır veya pozitif bir tamsayı giriniz:');
          addLine('prompt', 'Sayı giriniz :');
          return;
        }
        let result = 1;
        for (let i = 1; i <= num; i++) {
          result *= i;
        }
        addLine('success', `Sonuç : ${result}`);
        onAddHistory({
          operation: 'Faktöriyel',
          expression: `${num}!`,
          result,
          source: 'terminal',
        });
        showMenuAndPrompt();
        break;
      }

      // 7. MOD NUM (ÖDEV)
      case 'MOD_NUM': {
        if (!isNum) {
          addLine('error', 'Lütfen geçerli bir sayı giriniz:');
          addLine('prompt', 'Bölünen sayıyı giriniz :');
          return;
        }
        setStepState({ state: 'MOD_DIVISOR', number: num });
        addLine('prompt', 'Bölen sayıyı giriniz :');
        break;
      }

      // 7. MOD DIVISOR (ÖDEV)
      case 'MOD_DIVISOR': {
        if (!isNum) {
          addLine('error', 'Lütfen geçerli bir bölen sayısı giriniz:');
          addLine('prompt', 'Bölen sayıyı giriniz :');
          return;
        }
        if (num === 0) {
          addLine('error', 'Hata: Bölen sayı 0 olamaz! Mod işlemi tanımsızdır.');
          showMenuAndPrompt();
          return;
        }
        const dividend = stepState.number;
        const divisor = num;
        const result = dividend % divisor;
        addLine('success', `Sonuç (Kalan) : ${result}`);
        onAddHistory({
          operation: 'Mod Alma',
          expression: `${dividend} % ${divisor}`,
          result,
          source: 'terminal',
        });
        showMenuAndPrompt();
        break;
      }

      // 8. RECTANGLE A (ÖDEV)
      case 'RECT_A': {
        if (!isNum || num <= 0) {
          addLine('error', 'Hata: Kenar uzunlukları sıfırdan büyük pozitif bir sayı olmalıdır.');
          showMenuAndPrompt();
          return;
        }
        setStepState({ state: 'RECT_B', a: num });
        addLine('prompt', '2. Kenar uzunluğunu giriniz (Uzun Kenar) :');
        break;
      }

      // 8. RECTANGLE B (ÖDEV)
      case 'RECT_B': {
        if (!isNum || num <= 0) {
          addLine('error', 'Hata: Kenar uzunlukları sıfırdan büyük pozitif bir sayı olmalıdır.');
          showMenuAndPrompt();
          return;
        }
        const a = stepState.a;
        const b = num;
        const perimeter = 2 * (a + b);
        const area = a * b;
        addLine('success', `Dikdörtgenin Çevresi : ${perimeter}`);
        addLine('success', `Dikdörtgenin Alanı   : ${area}`);
        onAddHistory({
          operation: 'Dikdörtgen (Çevre & Alan)',
          expression: `a=${a}, b=${b} -> Alan=${area}, Çevre=${perimeter}`,
          result: `Alan: ${area}, Çevre: ${perimeter}`,
          source: 'terminal',
        });
        showMenuAndPrompt();
        break;
      }

      case 'EXITED': {
        addLine('system', 'Terminal sonlandırıldı. Yeniden başlatmak için aşağıdaki butonu kullanabilirsiniz.');
        break;
      }
    }
  };

  const restartTerminal = () => {
    setLines(INITIAL_LINES);
    setStepState({ state: 'MENU' });
    setInputValue('');
  };

  const clearLines = () => {
    setLines([
      { id: 'c1', type: 'system', text: '--- Terminal Temizlendi ---' },
      { id: 'c2', type: 'output', text: menuText },
      { id: 'c3', type: 'prompt', text: 'Lütfen bir işlem seçiniz :' },
    ]);
    setStepState({ state: 'MENU' });
  };

  // Preset quick simulation runs
  const runPreset = (sequence: string[], name: string) => {
    restartTerminal();
    setTimeout(() => {
      addLine('system', `>>> Hızlı Test Çalıştırılıyor: ${name} <<<`);
      let delay = 350;
      sequence.forEach((val) => {
        setTimeout(() => {
          handleInputSubmit(val);
        }, delay);
        delay += 400;
      });
    }, 100);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Terminal Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/70 border border-slate-800 rounded-xl px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-xs font-mono font-medium text-slate-300">JavaPatika.java: Terminal CLI</span>
          <span className="text-[11px] text-emerald-400/90 font-mono flex items-center gap-1 ml-2">
            <CheckCircle2 className="w-3 h-3" /> JDK 21 Aktif
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearLines}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-md hover:bg-slate-800 transition-colors"
            title="Ekranı Temizle"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Temizle</span>
          </button>
          <button
            onClick={restartTerminal}
            className="flex items-center gap-1 text-xs text-indigo-300 hover:text-indigo-200 bg-indigo-950/60 border border-indigo-800/60 hover:bg-indigo-900/60 px-2.5 py-1 rounded-md transition-colors"
            title="Yeniden Başlat"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Yeniden Başlat</span>
          </button>
        </div>
      </div>

      {/* Main Terminal Window */}
      <div className="relative flex-1 min-h-[460px] max-h-[580px] bg-[#070b12] border border-slate-800 rounded-xl overflow-hidden flex flex-col font-mono text-sm shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-2 flex items-center justify-between text-xs text-slate-400 select-none">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>enes@patika-dev:~/JavaProjects/AdvancedCalculator</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">UTF-8 · Java Scanner Emulator</span>
        </div>

        {/* Terminal Body */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-1 text-xs sm:text-sm text-slate-200"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line) => {
            if (line.type === 'system') {
              return (
                <div key={line.id} className="text-slate-400/90 py-0.5 select-text">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'output') {
              return (
                <pre key={line.id} className="text-slate-300 whitespace-pre-wrap font-mono py-1 leading-relaxed">
                  {line.text}
                </pre>
              );
            }
            if (line.type === 'prompt') {
              return (
                <div key={line.id} className="text-cyan-400 font-medium py-0.5">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'input') {
              return (
                <div key={line.id} className="text-amber-300 font-semibold py-0.5 flex items-center gap-1.5">
                  <span className="text-slate-500 font-normal">&gt;</span>
                  <span>{line.text}</span>
                </div>
              );
            }
            if (line.type === 'success') {
              return (
                <div key={line.id} className="text-emerald-400 font-semibold py-1 bg-emerald-950/30 px-2 rounded border border-emerald-900/50 my-1">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'error') {
              return (
                <div key={line.id} className="text-rose-400 font-medium py-1 bg-rose-950/30 px-2 rounded border border-rose-900/50 my-1">
                  {line.text}
                </div>
              );
            }
            return null;
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input Bar */}
        <div className="bg-slate-900/80 border-t border-slate-800 p-2.5 sm:p-3 flex items-center gap-2">
          <span className="text-indigo-400 font-mono text-sm pl-1 font-semibold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleInputSubmit();
              }
            }}
            placeholder={
              stepState.state === 'EXITED'
                ? 'Program sonlandı. Yeniden başlatınız.'
                : 'Değer girin ve Enter\'a basın (Örn: 7, 8, 25...)'
            }
            disabled={stepState.state === 'EXITED'}
            className="flex-1 bg-transparent border-0 text-slate-100 placeholder-slate-500 text-sm focus:outline-none font-mono"
            autoFocus
          />
          <button
            onClick={() => handleInputSubmit()}
            disabled={stepState.state === 'EXITED' || inputValue.trim() === ''}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded text-xs font-medium flex items-center gap-1 transition-colors"
          >
            <span>Gönder</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Quick Interactive Presets & Guidance */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-slate-200">
            Hızlı Test Senaryoları (Otomatik Giriş Simülasyonu):
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          <button
            onClick={() => runPreset(['7', '27', '4'], 'Mod Alma (27 % 4)')}
            className="flex flex-col items-start p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-left transition-all group"
          >
            <span className="text-xs font-medium text-slate-200 group-hover:text-indigo-300">
              7- Mod Alma
            </span>
            <span className="text-[11px] text-slate-400 font-mono mt-0.5">27 % 4 = 3</span>
            <span className="text-[10px] text-indigo-400 mt-1">Ödev Fonksiyonu 1</span>
          </button>

          <button
            onClick={() => runPreset(['8', '7', '15'], 'Dikdörtgen (7x15)')}
            className="flex flex-col items-start p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-left transition-all group"
          >
            <span className="text-xs font-medium text-slate-200 group-hover:text-indigo-300">
              8- Dikdörtgen
            </span>
            <span className="text-[11px] text-slate-400 font-mono mt-0.5">7 × 15 (Alan, Çevre)</span>
            <span className="text-[10px] text-indigo-400 mt-1">Ödev Fonksiyonu 2</span>
          </button>

          <button
            onClick={() => runPreset(['6', '6'], 'Faktöriyel (6!)')}
            className="flex flex-col items-start p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-left transition-all group"
          >
            <span className="text-xs font-medium text-slate-200 group-hover:text-indigo-300">
              6- Faktöriyel
            </span>
            <span className="text-[11px] text-slate-400 font-mono mt-0.5">6! = 720</span>
            <span className="text-[10px] text-slate-500 mt-1">Standart İşlem</span>
          </button>

          <button
            onClick={() => runPreset(['5', '3', '4'], 'Üslü Sayı (3^4)')}
            className="flex flex-col items-start p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-left transition-all group"
          >
            <span className="text-xs font-medium text-slate-200 group-hover:text-indigo-300">
              5- Üslü Sayı
            </span>
            <span className="text-[11px] text-slate-400 font-mono mt-0.5">3^4 = 81</span>
            <span className="text-[10px] text-slate-500 mt-1">Standart İşlem</span>
          </button>

          <button
            onClick={() => runPreset(['1', '12', '28', '15', '0'], 'Toplama')}
            className="flex flex-col items-start p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-left transition-all group col-span-2 sm:col-span-1"
          >
            <span className="text-xs font-medium text-slate-200 group-hover:text-indigo-300">
              1- Toplama
            </span>
            <span className="text-[11px] text-slate-400 font-mono mt-0.5">12 + 28 + 15 (0 bitir)</span>
            <span className="text-[10px] text-slate-500 mt-1">Standart İşlem</span>
          </button>
        </div>
      </div>
    </div>
  );
};
