import React from 'react';
import { BookOpen, CheckCircle2, Code2, Sparkles, Terminal, FileCheck, Layers } from 'lucide-react';

export const AssignmentGuide: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-900/40 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-2 py-0.5 rounded">
            Patika.dev Java 101 Kursu
          </span>
          <span className="text-xs text-slate-400">Ödev Teslim Dokümanı</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Gelişmiş Hesap Makinesi Ödev Raporu
        </h1>
        <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
          Mevcut Patika Java hesap makinesi projesine <strong>Mod Alma</strong> ve <strong>Dikdörtgen Alan/Çevre Hesabı</strong> metotları eklenerek <code className="text-indigo-300 font-mono">switch-case</code> menüsünde işlevsel hale getirilmiştir.
        </p>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <div>
            İmza: <span className="font-semibold text-white">Enes Öztürk</span>
          </div>
          <div>·</div>
          <div>
            Proje Dosyası: <span className="font-mono text-indigo-300">JavaPatika.java</span>
          </div>
          <div>·</div>
          <div>
            Fonksiyon Sayısı: <span className="font-semibold text-emerald-400">8 İşlem + Çıkış</span>
          </div>
        </div>
      </div>

      {/* 2 Main Additions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Homework 1: Mod */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-400 bg-amber-950/50 border border-amber-800/40 px-2 py-0.5 rounded">
              Ödev 1. Madde
            </span>
            <span className="text-xs font-mono text-slate-400">Case 7</span>
          </div>
          <h3 className="text-base font-bold text-white">Mod Alma Metodu (mod)</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Kullanıcıdan bölünen ve bölen sayıları <code className="text-amber-300 font-mono">Scanner</code> ile alınır. Sıfıra bölme (<code className="text-amber-300 font-mono">divisor == 0</code>) kontrol edilir. Java&apos;nın mod operatörü olan <code className="text-amber-300 font-mono">%</code> ile kalan hesaplanır.
          </p>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 font-mono text-xs text-slate-300 overflow-x-auto">
            <div className="text-slate-500">// Enes Öztürk - Mod Alma</div>
            <div>static void mod() &#123;</div>
            <div className="pl-4">Scanner scan = new Scanner(System.in);</div>
            <div className="pl-4">System.out.print(&quot;Bölünen sayıyı giriniz :&quot;);</div>
            <div className="pl-4">int number = scan.nextInt();</div>
            <div className="pl-4">System.out.print(&quot;Bölen sayıyı giriniz :&quot;);</div>
            <div className="pl-4">int divisor = scan.nextInt();</div>
            <div className="pl-4">if (divisor == 0) &#123;</div>
            <div className="pl-8 text-rose-400">System.out.println(&quot;Hata: Bölen 0 olamaz!&quot;);</div>
            <div className="pl-8">return;</div>
            <div className="pl-4">&#125;</div>
            <div className="pl-4 text-emerald-400">int result = number % divisor;</div>
            <div className="pl-4">System.out.println(&quot;Sonuç (Kalan) : &quot; + result);</div>
            <div>&#125;</div>
          </div>
        </div>

        {/* Homework 2: Rectangle */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-400 bg-indigo-950/50 border border-indigo-800/40 px-2 py-0.5 rounded">
              Ödev 2. Madde
            </span>
            <span className="text-xs font-mono text-slate-400">Case 8</span>
          </div>
          <h3 className="text-base font-bold text-white">Dikdörtgen Alan ve Çevre Metodu (rectangle)</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Kullanıcıdan dikdörtgenin iki kenar uzunluğu alınır. Pozitiflik kontrolü yapılır. Çevre formülü <code className="text-indigo-300 font-mono">2 * (a + b)</code>, alan formülü <code className="text-indigo-300 font-mono">a * b</code> ile hesaplanıp yazdırılır.
          </p>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 font-mono text-xs text-slate-300 overflow-x-auto">
            <div className="text-slate-500">// Enes Öztürk - Dikdörtgen</div>
            <div>static void rectangle() &#123;</div>
            <div className="pl-4">Scanner scan = new Scanner(System.in);</div>
            <div className="pl-4">System.out.print(&quot;1. Kenar (Kısa) :&quot;);</div>
            <div className="pl-4">int a = scan.nextInt();</div>
            <div className="pl-4">System.out.print(&quot;2. Kenar (Uzun) :&quot;);</div>
            <div className="pl-4">int b = scan.nextInt();</div>
            <div className="pl-4">if (a &lt;= 0 || b &lt;= 0) &#123;</div>
            <div className="pl-8 text-rose-400">System.out.println(&quot;Hata: Kenarlar &gt; 0 olmalı!&quot;);</div>
            <div className="pl-8">return;</div>
            <div className="pl-4">&#125;</div>
            <div className="pl-4 text-emerald-400">int perimeter = 2 * (a + b);</div>
            <div className="pl-4 text-emerald-400">int area = a * b;</div>
            <div className="pl-4">System.out.println(&quot;Çevresi : &quot; + perimeter);</div>
            <div className="pl-4">System.out.println(&quot;Alanı   : &quot; + area);</div>
            <div>&#125;</div>
          </div>
        </div>
      </div>

      {/* Switch Case Menu Integration */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Switch-Case Menü Entegrasyonu</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Ana program döngüsündeki <code className="text-indigo-300 font-mono">switch (select)</code> bloğuna <code className="text-amber-300 font-mono">case 7: mod(); break;</code> ve <code className="text-indigo-300 font-mono">case 8: rectangle(); break;</code> durumları eklenerek menü seçenekleri tamamen işlevsel hale getirilmiştir.
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
          <pre className="text-slate-300 whitespace-pre leading-relaxed">
{`switch (select) {
    case 1: plus(); break;
    case 2: minus(); break;
    case 3: times(); break;
    case 4: divided(); break;
    case 5: power(); break;
    case 6: factorial(); break;
    case 7: // Enes Öztürk Ödevi
        mod();
        break;
    case 8: // Enes Öztürk Ödevi
        rectangle();
        break;
    case 0:
        System.out.println("Programdan çıkış yapıldı.");
        break;
    default:
        System.out.println("Yanlış bir değer girdiniz, tekrar deneyiniz.");
}`}
          </pre>
        </div>
      </div>

      {/* Verification Steps */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>Bilgisayarda Derleme ve Çalıştırma (Terminal / IDE)</span>
        </h3>
        <p className="text-xs text-slate-300">
          İndirdiğiniz <code className="text-indigo-300 font-mono">JavaPatika.java</code> dosyasını herhangi bir işletim sisteminde terminal veya komut satırından derlemek için:
        </p>
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400/95 space-y-1">
          <div>$ javac JavaPatika.java</div>
          <div>$ java JavaPatika</div>
        </div>
        <p className="text-xs text-slate-400">
          Ayrıca IntelliJ IDEA, Eclipse, NetBeans veya VS Code içerisine kopyalayarak doğrudan Run tuşu ile çalıştırabilirsiniz.
        </p>
      </div>
    </div>
  );
};
