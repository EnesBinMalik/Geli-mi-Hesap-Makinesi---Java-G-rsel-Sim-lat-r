import React, { useState } from 'react';
import { JAVA_SOURCE_CODE } from '../data/javaSource';
import { Copy, Check, Download, FileCode2, Sparkles, CheckCircle2 } from 'lucide-react';

export const JavaCodeViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JAVA_SOURCE_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadFile = () => {
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

  const codeLines = JAVA_SOURCE_CODE.trim().split('\n');

  return (
    <div className="space-y-6">
      {/* Overview & Action Strip */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
              Eksiksiz &amp; Çalışmaya Hazır
            </span>
            <span className="text-xs text-slate-400 font-mono">JavaPatika.java</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">
            Gelişmiş Hesap Makinesi - Java Kaynak Kodu
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Ödev gereksinimleri olan <span className="text-amber-300 font-mono">mod()</span> ve <span className="text-indigo-300 font-mono">rectangle()</span> metotları eklenmiş ve menüye entegre edilmiştir.
          </p>
          <div className="mt-2 text-xs font-medium text-slate-300 flex items-center gap-2">
            <span>İmza:</span>
            <span className="text-indigo-400 font-semibold bg-indigo-950/60 border border-indigo-800/40 px-2 py-0.5 rounded">
              Enes Öztürk
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={handleCopy}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>

          <button
            onClick={downloadFile}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm shadow-indigo-600/30"
          >
            <Download className="w-4 h-4" />
            <span>.java İndir</span>
          </button>
        </div>
      </div>

      {/* Code Display Container */}
      <div className="bg-[#070b12] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-slate-200 font-medium">JavaPatika.java</span>
            <span className="text-slate-500">· {codeLines.length} satır</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1 text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Satır 125-155: Ödev Metotları</span>
            </span>
          </div>
        </div>

        {/* Code Lines Viewer */}
        <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono max-h-[620px] overflow-y-auto leading-relaxed select-text">
          <table className="w-full border-collapse">
            <tbody>
              {codeLines.map((line, index) => {
                const lineNum = index + 1;
                const isHomeworkMethod =
                  (lineNum >= 125 && lineNum <= 165) ||
                  line.includes('mod()') ||
                  line.includes('rectangle()') ||
                  line.includes('Enes Öztürk');

                // Basic syntax coloring
                let formattedLine = line;

                return (
                  <tr
                    key={index}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      isHomeworkMethod ? 'bg-amber-950/15' : ''
                    }`}
                  >
                    <td className="w-12 pr-4 text-right select-none text-slate-600 text-[11px] align-top">
                      {lineNum}
                    </td>
                    <td className="whitespace-pre text-slate-200">
                      {line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*') ? (
                        <span className="text-slate-500 italic">{line}</span>
                      ) : line.includes('static void mod()') || line.includes('static void rectangle()') ? (
                        <span className="text-amber-300 font-bold">{line}</span>
                      ) : line.includes('public class') || line.includes('import ') ? (
                        <span className="text-purple-400">{line}</span>
                      ) : line.includes('System.out.print') ? (
                        <span className="text-emerald-400/90">{line}</span>
                      ) : line.includes('case 7:') || line.includes('case 8:') ? (
                        <span className="text-amber-300 font-semibold">{line}</span>
                      ) : (
                        <span>{line}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
