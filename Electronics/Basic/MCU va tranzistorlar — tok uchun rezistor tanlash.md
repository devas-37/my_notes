---
name: MCU, IRFZ44N, 2N3904 va 2N3906 — tok va rezistor tanlash
tags:
  - elektronika
  - mikrokontroller
  - tranzistor
  - rezistor
---

# MCU, IRFZ44N, 2N3904 va 2N3906: n mA uchun rezistor tanlash

**n mA — yuklamadan o‘tishi kerak bo‘lgan tok.** Rezistor tanlashdan oldin ikkita turli vazifani ajratamiz:

1. **Kalit:** yuklamani yoqish/o‘chirish. Baza/gate zanjiri tranzistorni yetarlicha ochadi; tokni yuklama va manba belgilaydi.
2. **Tok cheklash yoki barqarorlashtirish:** masalan, LEDdan 20 mA o‘tkazish. Buning uchun yuklama rezistori yoki alohida tok stabilizatori kerak.

> [!IMPORTANT]
> “Baza rezistorini tanlasam, kollektor toki aniq n mA bo‘ladi” degan qoida yo‘q. MOSFETning gate rezistori ham drain tokini n mA qilib belgilamaydi.

Quyida 3.3 V va 5 V GPIO, past kuchlanishli DC yuklamalar uchun misollar berilgan. MCU modeli, yuklama kuchlanishi/turi va aniq n berilmagani sababli qiymatlar **hisoblash namunasi**, yakuniy sxema esa shu ma’lumotlarga bog‘liq.

Bog‘liq notelar: [[Electronics/Basic/Bipolyar tranzistorlar|BJT asoslari]], [[Electronics/Basic/MOSFET va MCU integratsiyasi|MOSFET va MCU]], [[Electronics/Basic/Rele — MCU bilan ishlatish va tipslar|Rele va MCU]].

## 1. Qaysi detal nima qiladi?

| Detal | Turi | Ushbu noteda vazifasi |
|---|---|---|
| 2N3904 | NPN BJT | Kichik yuklamani GND tomondan ulash yoki keyingi tranzistorni boshqarish |
| 2N3906 | PNP BJT | Kichik yuklamani musbat ta’minot tomondan ulash yoki MOSFET gate’iga kuchlanish berish |
| IRFZ44N | N-kanalli MOSFET | Kattaroq yuklamani GND tomondan ulash; gate uchun alohida boshqaruv kerak |
| MCU | Mikrokontroller | Boshqaruv signali beradi; yuklamaning asosiy tokini ta’minlamaydi |

Har bir detalni bir sxemada ishlatish shart emas. Kichik yuklama uchun bitta 2N3904 yetishi mumkin.

**Oyoqchalarni aynan sizdagi ishlab chiqaruvchi va korpus chizmasidan aniqlang.** Sxemalardagi B/C/E va G/D/S belgilar oyoq vazifasi, chapdan o‘ngga universal tartib emas.

## 2. Avval yuklama tokini aniqlang

Agar n mA ma’lum bo‘lsa:

$$
I_L = \frac{n}{1000}\ \text{A}
$$

- Rele uchun g‘altakning nominal kuchlanishi va toki kerak.
- Oddiy rezistiv yuklamada taxminan $I=V/R$.
- LED uchun ketma-ket tok cheklovchi rezistor kerak.
- Motorda ish toki bilan birga ishga tushish va tiqilib qolish toki ham muhim.
- Tayyor LED lenta nominal kuchlanishda ishlatiladi; unda rezistor yoki driver odatda o‘z ichida bo‘ladi.

**Masalan:** “12 V, 80 mA rele”ni kalit bilan ulashda maqsad 80 mA ni baza rezistori bilan yaratish emas; releni to‘liq yoqish.

## 3. 2N3904: MCUdan kichik yuklamani boshqarish

### Ulanish

```text
+V_LOAD ── yuklama ── C  2N3904
                       E ── GND
MCU GPIO ── RB ────── B
                     │
                    100 kΩ
                     │
                    GND

MCU GND va yuklama manbai GND — umumiy.
```

100 kΩ baza–emitter rezistori MCU pini Hi-Z bo‘lganda bazani pastga tortadi. GPIO HIGH — yuklama ON.

### Baza rezistori formulasi

Kalit uchun dastlabki hisobda **majburiy tok kuchaytirishi 10** olinadi:

$$
I_B \approx \frac{I_L}{10}
$$

Bu tranzistorning tabiiy $h_{FE}$ qiymati emas; to‘yinish uchun tanlangan hisobiy nisbat.

$$
R_B \approx \frac{V_{GPIO}-V_{BE}}{I_B}
$$

Boshlang‘ich hisob uchun $V_{BE}=0.8$ V olaylik. Tok mA bilan kiritilsa:

$$
R_B[\Omega] \approx \frac{10000(V_{GPIO}-0.8)}{n}
$$

Shundan:

- **3.3 V GPIO:** $R_B \approx 25000/n$ Ω.
- **5 V GPIO:** $R_B \approx 42000/n$ Ω.

### Tezkor jadval

Quyidagi standart qiymatlar nominal hisobdan biroz kichik tanlangan. Baza toki taxminiy; 100 kΩ pull-down toki jadvalda hisobga olinmagan.

| Yuklama n | Kerakli IB ≈ n/10 | 3.3 V: RB | Nominal IB | 5 V: RB | Nominal IB |
|---|---:|---:|---:|---:|---:|
| 5 mA | 0.5 mA | 4.7 kΩ | 0.53 mA | 8.2 kΩ | 0.51 mA |
| 10 mA | 1 mA | 2.4 kΩ | 1.04 mA | 3.9 kΩ | 1.08 mA |
| 20 mA | 2 mA | 1.2 kΩ | 2.08 mA | 2.0 kΩ | 2.10 mA |
| 30 mA | 3 mA | 820 Ω | 3.05 mA | 1.3 kΩ | 3.23 mA |
| 50 mA | 5 mA | 470 Ω | 5.32 mA | 820 Ω | 5.12 mA |

**Har bir qator faqat GPIO shu tokni bera olsa ishlatiladi.** MCU datasheetidagi kafolatlangan HIGH chiqish kuchlanishi, pin toki va umumiy port/chip toki chegaralarini hisobga oling. Absolute maximum qiymatni odatiy ish toki deb olmang.

onsemi datasheetida 2N3904 uchun $V_{CE(sat)}$ maksimumi 10 mA/1 mA sharoitida 0.2 V, 50 mA/5 mA sharoitida 0.3 V; shu nuqtalarda $V_{BE(sat)}$ maksimumi 0.85 va 0.95 V deb berilgan. Shuning uchun jadvaldagi 0.8 V faqat yaqinlashtirish. [Manba: 2N3903/2N3904 datasheet, 2-bet](https://www.onsemi.com/pdf/datasheet/2n3903-d.pdf).

### Ishonchliroq hisob

MCUning yuk ostidagi minimal HIGH kuchlanishi $V_{OH(min)}$, baza–emitter kuchlanishining hisobiy yuqori qiymati $V_{BE(max)}$ va rezistor toleransi hisobga olinadi:

$$
\frac{V_{OH(min)}-V_{BE(max)}}{R_{B(max)}}
-
\frac{V_{BE(max)}}{R_{BE(min)}}
\geq \frac{I_L}{10}
$$

Ikkinchi had — baza–emitter pull-down rezistori oladigan tok. Shuningdek, maksimal GPIO kuchlanishi va minimal rezistor qiymatida pin toki oshib ketmasligi kerak.

**Misol:** 20 mA yuklama, MCU $V_{OH(min)}=3.0$ V ni kerakli tokda kafolatlaydi, hisob uchun $V_{BE(max)}=0.95$ V:

- RB = 910 Ω, 5% → eng katta RB = 955.5 Ω.
- 100 kΩ, 5% pull-down → eng kichik qiymat 95 kΩ.
- Baza uchun tok ≈ $(3.0-0.95)/955.5-0.95/95000=2.14$ mA.
- Talab 2 mA: bu hisobiy shart bajariladi.
- Lekin GPIOning maksimal toki ham o‘z MCU datasheeti bo‘yicha tekshiriladi.

0.95 V bu yerda ehtiyotkor hisobiy qiymat; butun harorat va tok diapazoni uchun universal kafolat emas.

### “2N3904 200 mA-ku?” degan savol

200 mA — datasheetdagi mutlaq kollektor toki chegarasi. Bu istalgan MCU bilan 200 mA yuklamani bemalol boshqarish degani emas. Majburiy nisbat 10 bo‘lsa, 200 mA uchun 20 mA baza toki talab qilinadi; qizish va to‘yinish ham alohida masala. Ushbu noteda 50 mA dan katta toklar uchun MOSFET yo‘liga o‘tish qulay boshlang‘ich tanlov sifatida olinadi. [2N3904 chegaralari](https://www.onsemi.com/pdf/datasheet/2n3903-d.pdf).

## 4. 2N3906: musbat tomondan kalit

2N3906 PNP tranzistorda emitter musbat manbaga ulanadi. Baza emitterdan pastga tortilganda ochiladi.

**Emitter +12 V bo‘lsa, bazani MCUga bevosita ulamang.** 3.3/5 V GPIO PNPni to‘liq o‘chira olmaydi va pin orqali nomaqbul tok yo‘li paydo bo‘lishi mumkin. 2N3904 bilan daraja moslashtiring.

```text
+12 V ───────── E  Q2: 2N3906
                C ── yuklama ── GND
                B
                ├── 47 kΩ ── +12 V
                │
                RP
                │
                C  Q1: 2N3904
MCU ── RN ───── B
                ├── 100 kΩ ── GND
                E ── GND
```

Bu ulanishda HIGH → Q1 ON → Q2 bazasi pastga tortiladi → yuklama ON.

### 12 V, 50 mA yuklama uchun misol

Q2 baza toki taxminan 5 mA:

$$
R_P \approx \frac{12-0.8-0.2}{0.005}=2200\ \Omega
$$

- RP ≈ **2.2 kΩ** — nominal boshlang‘ich hisob.
- Q1 kollektor toki ≈ 5 mA va 47 kΩ orqali keladigan kichik qo‘shimcha tok.
- Q1 baza toki ≈ 0.5 mA dan katta tanlanadi.
- RN: 3.3 V uchun **4.7 kΩ**, 5 V uchun **8.2 kΩ** — nominal boshlang‘ich qiymatlar.
- RP quvvati ≈ $11^2/2200=55$ mW; bu misolda 0.25 W rezistor yetarli zaxira beradi.

Aniq ta’minot diapazoni, tolerans va GPIOning $V_{OH}$ qiymati bilan qayta hisoblang. 2N3906 uchun datasheetda 50 mA kollektor/5 mA baza sharoitida $|V_{CE(sat)}|$ maksimumi 0.4 V deb berilgan. Bu yuklamaga to‘liq 12 V yetib bormasligini anglatadi. 200 mA mutlaq chegarani doimiy ish nuqtasi deb olmang. [Manba: 2N3906 datasheet](https://www.onsemi.com/pdf/datasheet/2n3906-d.pdf).

## 5. IRFZ44N: gate rezistori yuklama tokini belgilamaydi

**IRFZ44N uchun “100 mA ga bitta gate rezistori, 1 A ga boshqa rezistor” degan jadval yo‘q.**

Gate rezistori zaryadlash/bo‘shatish tezligiga va impuls tokiga ta’sir qiladi. Ochiq holatdagi yuklama toki esa yuklama, manba va MOSFETning ochiq qarshiligiga bog‘liq.

Infineon datasheetidagi asosiy shartlar:

| Parametr | Qiymat / shart |
|---|---|
| RDS(on) maksimum | 17.5 mΩ, VGS = 10 V, ID = 25 A, 25°C sharoitida |
| VGS(th) | 2–4 V, faqat ID = 250 µA sharoitida |
| VGS mutlaq chegara | ±20 V |
| VDS chegara | 55 V |

**Threshold — to‘liq ochilish kuchlanishi emas.** 3.3 V yoki 5 V GPIO bilan kichik ochiq qarshilik kafolatlanmagan. Kichik tokda ishlagandek ko‘rinishi barcha nusxa va haroratlarda ishonchli ishlashini bildirmaydi. Korpusdagi katta tok reytingi ham sovitishsiz amaliy tok emas. [Manba: IRFZ44N datasheet, 1–2-bet](https://www.infineon.com/assets/row/public/documents/24/49/infineon-irfz44n-datasheet-en.pdf?fileId=5546d462533600a40153563b3a9f220d).

Amaliy yo‘llar:

- IRFZ44N qolsa: source GNDda bo‘lgan sxemada gate uchun mos 10–12 V driver ishlatish.
- Bevosita MCUdan boshqarilsa: RDS(on) aynan MCUning minimal gate kuchlanishida berilgan MOSFET tanlash.

## 6. Uchala tranzistor bilan: 12 V driver + IRFZ44N

Quyidagi **hisobiy sxema sekin yoqish/o‘chirish** uchun. Unda 2N3904 va 2N3906 faqat gate’ni boshqaradi; asosiy yuklama toki IRFZ44Ndan o‘tadi. Yuqori chastotali PWM uchun alohida gate driver kerak.

### Shartlar

- Gate driver manbai: barqaror **12 V**.
- MCU GPIO: 3.3 V yoki 5 V.
- IRFZ44N source: umumiy GND.
- Yuklama manbai alohida bo‘lishi mumkin; uning manfiy qutbi ham umumiy GNDga ulanadi.
- Induktiv yuklama uchun himoya diodi qo‘shiladi.

### Aniq ulanishlar

```text
Q1 = 2N3904:
  E → GND
  B → 10 kΩ → MCU GPIO
  B → 100 kΩ → GND
  C → 8.2 kΩ → Q2 bazasi

Q2 = 2N3906:
  E → +12 V driver
  B → 47 kΩ → Q2 emitteri (+12 V)
  C → 1 kΩ → Q3 gate

Q3 = IRFZ44N:
  G → 22 kΩ → S
  S → GND
  D → yuklamaning manfiy tomoni

Yuklamaning musbat tomoni → +V_LOAD
MCU GND → driver GND → Q3 source
```

**22 kΩ rezistor to‘g‘ridan-to‘g‘ri gate–source orasida.** 1 kΩ esa Q2 kollektoridan gate’ga ketma-ket.

### Nima uchun shu rezistorlar?

| Rezistor | Vazifasi | Shu misoldagi hisob |
|---|---|---|
| MCU–Q1 B: 10 kΩ | GPIO va Q1 baza tokini cheklash | 3.3 V da ≈ 0.25 mA; 5 V da ≈ 0.42 mA |
| Q1 B–E: 100 kΩ | Reset/Hi-Z holatda Q1ni o‘chirish | GPIO suzib qolishini kamaytiradi |
| Q1 C–Q2 B: 8.2 kΩ | Q2 baza tokini cheklash | ≈ (12−0.8−0.2)/8.2k = 1.34 mA |
| Q2 B–E: 47 kΩ | Q2ni o‘chiq saqlash | Q1 o‘chganda bazani +12 Vga tortadi |
| Q2 C–Q3 G: 1 kΩ | Gate zaryadlash impulsini cheklash | Dastlabki tokning taxminiy yuqori chegarasi ≈ 12 mA |
| Q3 G–S: 22 kΩ | Gate zaryadini chiqarish | O‘chish passiv va sekin |

Q1 orqali 8.2 kΩ zanjir toki oqadi; bu yuklamaning 100 mA yoki 1 A tokidan alohida. Q2 uchun baza toki olingan 1.34 mA dan 47 kΩ zanjiri oladigan taxminan 0.017 mA ayiriladi.

ON holatda 1 kΩ va 22 kΩ kuchlanish bo‘lgich ham hosil qiladi. Q2dagi pasayishni taxminan 0.2 V olsak:

$$
V_{GS}\approx(12-0.2)\frac{22}{22+1}\approx11.3\text{ V}
$$

Demak, gate’ga MCUning 3.3 V signali emas, driverdan taxminan 11.3 V boradi. Bu qiymat 12 V manbaga bog‘liq; shu sxemani 5 V driver bilan ishlatsangiz taxminan 4.6 V chiqadi va IRFZ44N muammosi hal bo‘lmaydi.

### Holatlar

| MCU holati | Q1 | Q2 | IRFZ44N |
|---|---|---|---|
| HIGH | Ochiq | Ochiq | Gate zaryadlanadi, yuklama ON |
| LOW | Yopiq | Yopiq | Gate 22 kΩ orqali bo‘shaydi, so‘ng OFF |
| Hi-Z | 100 kΩ pastga tortadi | 47 kΩ emitterga tortadi | 22 kΩ gate’ni sourcega tortadi |

Bu rezistorlar resetdagi suzuvchi pin uchun yordam beradi. Agar MCU boot vaqtida pinni faol HIGH qilsa, yuklama yoqiladi; shunday pin tanlamaslik yoki apparat blokirovkasi kerak.

**Cheklov:** gate’ni faol pastga tortuvchi tranzistor yo‘q. O‘chish sekin; tez PWMda MOSFET o‘tish vaqtida ko‘p quvvat yo‘qotishi mumkin. 1 kΩni kichraytirishning o‘zi passiv o‘chishni hal qilmaydi. Bu sxema uchun universal PWM chastotasi kafolatlanmaydi.

Driverning +12 V–GND orasiga Q2ga yaqin 100 nF bypass kondensator qo‘yish foydali. Yuklama tokini MCUning ingichka GND yo‘lidan o‘tkazmang.

## 7. n mA ni haqiqatan nima belgilaydi?

### Oddiy LED: yuklama rezistori

Pastki tranzistorli sxema:

```text
+V ── R_LED ── LED ── tranzistor ── GND
```

$$
R_{LED}=\frac{V_{SUPPLY}-V_F-V_{SW}}{n/1000}
$$

Bu yerda $V_{SW}$ — kalitdagi kuchlanish pasayishi.

**Misol:** 5 V manba, qizil LED uchun shartli $V_F=2.0$ V, maqsad 20 mA.

- 2N3904dagi pasayishni 0.2 V deb olsak: R = 140 Ω → 150 Ω bilan taxminan 18.7 mA.
- Yetarlicha ochilgan MOSFET pasayishini kichik deb olsak: R ≈ 150 Ω → taxminan 20 mA.
- Rezistor quvvati taxminan 0.06 W; 0.25 W bu misolda yetarli zaxira beradi.
- 2N3904 bo‘lsa, **RB ham alohida** hisoblanadi; LED rezistori uning o‘rnini bosmaydi.

LEDning haqiqiy VF qiymati va manba o‘zgarsa tok ham o‘zgaradi. Oddiy rezistor mutlaq aniq tok stabilizatori emas.

### Faqat rezistiv yuklama

MOSFETdagi kichik pasayishni e’tiborsiz qoldirsak:

$$
R_L\approx\frac{V}{I},\qquad P_R\approx VI
$$

12 V da 100 mA uchun:

- R ≈ 120 Ω.
- P ≈ 1.2 W.
- 2 W yoki undan katta rezistor, uning harorat va o‘rnatish shartlarini hisobga olib tanlanadi.

Bu **yuklama rezistori**, gate yoki baza rezistori emas. Shu formulani motor yoki rele uchun ketma-ket rezistor tanlashga avtomatik qo‘llamang: ularning kerakli kuchlanishi va dinamikasi bor.

### O‘zgaruvchan yuklamada aniq n mA

Agar yuklama qarshiligi yoki manba o‘zgarsa ham n mA kerak bo‘lsa, tok qayta aloqasi kerak:

```text
Tok topshirig‘i → boshqaruvchi → MOSFET → yuklama
                         ↑
                 shunt orqali tok o‘lchovi
```

Odatdagi hisob:

$$
I=\frac{V_{REF}}{R_{SENSE}}
$$

Masalan, 0.1 V tok o‘lchash nuqtasi va 100 mA uchun shunt ≈ 1 Ω. Lekin bu to‘liq sxema emas: operatsion kuchaytirgich/driver, stabil ishlash, kuchlanish zaxirasi va MOSFETning chiziqli rejimdagi SOA chegaralari kerak. MOSFET chiziqli rejimda $P\approx V_{DS}I$ bo‘yicha qiziydi.

PWM o‘rtacha quvvatni o‘zgartiradi; u o‘z-o‘zidan aniq tok cheklovi yoki tiqilgan motor himoyasi bo‘lib qolmaydi.

## 8. Qizish, rele diodi va amaliy tipslar

- **BJT:** taxminiy yo‘qotish $P\approx V_{CE}I_C$; baza zanjirining quvvati ham bor.
- **MOSFET:** to‘liq ochiq holatda $P\approx I^2R_{DS(on)}$. Qiziganda qarshilik oshadi; PWMda o‘tish yo‘qotishi qo‘shiladi.
- **Gate driver 12 V bo‘lsin:** 24 V yuklama manbaini ushbu gate driverga bevosita bermang; VGS chegarasi oshadi. Gate ta’minoti va yuklama ta’minoti turli vazifa bajaradi.
- **Induktiv yuklama:** pastki kalitli rele/motorga parallel diodda katod — +V_LOADga, anod — kollektor/drainga. Diodning tok, teskari kuchlanish va tezligi yuklamaga mos bo‘lsin. IRFZ44Nning ichki body diodi bu yo‘nalishdagi rele himoya diodini almashtirmaydi.
- **GPIO toki:** manba/sink tok chegaralari va kafolatlangan VOH/VOL qiymatlari MCUga xos; “barcha GPIO 20 mA beradi” deb hisoblamang.
- **Rezistor quvvati:** $P=I^2R$ yoki $P=V^2/R$. Baza/gate zanjiri rezistorini yuklama quvvatiga qarab tanlamang.
- **Umumiy GND:** bu yerdagi sxemalar galvanik izolyatsiyalanmagan; MCU signali source/emitterga nisbatan o‘lchanadi.
- **Yuqori tok:** ulagich, yo‘l, sim, manba va sug‘urta ham yuklama tokiga mos bo‘lishi kerak. MOSFETning o‘zi barcha chegaralarni belgilamaydi.

## 9. Qisqa tanlash yo‘li

| Vazifa | Boshlang‘ich yechim |
|---|---|
| 5–50 mA yuklamani GND tomondan ulash | 2N3904; RB ni n/10 baza toki va GPIO imkoniyati bo‘yicha hisoblash |
| Kichik yuklamani +12 V tomondan ulash | 2N3906 + 2N3904; ikkala baza rezistorini hisoblash |
| IRFZ44N bilan kattaroq tok, sekin ON/OFF | 10–12 V gate driver; 6-bo‘limdagi 12 V hisobiy sxema |
| Tez PWM | Mos gate driver yoki MCU kuchlanishiga mos MOSFET bilan tegishli boshqaruv |
| LED uchun n mA | Alohida LED rezistori yoki tok driveri |
| Yuklama o‘zgarsa ham aniq n mA | Shunt va qayta aloqali tok stabilizatori |

**Aniq qiymatlarni yakunlash uchun kerakli ma’lumotlar:** MCU modeli va GPIO kuchlanishi; yuklama turi va ta’minoti; n mA ish toki hamda boshlang‘ich/tiqilish toki; faqat ON/OFF yoki PWM chastotasi; 10–12 V driver ta’minoti bor-yo‘qligi.
