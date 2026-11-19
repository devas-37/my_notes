# Rezistorlar: nazariya, tanlash va amaliy hisoblar

Rezistor — elektr tokiga qarshilik ko‘rsatadigan passiv komponent. U tokni cheklash, kuchlanishni bo‘lish, signal tugunining holatini belgilash va tokni o‘lchash uchun ishlatiladi. Unda elektr energiyasi issiqlikka aylanadi. Oddiy rezistor qutblanmagan: uni ikki tomondan ham ulash mumkin.

Bu note asosan ideal rezistorlar va doimiy tok (DC) zanjirlariga tegishli. Haqiqiy komponentlarda tolerans, harorat, parazit sig‘im va induktivlik ham ta’sir qiladi.

## 1. Asosiy kattaliklar va birliklar

| Belgi | Kattalik | Birlik |
| --- | --- | --- |
| R | Qarshilik | Ω — om |
| V yoki U | Rezistor uchlaridagi kuchlanish | V — volt |
| I | Rezistordan o‘tuvchi tok | A — amper |
| P | Rezistorda ajraladigan quvvat | W — vatt |

- 1 kΩ = 1 000 Ω; 1 MΩ = 1 000 000 Ω.
- 1 mA = 0.001 A; 1 µA = 0.000001 A.
- 1 mW = 0.001 W.
- 4k7 yozuvi 4.7 kΩ, 2R2 yozuvi 2.2 Ω degani.

**Birliklarni avval moslashtiring.** Masalan, 10 mA ni formulaga 0.01 A qilib kiriting. Quyidagi kalkulyatorlarda qarshilik Ω da, LED toki esa alohida ko‘rsatilganidek mA da kiritiladi.

## 2. Om qonuni

Ideal rezistor uchun:

- V = I × R
- I = V / R
- R = V / I

Bir xil kuchlanishda qarshilik oshsa, tok kamayadi. Bir xil qarshilikda kuchlanish oshsa, tok ortadi.

**Misol:** 5 V kuchlanish 1 kΩ rezistorga qo‘yilgan:

I = 5 / 1000 = 0.005 A = **5 mA**.

Bu yerda 5 V aynan rezistor uchlaridagi kuchlanish bo‘lishi kerak. Zanjirda LED yoki boshqa element bo‘lsa, manba kuchlanishining hammasi rezistorga tushmasligi mumkin.

## 3. Quvvat va qizish

Rezistorda ajraladigan quvvat:

- P = V × I
- P = I² × R
- P = V² / R

**Misol:** 12 V kuchlanish 1 kΩ rezistorda:

I = 12 mA; P = 12² / 1000 = **0.144 W**.

0.125 W rezistor bu quvvat uchun yetarli emas. 0.25 W nominalini ham ish harorati, montaj sharoiti va ishlab chiqaruvchining derating grafigi bilan tekshirish kerak. Amaliy boshlang‘ich tanlov sifatida kamida ikki baravar quvvat zaxirasi olish mumkin, lekin bu datasheet tekshiruvini almashtirmaydi.

Quvvatdan kelib chiqadigan chegaralar:

- I = √(P / R)
- V = √(P × R)

Rezistorning alohida **maksimal ish kuchlanishi** ham bor. Ruxsat etilgan kuchlanish quvvat hisobidan chiqqan qiymat va datasheetdagi kuchlanish chegarasining kichigidan oshmasin. Qisqa impulslar uchun uzluksiz quvvat reytingi yetarli mezon emas: impuls energiyasi va overload grafigi ham kerak.

## 4. Ketma-ket ulanish

Rezistorlardan bir xil tok o‘tadi:

Rtotal = R1 + R2 + … + Rn

Har bir rezistordagi kuchlanish Vi = I × Ri. Umumiy kuchlanish ularning yig‘indisiga teng.

**Misol:** 1 kΩ va 2.2 kΩ ketma-ket, manba 12 V:

- Rtotal = 3.2 kΩ.
- I = 12 / 3200 = **3.75 mA**.
- Birinchi rezistorda 3.75 V, ikkinchisida 8.25 V tushadi.

Bir xil tokda katta qarshilik ko‘proq quvvat ajratadi: P = I²R.

## 5. Parallel ulanish

Barcha tarmoqlardagi kuchlanish bir xil:

1 / Rtotal = 1 / R1 + 1 / R2 + … + 1 / Rn

Ikki rezistor uchun:

Rtotal = R1 × R2 / (R1 + R2)

**Misol:** 1 kΩ va 2.2 kΩ parallel:

Rtotal = 1000 × 2200 / 3200 = **687.5 Ω**.

Musbat qarshiliklar parallel ulanganda umumiy qarshilik eng kichik tarmoq qarshiligidan ham kichik bo‘ladi. Bir xil n ta rezistor parallel bo‘lsa, Rtotal = R / n.

Bir xil kuchlanishda kichik qarshilikli tarmoq ko‘proq tok va quvvat oladi: P = V²/R.

## 6. Kuchlanish bo‘lgichi — voltage divider

Ulanish:

```text
Vin ── R1 ──┬── Vout
            │
            R2
            │
           GND
```

Chiqishdan tok olinmasa yoki yuk ta’siri juda kichik bo‘lsa:

- Vout = Vin × R2 / (R1 + R2)
- Idivider = Vin / (R1 + R2)
- R1 = R2 × (Vin / Vout − 1)

**Misol:** Vin = 12 V, R1 = 20 kΩ, R2 = 10 kΩ:

Vout = 12 × 10 / 30 = **4 V**, bo‘lgich toki **0.4 mA**.

Bir xil nisbatdagi kattaroq rezistorlar kamroq tok sarflaydi, lekin chiqish qarshiligini oshiradi. Bu yuklanish, sizib o‘tish toki, shovqin va ADC kirishining o‘rnashish vaqtiga ta’sir qiladi.

### Yuklangan bo‘lgich

Chiqish va GND orasiga RL yuk ulansa, u R2 ga parallel bo‘ladi:

- Rbottom = R2 × RL / (R2 + RL)
- Vout_loaded = Vin × Rbottom / (R1 + Rbottom)

**Misol:** Vin = 12 V, R1 = R2 = 10 kΩ.

- Yuksiz chiqish: **6 V**.
- RL = 10 kΩ bo‘lsa, Rbottom = 5 kΩ.
- Yuklangan chiqish: **4 V**.

Demak, divider chiqishi yuk ostida sezilarli pasayishi mumkin.

Thevenin modeli:

- Vth = yuksiz Vout
- Rth = R1 × R2 / (R1 + R2)
- Vloaded = Vth × RL / (Rth + RL)

Chiqish pasayishi 1% dan kichik bo‘lishi uchun sof rezistiv yukda RL > 99 × Rth bo‘lishi kerak. ADC kirishi esa namuna olish paytida dinamik yuk bo‘lishi mumkin; uning datasheetidagi manba impedansi va acquisition time talabini tekshiring.

**Divider quvvat manbai sifatida mos emas.** Yuk toki o‘zgaradigan qurilmani quvvatlash uchun odatda stabilizator, DC–DC o‘zgartirgich yoki bufer kerak bo‘ladi.

### Toleransning dividerga ta’siri

Musbat Vin uchun chiqish eng katta bo‘lishi R1 minimal, R2 maksimal bo‘lganda yuz beradi:

- Vout_max = Vin_max × R2_max / (R1_min + R2_max)
- Vout_min = Vin_min × R2_min / (R1_max + R2_min)

Bu formulalar yuksiz holatga tegishli. Yuk va kirish sizib o‘tish toki bo‘lsa, ularni ham modelga kiriting.

## 7. LED uchun tok cheklovchi rezistor

Bitta LED va ketma-ket rezistor uchun:

- R = (Vs − Vf) / Iled
- Pr = (Vs − Vf) × Iled

Vs — manba kuchlanishi, Vf — LEDdagi to‘g‘ri kuchlanish tushuvi. Vf tok, harorat va LED turiga bog‘liq.

**Misol:** Vs = 5 V, Vf = 2 V, Iled = 10 mA:

- R = (5 − 2) / 0.01 = **300 Ω**.
- Pr = 3 × 0.01 = **0.03 W**.
- 330 Ω tanlansa, shu Vf modelida tok taxminan **9.09 mA** bo‘ladi.

Eng katta tokni tekshirish uchun:

Imax = (Vs_max − Vf_min) / R_min

GPIO bilan boshqarishda pinning chiqish kuchlanishi, bir pin toki va port bo‘yicha jami tok chegaralarini ham hisobga oling. Parallel LED tarmoqlarida har bir tarmoqqa alohida rezistor qo‘yish tok taqsimotini yaxshilaydi.

## 8. Interaktiv hisoblash laboratoriyasi

Hisoblash turini tanlang va qiymatlarni o‘zgartiring. Natijalar avtomatik yangilanadi. “Misol qiymatlari” joriy hisobni boshlang‘ich qiymatlariga qaytaradi.

<interactive src="rezistor-hisoblari" />

Hisoblagich besh turdagi hisobni bajaradi:

1. **Divider:** Vout, bo‘lgich toki, rezistor quvvatlari va Rth.
2. **Yuklangan divider:** yuk ta’siridagi chiqish va yuk toki.
3. **Om qonuni:** berilgan V va R orqali tok hamda quvvat.
4. **LED:** nazariy R, yuqoriga yaxlitlangan E24 nominali va hosil bo‘ladigan tok.
5. **Ulanishlar:** ikki rezistorning ketma-ket va parallel ekvivalenti.

Kalkulyator ideal qiymatlardan foydalanadi; tolerans, harorat va impuls ta’sirini avtomatik qo‘shmaydi. LED uchun E24 ni yuqoriga yaxlitlash nominal tokni oshirmaslikka xizmat qiladi, lekin komponent toleranslarini tekshirish baribir zarur.

## 9. Tolerans, standart nominal va markirovka

**Tolerans** — qarshilik nominaldan qancha farq qilishi mumkinligini bildiradi. 10 kΩ ±5% rezistorning ko‘rsatilgan sharoitdagi qiymati **9.5–10.5 kΩ** oralig‘ida bo‘lishi mumkin.

E12 qatorining bir dekadadagi qiymatlari:

10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82.

Ularni 10 ning darajalariga ko‘paytirib boshqa diapazonlar olinadi: 4.7 Ω, 47 Ω, 470 Ω, 4.7 kΩ va hokazo. E24 qatori ko‘proq oraliq qiymatlarni beradi. Qator nomi komponentning toleransini o‘zi kafolatlamaydi; toleransni alohida tekshiring.

### Rangli halqalar

| Rang | Raqam |
| --- | --- |
| Qora | 0 |
| Jigarrang | 1 |
| Qizil | 2 |
| To‘q sariq | 3 |
| Sariq | 4 |
| Yashil | 5 |
| Ko‘k | 6 |
| Binafsha | 7 |
| Kulrang | 8 |
| Oq | 9 |

To‘rt halqali kod: ikki raqam → ko‘paytiruvchi → tolerans.

**Sariq–binafsha–qizil–oltin**: 47 × 100 = **4.7 kΩ ±5%**.

Raqamli ranglar ko‘paytiruvchi o‘rnida 10 ning darajasini bildiradi. Oltin ko‘paytiruvchi ×0.1, kumush ×0.01. Tolerans halqasida jigarrang ±1%, qizil ±2%, oltin ±5%, kumush ±10%.

Besh halqali kodda odatda uchta ahamiyatli raqam, ko‘paytiruvchi va tolerans bo‘ladi.

### SMD kodlari

- 103 = 10 × 10³ = **10 kΩ**.
- 472 = 47 × 10² = **4.7 kΩ**.
- 1001 = 100 × 10¹ = **1 kΩ**.
- 4R7 = **4.7 Ω**.
- 0 yoki 000 ko‘pincha jumper sifatidagi nol omli rezistorni bildiradi; uning ham tok chegarasi bor.

Hamma SMD rezistorlar markirovkalanmaydi. EIA-96 kabi kodlar alohida jadval bilan o‘qiladi.

## 10. Rezistor turlari va parametrlari

| Tur | Xususiyat va odatiy qo‘llanish |
| --- | --- |
| Qalin plyonkali | Ko‘p ishlatiladigan SMD rezistorlar; aniq parametrlar seriyaga bog‘liq |
| Metall plyonkali | Aniqlik va barqarorlik talab qilinadigan zanjirlar |
| Simli | Quvvatli yuklar; ayrim tuzilmalarda induktivlik sezilarli |
| Shunt | Tok o‘lchash uchun kichik qarshilik; juda kichik qiymatlarda Kelvin ulanishi foydali |
| Potensiometr | Uch chiqishli o‘zgaruvchan divider; surgich toki va quvvat chegarasi bor |
| Termistor | Qarshiligi haroratga kuchli bog‘liq; NTC da kamayadi, PTC da ortadi |

**TCR** — harorat koeffitsiyenti, ko‘pincha ppm/°C bilan beriladi.

ΔR / R ≈ TCR × ΔT / 1 000 000

Masalan, 100 ppm/°C va 50°C o‘zgarish taxminan **0.5%** qarshilik o‘zgarishiga mos keladi. Bu chiziqli yaqinlashuv; amal qilish diapazoni datasheetga bog‘liq.

Korpus o‘lchami quvvat bilan bog‘liq bo‘lishi mumkin, lekin masalan “0603 doim falon watt” deb bo‘lmaydi. Seriya, plata mis maydoni va atrof harorati ahamiyatli.

## 11. Pull-up, pull-down va tok o‘lchash

**Pull-up** kirishni manbaga, **pull-down** esa GND ga rezistor orqali bog‘lab, suzib yuruvchi holatni oldini oladi.

Pull-up qarshiligini tanlashda:

- Past holatdagi tok taxminan I = V/R.
- Kirish sizib o‘tish toki tufayli kuchlanish xatosi ΔV = Ileak × R.
- Liniya sig‘imi bilan vaqt doimiysi τ = R × C.
- Kichik R tezroq o‘tishni ta’minlashi mumkin, lekin past holatda tok sarfini oshiradi.

**Shunt misoli:** 0.1 Ω orqali 1 A o‘tsa, V = **0.1 V**, P = **0.1 W**. O‘lchov kuchaytirgichining aniqligi, shunt toleransi va sim/yo‘l qarshiliklari natijaga ta’sir qiladi.

## 12. O‘lchash va tanlash tartibi

Qarshilikni o‘lchashdan oldin zanjirni quvvatsizlantiring va kondensatorlarni razryadlang. Platadagi parallel yo‘llar o‘lchovni kamaytirishi mumkin; zarur bo‘lsa rezistorning bir uchini ajrating. Kichik qarshiliklarda prob simlari qarshiligini hisobga oling.

Rezistor tanlashda quyidagi ketma-ketlik foydali:

1. Zanjirdagi vazifasi va kerakli qarshilikni aniqlang.
2. Eng yomon holatdagi kuchlanish va tokni hisoblang.
3. Quvvat, harorat bo‘yicha derating va kuchlanish chegarasini tekshiring.
4. Tolerans, TCR va kerak bo‘lsa shovqin/impuls xususiyatlarini tanlang.
5. Standart nominalga yaxlitlab, haqiqiy tok va kuchlanishni qayta hisoblang.
6. Korpus, montaj va o‘lchov bilan natijani tasdiqlang.

## 13. Mustaqil mashqlar

- 9 V manbaga ulangan 3 kΩ rezistor toki va quvvati qancha?
- 5 V ni yuksiz holda 3 V qilish uchun R2 = 15 kΩ bo‘lsa, R1 qancha?
- 12 V, R1 = 20 kΩ, R2 = 10 kΩ dividerga 10 kΩ yuk ulansa, chiqish qancha?
- 3.3 V manba, Vf = 2 V va 5 mA LED uchun nazariy rezistor qancha?

**Javoblar:** 3 mA va 27 mW; 10 kΩ; 2.4 V; 260 Ω. So‘ng yaqin standart nominal bilan natijani qayta hisoblang.
