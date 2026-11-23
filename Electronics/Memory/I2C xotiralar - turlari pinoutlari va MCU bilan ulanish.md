---
name: "I²C xotiralar: turlari, pinoutlari va MCU bilan ulanish"
tags:
  - electronics
  - i2c
  - eeprom
  - fram
  - microcontroller
---

# I²C xotiralar: turlari, pinoutlari va MCU bilan ulanish

MCU elektr o‘chganidan keyin ham sozlamalar, kalibrlash koeffitsiyentlari yoki hisoblagich qiymatini saqlashi kerak bo‘lsa, tashqi doimiy xotiradan foydalanish mumkin. I²C orqali ulanadigan xotira MCUning ikki signal liniyasini — **SDA** va **SCL** — ishlatadi. Quvvat va umumiy GND ham kerak.

## 1. “I²C Flash” deganda nimani tushunamiz?

I²C — aloqa interfeysi; EEPROM, FRAM va Flash esa ma’lumotni saqlash texnologiyalari. Ularni bir xil tushuncha deb qabul qilish noto‘g‘ri.

| Texnologiya | Ishlash xususiyati | Amaliy qo‘llanish |
|---|---|---|
| EEPROM | Bayt yoki sahifa bo‘yicha yoziladi; ichki yozish siklini kutish kerak | Kam o‘zgaradigan sozlamalar, kalibrlash |
| FRAM / F-RAM | Ferrolektrik xotira; yozish tezligi interfeys bilan cheklanadi, yozishga chidamliligi yuqori | Tez-tez yangilanadigan hisoblagich va kichik loglar |
| NOR Flash | Odatda o‘chirish sektor/blok bo‘yicha; keng tarqalgan tashqi turlari SPI/QSPI ishlatadi | Firmware, grafik resurslar, katta hajmdagi ma’lumot |

**24Cxx/24LCxx — EEPROM oilasi.** Ularni sotuvda “I²C flash” deb atashlari texnik jihatdan aniq emas. SPI xotirani SDA/SCL ga ulash bilan I²C qurilmaga aylantirib bo‘lmaydi. Flashdagi o‘chirish va dasturlash qoidalarini EEPROMga avtomatik tatbiq qilmang.

EEPROMning bayt darajasidagi moslashuvchanligi [Microchip AN1028](https://ww1.microchip.com/downloads/en/AppNotes/01028B.pdf), FRAMning ishlashi esa [FM24CL64B datasheet](https://www.infineon.com/assets/row/public/documents/10/49/infineon-fm24cl64b-64-kbit-8-k-8-serial-i2c-automotive-f-ram-datasheet-datasheet-en.pdf) hujjatida tushuntirilgan.

## 2. I²C EEPROM turlari va sig‘imi

**Kbit va Kbayt bir xil emas:** 8 bit = 1 bayt. Masalan, 256 Kbit xotira 32 KiB ma’lumot saqlaydi.

| Chip namunasi | Sig‘im | Baytlarda |
|---|---:|---:|
| 24LC02B | 2 Kbit | 256 bayt |
| 24LC04B | 4 Kbit | 512 bayt |
| 24LC08B | 8 Kbit | 1 KiB |
| 24LC16B | 16 Kbit | 2 KiB |
| 24LC32A | 32 Kbit | 4 KiB |
| 24LC64 | 64 Kbit | 8 KiB |
| 24LC128 | 128 Kbit | 16 KiB |
| 24LC256 | 256 Kbit | 32 KiB |
| 24LC512 | 512 Kbit | 64 KiB |
| 24LC1025 | 1 Mbit | 128 KiB |

Bir oiladagi chiplarni almashtirishda sig‘imdan tashqari **adreslash usuli, sahifa o‘lchami, faol adres pinlari va kuchlanish** ham hisobga olinadi. Kichik modellarda yuqori xotira adresi bitlari I²C qurilma manziliga kiritilishi mumkin; har bir chipni bir xil drayver bilan ishlatib bo‘lmaydi. [Microchip I²C EEPROM oilasi](https://ww1.microchip.com/downloads/en/devicedoc/i2c%20serial%20ee%20family%20data%20sheet%2021930c.pdf).

### Uchta aniq misol

| Model | Texnologiya | Sig‘im | Ta’minot | Maksimal I²C chastotasi | Muhim feature |
|---|---|---:|---:|---:|---|
| 24LC64 | EEPROM | 8 KiB | 2,5–5,5 V | 400 kHz | 32 baytli yozish sahifasi |
| 24LC256 | EEPROM | 32 KiB | 2,5–5,5 V | 400 kHz | 64 baytli sahifa, yozish sikli ≤5 ms |
| FM24CL64B | FRAM | 8 KiB | 3,0–3,6 V | 1 MHz | Ichki yozish kutishi yo‘q; 10¹³ o‘qish/yozish sikli |

Parametrlar aynan ko‘rsatilgan modellarga tegishli. [24LC64 datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/21189Q.pdf), [24LC256 datasheet](https://www.microchip.com/content/dam/mchp/documents/MPD/ProductDocuments/DataSheets/24AA256-24LC256-24FC256-Data-Sheet-20001203W.pdf), [FM24CL64B datasheet](https://www.infineon.com/assets/row/public/documents/10/49/infineon-fm24cl64b-64-kbit-8-k-8-serial-i2c-automotive-f-ram-datasheet-datasheet-en.pdf).

## 3. Pinoutlar

Quyidagi chizmalar **tepadan ko‘rinish** uchun. Nuqta yoki kesik pin 1 tomonini bildiradi. Ular PCB footprinti emas.

### 24LC256 — PDIP-8

```ic{PDIP-8} Microchip 24LC256
1: A0
2: A1
3: A2
4: VSS / GND
5: SDA
6: SCL
7: WP
8: VCC
```

- **A0–A2:** qurilma manzilini tanlaydi.
- **SDA:** ikki tomonlama ma’lumot liniyasi.
- **SCL:** MCU beradigan takt.
- **WP:** HIGH bo‘lsa yozishni bloklaydi; LOW bo‘lsa yozishga ruxsat.
- **VCC/VSS:** ta’minot va yer.

24LC256ning SOIC-8 korpusida ham shu tartib bor. **MSOP variantida A0 va A1 ulanmagan**, shuning uchun yuqoridagi adreslash imkoniyatini barcha korpuslarga umumlashtirmang. [Pin funksiyalari, datasheet 7-bet](https://www.microchip.com/content/dam/mchp/documents/MPD/ProductDocuments/DataSheets/24AA256-24LC256-24FC256-Data-Sheet-20001203W.pdf#page=7).

### FM24CL64B — SOIC-8

```ic{SOIC-8} Infineon FM24CL64B F-RAM
1: A0
2: A1
3: A2
4: VSS / GND
5: SDA
6: SCL
7: WP
8: VDD
```

Pin vazifalari o‘xshash bo‘lsa ham, **FM24CL64Bga 5 V ta’minot bermang**: uning ish diapazoni 3,0–3,6 V. Xotira hajmi va ruxsat etilgan adres chegarasi ham mos bo‘lishi kerak. [Pinout, datasheet 3-bet](https://www.infineon.com/assets/row/public/documents/10/49/infineon-fm24cl64b-64-kbit-8-k-8-serial-i2c-automotive-f-ram-datasheet-datasheet-en.pdf#page=3).

## 4. MCU bilan ulanish: 3,3 V misol

Quyidagi ulanish 24LC256 PDIP-8/SOIC-8 uchun:

```text
                    +3,3 V
                      |
             +--------+----------+
             |        |          |
           R_SDA    R_SCL       pin 8 VCC
             |        |          |
MCU SDA -----+--------|---------- pin 5 SDA
MCU SCL --------------+---------- pin 6 SCL

MCU GND ------------------------ pin 4 VSS
GND ---------------------------- pin 1 A0
GND ---------------------------- pin 2 A1
GND ---------------------------- pin 3 A2
GND ---------------------------- pin 7 WP

pin 8 VCC ---- 100 nF ---- pin 4 VSS
```

Kondensatorni chipga yaqin joylashtiring. SDA va SCLning har biriga alohida pull-up kerak; MCU pinlarini I²C periferiya rejimida sozlang. WPni MCU orqali boshqarish ham mumkin. [Microchip tavsiya etgan ulanishlar](https://ww1.microchip.com/downloads/en/AppNotes/01028B.pdf).

**Pull-up tanlash.** Qisqa va sig‘imi kichik 100 kHz shina uchun 4,7 kΩ boshlang‘ich tanlov bo‘lishi mumkin. Lekin tezlikni oshirganda qarshilikni hisoblash kerak:

$$
R_{p,max}=\frac{t_{r,max}}{0.8473\,C_b}
$$

Masalan, 400 kHz rejimida $t_{r,max}=300\text{ ns}$ va $C_b=100\text{ pF}$ bo‘lsa, $R_{p,max}\approx3.54\text{ k}\Omega$. Demak, bu sharoitda 4,7 kΩ katta. Minimal qarshilik qurilmalarning LOW darajada tok yutish imkoniyati bilan cheklanadi. Modullardagi mavjud pull-uplar parallel ulanadi. [NXP I²C spetsifikatsiyasi, 50-bet](https://www.nxp.com/docs/en/user-guide/UM10204.pdf#page=50).

3,3 V MCU ishlatilsa, pull-uplarni ham mos 3,3 V liniyaga ulang. Xotira 5 Vda ishlasa ham, MCU pinining 5 Vga chidamliligini va xotiraning HIGH kirish chegarasini alohida hisobga olish kerak; zarur holatda ikki tomonlama I²C level shifter ishlatiladi.

## 5. I²C manzili va xotira manzili

24LC256 uchun 7 bitli qurilma manzili:

```text
1010 A2 A1 A0
```

A0=A1=A2=0 bo‘lsa, manzil **0x50**. Boshqa kombinatsiyalar 0x51–0x57 ni beradi.

![24LC256 adres pinlari va I²C manzil bitlari orasidagi bog‘lanish](https://developerhelp.microchip.com/xwiki/bin/download/applications/i2c/WebHome/i2c-address.png?height=226&rev=1.1&width=600)

Manba: [Microchip — I²C Chip Select](https://developerhelp.microchip.com/xwiki/bin/view/applications/i2c/).

**0x50** — shina qurilmasining manzili; masalan, **0x0123** — uning ichidagi bayt manzili. 24LC256 ichki manzilni ikki baytda oladi, foydalaniladigan diapazon 0x0000–0x7FFF. Shina ustida 0x50 manzili va R/W biti birlashib, yozishda 0xA0, o‘qishda 0xA1 bo‘ladi. MCU API 7 bitli yoki siljitilgan manzil kutishini uning hujjatidan aniqlang. [24LC256 adreslash tavsifi](https://www.microchip.com/content/dam/mchp/documents/MPD/ProductDocuments/DataSheets/24AA256-24LC256-24FC256-Data-Sheet-20001203W.pdf).

## 6. MCU dasturida o‘qish va yozish

Quyidagi ketma-ketlik 24LC256da 0x0123 manzil bilan ishlashni ko‘rsatadi. Bu tayyor SDK kodi emas, shina tranzaksiyasining tavsifi.

**Bitta bayt yozish:**

```text
START
0xA0 → ACK             // 0x50 + Write
0x01 → ACK             // ichki manzilning yuqori bayti
0x23 → ACK             // ichki manzilning quyi bayti
0x5A → ACK             // yoziladigan qiymat
STOP
ACK polling            // ichki yozish tugashini kutish
```

**Shu baytni o‘qish — random read:**

```text
START
0xA0 → ACK
0x01 → ACK
0x23 → ACK
REPEATED START
0xA1 → ACK             // 0x50 + Read
MCU ← ma’lumot bayti
MCU → NACK             // oxirgi bayt
STOP
```

O‘qish oldidagi manzil yuborish xotiraga yangi qiymat yozmaydi. Bir nechta bayt o‘qilsa, MCU oraliq baytlarga ACK, oxirgisiga NACK beradi. [Microchip — byte write, random va sequential read](https://developerhelp.microchip.com/xwiki/bin/view/applications/i2c/).

### Sahifa chegarasini saqlash

Page write chegaradan oshsa, ma’lumot shu sahifa boshiga qaytib yozilishi mumkin. Yozishni quyidagicha bo‘laklang:

```text
n = min(qolgan_baytlar,
        sahifa_hajmi - (manzil % sahifa_hajmi),
        MCU_TX_bufer_hajmi - protokol_baytlari)
```

Masalan, 64 baytli sahifada 0x003E dan 4 bayt yozish **2 + 2 baytli** ikki tranzaksiyaga bo‘linadi. Har biridan keyin ACK polling kerak. MCU buferida ichki manzil baytlari ham joy egallaydi. Pollingga timeout qo‘ying; javob kelmasa, cheksiz kutmang. [AN1028 — ACK polling va page writes](https://ww1.microchip.com/downloads/en/AppNotes/01028B.pdf).

## 7. Featurelar va tanlash mezonlari

**EEPROM:** qurilma sozlamalari kam yangilansa qulay. Yozish resursi chegaralangan; bir xil manzilni doimiy yangilash o‘rniga yozuvlarni aylantirib saqlash va faqat qiymat o‘zgarganda yozish foydali.

**FRAM:** tez-tez saqlanadigan hisoblagichlar uchun yaxshi nomzod. FM24CL64Bda EEPROMga xos millisekundli kutish va sahifa bo‘yicha yozish cheklovi yo‘q. Biroq bu cheksiz tezlik degani emas — I²C uzatish vaqti saqlanadi. Ko‘p baytli yozuv avtomatik ravishda atomar bo‘lib qolmaydi. [FM24CL64B ishlash tavsifi](https://www.infineon.com/assets/row/public/documents/10/49/infineon-fm24cl64b-64-kbit-8-k-8-serial-i2c-automotive-f-ram-datasheet-datasheet-en.pdf).

**Qo‘shimcha himoya va identifikatsiya:** ayrim EEPROMlar oddiy WPdan ko‘proq imkoniyat beradi. Masalan, **ST M24M02E-F** — 256 KiB, 1,6–5,5 V, 1 MHzgacha I²C, 256 baytli sahifa; konfiguratsiyalanadigan qurilma manzili, dasturiy yozish himoyasi va qulflanadigan qo‘shimcha 256 baytli identifikatsiya sahifasiga ega. Uni oddiy 24LC256ning adreslash va pinout qoidalari bilan boshqarmang. [ST M24M02E-F](https://www.st.com/en/memories/m24m02e-f.html).

**Ma’lumot yaxlitligi bo‘yicha loyiha tavsiyasi:** muhim sozlamalarni versiya, ketma-ketlik raqami va CRC bilan ikki nusxada saqlang. Avval yangi nusxani to‘liq yozib, keyin uni haqiqiy deb belgilang. Quvvat uzilishida tugallanmagan yozuvni aniqlash uchun ushbu tartibni drayver va ma’lumot formatida ko‘zda tuting. EEPROM yozayotgan paytda ta’minot ish diapazonidan chiqsa, ma’lumot kafolatlanmaydi. [AN1028 — yozish vaqtida quvvat yo‘qolishi](https://ww1.microchip.com/downloads/en/AppNotes/01028B.pdf).

Tanlovni sig‘im bilan birga **yozish chastotasi, kuchlanish, korpus, harorat, saqlash muddati va himoya funksiyalari** belgilaydi. Birinchi ulanish uchun 24LC256 tushunarli misol; tez-tez yoziladigan kichik ma’lumotlar uchun FRAMni, katta resurslar uchun esa SPI/QSPI NOR Flashni ko‘rib chiqish mumkin.
