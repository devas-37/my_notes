---
name: Rezistorlar haqida
status: "null"
deleted: false
pinned: false
tags:
  - rezistor
---
# Rezistorlar (Resistors)

Rezistor — elektr zanjirida tok oqimini cheklash, kuchlanishni bo'lish va signal darajasini boshqarish uchun ishlatiladigan eng asosiy passiv komponentlardan biridir.

## Asosiy kattaliklari

- **Qarshilik (Resistance)** — Ohm (Ω)
- **Quvvat (Power Rating)** — Watt (W)
- **Aniqlik (Tolerance)** — %
- **Harorat koeffitsienti (Temperature Coefficient, TCR)** — ppm/°C

---

# Ohm qonuni

Rezistorlar uchun eng muhim formula:

```text
V = I × R
```

Bu yerda:

- V — Kuchlanish (Volt)
- I — Tok (Ampere)
- R — Qarshilik (Ohm)

Shuningdek:

```text
I = V / R
```

```text
R = V / I
```

---

# Quvvat

Rezistor qizishi uning quvvatiga bog'liq.

Formula:

```text
P = V × I
```

yoki

```text
P = I² × R
```

yoki

```text
P = V² / R
```

Masalan:

- 12V
- 100Ω

```text
I = 12 / 100 = 0.12A

P = 12 × 0.12 = 1.44W
```

Demak kamida **2W** rezistor kerak bo'ladi.

---

# Rezistor turlari

## Carbon Composition

Eng eski turi.

Afzalliklari:

- Arzon
- Impulslarga chidamli

Kamchiliklari:

- Aniqligi past
- Shovqini yuqori
- Qarshiligi vaqt o'tishi bilan o'zgaradi

---

## Carbon Film

Uy elektronikasida juda keng tarqalgan.

Aniqligi:

- ±5%
- ±2%

---

## Metal Film

Hozir eng ko'p ishlatiladigan tur.

Afzalliklari:

- Juda aniq
- Shovqini past
- Haroratga kam sezgir

Aniqligi:

- ±1%
- ±0.5%
- ±0.1%

---

## Metal Oxide

Yuqori harorat uchun.

Ko'pincha:

- Power supply
- Industrial qurilmalar

---

## Wirewound

Ichida sim o'ralgan bo'ladi.

Afzalliklari:

- Juda katta quvvat
- Juda ishonchli

Kamchiliklari:

- Induktivligi mavjud
- Yuqori chastotada yaxshi emas

---

## SMD Rezistor

Yuzaga o'rnatiladigan rezistor.

Masalan:

- 0402
- 0603
- 0805
- 1206

---

# Quvvat turlari

Eng mashhurlari:

- 1/16W
- 1/10W
- 1/8W
- 1/4W
- 1/2W
- 1W
- 2W
- 5W
- 10W
- 25W
- 50W

---

# Rang kodi

Misol:

```
Brown Black Red Gold
```

Hisoblash:

```
1
0
×100
±5%
```

Natija:

```
1000Ω
```

ya'ni

```
1kΩ ±5%
```

---

## Ranglar jadvali

| Rang | Raqam | Ko'paytiruvchi | Tolerans |
|------|-------|----------------|-----------|
| Black | 0 | ×1 | - |
| Brown | 1 | ×10 | ±1% |
| Red | 2 | ×100 | ±2% |
| Orange | 3 | ×1k | - |
| Yellow | 4 | ×10k | - |
| Green | 5 | ×100k | ±0.5% |
| Blue | 6 | ×1M | ±0.25% |
| Violet | 7 | ×10M | ±0.1% |
| Gray | 8 | ×100M | ±0.05% |
| White | 9 | ×1G | - |
| Gold | - | ×0.1 | ±5% |
| Silver | - | ×0.01 | ±10% |

---

# Tolerans

Rezistorning haqiqiy qiymati nominaldan biroz farq qiladi.

Masalan:

```
100Ω ±5%
```

Haqiqiy qiymati:

```
95Ω ... 105Ω
```

---

# Ketma-ket ulash (Series)

Formula:

```text
R = R1 + R2 + R3
```

Misol:

```
100Ω
220Ω
330Ω
```

Natija:

```
650Ω
```

---

# Parallel ulash

Formula:

```text
1/R = 1/R1 + 1/R2 + ...
```

Ikki rezistor uchun:

```text
R = (R1 × R2) / (R1 + R2)
```

Misol:

```
100Ω
100Ω
```

Natija:

```
50Ω
```

---

# Kuchlanish bo'luvchi (Voltage Divider)

Formula:

```text
Vout = Vin × R2 / (R1 + R2)
```

Misol:

```
Vin = 12V

R1 = 10k
R2 = 10k
```

Natija:

```
Vout = 6V
```

---

# Pull-up rezistor

Signalni HIGH holatda ushlab turadi.

Ko'pincha:

- 4.7kΩ
- 10kΩ

```
VCC
 │
10k
 │
Pin
 │
Button
 │
GND
```

---

# Pull-down rezistor

Signalni LOW holatda ushlab turadi.

```
VCC
 │
Button
 │
Pin
 │
10k
 │
GND
```

---

# Tokni cheklash

LED uchun rezistor.

Formula:

```text
R = (Vs - Vf) / I
```

Misol:

```
5V

LED = 2V

20mA
```

```
R = (5 - 2) / 0.02

=150Ω
```

---

# O'zgaruvchan rezistorlar

## Potensiometr

3 ta chiqish.

Qo'llanilishi:

- Ovoz balandligi
- Yorug'lik
- Sensorlar

---

## Reostat

2 ta chiqish.

Asosan tokni boshqarish uchun.

---

## Trimmer

Kichik potensiometr.

Bir marta sozlash uchun ishlatiladi.

---

# Maxsus rezistorlar

## LDR

Yorug'likka bog'liq rezistor.

Yorug'lik ortsa:

```
Qarshilik kamayadi
```

---

## Termistor

Haroratga bog'liq.

### NTC

Harorat oshsa:

```
Qarshilik kamayadi
```

### PTC

Harorat oshsa:

```
Qarshilik ortadi
```

---

# Rezistorni o'lchash

Multimetrni:

```
Ω
```

rejimiga qo'ying.

**Muhim:** Rezistorni o'lchashdan oldin zanjirni elektr manbaidan uzing. Parallel ulangan komponentlar natijani noto'g'ri ko'rsatishi mumkin.

---

# Amaliy tavsiyalar

- Quvvat zaxirasi sifatida hisoblangan qiymatdan kamida **2 baravar yuqori** quvvatli rezistor tanlash tavsiya etiladi.
- Analog va o'lchov sxemalarida **metal film** rezistorlar yaxshi tanlov hisoblanadi.
- Yuqori quvvat talab qilinadigan joylarda **wirewound** rezistorlardan foydalaniladi.
- Mikrocontroller pinlari uchun **4.7kΩ–10kΩ** pull-up/pull-down rezistorlari keng qo'llaniladi.
- LED uchun rezistor qiymatini har doim hisoblab tanlang, to'g'ridan-to'g'ri quvvat manbaiga ulmang.

---

# Eng ko'p uchraydigan qiymatlar (E12 seriyasi)

```
1.0
1.2
1.5
1.8
2.2
2.7
3.3
3.9
4.7
5.6
6.8
8.2
```

Har bir qiymat quyidagi ko'rinishlarda uchraydi:

```
10Ω
100Ω
1kΩ
10kΩ
100kΩ
1MΩ
```

Masalan:

- 4.7Ω
- 47Ω
- 470Ω
- 4.7kΩ
- 47kΩ
- 470kΩ
- 4.7MΩ