---
name: Exchange, Block Transfer, and Search Group
status: active
pinned: false
deleted: false
tags:
    - z80
    - exchange
    - block transfer
    - search
---

# Exchange, Block Transfer, and Search Group

Ushbu bo‘limda quyidagi exchange, block transfer va search group instructionlari tavsiflanadi. Batafsil ma’lumot olish uchun mundarijadagi tegishli instruction havolasini bosing.

## Mundarija

- [EX DE, HL](#ex-de-hl)
- [EX AF, AF′](#ex-af-af)
- [EXX](#exx)
- [EX (SP), HL](#ex-sp-hl)
- [EX (SP), IX](#ex-sp-ix)
- [EX (SP), IY](#ex-sp-iy)
- [LDI](#ldi)
- [LDIR](#ldir)
- [LDD](#ldd)
- [LDDR](#lddr)
- [CPI](#cpi)
- [CPIR](#cpir)
- [CPD](#cpd)
- [CPDR](#cpdr)

Bitlar chapdan o‘ngga bit 7 dan bit 0 gacha, byte lar esa yuqoridan pastga ketma-ket berilgan. Har bir qatordagi birinchi qiymat — byte tartib raqami, oxirgi qiymat — hex code.

## EX DE, HL

### Operation

`DE ↔ HL`

### Op Code

`EX`

### Operands

`DE, HL`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |

| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

| 1   | `1` | `1` | `1` | `0` | `1` | `0` | `1` | `1` | `EB` |

### Description

DE va HL register pairlarning 2-byte tarkibi o‘zaro almashtiriladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |

| -------- | -------- | --------------- |

| 1        | 4        | 1.00            |

### Misol

DE register pairda 2822h va HL register pairda 499Ah bo‘lsa, `EX DE, HL` bajarilgach, DE register pairda 499Ah, HL register pairda esa 2822h bo‘ladi.

## EX AF, AF′

### Operation

`AF ↔ AF'`

### Op Code

`EX`

### Operands

`AF, AF′`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |

| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

| 1   | `0` | `0` | `0` | `0` | `1` | `0` | `0` | `0` | `08` |

### Description

AF va AF′ register pairlarning 2-byte tarkibi o‘zaro almashtiriladi. AF′ register pair A′ va F′ registerlardan tashkil topadi.

### Condition Bits Affected

F va F′ registerlari o‘zaro almashtiriladi; faol flaglar qiymati o‘zgarishi mumkin.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |

| -------- | -------- | --------------- |

| 1        | 4        | 1.00            |

### Misol

AF register pairda 9900h va AF′ register pairda 5944h bo‘lsa, `EX AF, AF′` bajarilgach, AF da 5944h, AF′ da esa 9900h bo‘ladi.

## EXX

### Operation

`BC ↔ BC′, DE ↔ DE′, HL ↔ HL′`

### Op Code

`EXX`

### Operands

Yo‘q.

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |

| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

| 1   | `1` | `1` | `0` | `1` | `1` | `0` | `0` | `1` | `D9` |

### Description

BC, DE va HL register pairlardagi har bir 2-byte qiymat mos ravishda BC', DE' va HL' dagi 2-byte qiymat bilan o‘zaro almashtiriladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |

| -------- | -------- | --------------- |

| 1        | 4        | 1.00            |

### Misol

BC, DE va HL register pairlarda mos ravishda 445Ah, 3DA2h va 8859h, BC′, DE′ va HL′ register pairlarda esa mos ravishda 0988h, 9300h va 00E7h bo‘lsin. `EXX` bajarilgach, qiymatlar quyidagicha bo‘ladi:

| Register / Address | Qiymat |

| --- | --- |

| `BC`  | `0988h` |

| `DE`  | `9300h` |

| `HL`  | `00E7h` |

| `BC′` | `445Ah` |

| `DE′` | `3DA2h` |

| `HL′` | `8859h` |

## EX (SP), HL

### Operation

`H ↔ (SP+1), L ↔ (SP)`

### Op Code

`EX`

### Operands

`(SP), HL`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |

| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

| 1   | `1` | `1` | `1` | `0` | `0` | `0` | `1` | `1` | `E3` |

### Description

HL register pairning low-order byte qiymati SP (Stack Pointer) register pair ko‘rsatgan memory address tarkibi bilan, HL ning high-order byte qiymati esa keyingi yuqori memory address (SP+1) tarkibi bilan o‘zaro almashtiriladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States           | 4 MHz E.T. (µs) |

| -------- | ------------------ | --------------- |

| 5        | 19 (4, 3, 4, 3, 5) | 4.75            |

### Misol

HL register pairda 7012h, SP register pairda 8856h, 8856h memory locationda 11h va 8857h memory locationda 22h bo‘lsin. `EX (SP), HL` bajarilgach, HL register pairda 2211h, 8856h memory locationda 12h, 8857h memory locationda 70h, Stack Pointerda esa 8856h bo‘ladi.

## EX (SP), IX

### Operation

`IXH ↔ (SP+1), IXL ↔ (SP)`

### Op Code

`EX`

### Operands

`(SP), IX`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |

| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

| 1   | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` |

| 2   | `1` | `1` | `1` | `0` | `0` | `0` | `1` | `1` | `E3` |

### Description

Index Register IX ning low-order byte qiymati SP (Stack Pointer) register pair ko‘rsatgan memory address tarkibi bilan, IX ning high-order byte qiymati esa keyingi yuqori memory address (SP+1) tarkibi bilan o‘zaro almashtiriladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States              | 4 MHz E.T. (µs) |

| -------- | --------------------- | --------------- |

| 6        | 23 (4, 4, 3, 4, 3, 5) | 5.75            |

### Misol

Index Register IX da 3988h, SP register pairda 0100h, 0100h memory locationda 90h va 0101h memory locationda 48h bo‘lsin. `EX (SP), IX` bajarilgach, IX da 4890h, 0100h memory locationda 88h, 0101h memory locationda 39h, Stack Pointerda esa 0100h bo‘ladi.

## EX (SP), IY

### Operation

`IYH ↔ (SP+1), IYL ↔ (SP)`

### Op Code

`EX`

### Operands

`(SP), IY`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |

| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

| 1   | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` |

| 2   | `1` | `1` | `1` | `0` | `0` | `0` | `1` | `1` | `E3` |

### Description

Index Register IY ning low-order byte qiymati SP (Stack Pointer) register pair ko‘rsatgan memory address tarkibi bilan, IY ning high-order byte qiymati esa keyingi yuqori memory address (SP+1) tarkibi bilan o‘zaro almashtiriladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States              | 4 MHz E.T. (µs) |

| -------- | --------------------- | --------------- |

| 6        | 23 (4, 4, 3, 4, 3, 5) | 5.75            |

### Misol

Index Register IY da 3988h, SP register pairda 0100h, 0100h memory locationda 90h va 0101h memory locationda 48h bo‘lsin. `EX (SP), IY` bajarilgach, IY da 4890h, 0100h memory locationda 88h, 0101h memory locationda 39h, Stack Pointerda esa 0100h bo‘ladi.

## LDI

### Operation

`(DE) ← (HL), DE ← DE + 1, HL ← HL + 1, BC ← BC – 1`

### Op Code

`LDI`

### Operands

Yo‘q.

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |

| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` |

| 2   | `1` | `0` | `1` | `0` | `0` | `0` | `0` | `0` | `A0` |

### Description

HL register pair ko‘rsatgan memory locationdan bir byte ma’lumot DE register pair ko‘rsatgan memory locationga ko‘chiriladi. Keyin ikkala register pair birga oshiriladi, Byte Counter (BC) register pair esa birga kamaytiriladi.

### Condition Bits Affected

S o‘zgarmaydi. Z o‘zgarmaydi. H reset qilinadi. Kamaytirilgan BC ≠ 0 bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |

| -------- | --------------- | --------------- |

| 4        | 16 (4, 4, 3, 5) | 4.00            |

### Misol

HL register pairda 1111h, 1111h memory locationda 88h, DE register pairda 2222h, 2222h memory locationda 66h va BC register pairda 7h bo‘lsin. `LDI` bajarilgach, register pairlar va memory addresslardagi qiymatlar quyidagicha bo‘ladi:

| Register / Address | Qiymat |

| --- | --- |

| `HL`      | `1112h` |

| `(1111h)` | `88h`   |

| `DE`      | `2223h` |

| `(2222h)` | `88h`   |

| `BC`      | `6h`    |

## LDIR

### Operation

`repeat {(DE) ← (HL), DE ← DE + 1, HL ← HL + 1, BC ← BC – 1} while (BC ≠ 0)`

### Op Code

`LDIR`

### Operands

Yo‘q.

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |

| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` |

| 2   | `1` | `0` | `1` | `1` | `0` | `0` | `0` | `0` | `B0` |

### Description

Ushbu 2-byte instruction HL register pair ko‘rsatgan memory locationdan bir byte ma’lumotni DE register pair ko‘rsatgan memory locationga ko‘chiradi. Ikkala register pair birga oshiriladi, Byte Counter (BC) register pair esa birga kamaytiriladi. Kamaytirish natijasida BC 0 ga teng bo‘lsa, instruction tugaydi. BC 0 ga teng bo‘lmasa, program counter ikkiga kamaytiriladi va instruction takrorlanadi. Har bir ma’lumot ko‘chirishdan keyin interruptlar tan olinadi va ikkita refresh cycle bajariladi. Instruction bajarilishidan oldin BC 0 ga o‘rnatilgan bo‘lsa, instruction 64 KB bo‘ylab takrorlanadi.

### Condition Bits Affected

S o‘zgarmaydi. Z o‘zgarmaydi. H reset qilinadi. Kamaytirilgan BC ≠ 0 bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C o‘zgarmaydi.

### Timing

Kamaytirilgan BC ≠ 0 bo‘lganda:

| M Cycles | T States           | 4 MHz E.T. (µs) |

| -------- | ------------------ | --------------- |

| 5        | 21 (4, 4, 3, 5, 5) | 5.25            |

Kamaytirilgan BC = 0 bo‘lganda:

| M Cycles | T States        | 4 MHz E.T. (µs) |

| -------- | --------------- | --------------- |

| 4        | 16 (4, 4, 3, 5) | 4.00            |

### Misol

HL register pairning boshlang‘ich qiymati 1111h, DE register pairniki 2222h, BC register pairniki esa 0003h deb berilgan. Memory locationlardagi boshlang‘ich ma’lumotlar:

| Source address | Qiymat | Destination address | Qiymat |

| --- | --- | --- | --- |

| `(1111h)` | `88h` | `(2222h)` | `66h` |

| `(1112h)` | `36h` | `(2223h)` | `59h` |

| `(1113h)` | `A5h` | `(2224h)` | `C5h` |

`LDIR` bajarilgach, register pairlar va memory locationlardagi qiymatlar:

| Register / Address | Qiymat |

| --- | --- |

| `HL` | `1114h` |

| `DE` | `2225h` |

| `BC` | `0000h` |

| Source address | Qiymat | Destination address | Qiymat |

| --- | --- | --- | --- |

| `(1111h)` | `88h` | `(2222h)` | `88h` |

| `(1112h)` | `36h` | `(2223h)` | `36h` |

| `(1113h)` | `A5h` | `(2224h)` | `A5h` |

## LDD

### Operation

`(DE) ← (HL), DE ← DE – 1, HL ← HL– 1, BC ← BC– 1`

### Op Code

`LDD`

### Operands

Yo‘q.

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |

| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` |

| 2   | `1` | `0` | `1` | `0` | `1` | `0` | `0` | `0` | `A8` |

### Description

Ushbu 2-byte instruction HL register pair ko‘rsatgan memory locationdan bir byte ma’lumotni DE register pair ko‘rsatgan memory locationga ko‘chiradi. Keyin ikkala register pair ham, Byte Counter (BC) register pair ham birga kamaytiriladi.

### Condition Bits Affected

S o‘zgarmaydi. Z o‘zgarmaydi. H reset qilinadi. Kamaytirilgan BC ≠ 0 bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |

| -------- | --------------- | --------------- |

| 4        | 16 (4, 4, 3, 5) | 4.00            |

### Misol

HL register pairda 1111h, 1111h memory locationda 88h, DE register pairda 2222h, 2222h memory locationda 66h va BC register pairda 7h bo‘lsin. `LDD` bajarilgach, register pairlar va memory addresslardagi qiymatlar quyidagicha bo‘ladi:

| Register / Address | Qiymat |

| --- | --- |

| `HL`      | `1110h` |

| `(1111h)` | `88h`   |

| `DE`      | `2221h` |

| `(2222h)` | `88h`   |

| `BC`      | `6h`    |

## LDDR

### Operation

`repeat {(DE) ← (HL), DE ← DE – 1, HL ← HL – 1, BC ← BC – 1} while (BC ≠ 0)`

### Op Code

`LDDR`

### Operands

Yo‘q.

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |

| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` |

| 2   | `1` | `0` | `1` | `1` | `1` | `0` | `0` | `0` | `B8` |

### Description

Ushbu 2-byte instruction HL register pair ko‘rsatgan memory locationdan bir byte ma’lumotni DE register pair ko‘rsatgan memory locationga ko‘chiradi. Keyin ikkala register pair va BC (Byte Counter) birga kamaytiriladi. Kamaytirish natijasida BC 0 ga teng bo‘lsa, instruction tugaydi. BC 0 ga teng bo‘lmasa, program counter ikkiga kamaytiriladi va instruction takrorlanadi. Har bir ma’lumot ko‘chirishdan keyin interruptlar tan olinadi va ikkita refresh cycle bajariladi. Instruction bajarilishidan oldin BC 0 ga o‘rnatilgan bo‘lsa, instruction 64 KB bo‘ylab takrorlanadi.

### Condition Bits Affected

S o‘zgarmaydi. Z o‘zgarmaydi. H reset qilinadi. P/V kamaytirilgan BC ≠ 0 bo‘lsa set qilinadi; aks holda reset qilinadi. N reset qilinadi. C o‘zgarmaydi.

### Timing

Kamaytirilgan BC ≠ 0 bo‘lganda:

| M Cycles | T States           | 4 MHz E.T. (µs) |

| -------- | ------------------ | --------------- |

| 5        | 21 (4, 4, 3, 5, 5) | 5.25            |

Kamaytirilgan BC = 0 bo‘lganda:

| M Cycles | T States        | 4 MHz E.T. (µs) |

| -------- | --------------- | --------------- |

| 4        | 16 (4, 4, 3, 5) | 4.00            |

### Misol

HL register pairda 1114h, DE register pairda 2225h va BC register pairda 0003h bo‘lsin. Memory locationlardagi boshlang‘ich ma’lumotlar:

| Source address | Qiymat | Destination address | Qiymat |

| --- | --- | --- | --- |

| `(1114h)` | `A5h` | `(2225h)` | `C5h` |

| `(1113h)` | `36h` | `(2224h)` | `59h` |

| `(1112h)` | `88h` | `(2223h)` | `66h` |

`LDDR` bajarilgach, register pairlar va memory locationlardagi qiymatlar:

| Register / Address | Qiymat |

| --- | --- |

| `HL` | `1111h` |

| `DE` | `2222h` |

| `BC` | `0000h` |

| Source address | Qiymat | Destination address | Qiymat |

| --- | --- | --- | --- |

| `(1114h)` | `A5h` | `(2225h)` | `A5h` |

| `(1113h)` | `36h` | `(2224h)` | `36h` |

| `(1112h)` | `88h` | `(2223h)` | `88h` |

## CPI

### Operation

`A – (HL), HL ← HL +1, BC ← BC – 1`

### Op Code

`CPI`

### Operands

Yo‘q.

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |

| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` |

| 2   | `1` | `0` | `1` | `0` | `0` | `0` | `0` | `1` | `A1` |

### Description

HL register ko‘rsatgan memory location tarkibi Accumulator tarkibi bilan taqqoslanadi. Qiymatlar teng bo‘lsa, Z flag set qilinadi; aks holda reset qilinadi. Keyin HL birga oshiriladi va Byte Counter (BC register pair) birga kamaytiriladi.

### Condition Bits Affected

8-bit A – (HL) natijasining 7-biti 1 bo‘lsa, S set qilinadi; aks holda reset qilinadi. A tekshirilgan bytega teng bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 4 dan borrow bo‘lsa, H set qilinadi; aks holda reset qilinadi. Kamaytirilgan BC ≠ 0 bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N set qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |

| -------- | --------------- | --------------- |

| 4        | 16 (4, 4, 3, 5) | 4.00            |

### Misol

HL register pairda 1111h, 1111h memory locationda 3Bh, Accumulatorda 3Bh va Byte Counterda 0001h bo‘lsin. `CPI` bajarilgach, Byte Counterda 0000h, HL register pairda 1112h bo‘ladi; F registerdagi Z flag set, P/V flag esa reset qilinadi. Accumulator va 1111h address tarkibi o‘zgarmaydi.

## CPIR

### Operation

`repeat {A – (HL) → flags, HL ← HL + 1, BC ← BC – 1} while (BC ≠ 0 and Z = 0)`

### Op Code

`CPIR`

### Operands

Yo‘q.

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |

| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` |

| 2   | `1` | `0` | `1` | `1` | `0` | `0` | `0` | `1` | `B1` |

### Description

HL register pair ko‘rsatgan memory location tarkibi Accumulator tarkibi bilan taqqoslanadi. Taqqoslangan qiymatlar teng bo‘lsa Z flag set qilinadi; aks holda reset qilinadi. HL birga oshiriladi va Byte Counter (BC register pair) birga kamaytiriladi. Kamaytirish natijasida BC 0 ga teng bo‘lsa yoki Z = 1 bo‘lsa, instruction tugaydi. BC 0 ga teng bo‘lmasa va Z = 0 bo‘lsa, program counter ikkiga kamaytiriladi va instruction takrorlanadi. Har bir taqqoslashdan keyin interruptlar tan olinadi va ikkita refresh cycle bajariladi. Instruction bajarilishidan oldin BC 0 ga o‘rnatilgan bo‘lsa va mos qiymat topilmasa, instruction 64 KB bo‘ylab takrorlanadi.

### Condition Bits Affected

8-bit A – (HL) natijasining 7-biti 1 bo‘lsa, S set qilinadi; aks holda reset qilinadi. A tekshirilgan bytega teng bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 4 dan borrow bo‘lsa, H set qilinadi; aks holda reset qilinadi. Kamaytirilgan BC ≠ 0 bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N set qilinadi. C o‘zgarmaydi.

### Timing

Kamaytirilgan BC ≠ 0 va Z = 0 bo‘lganda:

| M Cycles | T States           | 4 MHz E.T. (µs) |

| -------- | ------------------ | --------------- |

| 5        | 21 (4, 4, 3, 5, 5) | 5.25            |

Kamaytirilgan BC = 0 yoki Z = 1 bo‘lganda:

| M Cycles | T States        | 4 MHz E.T. (µs) |

| -------- | --------------- | --------------- |

| 4        | 16 (4, 4, 3, 5) | 4.00            |

### Misol

HL register pairda 1111h, Accumulatorda F3h va Byte Counterda 0007h bo‘lsin. Memory locationlardagi ma’lumotlar:

| Register / Address | Qiymat |

| --- | --- |

| `(1111h)` | `52h` |

| `(1112h)` | `00h` |

| `(1113h)` | `F3h` |

`CPIR` bajarilgach, HL register pairda 1114h, Byte Counterda 0004h bo‘ladi; F registerdagi P/V va Z flaglar set qilinadi.

## CPD

### Operation

`A – (HL), HL ← HL – 1, BC ← BC – 1`

### Op Code

`CPD`

### Operands

Yo‘q.

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |

| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` |

| 2   | `1` | `0` | `1` | `0` | `1` | `0` | `0` | `1` | `A9` |

### Description

HL register pair ko‘rsatgan memory location tarkibi Accumulator tarkibi bilan taqqoslanadi. Qiymatlar teng bo‘lsa Z flag set qilinadi; aks holda reset qilinadi. HL va Byte Counter (BC register pair) birga kamaytiriladi.

### Condition Bits Affected

8-bit A – (HL) natijasining 7-biti 1 bo‘lsa, S set qilinadi; aks holda reset qilinadi. A tekshirilgan bytega teng bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 4 dan borrow bo‘lsa, H set qilinadi; aks holda reset qilinadi. Kamaytirilgan BC ≠ 0 bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N set qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |

| -------- | --------------- | --------------- |

| 4        | 16 (4, 4, 3, 5) | 4.00            |

### Misol

HL register pairda 1111h, 1111h memory locationda 3Bh, Accumulatorda 3Bh va Byte Counterda 0001h bo‘lsin. `CPD` bajarilgach, Byte Counterda 0000h, HL register pairda 1110h bo‘ladi; F registerdagi Z flag set, P/V flag esa reset qilinadi. Accumulator va 1111h address tarkibi o‘zgarmaydi.

## CPDR

### Operation

`repeat {A – (HL) → flags, HL ← HL – 1, BC ← BC – 1} while (BC ≠ 0 and Z = 0)`

### Op Code

`CPDR`

### Operands

Yo‘q.

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |

| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` |

| 2   | `1` | `0` | `1` | `1` | `1` | `0` | `0` | `1` | `B9` |

### Description

HL register pair ko‘rsatgan memory location tarkibi Accumulator tarkibi bilan taqqoslanadi. Taqqoslangan qiymatlar teng bo‘lsa Z flag set qilinadi; aks holda reset qilinadi. HL va Byte Counter (BC) register pairlar birga kamaytiriladi. Kamaytirish natijasida BC 0 ga teng bo‘lsa yoki Z = 1 bo‘lsa, instruction tugaydi. Kamaytirilgan BC ≠ 0 va Z = 0 bo‘lsa, program counter ikkiga kamaytiriladi va instruction takrorlanadi. Har bir taqqoslashdan keyin interruptlar tan olinadi va ikkita refresh cycle bajariladi. Instruction bajarilishidan oldin BC 0 ga o‘rnatilgan bo‘lsa va mos qiymat topilmasa, instruction 64 KB bo‘ylab takrorlanadi.

### Condition Bits Affected

8-bit A – (HL) natijasining 7-biti 1 bo‘lsa, S set qilinadi; aks holda reset qilinadi. A tekshirilgan bytega teng bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 4 dan borrow bo‘lsa, H set qilinadi; aks holda reset qilinadi. Kamaytirilgan BC ≠ 0 bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N set qilinadi. C o‘zgarmaydi.

### Timing

Kamaytirilgan BC ≠ 0 va Z = 0 bo‘lganda:

| M Cycles | T States           | 4 MHz E.T. (µs) |

| -------- | ------------------ | --------------- |

| 5        | 21 (4, 4, 3, 5, 5) | 5.25            |

Kamaytirilgan BC = 0 yoki Z = 1 bo‘lganda:

| M Cycles | T States        | 4 MHz E.T. (µs) |

| -------- | --------------- | --------------- |

| 4        | 16 (4, 4, 3, 5) | 4.00            |

### Misol

HL register pairda 1118h, Accumulatorda F3h va Byte Counterda 0007h bo‘lsin. Memory locationlardagi ma’lumotlar:

| Register / Address | Qiymat |

| --- | --- |

| `(1118h)` | `52h` |

| `(1117h)` | `00h` |

| `(1116h)` | `F3h` |

`CPDR` bajarilgach, HL register pairda 1115h, Byte Counterda 0004h bo‘ladi; F registerdagi P/V va Z flaglar set qilinadi.

