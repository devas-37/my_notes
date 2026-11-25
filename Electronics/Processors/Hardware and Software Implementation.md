---
name: Hardware and Software Implementation
status: active
pinned: false
deleted: false
tags:
  - Z80
  - hardware
  - software
---

# Hardware va software’ni amalga oshirish

## Mundarija

- [Minimal tizim hardware’i](#minimal-tizim-hardwarei)
- [RAM qo‘shish](#ram-qoshish)
- [Xotira tezligini boshqarish](#xotira-tezligini-boshqarish)
- [Dynamic xotiralarni ulash](#dynamic-xotiralarni-ulash)
- [Software’ni amalga oshirish misollari](#softwareni-amalga-oshirish-misollari)
- [Z80 instruction’lariga oid aniq misollar](#z80-instructionlariga-oid-aniq-misollar)
  - [1-misol: ma’lumotlar satrini ko‘chirish](#1-misol-malumotlar-satrini-kochirish)
  - [2-misol: ajratuvchigacha ko‘chirish](#2-misol-ajratuvchigacha-kochirish)
  - [3-misol: BCD raqamlarini shift qilish](#3-misol-bcd-raqamlarini-shift-qilish)
  - [4-misol: packed BCD sonlarni ayirish](#4-misol-packed-bcd-sonlarni-ayirish)
- [Dasturlash vazifalariga oid misollar](#dasturlash-vazifalariga-oid-misollar)
  - [Bubble sort](#bubble-sort)
  - [16-bit sonlarni ko‘paytirish](#16-bit-sonlarni-kopaytirish)

Bu bob Z80 CPU’dan foydalanadigan tizimlarni amalga oshirishga kirishdir. Figure 18’da sodda Z80 tizimi ko‘rsatilgan.

## Minimal tizim hardware’i

Har qanday Z80 tizimida quyidagi hardware elementlari bo‘lishi kerak:

- 5 V quvvat manbai
- Oscillator
- Xotira qurilmalari
- I/O sxemalari
- CPU

![CleanShot 2026-11-25 at 13.30.08.png](<../../assets/6d393745-a507-4222-a08f-31fd5678057b-CleanShot-2026-11-25-at-13-30-08.png>)

Z80 CPU uchun faqat bitta 5 V quvvat manbai kerak bo‘lganligi sababli, aksariyat kichik tizimlarni shu yagona manba bilan qurish mumkin.

Tashqi xotira standart RAM, ROM yoki PROM’ning istalgan kombinatsiyasidan iborat bo‘lishi mumkin. Figure 18’da butun xotira tizimini bitta 8 Kb (1 KB) ROM tashkil qiladi. Z80 ichki register’lari konfiguratsiyasi yetarli read/write saqlash hajmini ta’minlaydi, shuning uchun tashqi RAM kerak bo‘lmaydi.

I/O sxemalari kompyuter tizimini tashqi qurilmalar bilan bog‘laydi. Figure 18’da chiqish 8-bit boshqaruv vector’i, kirish esa 8-bit holat word’i hisoblanadi. Kirish ma’lumotlarini istalgan standart three-state driver orqali data bus’ga uzatish, chiqish ma’lumotlarini esa istalgan standart TTL latch yordamida saqlash mumkin. I/O sxemasi vazifasini Z80 PIO bajaradi. Bu yagona sxema ko‘rsatilganidek data bus’ga ulanadi va kerakli 16 bitli, TTL bilan mos I/O’ni ta’minlaydi. Sxemaning ishlashi haqida batafsil ma’lumot uchun *Z80 CPU Peripherals User Manual (UM0081)*ga qarang. Bu keng imkoniyatli kompyuter atigi uchta LSI sxemasi, sodda oscillator va bitta 5 V quvvat manbaidan quriladi.

## RAM qo‘shish

Aksariyat kompyuter tizimlarida ma’lumotlarni saqlash va stack’ni tashkil qilish uchun ma’lum hajmda tashqi read/write xotira kerak bo‘ladi. Figure 19’da Figure 18’dagi misolga 256 byte static xotira qo‘shish ko‘rsatilgan.

Xotira maydoni Figure 20’da ko‘rsatilgandek tashkil qilingan deb olinadi.

![CleanShot 2026-11-25 at 13.30.35.png](<../../assets/e4ec46b1-72cd-44f4-b50a-334c2d9a72b6-CleanShot-2026-11-25-at-13-30-35.png>)

Figure 20’da manzil maydoni hexadecimal yozuvda berilgan. `A10` manzil biti ROM maydonini RAM maydonidan ajratadi; shu sababli bu manzil bitidan chip select funksiyasi uchun foydalanish mumkin. Tashqi ROM yoki RAM hajmi kattaroq bo‘lsa, chip select signallarini hosil qilish uchun sodda TTL decoder kerak bo‘ladi.

![CleanShot 2026-11-25 at 13.30.55.png](<../../assets/cc073113-43eb-4901-9741-af5238d9e872-CleanShot-2026-11-25-at-13-30-55.png>)

## Xotira tezligini boshqarish

Ko‘plab qo‘llanishlarda sekin xotiralardan foydalanish xarajatlarni kamaytirishi mumkin. CPU’dagi `WAIT` liniyasi Z80’ga sekin xotira uchun qo‘shimcha wait state’lar kiritish imkonini beradi. WAIT timing talablari va DRAM refresh cheklovlari hisobga olinishi kerak. 9-sahifadagi *Memory Read Or Write* bo‘limida yoritilgan xotiraga murojaat qilish vaqti talablari `M1` siklidagi instruction fetch vaqtida eng qat’iy bo‘ladi. Xotiraga murojaat qilishning qolgan barcha sikllarida qo‘shimcha yarim clock cycle mavjud. Shu sababli sekinroq xotiralardan foydalanish uchun ba’zan `M1` sikliga bitta wait state qo‘shish maqsadga muvofiq.

Figure 21’da bu vazifani bajaradigan sodda sxema keltirilgan. Figure 22’da ko‘rsatilganidek, ushbu sxemani xotiraga har qanday murojaatga bitta wait state qo‘shadigan qilib o‘zgartirish mumkin.

![CleanShot 2026-11-25 at 13.31.18.png](<../../assets/f6323ba6-064e-4c3c-a584-ab7208b76792-CleanShot-2026-11-25-at-13-31-18.png>)

![CleanShot 2026-11-25 at 13.31.36.png](<../../assets/350e166b-c45c-4531-8068-c470c4755506-CleanShot-2026-11-25-at-13-31-36.png>)

## Dynamic xotiralarni ulash

Har bir dynamic RAM xotira maydonining o‘ziga xos spetsifikatsiyalari mavjud bo‘lib, ular bu yerda keltirilgan misollarga kichik o‘zgartirishlar kiritishni talab qiladi.

Figure 23’da 18-pin’li 4K dynamic xotiralar yordamida 8 KB dynamic RAM’ni ulash uchun zarur mantiqiy sxema ko‘rsatilgan. Bu sxemada RAM tizimdagi yagona xotira deb olinadi, shuning uchun `A12` ikkita xotira sahifasidan birini tanlash uchun ishlatiladi. Refresh vaqtida tizimdagi barcha xotiralar o‘qilishi kerak. CPU to‘g‘ri refresh manzilini `A0`–`A6` liniyalariga beradi. Tizimga qo‘shimcha xotira qo‘shilganda, faqat `A12` bilan ishlaydigan ikkita gate’ni barcha zarur manzil bitlari bilan ishlaydigan decoder’ga almashtirish kerak. Kattaroq tizimlar uchun odatda address buffer’lar va data bus buffer’lar talab qilinadi.

![CleanShot 2026-11-25 at 13.31.57.png](<../../assets/4253267b-ee99-4bf9-a2c2-abc586e3cfbb-CleanShot-2026-11-25-at-13-31-57.png>)

## Software’ni amalga oshirish misollari

Z80 instruction set foydalanuvchiga Z80 CPU’ni boshqarish uchun ko‘plab amallarni taqdim etadi. Asosiy, alternate va index register’lardan arithmetic va logical amallarni bajarish, xotira manzillarini hosil qilish yoki tez-tez ishlatiladigan ma’lumotlarni tezkor saqlash uchun foydalanish mumkin.

Axborotni bevosita bir register’dan boshqasiga, xotiradan xotiraga, xotiradan register’larga yoki register’lardan xotiraga ko‘chirish mumkin. Bundan tashqari, register’lar mazmunini hamda register va xotira mazmunini vaqtinchalik saqlash joyisiz o‘zaro almashtirish mumkin. Xususan, faqat ikkita instruction — `EX AF, AF'` va `EXX` — yordamida AF, BC, DE va HL asosiy va alternate register juftliklari mazmunini almashtirish mumkin. Register’larni almashtirishning bu usuli turli mantiqiy protseduralarning ishchi register’lar to‘plamlarini ajratish yoki bitta protsedurada mavjud register’lar to‘plamini kengaytirish uchun ishlatiladi.

Register juftliklari bilan xotira o‘rtasida ma’lumotlarni saqlash va qayta olishni maxsus Stack Pointer (`SP`) register’idan foydalanadigan `PUSH` va `POP` instruction’lari orqali last-in first-out tartibida boshqarish mumkin. Bu stack register’i ma’lumotlarni qayta ishlash uchun ham, subroutine’larni bog‘lashda manzillarni avtomatik saqlash va qayta olish uchun ham xizmat qiladi. Masalan, subroutine chaqirilganda, `CALL` instruction’idan keyingi manzil `SP` ko‘rsatgan pushdown stack tepasiga joylashtiriladi. Subroutine uni chaqirgan rutinaga qaytganda, stack tepasidagi manzil program counter’ga keyingi instruction manzili sifatida o‘rnatiladi. `PUSH`, `POP`, `CALL` va `RET` instruction’lari bajarilganda, stack pointer stack tepasining joriy joylashuviga mos ravishda avtomatik o‘zgartiriladi. Stack maydoni nazariy jihatdan butun xotira maydonicha bo‘lishi mumkinligi sababli, bu mexanizm pushdown ma’lumotlar stack’lari va subroutine chaqiruvlarini amalda zarur bo‘lgan istalgan chuqurlikda ichma-ich joylashtirish imkonini beradi.

Instruction’larning bajarilish ketma-ketligini arithmetic, logical, shift va compare instruction’lari natijalarini aks ettiradigan oltita flag (`carry`, `zero`, `sign`, `parity/overflow`, `add/subtract`, `half-carry`) yordamida boshqarish mumkin. Flag’ni o‘rnatadigan instruction bajarilgach, shu flag’dan conditional jump yoki return instruction’ini boshqarishda foydalanish mumkin. Bu instruction’lar bitta bit, 8-bit byte yoki 16-bit ma’lumot miqdorlari qayta ishlangandan keyin mantiqiy boshqaruvni ta’minlaydi.

Accumulator bilan boshqa barcha 8-bit register’lar, xotira joylashuvlari yoki immediate operand’lar o‘rtasidagi Boolean amallar uchun logical amallarning to‘liq to‘plami mavjud: `AND`, `OR`, `XOR` (exclusive-OR), `CPL` (bitwise NOT) va `NEG` (two’s complement). NEG Boolean amal emas, arithmetic negation hisoblanadi.

Bundan tashqari, barcha 8-bit asosiy register’lar mazmuni yoki bevosita xotiraning istalgan joylashuvi ustida ishlaydigan, ikkala yo‘nalishdagi arithmetic va logical shift amallarining to‘liq to‘plami mavjud. Shift natijalarini tekshirish va register/register yoki register/xotira shift amallarini bog‘lash uchun carry flag bu shift instruction’lariga kiritilishi yoki ular tomonidan o‘rnatilishi mumkin.

## Z80 instruction’lariga oid aniq misollar

### 1-misol: ma’lumotlar satrini ko‘chirish

Xotiraning `DATA` joylashuvidagi 737 byte’li ma’lumotlar satrini `BUFFER` joylashuviga ko‘chirish kerak bo‘lsa, amal quyidagicha dasturlanadi:

```asm
LD HL, DATA       ; Ma’lumotlar satrining boshlang‘ich manzili
LD DE, BUFFER     ; Maqsad buffer’ning boshlang‘ich manzili
LD BC, 737        ; Ma’lumotlar satrining uzunligi
LDIR              ; Satrni ko‘chirish: HL ko‘rsatgan xotiradan
                  ; DE ko‘rsatgan xotira joylashuviga uzatish;
                  ; HL va DE’ni oshirish, BC’ni kamaytirish;
                  ; BC = 0 bo‘lguncha davom ettirish
```

Bu amal uchun 11 byte kerak va oxirgi byte’dan tashqari har bir byte 21 T State’da, oxirgi byte esa 16 T State’da ko‘chiriladi. LDIR jami 15472 T State, uchta LD bilan birga 15502 T State talab qiladi.

### 2-misol: ajratuvchigacha ko‘chirish

Xotiraning `DATA` joylashuvidan boshlanadigan, uzunligi ko‘pi bilan 132 ta belgi bo‘lgan satrni `BUFFER` joylashuvidan boshlanadigan boshqa xotira maydoniga ASCII `$` belgisi topilguncha ko‘chirish kerak. `$` satr ajratuvchisi sifatida ishlatiladi. Amal quyidagicha bajariladi:

```asm
LD HL, DATA       ; Ma’lumotlar satrining boshlang‘ich manzili
LD DE, BUFFER     ; Maqsad buffer’ning boshlang‘ich manzili
LD BC, 132        ; Satrning maksimal uzunligi
LD A, '$'         ; Satr ajratuvchisining kodi
LOOP: CP (HL)     ; Xotira mazmunini ajratuvchi bilan solishtirish
JR Z, END       ; Belgilar teng bo‘lsa, END’ga o‘tish
LDI               ; Belgini (HL)dan (DE)ga ko‘chirish;
                  ; HL va DE’ni oshirish, BC’ni kamaytirish
JP PE, LOOP       ; Yana belgilar bo‘lsa, LOOP’ga o‘tish
END:              ; Aks holda, keyingi qatorga o‘tish
                  ; Izoh: P/V flag BC register’i nolgacha
                  ; kamaytirilganini ko‘rsatish uchun ishlatiladi
```

Bu amal uchun 19 byte kerak.

### 3-misol: BCD raqamlarini shift qilish

16 xonali o‘nlik son Figure 24’da ko‘rsatilganidek shift qilinadi. Bu shift BCD ko‘paytirish yoki bo‘lish amalini bajarish uchun qo‘llanadi. 16 xonali o‘nlik son packed BCD formatida ifodalanadi: har bir byte’da ikkita BCD raqami saqlanadi. Amal quyidagicha dasturlanadi:

```asm
LD HL, DATA       ; Eng kichik razryadli packed BCD byte manzili
LD B, 8           ; 16 ta BCD digit uchun 8 byte
XOR A             ; Accumulator’ni tozalash
ROTAT: RLD        ; ACC’dagi quyi raqamni (HL)dagi
                  ; raqamlar bilan chapga rotate qilish
INC HL            ; Xotira pointer’ini oldinga surish
DJNZ ROTAT      ; B’ni kamaytirish; B nol bo‘lmasa, ROTAT’ga
                  ; o‘tish, aks holda keyingi qatorga o‘tish
```

Bu amal uchun 11 byte kerak. Byte’lar little-endian tartibda joylashgan deb olinadi. Yakunda A ning quyi nibble’ida chiqarilgan eng katta BCD digit qoladi.

![CleanShot 2026-11-25 at 13.32.36.png](<../../assets/e88f1b7a-1cf6-4592-8abf-2633c7a0d08d-CleanShot-2026-11-25-at-13-32-36.png>)

### 4-misol: packed BCD sonlarni ayirish

Ikkita son packed BCD formatida bo‘lib, ularning uzunliklari o‘zaro teng, ammo turli holatlarda o‘zgarishi mumkin. Bir sonni ikkinchisidan ayirish kerak. Natija kamayuvchining joylashuvida saqlanadi. Amal quyidagicha dasturlanadi:

```asm
LD DE, ARG1       ; Kamayuvchining manzili
LD HL, ARG2       ; Ayiriluvchining manzili
LD B, LENGTH      ; Ikkala argument uzunligi
AND A             ; Carry flag’ni tozalash
SUBDEC: LD A, (DE); Kamayuvchini ACC’ga yuklash
SBC A, (HL)       ; ACC’dan (HL)ni ayirish
DAA               ; Natijani o‘nlik kodlangan qiymatga moslash
LD (DE), A        ; Natijani ARG1 da saqlash
INC HL            ; Xotira pointer’larini oldinga surish
INC DE
DJNZ SUBDEC     ; B’ni kamaytirish; B nol bo‘lmasa, SUBDEC’ga
                  ; o‘tish, aks holda keyingi qatorga o‘tish
```

Bu amal uchun 17 byte kerak. Ikkala operand ham eng kichik razryadli byte’dan boshlab joylashishi, LENGTH 1–255 oralig‘ida bo‘lishi kerak (B = 0 bo‘lsa 256 iteratsiya bajariladi). Yakuniy Carry borrow holatini bildiradi.

## Dasturlash vazifalariga oid misollar

### Bubble sort

Table 2’da ko‘rsatilgan misol dastur standart exchange sorting algoritmi yordamida sonlar massivini o‘sish tartibida saralaydi. Sonlar `0` dan `255` gacha bo‘lgan oraliqda bo‘ladi.

#### 2-jadval. Bubble Sort algoritmi

Bubble Sort — massiv elementlarini o‘zaro taqqoslash va o‘rinlarini almashtirish orqali saralash algoritmi.

##### Kirish va chiqish parametrlari

| Parametr | Tavsif |
|---|---|
| `HL` | Massivning boshlang‘ich xotira manzili |
| `C` | Saralanadigan elementlar soni (2–255) |
| Natija | Asl hujjatga ko‘ra, o‘sish tartibida saralangan massiv |

##### Registrlarning vazifalari

| Registr | Vazifasi |
|---|---|
| `A` | Hisoblashlar uchun vaqtinchalik xotira |
| `B` | Massiv elementlari hisoblagichi |
| `C` | Massiv uzunligi |
| `D` | Taqqoslanayotgan birinchi element |
| `E` | Taqqoslanayotgan ikkinchi element |
| `H` | Dastlab HL pointer’ining yuqori byte’i; keyin bit 0 almashtirish flag’i |
| `L` | Boshlang‘ich HL pointer’ining quyi byte’i; keyin ishlatilmaydi |
| `IX` | Massivning joriy elementiga ko‘rsatkich |
| `IY` | Ishlatilmaydi |

##### Dastur listingi

| Manzil | Mashina kodi | Qator | Label | Instruktsiya | Tavsif |
|---|---|---:|---|---|---|
| `0000` | `22 26 00` | 23 | `sort:` | `LD (data), HL` | Massiv manzilini saqlash |
| `0003` | `CB 84` | 24 | `loop:` | `RES flag, H` | Almashtirish flagini tozalash |
| `0005` | `41` | 25 | | `LD B, C` | Hisoblagichni boshlang‘ich qiymatga o‘rnatish |
| `0006` | `05` | 26 | | `DEC B` | Taqqoslashlar sonini bittaga kamaytirish |
| `0007` | `DD 2A 26 00` | 27 | | `LD IX, (data)` | Massiv ko‘rsatkichini o‘rnatish |
| `000B` | `DD 7E 01` | 28 | `next:` | `LD A, (IX+1)` | Ikkinchi elementni o‘qish |
| `000E` | `5F` | 29 | | `LD E, A` | Ikkinchi elementni vaqtincha saqlash |
| `000F` | `DD 56 00` | 30 | | `LD D, (IX)` | Birinchi elementni o‘qish |
| `0012` | `92` | 31 | | `SUB D` | Birinchi va ikkinchi elementni taqqoslash |
| `0013` | `30 08` | 32 | | `JR NC, noex` | Ikkinchi element birinchidan katta yoki teng bo‘lsa, almashtirishni o‘tkazib yuborish |
| `0015` | `DD 73 00` | 33 | | `LD (IX), E` | Ikkinchi elementni birinchi joyga yozish |
| `0018` | `DD 72 01` | 34 | | `LD (IX+1), D` | Birinchi elementni ikkinchi joyga yozish |
| `001B` | `CB C4` | 35 | | `SET flag, H` | Almashtirish sodir bo‘lganini belgilash |
| `001D` | `DD 23` | 36 | `noex:` | `INC IX` | Keyingi elementga o‘tish |
| `001F` | `10 EA` | 37 | | `DJNZ next` | Hisoblagichni kamaytirish va takrorlash |
| `0021` | `CB 44` | 39 | | `BIT flag, H` | Almashtirish sodir bo‘lganini tekshirish |
| `0023` | `20 DE` | 40 | | `JR NZ, loop` | Massiv saralanmagan bo‘lsa, takrorlash |
| `0025` | `C9` | 41 | | `RET` | Subrutinadan qaytish |
| `0026` | | 43 | `flag:` | `EQU 0` | Flag uchun 0-bitni belgilash |
| `0026` | | 44 | `data:` | `DEFS 2` | Massiv manzili uchun 2 bayt ajratish |
| | | 45 | | `END` | Dastur yakuni |

##### Assembler kodi

```asm
sort:
    LD (data), HL
loop:
    RES flag, H
    LD B, C
    DEC B
    LD IX, (data)
next:
    LD A, (IX+1)
    LD E, A
    LD D, (IX)
    SUB D
    JR NC, noex
    LD (IX), E
    LD (IX+1), D
    SET flag, H
noex:
    INC IX
    DJNZ next
    BIT flag, H
    JR NZ, loop
    RET
flag: EQU 0
data: DEFS 2
END
```

##### Asl hujjatdagi nomuvofiqliklar

Quyidagi yozuvlar mashina kodlari va manzillar asosida talqin qilindi:

| Asl yozuv | To‘g‘rilangan yozuv |
|---|---|
| `goof` | `000F` |
| `0010` (36-qator) | `001D` |
| `JR PC, noex-$` | `JR NC, noex` |
| `LD (IX+i), D` | `LD (IX+1), D` |

**Muhim:** asl listing kamayish tartibida saralagan. Yuqoridagi listing va assembler kodi o‘sish tartibida saralash uchun tuzatildi: ikkinchi elementdan birinchi element ayiriladi. Teng elementlar almashtirilmaydi. Instruction uzunliklari va jump displacement qiymatlari o‘zgarmadi. `data` uchun yoziladigan RAM kerak; subrutina HL, IX, A, B, D, E va flaglarni o‘zgartiradi.

### 16-bit sonlarni ko‘paytirish

#### 3-jadval. Ko‘paytirish dasturi (Multiply Listing)

Ushbu subrutina ishorasiz 16 bitli butun sonlarni siljitish va qo‘shish orqali ko‘paytiradi.

##### Kirish va chiqish parametrlari

| Parametr | Tavsif |
|---|---|
| `DE` | Ko‘paytiruvchi |
| `HL` | Ko‘paytiriluvchi |
| `HL` (chiqish) | Ko‘paytirish natijasining quyi 16 biti |

##### Registrlarning vazifalari

| Registr | Vazifasi |
|---|---|
| `H` | Oraliq natijaning yuqori bayti |
| `L` | Oraliq natijaning quyi bayti |
| `D` | Ko‘paytiriluvchining yuqori bayti |
| `E` | Ko‘paytiriluvchining quyi bayti |
| `B` | Siljitishlar soni hisoblagichi |
| `C` | Ko‘paytiruvchining yuqori bayti |
| `A` | Ko‘paytiruvchining quyi bayti |

##### Dastur listingi

| Manzil | Mashina kodi | Qator | Label | Instruktsiya | Tavsif |
|---|---|---:|---|---|---|
| `0000` | | 1 | `mult:` | | Subrutina boshlanishi |
| `0000` | `06 10` | 18 | | `LD B, 16` | Bitlar sonini belgilash |
| `0002` | `4A` | 19 | | `LD C, D` | Ko‘paytiruvchining yuqori baytini ko‘chirish |
| `0003` | `7B` | 20 | | `LD A, E` | Ko‘paytiruvchining quyi baytini ko‘chirish |
| `0004` | `EB` | 21 | | `EX DE, HL` | Ko‘paytiriluvchini DE ga ko‘chirish |
| `0005` | `21 00 00` | 22 | | `LD HL, 0` | Oraliq natijani nolga tenglash |
| `0008` | `CB 39` | 23 | `mloop:` | `SRL C` | Ko‘paytiruvchining yuqori baytini o‘ngga siljitish |
| `000A` | `1F` | 24 | | `RRA` | Quyi baytni Carry orqali o‘ngga siljitish; eng kichik bit Carry ga o‘tadi |
| `000B` | `30 01` | 26 | | `JR NC, noadd` | Carry nol bo‘lsa, qo‘shishni o‘tkazib yuborish |
| `000D` | `19` | 27 | | `ADD HL, DE` | Ko‘paytiriluvchini oraliq natijaga qo‘shish |
| `000E` | `EB` | 29 | `noadd:` | `EX DE, HL` | Ko‘paytiriluvchini HL ga vaqtincha ko‘chirish |
| `000F` | `29` | 30 | | `ADD HL, HL` | Ko‘paytiriluvchini ikki baravar oshirish (chapga siljitish) |
| `0010` | `EB` | 31 | | `EX DE, HL` | Ko‘paytiriluvchi va natijani o‘z registrlariga qaytarish |
| `0011` | `10 F5` | 32 | | `DJNZ mloop` | B ni kamaytirish va barcha bitlar tekshirilguncha takrorlash |
| `0013` | `C9` | 33 | | `RET` | Subrutinadan qaytish |
| | | 34 | | `END` | Dastur yakuni |

##### Assembler kodi

```asm
mult:
    LD B, 16
    LD C, D
    LD A, E
    EX DE, HL
    LD HL, 0

mloop:
    SRL C
    RRA
    JR NC, noadd
    ADD HL, DE

noadd:
    EX DE, HL
    ADD HL, HL
    EX DE, HL
    DJNZ mloop
    RET

    END
```

##### Ishlash prinsipi

Har bir iteratsiyada `C:A` juftligidagi ko‘paytiruvchi o‘ngga siljitiladi. Agar chiqarilgan bit 1 bo‘lsa, `DE` dagi ko‘paytiriluvchi `HL` dagi natijaga qo‘shiladi. Keyin `DE` chapga siljitiladi. Jarayon 16 marta takrorlanadi.



Natija 16 bit bilan cheklangan: overflow bo‘lsa, faqat quyi 16 bit saqlanadi.
