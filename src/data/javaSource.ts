export const JAVA_SOURCE_CODE = `/**
 * Patika.dev - Java 101: Gelişmiş Hesap Makinesi
 * 
 * Fonksiyonlar:
 * 1- Toplama İşlemi
 * 2- Çıkarma İşlemi
 * 3- Çarpma İşlemi
 * 4- Bölme işlemi
 * 5- Üslü Sayı Hesaplama
 * 6- Faktoriyel Hesaplama
 * 7- Mod Alma (ÖDEV)
 * 8- Dikdörtgen Alan ve Çevre Hesabı (ÖDEV)
 * 0- Çıkış Yap
 * 
 * Hazırlayan: Enes Öztürk
 */

import java.util.Scanner;

public class JavaPatika {

    static void plus() {
        Scanner scan = new Scanner(System.in);
        int number, result = 0, i = 1;
        while (true) {
            System.out.print(i++ + ". sayı :");
            number = scan.nextInt();
            if (number == 0) {
                break;
            }
            result += number;
        }
        System.out.println("Sonuç : " + result);
    }

    static void minus() {
        Scanner scan = new Scanner(System.in);
        System.out.print("Kaç adet sayı gireceksiniz :");
        int counter = scan.nextInt();
        int number, result = 0;

        for (int i = 1; i <= counter; i++) {
            System.out.print(i + ". sayı :");
            number = scan.nextInt();
            if (i == 1) {
                result += number;
                continue;
            }
            result -= number;
        }

        System.out.println("Sonuç : " + result);
    }

    static void times() {
        Scanner scan = new Scanner(System.in);
        int number, result = 1, i = 1;

        while (true) {
            System.out.print(i++ + ". sayı :");
            number = scan.nextInt();

            if (number == 1)
                break;

            if (number == 0) {
                result = 0;
                break;
            }
            result *= number;
        }

        System.out.println("Sonuç : " + result);
    }

    static void divided() {
        Scanner scan = new Scanner(System.in);
        System.out.print("Kaç adet sayı gireceksiniz :");
        int counter = scan.nextInt();
        double number, result = 0.0;

        for (int i = 1; i <= counter; i++) {
            System.out.print(i + ". sayı :");
            number = scan.nextDouble();
            if (i != 1 && number == 0) {
                System.out.println("Böleni 0 giremezsiniz.");
                continue;
            }
            if (i == 1) {
                result = number;
                continue;
            }
            result /= number;
        }

        System.out.println("Sonuç : " + result);
    }

    static void power() {
        Scanner scan = new Scanner(System.in);
        System.out.print("Taban değeri giriniz :");
        int base = scan.nextInt();
        System.out.print("Üs değeri giriniz :");
        int exponent = scan.nextInt();
        int result = 1;

        for (int i = 1; i <= exponent; i++) {
            result *= base;
        }

        System.out.println("Sonuç : " + result);
    }

    static void factorial() {
        Scanner scan = new Scanner(System.in);
        System.out.print("Sayı giriniz :");
        int n = scan.nextInt();
        int result = 1;

        for (int i = 1; i <= n; i++) {
            result *= i;
        }

        System.out.println("Sonuç : " + result);
    }

    // ==========================================
    // ÖDEV 1: Mod Alma Metotu - Enes Öztürk
    // ==========================================
    static void mod() {
        Scanner scan = new Scanner(System.in);
        System.out.print("Bölünen sayıyı giriniz :");
        int number = scan.nextInt();
        System.out.print("Bölen sayıyı giriniz :");
        int divisor = scan.nextInt();

        if (divisor == 0) {
            System.out.println("Hata: Bölen sayı 0 olamaz! Mod işlemi tanımsızdır.");
            return;
        }

        int result = number % divisor;
        System.out.println("Sonuç (Kalan) : " + result);
    }

    // ==========================================
    // ÖDEV 2: Dikdörtgen Alan ve Çevre Hesabı - Enes Öztürk
    // ==========================================
    static void rectangle() {
        Scanner scan = new Scanner(System.in);
        System.out.print("1. Kenar uzunluğunu giriniz (Kısa Kenar) :");
        int a = scan.nextInt();
        System.out.print("2. Kenar uzunluğunu giriniz (Uzun Kenar) :");
        int b = scan.nextInt();

        if (a <= 0 || b <= 0) {
            System.out.println("Hata: Kenar uzunlukları sıfırdan büyük pozitif bir sayı olmalıdır.");
            return;
        }

        int perimeter = 2 * (a + b);
        int area = a * b;

        System.out.println("Dikdörtgenin Çevresi : " + perimeter);
        System.out.println("Dikdörtgenin Alanı   : " + area);
    }

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int select;
        String menu = "1- Toplama İşlemi\\n"
                + "2- Çıkarma İşlemi\\n"
                + "3- Çarpma İşlemi\\n"
                + "4- Bölme işlemi\\n"
                + "5- Üslü Sayı Hesaplama\\n"
                + "6- Faktoriyel Hesaplama\\n"
                + "7- Mod Alma\\n"
                + "8- Dikdörtgen Alan ve Çevre Hesabı\\n"
                + "0- Çıkış Yap";

        System.out.println("==================================================");
        System.out.println("   GELİŞMİŞ HESAP MAKİNESİ (JavaPatika)");
        System.out.println("   Hazırlayan: Enes Öztürk");
        System.out.println("==================================================");

        do {
            System.out.println(menu);
            System.out.print("Lütfen bir işlem seçiniz :");
            select = scan.nextInt();
            switch (select) {
                case 1:
                    plus();
                    break;
                case 2:
                    minus();
                    break;
                case 3:
                    times();
                    break;
                case 4:
                    divided();
                    break;
                case 5:
                    power();
                    break;
                case 6:
                    factorial();
                    break;
                case 7:
                    mod();
                    break;
                case 8:
                    rectangle();
                    break;
                case 0:
                    System.out.println("Programdan çıkış yapıldı. Güle güle!");
                    break;
                default:
                    System.out.println("Yanlış bir değer girdiniz, tekrar deneyiniz.");
            }
            System.out.println();
        } while (select != 0);
    }
}
`;

export const OPERATIONS = [
  { id: 'plus' as const, number: 1, title: 'Toplama İşlemi', shortDesc: 'Sayıları ardı ardına toplar (0 bitirir)' },
  { id: 'minus' as const, number: 2, title: 'Çıkarma İşlemi', shortDesc: 'Belirlenen adette sayıyı ilk sayıdan çıkarır' },
  { id: 'times' as const, number: 3, title: 'Çarpma İşlemi', shortDesc: 'Sayıları çarpar (1 bitirir, 0 sıfırlar)' },
  { id: 'divided' as const, number: 4, title: 'Bölme İşlemi', shortDesc: 'İlk sayıyı sonraki sayılara sırayla böler' },
  { id: 'power' as const, number: 5, title: 'Üslü Sayı Hesaplama', shortDesc: 'Taban ve üs alarak üslü kuvvet hesaplar' },
  { id: 'factorial' as const, number: 6, title: 'Faktöriyel Hesaplama', shortDesc: 'Girilen n sayısının faktöriyelini (n!) hesaplar' },
  { id: 'mod' as const, number: 7, title: 'Mod Alma', shortDesc: 'Bölünen sayının bölene göre kalanını (A % B) bulur', isHomework: true },
  { id: 'rectangle' as const, number: 8, title: 'Dikdörtgen Alan ve Çevre', shortDesc: 'Kısa ve uzun kenarla alan (a*b) ve çevre (2*(a+b)) hesaplar', isHomework: true },
];
