---
name: ATmega8 — interaktiv signal va PWM sliderlari
tags:
  - AVR
  - PWM
  - interactive
---

# ATmega8 — interaktiv signal va PWM sliderlari

[[Microcontroller/ATmega8-16PU orqali function generator|ATmega8 function generator loyihasi]] uchun parametrlarni sliderlar bilan o‘zgartirishga mo‘ljallangan alohida interaktiv ko‘rinish.

<interactive src="atmega8-signal-pwm-sliderlar" />

## Foydalanish

1. **Sinus**, **Uchburchak**, **Arrasimon** yoki **PWM** rejimini tanlang.
2. **Chastota** sliderini suring. Shkala logarifmik: analog rejimlarda 1–1000 Hz, PWMda 1 Hz–100 kHz. Bular ko‘rgazmali modelning sozlash chegaralari.
3. Analog rejimlarda **amplituda**ni 0.5–4 Vpp oralig‘ida o‘zgartiring. Signal markazi 2.5 V: masalan, 4 Vpp uchun minimum 0.5 V, maksimum 4.5 V.
4. **PWM** rejimida **duty**ni 0–100% oralig‘ida o‘zgartiring. Impuls kengligi, yoqilgan va o‘chirilgan vaqtlar hamda ideal o‘rtacha kuchlanish darhol yangilanadi.

Faol rejimga tegishli bo‘lmagan slider o‘chiriladi. Grafik har doim **ikki davr**ni ko‘rsatadi: chastota o‘zgarganda vaqt o‘qidagi qiymatlar o‘zgaradi. Holat vaqtinchalik; qayta yuklanganda boshlang‘ich qiymatlarga qaytadi.

## PWM hisoblari

5 V balandlikdagi ideal impulslar uchun:

$$
T = \frac{1}{f},\qquad
t_{ON} = T\frac{D}{100},\qquad
t_{OFF} = T\left(1-\frac{D}{100}\right)
$$

$$
V_{avg} = 5\frac{D}{100}
$$

Bu yerda $D$ — duty foizi. Masalan, 1 kHz va 25% duty uchun davr 1 ms, yoqilgan vaqt 250 µs, o‘chirilgan vaqt 750 µs, ideal o‘rtacha kuchlanish 1.25 V.

PWM grafigidagi uzlukli chiziq o‘rtacha kuchlanishni bildiradi. 0% da chiqish doimiy 0 V, 100% da doimiy 5 V; bu ikki holatda chiqishda impulslar yo‘q.

## Model va haqiqiy qurilma

Bu interaktiv **ideal matematik ko‘rgazma**: MCUga buyruq yubormaydi, AVR registrlari, chastota kvantlanishi, real RC filtr yoki op-ampni simulyatsiya qilmaydi. Analog rejimlar kerakli signal shaklini ko‘rsatadi; PWM rejimi esa alohida impulslar va duty ta’sirini ko‘rsatadi.

Manba loyihada raqamli to‘rtburchak chiqishning bazaviy rejimi **50% duty** bilan berilgan. Ushbu interaktivdagi erkin duty boshqaruvi haqiqiy firmware ham shu imkoniyatga ega ekanini bildirmaydi. Analog chiqish chastotasi bilan PWM tashuvchi chastotasi ham alohida kattaliklardir.
