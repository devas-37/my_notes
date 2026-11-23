---
name: Z80 I/O uchun custom qurilma yaratish
tags:
  - z80
  - io
  - electronics
  - interfeys
---

# Z80 I/O uchun custom qurilma yaratish

Z80 uchun custom device — CPU port orqali o‘qiydigan yoki yozadigan, ichida registrlar va o‘z vazifasini bajaruvchi mantiq bo‘lgan tashqi qurilma. Masalan: tugmalar paneli, LED boshqaruvchisi, sensor interfeysi yoki boshqa mikrokontroller bilan aloqa moduli.

Bu yo‘riqnomadagi **loyiha taklifi**: `80h` portidan 8 ta kirishni o‘qish va shu portga yozib 8 ta chiqishni boshqarish. Asosiy Z80 tizimi — takt, reset, ROM/RAM va ishlayotgan dastur — mavjud deb olinadi. Bu mustaqil kompyuterning to‘liq sxemasi emas.

Bog‘liq qaydlar: [[Electronics/Processors/Z80|Z80 protsessori]], [[Electronics/Digital Logic/Logic gatelar|Mantiqiy elementlar]], [[Electronics/Basic/Rezistorlar|Rezistorlar]].

## 1. Z80 tomondagi interfeys

`/` prefiksi faol-past signalni bildiradi: masalan, `/WR = 0` — yozish faol.

| Signal | Vazifasi |
| --- | --- |
| A0–A7 | Bu loyihada port manzilini tanlaydi |
| D0–D7 | Ikki yo‘nalishli ma’lumot shinasi |
| /IORQ | I/O siklini bildiradi |
| /RD | CPU ma’lumot o‘qiydi |
| /WR | CPU ma’lumot yozadi |
| /M1 | Interrupt acknowledge siklini oddiy I/O dan ajratishda ishlatiladi |
| /RESET | Tizimni boshlang‘ich holatga qaytaradi |

`/IORQ` interrupt acknowledge paytida ham faollashadi. Shuning uchun tanlashni faqat shu signalga bog‘lamaymiz; manzil, o‘qish/yozish va `/M1` ham hisobga olinadi. [Zilog qo‘llanmasi: Pin Functions, Input or Output Cycles va Interrupt Request/Acknowledge Cycle](https://www.z80ne.com/datasheets/z80.pdf).

I/O uchun `IN` va `OUT` ishlatiladi. `IN A,(n)` va `OUT (n),A` da A0–A7 = n, A8–A15 = A; o‘qishda bu A ning oldingi qiymati. `IN r,(C)` va `OUT (C),r` da manzil = BC. Bu loyiha yuqori baytni dekodlamaydi, shuning uchun `0080h`, `0180h` va boshqa `xx80h` manzillar bir qurilmaga tushadi. [Zilog: I/O buyruqlari](https://www.z80ne.com/datasheets/z80.pdf).

## 2. Qurilma nimani bajaradi?

| Amal | Manzilning quyi bayti | Natija |
| --- | --- | --- |
| OUT | 80h | Yozilgan bayt chiqish registrida saqlanadi |
| IN | 80h | Tashqi 8 ta kirishning joriy qiymati qaytadi |
| Reset | — | Chiqishlar 00h bo‘ladi |

Bir manzilda o‘qish va yozish turli apparat qismlarini tanlashi mumkin. Bu sxemada `IN` oldin yozilgan baytni qaytarmaydi: u alohida kirishlarni o‘qiydi.

```text
Z80 A0..A7 ──► 8-bit manzil taqqoslagich ──► /MATCH
                                               │
Z80 /IORQ, /M1, /RD, /WR ──► boshqaruv mantiqi ─┤
                                               ├──► /IOW
                                               └──► /IOR

Z80 D0..D7 ──► 74HCT273 ──► OUT0..OUT7
                  ▲
             CLK = /IOW
             /CLR = /RESET

Z80 D0..D7 ◄── 74HCT244 ◄── IN0..IN7
               /OE1, /OE2 = /IOR
```

Chiqish registrining Q chiqishlari CPU shinasiga qaytarib ulanmaydi. CPU shinasiga kirish qiymatini faqat 244 buferi uzatadi.

## 3. Kerakli qismlar

| Qism | Soni | Ushbu loyihadagi vazifasi |
| --- | --- | --- |
| CD74HCT688 | 1 | A0–A7 ni 80h bilan taqqoslash |
| SN74HCT273 | 1 | Resetli 8-bit chiqish registri |
| SN74HCT244 | 1 | Kirishlar uchun uch holatli bufer |
| SN74HCT32 | 1 | To‘rtta 2-kirishli OR elementi |
| SN74HCT04 | 1 | /M1 ni invertirlash |
| 100 nF keramika kondensator | Har IC ga 1 | Ta’minotni lokal filtrlash |
| 10 kΩ rezistor | Har kirishga 1 | Tugmalar uchun pull-up |
| LED va 2.2 kΩ rezistor | Istalgan chiqishlar sonicha | Chiqish holatini ko‘rsatish |
| Stabil +5 V va umumiy GND | — | Barcha qismlar ta’minoti |

HCT oilasining TTL bilan mos kirish chegaralari eski Z80 bilan ulashni osonlashtiradi. 5 V da ishlayotgan oddiy HC qismlarini avtomatik teng o‘rinbosar deb qabul qilmang: CPU kafolatlagan VOH/VOL bilan IC talab qilgan VIH/VIL mos kelishi kerak. [TI CD74HCT688](https://www.ti.com/lit/ds/symlink/cd74hct688.pdf).

Quyidagi ulanishlar signal nomlari bilan berilgan. Montajda aynan qo‘lingizdagi korpusning datasheet pin raqamlaridan foydalaning.

## 4. Manzil dekoderi va boshqaruv signallari

### 4.1. Faqat 80h ni tanlash

688 ning bitta 8-bit kirish guruhiga Z80 A0–A7 ulanadi. Ikkinchi guruhga doimiy qiymat beriladi:

```text
Taqqoslash qiymati:
bit7 = +5 V
bit6..bit0 = GND

1000 0000b = 80h
```

688 ning faol-past enable kirishi `E` ni GND ga ulang. Tenglik chiqishi `Y` ni `/MATCH` deb nomlaymiz: manzil teng bo‘lganda u 0 bo‘ladi. Guruhlarning nomi ishlab chiqaruvchiga qarab A/B yoki P/Q ko‘rinishida uchrashi mumkin. [TI: 688 funksional jadvali](https://www.ti.com/lit/ds/symlink/cd74hct688.pdf).

Bu yerda A0–A7 ning barchasi taqqoslanadi. Faqat A7 ni dekodlash 80h–FFh oralig‘idagi barcha portlarga javob berib, boshqa qurilmalar bilan to‘qnashishi mumkin.

### 4.2. O‘qish va yozishni ajratish

Quyidagi ifodalarda signal nomining boshidagi slash **faol-past nomlash**, `NOT` esa haqiqiy invertorlash amalidir:

```text
M1_BLOCK = NOT(/M1)

T    = /MATCH OR /IORQ
U    = T OR M1_BLOCK
/IOW = U OR /WR
/IOR = U OR /RD
```

Bitta 74HCT32 dagi to‘rtta OR elementi shu to‘rtta qatorni amalga oshiradi. 74HCT04 dan bitta inverter `M1_BLOCK` ni hosil qiladi. [TI OR elementi](https://www.ti.com/lit/ds/symlink/sn74hct32.pdf), [TI inverter](https://www.ti.com/lit/ds/symlink/sn74hct04.pdf).

| Holat | /MATCH | /IORQ | /M1 | /RD | /WR | Natija |
| --- | --- | --- | --- | --- | --- | --- |
| 80h ga yozish | 0 | 0 | 1 | 1 | 0 | /IOW = 0 |
| 80h dan o‘qish | 0 | 0 | 1 | 0 | 1 | /IOR = 0 |
| Boshqa port | 1 | istalgan | istalgan | istalgan | istalgan | Ikkalasi 1 |
| Xotira sikli | istalgan | 1 | istalgan | istalgan | istalgan | Ikkalasi 1 |
| Interrupt acknowledge | istalgan | 0 | 0 | istalgan | istalgan | Ikkalasi 1 |

`/M1` ni bevosita OR ga berib yubormang: oddiy I/O da u 1 bo‘lib, qurilmani doimo bloklab qo‘yadi. Aynan uning inversiyasi kerak.

## 5. Chiqish va kirishlarni ulash

### 5.1. Chiqish: 74HCT273

- CPU D0–D7 → 273 ning sakkizta D kirishi, bit tartibini saqlagan holda.
- 273 CLK → `/IOW`.
- 273 faol-past `/CLR` → tizim `/RESET`.
- 273 ning sakkizta Q chiqishi → OUT0–OUT7.

273 ma’lumotni CLK ning **0 → 1 frontida** saqlaydi. Shu sabab yozish impulsi tugaganda chiqish yangilanadi; keyingi yozishgacha qiymat saqlanadi. `/CLR = 0` chiqishlarni nolga tushiradi. [TI SN74HCT273](https://www.ti.com/lit/ds/symlink/sn74hct273.pdf).

LED ulanishi:

```text
OUT0 ── 2.2 kΩ ── LED anodi
                   LED katodi ── GND
```

Bu ulanishda 1 — LED yoqilgan holat. Masalan, LED kuchlanishi taxminan 2 V bo‘lsa, tok `(5 − 2) / 2200 ≈ 1.36 mA`. Haqiqiy tok chiqish kuchlanishi va LED ga bog‘liq. Har chiqish hamda butun IC uchun tok chegaralarini saqlang.

Rele, motor yoki kuchli LED ni registrdan bevosita quvvatlamang. Mos tranzistor/MOSFET drayverini qo‘shing: [[Electronics/Basic/MOSFET va MCU integratsiyasi]], [[Electronics/Basic/Rele — MCU bilan ishlatish va tipslar]].

### 5.2. Kirish: 74HCT244

244 ikkita mustaqil 4-bit guruhdan iborat:

- Tashqi IN0–IN7 → buferning sakkizta A kirishi.
- Mos sakkizta Y chiqishi → CPU D0–D7.
- Ikkala faol-past enable `/OE1` va `/OE2` → `/IOR`.

Enable 0 bo‘lganda kirish qiymati shinaga uzatiladi; 1 bo‘lganda chiqishlar yuqori impedansda bo‘ladi. [TI SN74HCT244](https://www.ti.com/lit/ds/symlink/sn74hct244.pdf).

Har tugma uchun:

```text
+5 V ── 10 kΩ ──┬── IN0
                │
              tugma
                │
               GND
```

Bo‘shatilgan tugma = 1; bosilgan tugma = 0. Tugmalar bir necha marta sanaladigan hodisa sifatida ishlatilsa, kontakt sakrashini dastur yoki apparatda bostirish kerak. 244 joriy holatni uzatadi; qisqa impulsni eslab qolmaydi. Impulslar uchun alohida latch yoki hisoblagich kerak.

> [!IMPORTANT]
> CPU o‘qimayotgan paytda bufer shinasini bo‘shatishi shart. Ikki faol chiqishning bir shina bitini qarama-qarshi darajalarga tortishi bus contention hosil qiladi.

## 6. Z80 assembler misollari

Kod quyi bayti 80h bo‘lgan port uchun yozilgan. Mnemonika va son formatini assembleringizga moslang.

### Bitta qiymat yozish

```asm
PORT_IO EQU 080h

    LD A,055h
    OUT (PORT_IO),A
```

Natija: OUT0, OUT2, OUT4 va OUT6 = 1; qolganlari = 0.

### Tugmalarni LED larga chiqarish

```asm
PORT_IO EQU 080h

mirror:
    IN A,(PORT_IO)
    CPL
    OUT (PORT_IO),A
    JR mirror
```

`CPL` pull-up sabab faol-past bo‘lgan tugmalarni LED lar uchun faol-yuqori qiymatga aylantiradi. Bu misol hodisalarni sanamaydi, faqat joriy holatni aks ettiradi.

### BC orqali portni ko‘rsatish

```asm
    LD BC,0080h
    LD A,0A5h
    OUT (C),A
    IN A,(C)
```

Bu misolda yuqori manzil bayti ham aniq belgilanadi.

## 7. Haqiqiy montajdagi timing va ta’minot

Bu funksional sxema aniq CPU modeli va takt chastotasi uchun timing hisobining o‘rnini bosmaydi.

- **Yozish:** `/WR` dan 273 CLK gacha OR kechikishi bor. CLK frontidan oldin setup, undan keyin hold talablari bajarilishi zarur. CPU ma’lumotni bo‘shatishidan oldin registr baytni ushlab qolishi kerak. [273 timing talablari](https://www.ti.com/lit/ds/symlink/sn74hct273.pdf).
- **O‘qish:** manzil dekoderi, OR zanjiri va 244 enable kechikishlarining yig‘indisi CPU ning ma’lumotni qabul qilish muddatiga sig‘ishi kerak. Sikl oxirida bufer shinasini o‘z vaqtida bo‘shatadi. [244 switching characteristics](https://www.ti.com/lit/ds/symlink/sn74hct244.pdf).
- **Glitch:** dekoder o‘tishlaridagi soxta front CLK ga tushmasligi kerak. Ushbu yechim manzil strob davomida barqaror bo‘lishiga tayanadi; tezroq tizimda strobni registrlash yoki boshqa timing arxitekturasi kerak bo‘lishi mumkin.
- Har IC yoniga 100 nF kondensator, modul kirishiga taxminan 4.7–10 µF qo‘ying. Kondensator va GND yo‘lini qisqa tuting.
- CMOS ning foydalanilmaydigan kirishlarini aniq 0 yoki 1 ga bog‘lang. Foydalanilmaydigan chiqishlarni ochiq qoldiring.
- Reset chiqishlar uchun yetarli davomiylikka ega bo‘lsin. Quvvat yoqilishi o‘z-o‘zidan kafolatlangan reset deb olinmaydi.
- Qurilma DMA/bus-master bilan ishlasa, CPU boshqaruv liniyalari yuqori impedansga o‘tadigan holat uchun ham aniq nofaol darajalar va bus ownership boshqaruvi kerak.

Maksimal chastota uchun datasheetdagi **eng yomon holat** qiymatlari olinadi; faqat typical kechikishga tayanilmaydi.

## 8. Shu interfeysdan murakkab custom device yaratish

Keyingi bosqich uchun quyidagi **registr xaritasi taklif qilinadi**. Bu yuqoridagi bitta portli sxemada hali mavjud emas:

| Port | O‘qish | Yozish |
| --- | --- | --- |
| 80h | Qabul qilingan DATA | Yuboriladigan DATA |
| 81h | STATUS | COMMAND |
| 82h | CONFIG | CONFIG |

STATUS uchun misol:

| Bit | Taklif etilgan ma’no |
| --- | --- |
| 0 | RX_READY: o‘qish uchun bayt mavjud |
| 1 | TX_READY: yangi bayt qabul qilinishi mumkin |
| 2 | BUSY: buyruq bajarilmoqda |
| 7 | ERROR: xato yuz berdi |

Bu variantda dekoder bir nechta manzilni tanlashi va ichki registrlarni ajratishi kerak. DATA ga yozilganda bayt latch ga olinadi, TX_READY vaqtincha tozalanadi; backend baytni olgach qayta o‘rnatadi. DATA o‘qilganda RX_READY qachon tozalanishi ham protokolda aniq belgilanadi.

### MCU bilan ishlaydigan backend

Eng qulay arxitektura:

```text
Z80 ⇄ shina interfeysi ⇄ ma’lumot registrlari / FIFO ⇄ MCU ⇄ sensor yoki qurilma
```

MCU har bir Z80 strobi kelganda interrupt ichida javob tayyorlashga majbur bo‘lmasin. Tashqi registr baytni saqlaydi, MCU o‘z vaqtida oladi; javob esa CPU o‘qishidan oldin alohida registr/FIFO ga joylanadi. STATUS bayroqlari tezliklarni ajratadi. Ikki takt domeni orasidagi bayroqlar uchun sinxronizatsiya yoki handshake kerak; ko‘p bitli bayt uzatilayotganda u handshake yakunigacha barqaror saqlanadi.

3.3 V MCU uchun level-shifting yo‘nalishlari alohida loyihalanadi: 5 V chiqishni 3.3 V kirishga uning tolerantligi tasdiqlanmasdan ulamang.

Sekin periferiyada dastur STATUS ni davriy o‘qishi mumkin. `/WAIT` bilan siklni cho‘zish — alohida timing yechimi: u CPU talab qilgan muddatdan oldin faollashishi va belgilangan timing bilan qo‘yib yuborilishi kerak. MCU interruptidan kechikib `/WAIT` tushirish ishonchli shina interfeysi emas.

Interrupt kerak bo‘lsa, avval registrlar va polling protokolini loyihalang; keyin `/INT`, acknowledge hamda tanlangan IM rejimiga mos vektor mexanizmini qo‘shing.

### Qo‘ldagi 74HC595 yoki 74HC299 bilan bog‘liqligi

[[Electronics/Digital Logic/74HC595N|74HC595]] serial kirishga ega: baytni Z80 parallel shinasidan to‘g‘ridan-to‘g‘ri bitta OUT bilan qabul qilmaydi. Uni chiqarish registri ortidan DATA/CLOCK/LATCH signallari bilan boshqarish mumkin.

[[Electronics/Digital Logic/74HC299AP|74HC299]] yordamida ham registrli interfeys qurish mumkin, ammo rejim, takt va uch holatli chiqish boshqaruvi uchun alohida sxema kerak. Yuqoridagi 273 + 244 yechimi yozish va o‘qish yo‘llarini aniq ajratadi.
