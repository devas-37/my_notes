---
name: Z80 CPU Instructions
status: active
pinned: false
deleted: false
tags:
    - z80
    - cpu
    - assembly
---

# Z80 CPU Instructions

Z80 CPU 158 xil instruction turini, jumladan 8080A CPU ning barcha 78 instruction turini bajara oladi.

## Mundarija

- [Instruction Types](#instruction-types)
- [Addressing Modes](#addressing-modes)
- [Instruction Notation Summary](#instruction-notation-summary)
- [Instruction Op Codes](#instruction-op-codes)
- [Load and Exchange](#load-and-exchange)
- [Block Transfer and Search](#block-transfer-and-search)
- [Arithmetic and Logical](#arithmetic-and-logical)
- [Rotate and Shift](#rotate-and-shift)
- [Bit Manipulation](#bit-manipulation)
- [Jump, Call, and Return](#jump-call-and-return)
- [Input/Output](#inputoutput)
- [CPU Control Group](#cpu-control-group)

## Instruction Types

Load instructionlari ma’lumotni CPU registerlari orasida yoki registerlar va tashqi xotira orasida ko‘chiradi. Har bir instruction source va destination manzilini belgilaydi. Source o‘zgarmaydi. Masalan, C registeridan B registeriga ma’lumot ko‘chirish mumkin. Load-immediate tegishli umumiy maqsadli registerlarga, register pairlarga yoki (HL), (IX+d), (IY+d) orqali xotiraga qiymat yuklaydi. Exchange instructionlari ikki register qiymatini almashtiradi.

Block Transfer instructionlari bitta instruction yordamida istalgan hajmdagi xotira blokini boshqa manzilga ko‘chiradi. Bu katta ma’lumot satrlarini qayta ishlashda foydali. Block Search istalgan uzunlikdagi tashqi xotira blokidan 8-bit belgini izlaydi. Belgi topilganda yoki blok tugaganda instruction avtomatik yakunlanadi. Ikkala tur ham bajarilish vaqtida interrupt orqali to‘xtatilishi mumkin.

Arithmetic and Logical instructionlari Accumulator, boshqa umumiy maqsadli registerlar yoki tashqi xotiradagi ma’lumotlar ustida ishlaydi. Ko‘pchilik 8-bit arithmetic amallar natijani Accumulator ga joylaydi; CP faqat flaglarni yangilaydi, INC va DEC esa operandni o‘zgartiradi. Masalan, tashqi xotiradagi qiymat Accumulator ga qo‘shiladi. Guruh 16-bit registerlar orasidagi qo‘shish va ayirishni ham o‘z ichiga oladi.

Rotate and Shift register yoki xotira qiymatini chapga yoki o‘ngga, carry bilan yoki carry siz, arithmetic yoki logical usulda siljitadi. Accumulator dagi bir digit xotiradagi ikki digit bilan aylantirilishi ham mumkin.

Bit Manipulation bitta instruction bilan Accumulator, umumiy maqsadli register yoki tashqi xotiradagi istalgan bitni set, reset yoki test qiladi. Masalan, H registerining eng katta biti reset qilinadi. Bu boshqaruv dasturlari va software flaglar uchun foydali.

JUMP, CALL va RETURN dastur qismlari orasida o‘tishni ta’minlaydi. Yangi Program Counter manzilini olishning bir necha usuli mavjud. RESTART maxsus CALL turi bo‘lib, yangi manzil 8-bit opcode tarkibida joylashadi: Page 0 dagi sakkizta manzildan biri tanlanadi. HL, IX yoki IY ni bevosita Program Counter ga yuklash orqali hisoblangan manzilga ham o‘tish mumkin.

Input/Output instructionlari tashqi xotira yoki CPU registerlari bilan I/O qurilmalari orasida ma’lumot uzatadi. Port raqami address bus ning quyi sakkiz bitida beriladi. Port instructionning ikkinchi byte ida yoki C registerida ko‘rsatilishi mumkin. C registeridan foydalanish bir nechta portga umumiy driver routine ishlatish imkonini beradi; ROM dagi routine uchun port opcode tarkibida bo‘lsa, bunday imkoniyat yo‘q. IN r, (C) instructionlari flaglarni input qiymatiga qarab yangilaydi; IN A, (n) flaglarni o‘zgartirmaydi.

Z80 bitta instruction bilan 256 byte gacha ma’lumotni I/O port va xotira orasida avtomatik uzata oladi. Ikki register banki bilan birga bu tezkor I/O block transfer imkonini beradi. Masalan, interrupt asosida double-density floppy disk formatlash uchun preamble, address, data va CRC kodlari ta’minlanadi.

Basic CPU Control instructionlari interrupt enable flip-flop ni set yoki reset qilish va interrupt response mode ni tanlash kabi amallarni bajaradi.

## Addressing Modes

Ko‘pchilik Z80 instructionlari ichki registerlar, tashqi xotira yoki I/O portlaridagi ma’lumotlar bilan ishlaydi. Addressing har bir instruction uchun ma’lumot manzili qanday hosil qilinishini belgilaydi.

### Immediate Addressing

Opcode dan keyingi byte haqiqiy operandni saqlaydi. Masalan, Accumulator ga constant yuklashda constant opcode dan darhol keyin keladi.

![CleanShot 2026-11-25 at 13.49.44.png](<../../assets/ced27780-820a-4834-ab95-d75314efb029-CleanShot-2026-11-25-at-13-49-44.png>)

### Immediate Extended Addressing

Opcode dan keyingi ikki byte operandni tashkil qiladi. Masalan, HL register pair ga 16-bit (ikki byte) qiymat yuklanadi.

![CleanShot 2026-11-25 at 13.49.59.png](<../../assets/fc1576c6-aecb-476d-808d-a6245ba955f6-CleanShot-2026-11-25-at-13-49-59.png>)

### Modified Page Zero Addressing

Z80 Page 0 dagi sakkizta manzildan biriga maxsus bir byte li CALL instructioniga ega. Restart Program Counter ni Page 0 dagi effective address ga o‘rnatadi. Tez-tez chaqiriladigan subroutine ning to‘liq 16-bit manzilini bitta byte bilan ifodalash xotirani tejaydi.

![CleanShot 2026-11-25 at 13.50.10.png](<../../assets/c3aadc17-307e-4fe8-8ea8-96b939a52a2f-CleanShot-2026-11-25-at-13-50-10.png>)

### Relative Addressing

Opcode dan keyingi byte displacement ni belgilaydi. Bu signed two’s complement son keyingi instruction opcode manziliga qo‘shiladi. Yaqin manzillarga o‘tish uchun faqat ikki byte talab qilinadi. Dastur qismlari odatda yaqin joylashgani sababli relative jump xotirani sezilarli tejaydi. Displacement A+2 ga nisbatan −128 dan +127 gacha, jump opcode manziliga nisbatan −126 dan +129 gacha bo‘ladi. Bu relocatable code yozishga ham imkon beradi.

![CleanShot 2026-11-25 at 13.50.27.png](<../../assets/234211e8-1a67-4906-a597-47102d1497b5-CleanShot-2026-11-25-at-13-50-27.png>)

### Extended Addressing

Instruction tarkibiga ikki byte (16 bit) manzil kiritiladi. Bu jump manzili yoki operand joylashgan manzil bo‘lishi mumkin. Xotiraning istalgan joyiga o‘tish, ma’lumot yuklash yoki saqlash uchun ishlatiladi. `(nn)` yozuvi `nn` 16-bit manzilidagi xotira qiymatini bildiradi. Qavslar qiymat pointer sifatida ishlatilishini anglatadi. Masalan, `(1200)` — 1200 manzilidagi qiymat.

![CleanShot 2026-11-25 at 13.50.42.png](<../../assets/ccc54879-c5e1-459b-972e-5cefdf27e01d-CleanShot-2026-11-25-at-13-50-42.png>)

### Indexed Addressing

Indexed instructiondagi displacement byte opcode tanlagan index registerga qo‘shiladi va xotira pointerini hosil qiladi. Index register qiymati o‘zgarmaydi. Masalan, `(Index Register + Displacement)` manzilidagi qiymat Accumulator ga yuklanadi. Displacement signed two’s complement son. Index register jadval boshiga ko‘rsatishi sababli jadvallar bilan ishlash osonlashadi. Ikki index register bir nechta jadval bilan ishlash uchun berilgan. Bu relocatable code ni ham qo‘llaydi.

![CleanShot 2026-11-25 at 13.50.51.png](<../../assets/5058b5fd-7cbc-4216-aebc-f436224508d5-CleanShot-2026-11-25-at-13-50-51.png>)

Z80 index registerlari IX va IY deb ataladi. Yozilishi: `(IX+d)` yoki `(IY+d)`. `d` signed displacement; qavslar tashqi xotiraga pointer ekanini bildiradi.

### Register Addressing

Ko‘p opcode lar operatsiyada qaysi CPU registeri ishlatilishini belgilovchi bitlarga ega. Masalan, LD C, B instructionida source B va destination C opcode bitlari orqali belgilanadi.

### Implied Addressing

Opcode operand saqlovchi bir yoki bir nechta registerlarni avtomatik belgilaydi. Masalan, arithmetic operatsiyalarida natija destination sifatida Accumulator nazarda tutiladi.

### Register Indirect Addressing

16-bit register pair (masalan HL) xotira manziliga pointer sifatida ishlatiladi. Masalan, HL ko‘rsatgan xotira qiymati Accumulator ga yuklanadi. Indexed Addressing ham shu usulning displacement qo‘shilgan shaklidir. Block move va search instructionlari avtomatik increment, decrement va compare amallarini qo‘shadi. Pointer register nomi qavsga olinadi: `(HL)`. 16-bit operandlarda register quyi byte manzilini ko‘rsatadi va yuqori byte ni olish uchun avtomatik increment qilinadi.

![CleanShot 2026-11-25 at 13.51.10.png](<../../assets/9860497c-0885-40f8-860c-16a3561187c8-CleanShot-2026-11-25-at-13-51-10.png>)

### Bit Addressing

Bit set, reset va test instructionlari register, Register Indirect yoki Indexed Addressing orqali operandni tanlaydi. Opcode dagi uch bit sakkiz bitdan qaysi biri o‘zgartirilishini belgilaydi.

### Addressing Mode Combinations

Bir nechta operandli instructionlarda ikki addressing mode ishlatilishi mumkin. Masalan, load source uchun Immediate Addressing, destination uchun Register Indirect yoki Indexed Addressing ishlatadi.

## Instruction Notation Summary

**Table 4. Instruction Notation Summary**

| Notation | Description                                                            |
| -------- | ---------------------------------------------------------------------- |
| `r`      | A, B, C, D, E, H yoki L                                                |
| `(HL)`   | HL ko‘rsatgan xotira qiymati                                           |
| `(IX+d)` | IX + signed displacement d manzilidagi qiymat                          |
| `(IY+d)` | IY + signed displacement d manzilidagi qiymat                          |
| `n`      | Bir byte unsigned integer, 0–255                                       |
| `nn`     | Ikki byte unsigned integer, 0–65535                                    |
| `d`      | Bir byte signed integer, −128 dan +127 gacha                           |
| `b`      | Bit raqami 0–7; chapda bit 7, o‘ngda bit 0                             |
| `e`      | Joriy manzildan relative jump offset, −126 dan +129 gacha              |
| `cc`     | NZ, Z, NC, C, PO, PE, P yoki M; conditional jump, call va return uchun |
| `qq`     | BC, DE, HL yoki AF                                                     |
| `ss`     | BC, DE, HL yoki SP                                                     |
| `pp`     | BC, DE, IX yoki SP                                                     |
| `rr`     | BC, DE, IY yoki SP                                                     |
| `s`      | r, n, (HL), (IX+d) yoki (IY+d)                                         |
| `m`      | r, (HL), (IX+d) yoki (IY+d)                                            |

## Instruction Op Codes

Jadvallar har bir instruction opcode va assembly mnemonic ni ko‘rsatadi. Asl hujjatdagi soyali kataklar 8080A bilan bir xil opcode larni bildiradi. Opcode lar hexadecimal formatda: bir byte uchun ikki, ikki byte uchun to‘rt hex belgi. Mnemonic opcode va nol, bir yoki ikki operanddan iborat. Implied operand yozilmaydi; o‘zgarmas operandli OR kabi instructionlar bitta, ikkita o‘zgaruvchi operandli instructionlar ikkita operand bilan yoziladi.

**Table 5. Hex, Binary, Decimal Conversion Table**

| Hex | Binary | Decimal |
| --- | ------ | ------- |
| 0   | 0000   | 0       |
| 1   | 0001   | 1       |
| 2   | 0010   | 2       |
| 3   | 0011   | 3       |
| 4   | 0100   | 4       |
| 5   | 0101   | 5       |
| 6   | 0110   | 6       |
| 7   | 0111   | 7       |
| 8   | 1000   | 8       |
| 9   | 1001   | 9       |
| A   | 1010   | 10      |
| B   | 1011   | 11      |
| C   | 1100   | 12      |
| D   | 1101   | 13      |
| E   | 1110   | 14      |
| F   | 1111   | 15      |

## Load and Exchange

Table 6 barcha 8-bit load opcode larini va addressing turlarini ko‘rsatadi. Source yuqorida, destination chapda. Masalan, C ga B dan yuklash opcode `48h` (`01001000`) M1 vaqtida tashqi xotiradan olinadi, decode qilinadi va register transfer avtomatik bajariladi. Mnemonic `LD DEST, SOURCE`. Register Addressing va Register Indirect birlashtirilishi mumkin: `LD (HL), D` opcode `72`.

**Table 6. 8-Bit Load Group LD**

| Destination / Source | I     | R     | A       | B       | C       | D       | E       | H       | L       | (HL) | (BC) | (DE) | (IX+d)  | (IY+d)  | (nn)  | n         |
| -------------------- | ----- | ----- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ---- | ---- | ---- | ------- | ------- | ----- | --------- |
| A                    | ED 57 | ED 5F | 7F      | 78      | 79      | 7A      | 7B      | 7C      | 7D      | 7E   | 0A   | 1A   | DD 7E d | FD 7E d | 3A nn | 3E n      |
| B                    |       |       | 47      | 40      | 41      | 42      | 43      | 44      | 45      | 46   |      |      | DD 46 d | FD 46 d |       | 06 n      |
| C                    |       |       | 4F      | 48      | 49      | 4A      | 4B      | 4C      | 4D      | 4E   |      |      | DD 4E d | FD 4E d |       | 0E n      |
| D                    |       |       | 57      | 50      | 51      | 52      | 53      | 54      | 55      | 56   |      |      | DD 56 d | FD 56 d |       | 16 n      |
| E                    |       |       | 5F      | 58      | 59      | 5A      | 5B      | 5C      | 5D      | 5E   |      |      | DD 5E d | FD 5E d |       | 1E n      |
| H                    |       |       | 67      | 60      | 61      | 62      | 63      | 64      | 65      | 66   |      |      | DD 66 d | FD 66 d |       | 26 n      |
| L                    |       |       | 6F      | 68      | 69      | 6A      | 6B      | 6C      | 6D      | 6E   |      |      | DD 6E d | FD 6E d |       | 2E n      |
| (HL)                 |       |       | 77      | 70      | 71      | 72      | 73      | 74      | 75      |      |      |      |         |         |       | 36 n      |
| (BC)                 |       |       | 02      |         |         |         |         |         |         |      |      |      |         |         |       |           |
| (DE)                 |       |       | 12      |         |         |         |         |         |         |      |      |      |         |         |       |           |
| (IX+d)               |       |       | DD 77 d | DD 70 d | DD 71 d | DD 72 d | DD 73 d | DD 74 d | DD 75 d |      |      |      |         |         |       | DD 36 d n |
| (IY+d)               |       |       | FD 77 d | FD 70 d | FD 71 d | FD 72 d | FD 73 d | FD 74 d | FD 75 d |      |      |      |         |         |       | FD 36 d n |
| (nn)                 |       |       | 32 n n  |         |         |         |         |         |         |      |      |      |         |         |       |           |
| I                    |       |       | ED 47   |         |         |         |         |         |         |      |      |      |         |         |       |           |
| R                    |       |       | ED 4F   |         |         |         |         |         |         |      |      |      |         |         |       |           |

8-Bit Load Group tavsiflari 70-sahifadan boshlanadi. HL atrofidagi qavslar pointer ni bildiradi. Destination har doim birinchi yoziladi. Z80 assembly o‘qish va saqlash uchun qulay. Ayrim opcode lar ikki byte; instruction uzunliklari 8, 16, 24, 32 bit. Ko‘p arithmetic va logical instructionlar sakkiz bitli bo‘lib, fixed 16-bit instructionlarga nisbatan xotirani tejaydi.

Indexed load odatda uch byte, uchinchi byte `d`. Misol: `LD E, (IX + 8)`.

![CleanShot 2026-11-25 at 13.51.51.png](<../../assets/991d24fd-2a4b-4e3c-919b-226864036823-CleanShot-2026-11-25-at-13-51-51.png>)

Extended Addressing ham uch byte: `LD A, (6F32h)`. Manzilning quyi byte i birinchi keladi.

![CleanShot 2026-11-25 at 13.52.13.png](<../../assets/cd453a06-4348-4a0d-b2a6-49a97db7f206-CleanShot-2026-11-25-at-13-52-13.png>)

8-bit register uchun load immediate ikki byte: `LD H, 36h`.

![CleanShot 2026-11-25 at 13.52.23.png](<../../assets/27bfa3dd-6e25-4fa7-881f-01e94cbde769-CleanShot-2026-11-25-at-13-52-23.png>)

Indexed destination va immediate source to‘rt byte talab qiladi: `LD (IX-15), 21h`. Displacement opcode dan darhol keyin keladi.

![CleanShot 2026-11-25 at 13.52.35.png](<../../assets/6f7eaa18-8f97-4963-86da-1ed06b4bdf27-CleanShot-2026-11-25-at-13-52-35.png>)

Table 7 16-bit load operatsiyalarini ko‘rsatadi. Extended Addressing barcha register pair larni qamrab oladi. Stack Pointer bilan Register Indirect operatsiyalari PUSH va POP dir.

**Table 7. 16-Bit Load Group LD, PUSH, and POP**

| Instruction | Opcode    |
| ----------- | --------- |
| LD BC, nn   | 01 n n    |
| LD DE, nn   | 11 n n    |
| LD HL, nn   | 21 n n    |
| LD SP, nn   | 31 n n    |
| LD IX, nn   | DD 21 n n |
| LD IY, nn   | FD 21 n n |
| LD BC, (nn) | ED 4B n n |
| LD DE, (nn) | ED 5B n n |
| LD HL, (nn) | 2A n n    |
| LD SP, (nn) | ED 7B n n |
| LD IX, (nn) | DD 2A n n |
| LD IY, (nn) | FD 2A n n |
| LD (nn), BC | ED 43 n n |
| LD (nn), DE | ED 53 n n |
| LD (nn), HL | 22 n n    |
| LD (nn), SP | ED 73 n n |
| LD (nn), IX | DD 22 n n |
| LD (nn), IY | FD 22 n n |
| LD SP, HL   | F9        |
| LD SP, IX   | DD F9     |
| LD SP, IY   | FD F9     |
| PUSH AF     | F5 |
| PUSH BC     | C5 |
| PUSH DE     | D5 |
| PUSH HL     | E5 |
| PUSH IX     | DD E5 |
| PUSH IY     | FD E5 |
| POP AF      | F1 |
| POP BC      | C1        |
| POP DE      | D1        |
| POP HL      | E1        |
| POP IX      | DD E1     |
| POP IY      | FD E1     |

PUSH va POP har bajarilganda SP ni o‘zgartiradi. 16-Bit Load Group tavsiflari 98-sahifadan boshlanadi. Har byte stack ga yozilganda SP decrement, o‘qilganda increment qilinadi. PUSH AF (`F5h`) ketma-ketligining pseudocode ko‘rinishi (LD (SP), F kabi instruction mavjud emas):

```asm
DEC SP
; (SP) ← A
DEC SP
; (SP) ← F
```

![CleanShot 2026-11-25 at 13.52.49.png](<../../assets/ed4f9332-89c3-44c1-9907-37905cc939a4-CleanShot-2026-11-25-at-13-52-49.png>)

POP — PUSH ning teskarisi. Yuqori byte birinchi PUSH va oxirgi POP qilinadi. PUSH BC: B, keyin C; PUSH DE: D, keyin E; PUSH HL: H, keyin L; POP HL: L, keyin H.

Extended immediate source uchun opcode dan keyin ikki byte keladi: `LD DE, 0659h`. Quyi byte har doim birinchi.

![CleanShot 2026-11-25 at 13.53.01.png](<../../assets/66e61d48-77db-4302-8469-76813d3b0ab4-CleanShot-2026-11-25-at-13-53-01.png>)

Table 8 dagi `08h` Accumulator va flag register pair banklarini, `D9h` esa oltita umumiy maqsadli register banklarini almashtiradi. Bir byte li opcode lar interrupt response vaqtini kamaytiradi.

**Table 8. Exchanges EX and EXX**

| Instruction | Op Code |
| ----------- | ------- |
| EX AF, AF'  | 08      |
| EXX         | D9      |
| EX DE, HL   | EB      |
| EX (SP), HL | E3      |
| EX (SP), IX | DD E3   |
| EX (SP), IY | FD E3   |

## Block Transfer and Search

HL source, DE destination, BC byte counter. Ular boshlang‘ich qiymatga o‘rnatilgach, LDI HL ko‘rsatgan byte ni DE ko‘rsatgan manzilga ko‘chiradi, HL va DE increment, BC decrement qilinadi. Har transfer orasida boshqa ishlov kerak bo‘lsa foydali. LDIR BC nol bo‘lguncha takrorlaydi (boshlang‘ich BC = 0 bo‘lsa 65536 byte). 16-bit registerlar tufayli blok 64 KB gacha bo‘lishi mumkin (1 KB = 1024 byte). Bloklar ustma-ust tushishi ham mumkin. LDD va LDDR yuqori manzildan boshlaydi va HL, DE ni decrement qiladi.

**Table 9. Block Transfer Group**

| Instruction | Op Code | Description                                   |
| ----------- | ------- | --------------------------------------------- |
| LDI         | ED A0   | (HL) → (DE); Inc HL, DE; Dec BC               |
| LDIR        | ED B0   | (HL) → (DE); Inc HL, DE; Dec BC; BC = 0 gacha |
| LDD         | ED A8   | (HL) → (DE); Dec HL, DE; Dec BC               |
| LDDR        | ED B8   | (HL) → (DE); Dec HL, DE; Dec BC; BC = 0 gacha |

CPI Accumulator ni HL ko‘rsatgan qiymat bilan taqqoslaydi, natija flagda saqlanadi, HL increment va BC decrement qilinadi. CPIR moslik topilguncha yoki BC nol bo‘lguncha takrorlaydi. CPD va CPDR HL ni decrement qilib, yuqori manzildan qidiradi. Bu instructionlar string manipulation uchun foydali. Batafsil tavsiflar 123-sahifadan boshlanadi.

**Table 10. Block Search Group**

| Instruction | Op Code | Description                        |
| ----------- | ------- | ---------------------------------- |
| CPI         | ED A1   | Inc HL, Dec BC                     |
| CPIR        | ED B1   | Inc HL, Dec BC; BC = 0 yoki moslik |
| CPD         | ED A9   | Dec HL, BC                         |
| CPDR        | ED B9   | Dec HL, BC; BC = 0 yoki moslik     |

## Arithmetic and Logical

Table 11 Accumulator bilan bajariladigan 8-bit arithmetic operatsiyalarini, INC va DEC ni ko‘rsatadi. INC va DEC dan tashqari amallar Accumulator va source orasida bajariladi. CP Accumulator ni o‘zgartirmaydi, qolganlar natijani unga joylaydi. Flag Register natijaga qarab o‘zgaradi. Batafsil tavsiflar 144-sahifadan boshlanadi.

**Table 11. 8-Bit Arithmetic and Logic**

| Instruction | A   | B   | C   | D   | E   | H   | L   | (HL) | (IX+d)  | (IY+d)  | n    |
| ----------- | --- | --- | --- | --- | --- | --- | --- | ---- | ------- | ------- | ---- |
| ADD         | 87  | 80  | 81  | 82  | 83  | 84  | 85  | 86   | DD 86 d | FD 86 d | C6 n |
| ADC         | 8F  | 88  | 89  | 8A  | 8B  | 8C  | 8D  | 8E   | DD 8E d | FD 8E d | CE n |
| SUB         | 97  | 90  | 91  | 92  | 93  | 94  | 95  | 96   | DD 96 d | FD 96 d | D6 n |
| SBC         | 9F  | 98  | 99  | 9A  | 9B  | 9C  | 9D  | 9E   | DD 9E d | FD 9E d | DE n |
| AND         | A7  | A0  | A1  | A2  | A3  | A4  | A5  | A6   | DD A6 d | FD A6 d | E6 n |
| XOR         | AF  | A8  | A9  | AA  | AB  | AC  | AD  | AE   | DD AE d | FD AE d | EE n |
| OR          | B7  | B0  | B1  | B2  | B3  | B4  | B5  | B6   | DD B6 d | FD B6 d | F6 n |
| CP          | BF  | B8  | B9  | BA  | BB  | BC  | BD  | BE   | DD BE d | FD BE d | FE n |
| INC         | 3C  | 04  | 0C  | 14  | 1C  | 24  | 2C  | 34   | DD 34 d | FD 34 d |      |
| DEC         | 3D  | 05  | 0D  | 15  | 1D  | 25  | 2D  | 35   | DD 35 d | FD 35 d |      |

INC va DEC register yoki xotirani source va destination sifatida ishlatadi. Indexed operandda displacement, immediate operandda qiymat opcode dan keyin keladi. `AND 07h` misolida Accumulator `F3h` bo‘lsa, natija `03h`.

![CleanShot 2026-11-25 at 13.53.21.png](<../../assets/18347959-2dba-4d1d-9c0f-8430d908f561-CleanShot-2026-11-25-at-13-53-21.png>)

| Qiymat              | Binary / Hex    |
| ------------------- | --------------- |
| Oldingi Accumulator | 1111 0011 = F3h |
| Operand             | 0000 0111 = 07h |
| Natija              | 0000 0011 = 03h |

ADD binary qo‘shish, SUB ayirishni bajaradi. ADC va SBC Carry flagni ham qo‘shadi yoki ayiradi. Flaglar va DAA multiprecision packed BCD, signed yoki unsigned binary hamda two’s complement signed sonlar bilan ishlashni ta’minlaydi. AND, OR, XOR va CP ham shu guruhga kiradi.

**Table 12. General-Purpose AF Operation**

| Instruction            | Op Code |
| ---------------------- | ------- |
| DAA                    | 27      |
| CPL                    | 2F      |
| NEG (two’s complement) | ED 44   |
| CCF                    | 3F      |
| SCF                    | 37      |

DAA qo‘shish va ayirishdan keyin BCD qiymatni moslaydi. N flag oxirgi arithmetic amal ayirish bo‘lsa set qilinadi. NEG Accumulator ning two’s complement qiymatini hosil qiladi. Reset Carry alohida instruction emas; masalan Accumulator ni o‘zi bilan AND qilish mumkin. Tavsiflar 172-sahifadan boshlanadi.

16-bit arithmetic besh guruhdan iborat. ADC va SBC barcha flaglarga ta’sir qiladi, manzil hisoblashni soddalashtiradi. Tavsiflar 187-sahifadan boshlanadi.

**Table 13. 16-Bit Arithmetic**

| Instruction | BC    | DE    | HL    | SP    | IX    | IY    |
| ----------- | ----- | ----- | ----- | ----- | ----- | ----- |
| ADD HL      | 09    | 19    | 29    | 39    |       |       |
| ADD IX      | DD 09 | DD 19 |       | DD 39 | DD 29 |       |
| ADD IY      | FD 09 | FD 19 |       | FD 39 |       | FD 29 |
| ADC HL      | ED 4A | ED 5A | ED 6A | ED 7A |       |       |
| SBC HL      | ED 42 | ED 52 | ED 62 | ED 72 |       |       |
| INC         | 03    | 13    | 23    | 33    | DD 23 | FD 23 |
| DEC         | 0B    | 1B    | 2B    | 3B    | DD 2B | FD 2B |

## Rotate and Shift

Z80 Accumulator, umumiy maqsadli register yoki xotira qiymatini rotate yoki shift qiladi. Arithmetic va logical shift integer multiplication va division kabi amallarda foydali. RRD va RLD Accumulator dagi digitni HL ko‘rsatgan xotiradagi ikki digit bilan aylantiradi va BCD arithmetic ni samarali qiladi. Tavsiflar 204-sahifadan boshlanadi.

![CleanShot 2026-11-25 at 13.53.52.png](<../../assets/ab9e8606-224a-437e-8e75-73f9f8a0b933-CleanShot-2026-11-25-at-13-53-52.png>)

## Bit Manipulation

Register yoki xotiradagi alohida bitlarni set, reset va test qilish deyarli har bir dasturda kerak. Ular software flag, tashqi boshqaruv holati yoki zich joylangan ma’lumot bo‘lishi mumkin. Z80 bitta instruction bilan Accumulator, umumiy maqsadli register yoki xotiradagi istalgan bitni boshqaradi. Table 14 240 instructionni ko‘rsatadi.

**Table 14. Bit Manipulation Group (davom sahifalari bilan)**

| Instruction | Bit | A     | B     | C     | D     | E     | H     | L     | (HL)  | (IX+d)     | (IY+d)     |
| ----------- | --- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ---------- | ---------- |
| BIT         | 0   | CB 47 | CB 40 | CB 41 | CB 42 | CB 43 | CB 44 | CB 45 | CB 46 | DD CB d 46 | FD CB d 46 |
| BIT         | 1   | CB 4F | CB 48 | CB 49 | CB 4A | CB 4B | CB 4C | CB 4D | CB 4E | DD CB d 4E | FD CB d 4E |
| BIT         | 2   | CB 57 | CB 50 | CB 51 | CB 52 | CB 53 | CB 54 | CB 55 | CB 56 | DD CB d 56 | FD CB d 56 |
| BIT         | 3   | CB 5F | CB 58 | CB 59 | CB 5A | CB 5B | CB 5C | CB 5D | CB 5E | DD CB d 5E | FD CB d 5E |
| BIT         | 4   | CB 67 | CB 60 | CB 61 | CB 62 | CB 63 | CB 64 | CB 65 | CB 66 | DD CB d 66 | FD CB d 66 |
| BIT         | 5   | CB 6F | CB 68 | CB 69 | CB 6A | CB 6B | CB 6C | CB 6D | CB 6E | DD CB d 6E | FD CB d 6E |
| BIT         | 6   | CB 77 | CB 70 | CB 71 | CB 72 | CB 73 | CB 74 | CB 75 | CB 76 | DD CB d 76 | FD CB d 76 |
| BIT         | 7   | CB 7F | CB 78 | CB 79 | CB 7A | CB 7B | CB 7C | CB 7D | CB 7E | DD CB d 7E | FD CB d 7E |
| RES         | 0   | CB 87 | CB 80 | CB 81 | CB 82 | CB 83 | CB 84 | CB 85 | CB 86 | DD CB d 86 | FD CB d 86 |
| RES         | 1   | CB 8F | CB 88 | CB 89 | CB 8A | CB 8B | CB 8C | CB 8D | CB 8E | DD CB d 8E | FD CB d 8E |
| RES         | 2   | CB 97 | CB 90 | CB 91 | CB 92 | CB 93 | CB 94 | CB 95 | CB 96 | DD CB d 96 | FD CB d 96 |
| RES         | 3   | CB 9F | CB 98 | CB 99 | CB 9A | CB 9B | CB 9C | CB 9D | CB 9E | DD CB d 9E | FD CB d 9E |
| RES         | 4   | CB A7 | CB A0 | CB A1 | CB A2 | CB A3 | CB A4 | CB A5 | CB A6 | DD CB d A6 | FD CB d A6 |
| RES         | 5   | CB AF | CB A8 | CB A9 | CB AA | CB AB | CB AC | CB AD | CB AE | DD CB d AE | FD CB d AE |
| RES         | 6   | CB B7 | CB B0 | CB B1 | CB B2 | CB B3 | CB B4 | CB B5 | CB B6 | DD CB d B6 | FD CB d B6 |
| RES         | 7   | CB BF | CB B8 | CB B9 | CB BA | CB BB | CB BC | CB BD | CB BE | DD CB d BE | FD CB d BE |
| SET         | 0   | CB C7 | CB C0 | CB C1 | CB C2 | CB C3 | CB C4 | CB C5 | CB C6 | DD CB d C6 | FD CB d C6 |
| SET         | 1   | CB CF | CB C8 | CB C9 | CB CA | CB CB | CB CC | CB CD | CB CE | DD CB d CE | FD CB d CE |
| SET         | 2   | CB D7 | CB D0 | CB D1 | CB D2 | CB D3 | CB D4 | CB D5 | CB D6 | DD CB d D6 | FD CB d D6 |
| SET         | 3   | CB DF | CB D8 | CB D9 | CB DA | CB DB | CB DC | CB DD | CB DE | DD CB d DE | FD CB d DE |
| SET         | 4   | CB E7 | CB E0 | CB E1 | CB E2 | CB E3 | CB E4 | CB E5 | CB E6 | DD CB d E6 | FD CB d E6 |
| SET         | 5   | CB EF | CB E8 | CB E9 | CB EA | CB EB | CB EC | CB ED | CB EE | DD CB d EE | FD CB d EE |
| SET         | 6   | CB F7 | CB F0 | CB F1 | CB F2 | CB F3 | CB F4 | CB F5 | CB F6 | DD CB d F6 | FD CB d F6 |
| SET         | 7   | CB FF | CB F8 | CB F9 | CB FA | CB FB | CB FC | CB FD | CB FE | DD CB d FE | FD CB d FE |

Register Addressing Accumulator yoki umumiy maqsadli registerlarni tanlaydi. Register Indirect va Indexed Addressing tashqi xotira uchun ishlatiladi. BIT tekshirilgan bit 0 bo‘lsa Zero flagni set qiladi. Tavsiflar 242-sahifadan boshlanadi.

## Jump, Call, and Return

Table 15 barcha jump, call va return instructionlarini ko‘rsatadi. Jump Program Counter ga Extended, Relative yoki Register Indirect orqali 16-bit qiymat yuklaydi. Conditional jump sharti Flag Register ga bog‘liq; bajarilmasa keyingi instruction ishlaydi. Extended Addressing istalgan manzilga o‘tadi, uch byte talab qiladi: avval quyi, keyin yuqori manzil byte i. Misol: `3E32h` manziliga unconditional jump.

![CleanShot 2026-11-25 at 13.54.22.png](<../../assets/00af3fe4-a353-44db-89a8-d7f1cebc8e90-CleanShot-2026-11-25-at-13-54-22.png>)

Relative Jump ikki byte; ikkinchisi signed two’s complement displacement. Opcode manzilidan −126 dan +129 gacha o‘tish mumkin. Jump tavsiflari 261-sahifadan boshlanadi. Register Indirect jump HL, IX yoki IY ni bevosita Program Counter ga yuklaydi va hisoblangan manzilga o‘tadi.

CALL jump dan oldin keyingi instruction manzilini stack ga yozadi. Return stack tepasidagi qiymatni Program Counter ga yuklaydi.

**Table 15. Jump, Call, and Return Group**

| Instruction | Unconditional | C      | NC     | Z      | NZ     | PE     | PO     | M      | P      |
| ----------- | ------------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| JP nn       | C3 n n        | DA n n | D2 n n | CA n n | C2 n n | EA n n | E2 n n | FA n n | F2 n n |
| JR e        | 18 e–2        | 38 e–2 | 30 e–2 | 28 e–2 | 20 e–2 |        |        |        |        |
| CALL nn     | CD n n        | DC n n | D4 n n | CC n n | C4 n n | EC n n | E4 n n | FC n n | F4 n n |
| RET         | C9            | D8     | D0     | C8     | C0     | E8     | E0     | F8     | F0     |

| Instruction | Op Code / Condition |
| ----------- | ------------------- |
| JP (HL)     | E9 |
| JP (IX)     | DD E9               |
| JP (IY)     | FD E9               |
| DJNZ e      | 10 e–2; B ≠ 0       |
| RETI        | ED 4D               |
| RETN        | ED 45               |

CALL va RETURN subroutine hamda interrupt handling ni soddalashtiradi. RETI va RETN stackdan PC ni tiklaydi va IFF2 qiymatini IFF1 ga ko‘chiradi; oddiy RET esa IFF1 ni o‘zgartirmaydi. RETI interrupt routine oxirida ishlatilganda Z80 peripheral chiplar uni taniydi va nested priority interrupt handling ni boshqaradi. Aks holda quyidagi software ketma-ketligi kerak:

```asm
DI ; Routine tugashidan oldin maskable interruptni o‘chirish
LD A, n ; Peripheral ga routine tugaganini bildirish
OUT (n), A
EI
RET
```

Yetti byte li ketma-ketlik bir byte EI va ikki byte RETI bilan almashtiriladi. Bu interrupt service vaqtini kamaytiradi.

DJNZ loop boshqaruvi uchun B ni decrement qiladi va B nol bo‘lmasa relative jump bajaradi. Displacement signed two’s complement.

**Table 16. Example Usage of the DJNZ Instruction**

| Address    | Instruction                  | Comments                                 |
| ---------- | ---------------------------- | ---------------------------------------- |
| N, N+1     | LD B, 7                      | B ni 7 ga o‘rnatish                      |
| N+2 … N+9  | Instructionlar ketma-ketligi | 7 marta takrorlash                       |
| N+10, N+11 | DJNZ N+2                     | N+12 dan N+2 ga o‘tish; displacement −10 (F6h) |
| N+12       | Keyingi instruction          |                                          |

Restart sakkiz manzildan biriga bir byte li CALL bo‘lib, tez-tez ishlatiladigan routine lar uchun xotirani tejaydi. Call and Return tavsiflari 280-sahifadan boshlanadi.

**Table 17. Restart Group**

| CALL Address | Op Code | Mnemonic |
| ------------ | ------- | -------- |
| 0000h        | C7      | RST 0    |
| 0008h        | CF      | RST 8    |
| 0010h        | D7      | RST 16   |
| 0018h        | DF      | RST 24   |
| 0020h        | E7      | RST 32   |
| 0028h        | EF      | RST 40   |
| 0030h        | F7      | RST 48   |
| 0038h        | FF      | RST 56   |

## Input/Output

Table 18 va 19 input/output instructionlarini ko‘rsatadi. I/O qurilmasi absolute yoki C registeri orqali Register Indirect usulda manzillanadi. Register Indirect usulida I/O va ichki registerlar orasida transfer bajariladi. Sakkiz block transfer instructioni HL ni xotira source (output) yoki destination (input) pointeri, B ni byte counter, C ni port manzili sifatida ishlatadi. B sakkiz bit bo‘lgani uchun takrorlanuvchi block I/O instructionlari 256 byte gacha uzatadi (boshlang‘ich B = 0 bo‘lsa 256 byte).

IN A, (n) va OUT (n), A instructionlarida portning n manzili address bus quyi A7–A0 bitlarida, Accumulator qiymati yuqori bitlarda beriladi. Register Indirect I/O da C quyi, B yuqori address bus ga uzatiladi. Block inputda B ning decrementdan oldingi, block outputda esa decrementdan keyingi qiymati yuqori address busga uzatiladi.

**Table 18. Input Group**

| Instruction | Op Code / Description                         |
| ----------- | --------------------------------------------- |
| IN A, (n)   | DB n                                          |
| IN A, (C)   | ED 78 |
| IN B, (C)   | ED 40                                         |
| IN C, (C)   | ED 48                                         |
| IN D, (C)   | ED 50                                         |
| IN E, (C)   | ED 58                                         |
| IN H, (C)   | ED 60                                         |
| IN L, (C)   | ED 68                                         |
| INI         | ED A2; Inc HL, Dec B                          |
| INIR        | ED B2; Inc HL, Dec B; B ≠ 0 bo‘lsa takrorlash |
| IND         | ED AA; Dec HL, Dec B                          |
| INDR        | ED BA; Dec HL, Dec B; B ≠ 0 bo‘lsa takrorlash |

**Table 19. Output Group**

| Instruction | Op Code / Description                     |
| ----------- | ----------------------------------------- |
| OUT (n), A  | D3 n                                      |
| OUT (C), A  | ED 79                                     |
| OUT (C), B  | ED 41                                     |
| OUT (C), C  | ED 49                                     |
| OUT (C), D  | ED 51                                     |
| OUT (C), E  | ED 59                                     |
| OUT (C), H  | ED 61                                     |
| OUT (C), L  | ED 69                                     |
| OUTI        | ED A3; Inc HL, Dec B                      |
| OTIR        | ED B3; Inc HL, Dec B; B ≠ 0 bo‘lsa takrorlash     |
| OUTD        | ED AB; Dec HL, B                          |
| OTDR        | ED BB; Dec HL, B; B ≠ 0 bo‘lsa takrorlash |

Input and Output Group tavsiflari 294-sahifadan boshlanadi.

## CPU Control Group

Table 20 umumiy CPU control instructionlarini ko‘rsatadi. HALT qabul qilinadigan interrupt yoki RESET kelguncha instruction bajarilishini to‘xtatadi; refresh cycle davom etadi. DI va EI maskable interruptni o‘chiradi va yoqadi. EI dan keyingi instruction tugamaguncha maskable interrupt qabul qilinmaydi. Uch interrupt mode instructioni mavjud. NOP hech qanday amal bajarmaydi.

Mode 0 da interrupt yuborgan qurilma data bus ga instruction joylaydi va CPU uni bajaradi. Mode 1 da CPU avtomatik `RST 0038h` bajaradi, eski Program Counter stack ga yoziladi; tashqi hardware talab qilinmaydi. Mode 2 indirect CALL orqali istalgan xotira manziliga o‘tadi. CPU 16-bit pointer hosil qiladi: yuqori sakkiz bit I registeridan, quyi sakkiz bit interrupt qurilmasidan olinadi. Pointer service routine manzili saqlangan jadvaldagi ketma-ket ikki byte ning birinchisiga ko‘rsatadi. CPU manzilni avtomatik olib CALL bajaradi.

**Table 20. Miscellaneous CPU Control**

| Instruction | Op Code | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| NOP         | 00      | Amal yo‘q                                                    |
| HALT        | 76      | Interrupt kutish                                             |
| DI          | F3      | INT ni o‘chirish                                             |
| EI          | FB      | INT ni yoqish                                                |
| IM 0        | ED 46   | 8080A mode                                                   |
| IM 1        | ED 56   | 0038h manziliga CALL                                         |
| IM 2        | ED 5E   | I registeri va peripheral bergan bitlar orqali indirect CALL |

![CleanShot 2026-11-25 at 13.54.59.png](<../../assets/36d72857-2f7f-4e85-bf3c-7fdd2831a868-CleanShot-2026-11-25-at-13-54-59.png>)

## Manba bo‘yicha eslatma

Manba HTML jadval kataklarini birlashtirib yuborgan va ayrim belgilar buzilgan. Table 6, 11 va 14 opcode matritsalari takrorlanuvchi bit pattern asosida qayta tuzildi; ayrim mnemonic va register nomlari ham kontekstdan tiklandi. Bu tiklangan qiymatlar asl HTML bilan byte-for-byte bir xil emas. Aniqlangan opcode va tavsif xatolari tuzatildi. Mavjud relative asset havolalari saqlandi; rasmlarning ichki mazmuni tekshirilmadi. Asl soyali kataklar haqidagi ma’lumot HTML da saqlanmagan. Bu bo‘lim individual instruction tavsiflari emas, umumiy instruction guruhlari bo‘limidir.
