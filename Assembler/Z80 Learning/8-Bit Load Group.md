---
name: 8 Bit Load Group
tags:
  - Load
  - z80
---
# 8-Bit Load Group

Quyida 8-bit load instructionlarining o‘zbekcha tavsifi keltirilgan. Qisqartmalar, instruction nomlari va texnik atamalar asl holida saqlangan.

## Mundarija

- [LD r, r'](#ld-r-r)
- [LD r, n](#ld-r-n)
- [LD r, (HL)](#ld-r-hl)
- [LD r, (IX+d)](#ld-r-ixd)
- [LD r, (IY+d)](#ld-r-iyd)
- [LD (HL), r](#ld-hl-r)
- [LD (IX+d), r](#ld-ixd-r)
- [LD (IY+d), r](#ld-iyd-r)
- [LD (HL), n](#ld-hl-n)
- [LD (IX+d), n](#ld-ixd-n)
- [LD (IY+d), n](#ld-iyd-n)
- [LD A, (BC)](#ld-a-bc)
- [LD A, (DE)](#ld-a-de)
- [LD A, (nn)](#ld-a-nn)
- [LD (BC), A](#ld-bc-a)
- [LD (DE), A](#ld-de-a)
- [LD (nn), A](#ld-nn-a)
- [LD A, I](#ld-a-i)
- [LD A, R](#ld-a-r)
- [LD I, A](#ld-i-a)
- [LD R, A](#ld-r-a)

## Belgilashlar

| Belgi | Tavsif |
| --- | --- |
| r, r′ | A, B, C, D, E, H yoki L register. |
| n | 8-bit immediate integer. |
| nn | 16-bit memory address; avval low-order byte, keyin high-order byte beriladi. |
| d | 8-bit two’s-complement displacement (−128…+127). |
| (HL), (BC), (DE), (nn) | Qavs ichidagi address ko‘rsatgan memory location tarkibi. |
| (IX+d), (IY+d) | Index Register va displacement yig‘indisi ko‘rsatgan memory location tarkibi. |
| r₂ r₁ r₀, r′₂ r′₁ r′₀ | Registerning 3-bit object code qiymati. |
| n₇…n₀, d₇…d₀ | n yoki d ning alohida bitlari; jadvalda chapdan o‘ngga bit 7…0 tartibida. |
| ← n →, ← d → | Qiymat butun 8-bit byte bo‘ylab joylashishini bildiradi. |
| 4 MHz E.T. (µs) | 4 MHz dagi execution time; T States ÷ 4. |

# LD r, r'

### Operation

`r ← r′`

### Op Code

`LD`

### Operands

`r, r′`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 1 | r₂ | r₁ | r₀ | r′₂ | r′₁ | r′₀ | register code |

### Description

Istalgan r′ register tarkibi r registerga yuklanadi. r va r′ A, B, C, D, E, H yoki L registerni bildiradi; ularning object code qiymatlari quyidagi jadvalda berilgan.

| Register | 2 | 1 | 0 | Object code |
| --- | --- | --- | --- | --- |
| A | 1 | 1 | 1 | 111 |
| B | 0 | 0 | 0 | 000 |
| C | 0 | 0 | 1 | 001 |
| D | 0 | 1 | 0 | 010 |
| E | 0 | 1 | 1 | 011 |
| H | 1 | 0 | 0 | 100 |
| L | 1 | 0 | 1 | 101 |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 1        | 4        | 1.00            |

### Misol

H registerda 8Ah, E registerda 10h bo‘lsa, `LD H, E` bajarilgach ikkala registerda ham 10h bo‘ladi.

# LD r, n

### Operation

`r ← n`

### Op Code

`LD`

### Operands

`r, n`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0 | r₂ | r₁ | r₀ | 1 | 1 | 0 | register code |
| 2 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | ← n → |

### Description

8-bit integer n istalgan r registerga yuklanadi. r A, B, C, D, E, H yoki L registerni bildiradi; object code qiymatlari quyida berilgan.

| Register | 2 | 1 | 0 | Object code |
| --- | --- | --- | --- | --- |
| A | 1 | 1 | 1 | 111 |
| B | 0 | 0 | 0 | 000 |
| C | 0 | 0 | 1 | 001 |
| D | 0 | 1 | 0 | 010 |
| E | 0 | 1 | 1 | 011 |
| H | 1 | 0 | 0 | 100 |
| L | 1 | 0 | 1 | 101 |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 2        | 7 (4, 3) | 1.75            |

### Misol

`LD E, A5h` bajarilgach, E registerda A5h bo‘ladi.

# LD r, (HL)

### Operation

`r ← (HL)`

### Op Code

`LD`

### Operands

`r, (HL)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 1 | r₂ | r₁ | r₀ | 1 | 1 | 0 | register code |

### Description

HL register pair ko‘rsatgan memory locationdagi 8-bit qiymat r registerga yuklanadi. r A, B, C, D, E, H yoki L registerni bildiradi; object code qiymatlari quyida berilgan.

| Register | 2 | 1 | 0 | Object code |
| --- | --- | --- | --- | --- |
| A | 1 | 1 | 1 | 111 |
| B | 0 | 0 | 0 | 000 |
| C | 0 | 0 | 1 | 001 |
| D | 0 | 1 | 0 | 010 |
| E | 0 | 1 | 1 | 011 |
| H | 1 | 0 | 0 | 100 |
| L | 1 | 0 | 1 | 101 |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 2        | 7 (4, 3) | 1.75            |

### Misol

HL register pairda 75A1h, 75A1h memory addressda 58h byte bo‘lsa, `LD C, (HL)` bajarilgach C registerda 58h bo‘ladi.

# LD r, (IX+d)

### Operation

`r ← (IX+d)`

### Op Code

`LD`

### Operands

`r, (IX+d)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 0 | 1 | 1 | 1 | 0 | 1 | DDh |
| 2 | 0 | 1 | r₂ | r₁ | r₀ | 1 | 1 | 0 | register code |
| 3 | d₇ | d₆ | d₅ | d₄ | d₃ | d₂ | d₁ | d₀ | ← d → |

### Description

Index Register IX tarkibiga two’s-complement displacement d qo‘shilib, memory address hisoblanadi. Shu memory location tarkibi r registerga yuklanadi. r A, B, C, D, E, H yoki L registerni bildiradi.

| Register | 2 | 1 | 0 | Object code |
| --- | --- | --- | --- | --- |
| A | 1 | 1 | 1 | 111 |
| B | 0 | 0 | 0 | 000 |
| C | 0 | 0 | 1 | 001 |
| D | 0 | 1 | 0 | 010 |
| E | 0 | 1 | 1 | 011 |
| H | 1 | 0 | 0 | 100 |
| L | 1 | 0 | 1 | 101 |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

### Misol

IX registerda 25AFh bo‘lsa, `LD B, (IX+19h)` uchun 25AFh + 19h = 25C8h hisoblanadi. 25C8h memory addressda 39h byte bo‘lsa, B registerga 39h yuklanadi.

# LD r, (IY+d)

### Operation

`r ← (IY+d)`

### Op Code

`LD`

### Operands

`r, (IY+d)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 1 | FDh |
| 2 | 0 | 1 | r₂ | r₁ | r₀ | 1 | 1 | 0 | register code |
| 3 | d₇ | d₆ | d₅ | d₄ | d₃ | d₂ | d₁ | d₀ | ← d → |

### Description

Index Register IY tarkibiga two’s-complement displacement d qo‘shilib, memory address hisoblanadi. Shu memory location tarkibi r registerga yuklanadi. r A, B, C, D, E, H yoki L registerni bildiradi.

| Register | 2 | 1 | 0 | Object code |
| --- | --- | --- | --- | --- |
| A | 1 | 1 | 1 | 111 |
| B | 0 | 0 | 0 | 000 |
| C | 0 | 0 | 1 | 001 |
| D | 0 | 1 | 0 | 010 |
| E | 0 | 1 | 1 | 011 |
| H | 1 | 0 | 0 | 100 |
| L | 1 | 0 | 1 | 101 |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

### Misol

IY registerda 25AFh bo‘lsa, `LD B, (IY+19h)` uchun 25AFh + 19h = 25C8h hisoblanadi. Shu memory addressda 39h byte bo‘lsa, B registerga 39h yuklanadi.

# LD (HL), r

### Operation

`(HL) ← r`

### Op Code

`LD`

### Operands

`(HL), r`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 1 | 1 | 1 | 0 | r₂ | r₁ | r₀ | register code |

### Description

r register tarkibi HL register pair ko‘rsatgan memory locationga yuklanadi. r A, B, C, D, E, H yoki L registerni bildiradi; object code qiymatlari quyida berilgan.

| Register | 2 | 1 | 0 | Object code |
| --- | --- | --- | --- | --- |
| A | 1 | 1 | 1 | 111 |
| B | 0 | 0 | 0 | 000 |
| C | 0 | 0 | 1 | 001 |
| D | 0 | 1 | 0 | 010 |
| E | 0 | 1 | 1 | 011 |
| H | 1 | 0 | 0 | 100 |
| L | 1 | 0 | 1 | 101 |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 2        | 7 (4, 3) | 1.75            |

### Misol

HL register pair 2146h memory locationni ko‘rsatsa va B registerda 29h byte bo‘lsa, `LD (HL), B` bajarilgach 2146h memory addressda ham 29h bo‘ladi.

# LD (IX+d), r

### Operation

`(IX+d) ← r`

### Op Code

`LD`

### Operands

`(IX+d), r`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 0 | 1 | 1 | 1 | 0 | 1 | DDh |
| 2 | 0 | 1 | 1 | 1 | 0 | r₂ | r₁ | r₀ | register code |
| 3 | d₇ | d₆ | d₅ | d₄ | d₃ | d₂ | d₁ | d₀ | ← d → |

### Description

r register tarkibi Index Register IX tarkibi va two’s-complement displacement d yig‘indisi ko‘rsatgan memory addressga yuklanadi. r A, B, C, D, E, H yoki L registerni bildiradi.

| Register | 2 | 1 | 0 | Object code |
| --- | --- | --- | --- | --- |
| A | 1 | 1 | 1 | 111 |
| B | 0 | 0 | 0 | 000 |
| C | 0 | 0 | 1 | 001 |
| D | 0 | 1 | 0 | 010 |
| E | 0 | 1 | 1 | 011 |
| H | 1 | 0 | 0 | 100 |
| L | 1 | 0 | 1 | 101 |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

### Misol

C registerda 1Ch byte, IX registerda 3100h bo‘lsa, `LD (IX+6h), C` 3100h + 6h = 3106h ni hisoblaydi va 3106h memory locationga 1Ch yuklaydi.

# LD (IY+d), r

### Operation

`(IY+d) ← r`

### Op Code

`LD`

### Operands

`(IY+d), r`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 1 | FDh |
| 2 | 0 | 1 | 1 | 1 | 0 | r₂ | r₁ | r₀ | register code |
| 3 | d₇ | d₆ | d₅ | d₄ | d₃ | d₂ | d₁ | d₀ | ← d → |

### Description

r register tarkibi Index Register IY tarkibi va two’s-complement displacement d yig‘indisi ko‘rsatgan memory addressga yuklanadi. r qiymati quyidagi jadval bo‘yicha kodlanadi.

| Register | 2 | 1 | 0 | Object code |
| --- | --- | --- | --- | --- |
| A | 1 | 1 | 1 | 111 |
| B | 0 | 0 | 0 | 000 |
| C | 0 | 0 | 1 | 001 |
| D | 0 | 1 | 0 | 010 |
| E | 0 | 1 | 1 | 011 |
| H | 1 | 0 | 0 | 100 |
| L | 1 | 0 | 1 | 101 |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

### Misol

C registerda 48h byte, IY registerda 2A11h bo‘lsa, `LD (IY+4h), C` 2A11h + 4h = 2A15h ni hisoblaydi va shu memory locationga 48h yuklaydi.

# LD (HL), n

### Operation

`(HL) ← n`

### Op Code

`LD`

### Operands

`(HL), n`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 | 1 | 0 | 36h |
| 2 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | ← n → |

### Description

n integer HL register pair ko‘rsatgan memory addressga yuklanadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States     | 4 MHz E.T. (µs) |
| -------- | ------------ | --------------- |
| 3        | 10 (4, 3, 3) | 2.50            |

### Misol

HL register pairda 4444h bo‘lsa, `LD (HL), 28h` bajarilgach 4444h memory locationda 28h byte bo‘ladi.

# LD (IX+d), n

### Operation

`(IX+d) ← n`

### Op Code

`LD`

### Operands

`(IX+d), n`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 0 | 1 | 1 | 1 | 0 | 1 | DDh |
| 2 | 0 | 0 | 1 | 1 | 0 | 1 | 1 | 0 | 36h |
| 3 | d₇ | d₆ | d₅ | d₄ | d₃ | d₂ | d₁ | d₀ | ← d → |
| 4 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | ← n → |

### Description

n operand Index Register IX tarkibi va two’s-complement displacement d yig‘indisi ko‘rsatgan memory addressga yuklanadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

### Misol

IX registerda 219Ah bo‘lsa, `LD (IX+5h), 5Ah` bajarilgach 219Fh memory addressda 5Ah byte bo‘ladi.

# LD (IY+d), n

### Operation

`(IY+d) ← n`

### Op Code

`LD`

### Operands

`(IY+d), n`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 1 | FDh |
| 2 | 0 | 0 | 1 | 1 | 0 | 1 | 1 | 0 | 36h |
| 3 | d₇ | d₆ | d₅ | d₄ | d₃ | d₂ | d₁ | d₀ | ← d → |
| 4 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | ← n → |

### Description

n integer Index Register IY tarkibi va two’s-complement displacement d yig‘indisi ko‘rsatgan memory locationga yuklanadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

### Misol

IY registerda A940h bo‘lsa, `LD (IY+10h), 97h` bajarilgach A950h memory locationda 97h byte bo‘ladi.

# LD A, (BC)

### Operation

`A ← (BC)`

### Op Code

`LD`

### Operands

`A, (BC)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0 | 0 | 0 | 1 | 0 | 1 | 0 | 0Ah |

### Description

BC register pair ko‘rsatgan memory location tarkibi Accumulatorga yuklanadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 2        | 7 (4, 3) | 1.75            |

### Misol

BC register pairda 4747h, shu memory addressda 12h byte bo‘lsa, `LD A, (BC)` bajarilgach A registerda 12h bo‘ladi.

# LD A, (DE)

### Operation

`A ← (DE)`

### Op Code

`LD`

### Operands

`A, (DE)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0 | 0 | 1 | 1 | 0 | 1 | 0 | 1Ah |

### Description

DE register pair ko‘rsatgan memory location tarkibi Accumulatorga yuklanadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 2        | 7 (4, 3) | 1.75            |

### Misol

DE register pairda 30A2h, shu memory addressda 22h byte bo‘lsa, `LD A, (DE)` bajarilgach A registerda 22h bo‘ladi.

# LD A, (nn)

### Operation

`A ← (nn)`

### Op Code

`LD`

### Operands

`A, (nn)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0 | 1 | 1 | 1 | 0 | 1 | 0 | 3Ah |
| 2 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | ← n → (nn low-order byte) |
| 3 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | ← n → (nn high-order byte) |

### Description

nn operand ko‘rsatgan memory location tarkibi Accumulatorga yuklanadi. Op Code dan keyingi birinchi n — 2-byte memory addressning low-order byte qiymati; ikkinchisi — high-order byte qiymati.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 13 (4, 3, 3, 3) | 3.25            |

### Misol

nn = 8832h va 8832h memory addressda 04h byte bo‘lsa, `LD A, (8832h)` bajarilgach Accumulatorga 04h yuklanadi.

# LD (BC), A

### Operation

`(BC) ← A`

### Op Code

`LD`

### Operands

`(BC), A`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 02h |

### Description

Accumulator tarkibi BC register pair ko‘rsatgan memory locationga yuklanadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 2        | 7 (4, 3) | 1.75            |

### Misol

Accumulator tarkibi 7Ah, BC register pair tarkibi 1212h bo‘lsa, `LD (BC), A` bajarilgach 1212h memory locationda 7Ah bo‘ladi.

# LD (DE), A

### Operation

`(DE) ← A`

### Op Code

`LD`

### Operands

`(DE), A`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0 | 0 | 1 | 0 | 0 | 1 | 0 | 12h |

### Description

Accumulator tarkibi DE register pair ko‘rsatgan memory locationga yuklanadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 2        | 7 (4, 3) | 1.75            |

### Misol

DE register pairda 1128h, Accumulatorda A0h byte bo‘lsa, `LD (DE), A` bajarilgach 1128h memory locationda A0h saqlanadi.

# LD (nn), A

### Operation

`(nn) ← A`

### Op Code

`LD`

### Operands

`(nn), A`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0 | 1 | 1 | 0 | 0 | 1 | 0 | 32h |
| 2 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | ← n → (nn low-order byte) |
| 3 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | ← n → (nn high-order byte) |

### Description

Accumulator tarkibi nn operand ko‘rsatgan memory addressga yuklanadi. Op Code dan keyingi birinchi n — nn ning low-order byte qiymati; ikkinchisi — high-order byte qiymati.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 13 (4, 3, 3, 3) | 3.25            |

### Misol

Accumulatorda D7h byte bo‘lsa, `LD (3141h), A` bajarilgach 3141h memory locationda D7h bo‘ladi.

# LD A, I

### Operation

`A ← I`

### Op Code

`LD`

### Operands

`A, I`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 1 | 0 | 1 | 1 | 0 | 1 | EDh |
| 2 | 0 | 1 | 0 | 1 | 0 | 1 | 1 | 1 | 57h |

### Description

Interrupt Vector Register I tarkibi Accumulatorga yuklanadi.

### Condition Bits Affected

| Flag | Holati |
| --- | --- |
| S | A ga yuklangan qiymatning bit 7 qiymati 1 bo‘lsa set, aks holda reset qilinadi. |
| Z | I register qiymati 0 bo‘lsa set, aks holda reset qilinadi. |
| H | reset qilinadi. |
| P/V | IFF2 tarkibi ko‘chiriladi. |
| N | reset qilinadi. |
| C | O‘zgarmaydi. |

Ayrim NMOS Z80 variantlarida instruction yakunida maskable interrupt qabul qilinsa, P/V flag IFF2 qiymati 1 bo‘lsa ham reset bo‘lishi mumkin.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 2        | 9 (4, 5) | 2.25            |

# LD A, R

### Operation

`A ← R`

### Op Code

`LD`

### Operands

`A, R`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 1 | 0 | 1 | 1 | 0 | 1 | EDh |
| 2 | 0 | 1 | 0 | 1 | 1 | 1 | 1 | 1 | 5Fh |

### Description

Memory Refresh Register R tarkibi Accumulatorga yuklanadi.

### Condition Bits Affected

| Flag | Holati |
| --- | --- |
| S | A ga yuklangan qiymatning bit 7 qiymati 1 bo‘lsa set, aks holda reset qilinadi. |
| Z | R register qiymati 0 bo‘lsa set, aks holda reset qilinadi. |
| H | reset qilinadi. |
| P/V | IFF2 tarkibi ko‘chiriladi. |
| N | reset qilinadi. |
| C | O‘zgarmaydi. |

Ayrim NMOS Z80 variantlarida instruction yakunida maskable interrupt qabul qilinsa, P/V flag IFF2 qiymati 1 bo‘lsa ham reset bo‘lishi mumkin.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 2        | 9 (4, 5) | 2.25            |

# LD I, A

### Operation

`I ← A`

### Op Code

`LD`

### Operands

`I, A`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 1 | 0 | 1 | 1 | 0 | 1 | EDh |
| 2 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | 1 | 47h |

### Description

Accumulator tarkibi Interrupt Control Vector Register I ga yuklanadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 2        | 9 (4, 5) | 2.25            |

# LD R, A

### Operation

`R ← A`

### Op Code

`LD`

### Operands

`R, A`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 1 | 0 | 1 | 1 | 0 | 1 | EDh |
| 2 | 0 | 1 | 0 | 0 | 1 | 1 | 1 | 1 | 4Fh |

### Description

Accumulator tarkibi Memory Refresh Register R ga yuklanadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 2        | 9 (4, 5) | 2.25            |

## Manbadagi nomuvofiqliklar bo‘yicha izohlar

HTMLdagi sahifa header/footerlari va ko‘rinmas link qatlamlari olib tashlandi. Davom sahifalardagi misollar tegishli instructionga birlashtirildi. Bit sxemalari byte ketma-ketligi bo‘yicha qayta yig‘ildi.

| Belgi | Tavsif |
| --- | --- |
| LD r, r′ — Operation | r, ← r′ yozuvidagi ortiqcha vergul olib tashlandi. |
| IY bilan ishlaydigan instructionlar | lY → IY; Operation ichidagi D → d. |
| LD (IX+d), r — misol | LID → LD. |
| LD (IY+d), r — misol | Hex address 2A15 → 2A15h. |
| LD (nn), A — misol | Buzilgan LD (3141h), AD7h matni LD (3141h), A va natija D7h ko‘rinishida tiklandi. |
| LD A, I — Operation | A ← 1 → A ← I. |
| LD r, (IX+d) va LD (IY+d), n — Timing | Manbadagi 2.50 qiymati 19 T States / 4 MHz = 4.75 µs bo‘yicha tuzatildi. |
| Register jadvali | Buzilgan Register r, C headeri r va r′ uchun 3-bit register code jadvali ko‘rinishida tiklandi. |
