---
name: Z80 Status Indicator Flags
status: active
pinned: false
deleted: false
tags:
  - z80
  - flags
  - registers
---

# Z80 Status Indicator Flags

F va F' Flag registerlari foydalanuvchiga Z80 CPU ning muayyan paytdagi holati haqida ma’lumot beradi. Har bir flagning bit o‘rni 21-jadvalda, belgilarining ta’rifi esa 22-jadvalda keltirilgan.

## Mundarija

- [Flag Register bit o‘rinlari](#flag-register-bit-orinlari)
- [Flag ta’riflari](#flag-tariflari)
- [Carry Flag](#carry-flag)
- [Add/Subtract Flag](#addsubtract-flag)
- [Decimal Adjust Accumulator Flag](#decimal-adjust-accumulator-flag)
- [Parity/Overflow Flag](#parityoverflow-flag)
- [Half Carry Flag](#half-carry-flag)
- [Zero Flag](#zero-flag)
- [Sign Flag](#sign-flag)
- [Z80 Instruction Description](#z80-instruction-description)

## Flag Register bit o‘rinlari

**21-jadval. Flag Register bit o‘rinlari**

Bitlar chapdan o‘ngga bit 7 dan bit 0 gacha berilgan.

|  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Bit | `7` | `6` | `5` | `4` | `3` | `2` | `1` | `0` |
| Position | `S` | `Z` | `X` | `H` | `X` | `P/V` | `N` | `C` |

Ushbu ikkita Flag registerning har biri CPU operationlari tomonidan set yoki clear qilinadigan olti bit status ma’lumotini saqlaydi. Manbaga ko‘ra, bit 3 va bit 5 ishlatilmaydi. To‘rtta bit — C, P/V, Z va S — conditional JUMP, CALL yoki RETURN instructionlarida tekshirilishi mumkin. H va N flaglarini bunday tekshirib bo‘lmaydi; ular BCD arithmetic uchun ishlatiladi.

## Flag ta’riflari

**22-jadval. Flag ta’riflari**

Ustunlar tartibi: symbol; field name. Texnik nomlar asl holida saqlandi.

|  |  |
| --- | --- |
| `C` | Carry Flag |
| `N` | Add/Subtract |
| `P/V` | Parity/Overflow Flag |
| `H` | Half Carry Flag |
| `Z` | Zero Flag |
| `S` | Sign Flag |
| `X` | Ishlatilmaydi |

## Carry Flag

Carry Flag (C) bajarilayotgan operationga qarab set yoki clear qilinadi. Carry hosil qiladigan ADD instructionlari va Borrow hosil qiladigan SUB instructionlari Carry Flagni set qiladi. Carry hosil qilmaydigan ADD hamda Borrow hosil qilmaydigan SUB instructionlari uni reset qiladi. Saqlangan Carry extended precision arithmetic uchun software routinelarni amalga oshirishni osonlashtiradi. Bundan tashqari, decimal adjustment shartlari bajarilsa, DAA instruction Carry Flagni set qiladi.

RLA, RRA, RLS va RRS instructionlarida Carry bit istalgan register yoki memory location uchun least-significant byte (LSB) va most-significant byte (MSB) orasidagi bog‘lovchi sifatida ishlatiladi. RLCA, RLC va SLA instructionlarida Carry flag register yoki memory locationning bit 7 qismidan shift qilib chiqarilgan yakuniy qiymatni saqlaydi. RRCA, RRC, SRA va SRL instructionlarida esa bit 0 dan shift qilib chiqarilgan yakuniy qiymatni saqlaydi.

Logical AND, OR va XOR instructionlarida Carry flag reset qilinadi.

Carry flag Set Carry Flag (SCF) instruction orqali ham set qilinishi va manbada Compliment Carry Flag (CCF) deb atalgan instruction orqali complement qilinishi mumkin.

Manba izohi: RLS va RRS instruction nomlari hamda “Compliment Carry Flag” yozuvi manbadagidek saqlandi.

## Add/Subtract Flag

Decimal Adjust Accumulator (DAA) instruction Add/Subtract Flag (N) yordamida ADD va SUB instructionlarini farqlaydi. ADD instructionlari uchun N 0 ga clear qilinadi. SUB instructionlari uchun N 1 ga set qilinadi.

## Decimal Adjust Accumulator Flag

Decimal Adjust Accumulator (DAA) instruction ushbu flag yordamida ADD va SUBTRACT instructionlarini farqlaydi. Barcha ADD instructionlari uchun N 0 ga, barcha SUBTRACT instructionlari uchun esa 1 ga o‘rnatiladi.

## Parity/Overflow Flag

Parity/Overflow (P/V) Flag bajarilayotgan operationga qarab muayyan holatga o‘rnatiladi. Arithmetic operationlarda Accumulatordagi natija mumkin bo‘lgan eng katta son (+127) dan katta yoki eng kichik son (−128) dan kichik bo‘lsa, bu flag overflow holatini bildiradi. Overflow operandlarning sign bitlarini tekshirish orqali aniqlanadi.

Additionda signlari turlicha operandlar hech qachon overflow hosil qilmaydi. Signlari bir xil operandlar qo‘shilganda natijaning signi ularnikidan farq qilsa, Overflow Flag set qilinadi.

### Addition misoli

Ustunlar tartibi: operand yoki natijaning roli; decimal qiymat; binary ko‘rinishi.

|  |  |  |
| --- | --- | --- |
| ADDEND | `+120` | `01111000` |
| AUGEND | `+105` | `01101001` |
| SUM | `+225` | `11100001` (manbada `−95`) |

Ikki son qo‘shilganda +127 dan katta natija hosil bo‘ladi. Ikki musbat operandning natijasi manbada manfiy son (−95) sifatida ko‘rsatilgan va bu noto‘g‘ri natija deb izohlangan. Shuning uchun Overflow Flag set qilinadi.

Manba izohi: manbada `11100001` uchun `−95` yozilgan. Ushbu 8-bit two’s complement qiymat aslida −31 ga teng; manbadagi `−95` yozuvi ham saqlandi.

### Subtraction misoli

Subtractionda signlari turlicha operandlar uchun overflow yuz berishi mumkin. Signlari bir xil operandlar hech qachon overflow hosil qilmaydi.

Ustunlar tartibi: operand yoki natijaning roli; decimal qiymat yoki operation; binary ko‘rinishi.

|  |  |  |
| --- | --- | --- |
| MINUEND | `+127` | `01111111` |
| SUBTRAHEND | `(−) −64` | `11000000` |
| DIFFERENCE | `+191` | `10111111` |

Minuendning signi musbatdan manfiyga o‘zgarib, noto‘g‘ri difference hosil bo‘lgan; Overflow Flag set qilinadi.

### Overflow va parityni aniqlash

Overflowni aniqlashning yana bir usuli — sign bitga kiradigan va undan chiqadigan Carry qiymatlarini kuzatish. Carry in mavjud bo‘lib, Carry out bo‘lmasa yoki Carry in bo‘lmay, Carry out mavjud bo‘lsa, overflow yuz bergan bo‘ladi.

Ushbu flag logical operationlar va rotate instructionlarida natijaning even parity holatini ko‘rsatish uchun ham ishlatiladi. Byte ichidagi 1 bitlar soni hisoblanadi. Ularning soni odd bo‘lsa, ODD parity belgilanadi (`P = 0`). Soni even bo‘lsa, even parity belgilanadi (`P = 1`).

CPI, CPIR, CPD va CPDR search instructionlari hamda LDI, LDIR, LDD va LDDR block transfer instructionlari davomida P/V Flag Byte Count (BC) register holatini kuzatadi. Byte counter birga kamaytirilganda uning qiymati 0 ga yetsa, flag 0 ga clear qilinadi; aks holda 1 ga set qilinadi.

`LD A, I` va `LD A, R` instructionlari davomida saqlash yoki tekshirish uchun interrupt enable flip-flop (IFF2) qiymati P/V Flagga ko‘chiriladi.

`IN r, (C)` instruction orqali I/O devicedan byte input qilinganda, P/V Flag ma’lumot paritysini ko‘rsatadigan holatga o‘rnatiladi.

## Half Carry Flag

Half Carry Flag (H) 8-bit arithmetic operationning bit 3 va bit 4 qismlari orasidagi Carry va Borrow holatiga qarab set (1) yoki clear (0) qilinadi. Decimal Adjust Accumulator (DAA) instruction ushbu flagdan packed BCD add yoki subtract operation natijasini tuzatish uchun foydalanadi. H Flag 23-jadvalga muvofiq set yoki clear qilinadi.

**23-jadval. Half Carry Flag add/subtract operationlari**

Ustunlar tartibi: H Flag; Add; Subtract.

|  |  |  |
| --- | --- | --- |
| `1` | Bit 3 dan bit 4 ga Carry yuz beradi. | Bit 4 dan Borrow yuz beradi. |
| `0` | Bit 3 dan bit 4 ga Carry yuz bermaydi. | Bit 4 dan Borrow yuz bermaydi. |

## Zero Flag

Zero Flag (Z) ayrim instructionlar bajarilishidan hosil bo‘lgan natijaga qarab set (1) yoki clear (0) qilinadi.

8-bit arithmetic va logical operationlarda Accumulatordagi natija byte i 0 bo‘lsa, Z flag 1 ga set qilinadi. Byte 0 bo‘lmasa, Z flag 0 ga reset qilinadi.

Compare (search) instructionlarida Accumulatordagi qiymat HL register pair ko‘rsatgan memory locationdagi qiymatga teng bo‘lsa, Z flag 1 ga set qilinadi.

Register yoki memory locationdagi bit tekshirilganda, Z flag tekshirilayotgan bitning complement holatini saqlaydi. Batafsil ma’lumot uchun manbaning 242-sahifasidagi Bit Set, Reset, and Test Group bo‘limida `Bit b, r` instructionga qarang.

INI, IND, OUTI yoki OUTD instructionlari orqali memory location va I/O device orasida byte input yoki output qilinganda, B registerni birga kamaytirish natijasi 0 bo‘lsa, Z flag 1 bo‘ladi; aks holda 0 bo‘ladi. Bundan tashqari, `IN r, (C)` orqali I/O devicedan byte input qilinganda, Z flag input byte 0 ekanini ko‘rsatish uchun set qilinadi.

## Sign Flag

Sign Flag (S) Accumulatorning most-significant biti — bit 7 — holatini saqlaydi. Z80 CPU signed sonlar ustida arithmetic operationlar bajarganda, sonlarni ifodalash va qayta ishlash uchun binary two’s complement notation ishlatiladi. Bit 7 qiymati 0 bo‘lsa, son musbat; 1 bo‘lsa, manfiy hisoblanadi. Musbat son qiymatining binary ekvivalenti bit 0–6 da saqlanadi; umumiy oraliq 0 dan 127 gacha. Manfiy son tegishli musbat sonning two’s complement qiymati orqali ifodalanadi. Manfiy sonlar oralig‘i −1 dan −128 gacha.

`IN r, (C)` instruction orqali I/O devicedan registerga byte input qilinganda, S Flag ma’lumotning musbat (`S = 0`) yoki manfiy (`S = 1`) ekanini ko‘rsatadi.

## Z80 Instruction Description

Har bir instructionning execution time (E.T.) qiymati 4 MHz clock uchun microsecond hisobida beriladi. Jami machine cyclelar (M) umumiy clock periodlar, ya’ni T States bilan birga ko‘rsatiladi. Har bir M cycle uchun T States soni ham quyidagi misoldagidek beriladi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 2 | 7 (4, 3) | 1.75 |

Ushbu misolda instruction ikkita machine cycledan iborat. Birinchi cycle to‘rtta clock period/T State, ikkinchisi uchta clock period davom etadi; jami yettita clock period/T State hosil bo‘ladi. Instruction 1.75 microsecondda bajariladi.

Keyingi instructionlarning register formatlarida most-significant bit chapda, least-significant bit esa o‘ngda ko‘rsatiladi.
