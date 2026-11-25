---
name: 16 Bit Load Group
tags:
  - Load
  - z80
---
# 16-Bit Load Group

Ushbu bo‘limda quyidagi 16-bit load instructionlar tavsiflanadi. Batafsil ma’lumot olish uchun mundarijadagi tegishli instruction havolasini bosing.

## Mundarija

- [LD dd, nn](#ld-dd-nn)
- [LD IX, nn](#ld-ix-nn)
- [LD IY, nn](#ld-iy-nn)
- [LD HL, (nn)](#ld-hl-nn)
- [LD dd, (nn)](#ld-dd-nn-1)
- [LD IX, (nn)](#ld-ix-nn-1)
- [LD IY, (nn)](#ld-iy-nn-1)
- [LD (nn), HL](#ld-nn-hl)
- [LD (nn), dd](#ld-nn-dd)
- [LD (nn), IX](#ld-nn-ix)
- [LD (nn), IY](#ld-nn-iy)
- [LD SP, HL](#ld-sp-hl)
- [LD SP, IX](#ld-sp-ix)
- [LD SP, IY](#ld-sp-iy)
- [PUSH qq](#push-qq)
- [PUSH IX](#push-ix)
- [PUSH IY](#push-iy)
- [POP qq](#pop-qq)
- [POP IX](#pop-ix)
- [POP IY](#pop-iy)

## Belgilashlar

| Belgi | Tavsif |
| --- | --- |
| `dd` | BC, DE, HL yoki SP register pair. |
| `qq` | BC, DE, HL yoki AF register pair. |
| `nn` | 16-bit integer yoki memory address; op codedan keyin avval low-order byte, keyin high-order byte keladi. |
| `n` | Butun 8-bit byte ni egallaydi; nn ning low-order byte bitlari n₇…n₀, high-order byte bitlari n₁₅…n₈ sifatida beriladi. |
| `d₁ d₀`, `q₁ q₀` | Register pairning 2-bit object code qiymati. |
| `ddh`, `ddl`, `qqH`, `qqL` | Register pairning high-order va low-order qismlari. |
| `IXH`, `IXL`, `IYH`, `IYL` | Index Registerlarning high-order va low-order byte qismlari. |
| Bit sxemalari | Har bir qator bitta byte; bitlar chapdan o‘ngga bit 7 dan bit 0 gacha, qatorlar esa byte ketma-ketligida berilgan. Birinchi katak — byte tartib raqami. |
| `4 MHz E.T. (µs)` | 4 MHz dagi execution time, µs hisobida. |

# LD dd, nn

### Operation

`dd ← nn`

### Op Code

`LD`

### Operands

`dd, nn`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `0` | `0` | `d₁` | `d₀` | `0` | `0` | `0` | `1` | register pair code |
| 2 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | low-order byte |
| 3 | n₁₅ | n₁₄ | n₁₃ | n₁₂ | n₁₁ | n₁₀ | n₉ | n₈ | high-order byte |

### Description

2-byte integer nn dd register pairga yuklanadi. dd BC, DE, HL yoki SP register pairni bildiradi; object code qiymatlari quyida berilgan. Op codedan keyingi birinchi n operand low-order byte hisoblanadi.

| Register pair | Code |
| --- | --- |
| `BC` | `00` |
| `DE` | `01` |
| `HL` | `10` |
| `SP` | `11` |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States     | 4 MHz E.T. (µs) |
| -------- | ------------ | --------------- |
| 3        | 10 (4, 3, 3) | 2.50            |

### Misol

`LD HL, 5000h` bajarilgach, HL register pairda 5000h bo‘ladi.

# LD IX, nn

### Operation

`IX ← nn`

### Op Code

`LD`

### Operands

`IX, nn`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` |
| 2 | `0` | `0` | `1` | `0` | `0` | `0` | `0` | `1` | `21` |
| 3 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | low-order byte |
| 4 | n₁₅ | n₁₄ | n₁₃ | n₁₂ | n₁₁ | n₁₀ | n₉ | n₈ | high-order byte |

### Description

nn integer Index Register IX ga yuklanadi. Op codedan keyingi birinchi n operand low-order byte hisoblanadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 14 (4, 4, 3, 3) | 3.50            |

### Misol

`LD IX, 45A2h` bajarilgach, Index Register IX da 45A2h integer bo‘ladi.

# LD IY, nn

### Operation

`IY ← nn`

### Op Code

`LD`

### Operands

`IY, nn`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` |
| 2 | `0` | `0` | `1` | `0` | `0` | `0` | `0` | `1` | `21` |
| 3 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | low-order byte |
| 4 | n₁₅ | n₁₄ | n₁₃ | n₁₂ | n₁₁ | n₁₀ | n₉ | n₈ | high-order byte |

### Description

nn integer Index Register IY ga yuklanadi. Op codedan keyingi birinchi n operand low-order byte hisoblanadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 14 (4, 4, 3, 3) | 3.50            |

### Misol

`LD IY, 7733h` bajarilgach, Index Register IY da 7733h integer bo‘ladi.

# LD HL, (nn)

### Operation

`H ← (nn + 1), L ← (nn)`

### Op Code

`LD`

### Operands

`HL, (nn)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `0` | `0` | `1` | `0` | `1` | `0` | `1` | `0` | `2A` |
| 2 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | low-order byte |
| 3 | n₁₅ | n₁₄ | n₁₃ | n₁₂ | n₁₁ | n₁₀ | n₉ | n₈ | high-order byte |

### Description

(nn) memory address tarkibi HL register pairning low-order qismiga (Register L), keyingi yuqori memory address (nn + 1) tarkibi esa HL ning high-order qismiga (Register H) yuklanadi. Op codedan keyingi birinchi n operand nn ning low-order byte qiymatidir.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 16 (4, 3, 3, 3, 3) | 4.00            |

### Misol

4545h addressda 37h va 4546h addressda A1h bo‘lsa, `LD HL, (4545h)` bajarilgach, HL register pairda A137h bo‘ladi.

# LD dd, (nn)

### Operation

`ddh ← (nn + 1), ddl ← (nn)`

### Op Code

`LD`

### Operands

`dd, (nn)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` |
| 2 | `0` | `1` | `d₁` | `d₀` | `1` | `0` | `1` | `1` | register pair code |
| 3 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | low-order byte |
| 4 | n₁₅ | n₁₄ | n₁₃ | n₁₂ | n₁₁ | n₁₀ | n₉ | n₈ | high-order byte |

### Description

(nn) address tarkibi dd register pairning low-order qismiga, keyingi yuqori memory address (nn + 1) tarkibi esa dd ning high-order qismiga yuklanadi. dd BC, DE, HL yoki SP register pairni bildiradi; object code qiymatlari quyida berilgan. Op codedan keyingi birinchi n operand (nn) ning low-order byte qiymatidir.

| Register pair | Code |
| --- | --- |
| `BC` | `00` |
| `DE` | `01` |
| `HL` | `10` |
| `SP` | `11` |

HL uchun ED 6B shakli ham mavjud; odatda assembler qisqaroq 2A shaklini tanlaydi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States              | 4 MHz E.T. (µs) |
| -------- | --------------------- | --------------- |
| 6        | 20 (4, 4, 3, 3, 3, 3) | 5.00            |

### Misol

2130h addressda 65h va 2131h addressda 78h bo‘lsa, `LD BC, (2130h)` bajarilgach, BC register pairda 7865h bo‘ladi.

# LD IX, (nn)

### Operation

`IXH ← (nn + 1), IXL ← (nn)`

### Op Code

`LD`

### Operands

`IX, (nn)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` |
| 2 | `0` | `0` | `1` | `0` | `1` | `0` | `1` | `0` | `2A` |
| 3 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | low-order byte |
| 4 | n₁₅ | n₁₄ | n₁₃ | n₁₂ | n₁₁ | n₁₀ | n₉ | n₈ | high-order byte |

### Description

(nn) address tarkibi Index Register IX ning low-order qismiga, keyingi yuqori memory address (nn + 1) tarkibi esa IX ning high-order qismiga yuklanadi. Op codedan keyingi birinchi n operand nn ning low-order byte qiymatidir.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States              | 4 MHz E.T. (µs) |
| -------- | --------------------- | --------------- |
| 6        | 20 (4, 4, 3, 3, 3, 3) | 5.00            |

### Misol

6666h addressda 92h va 6667h addressda DAh bo‘lsa, `LD IX, (6666h)` bajarilgach, Index Register IX da DA92h bo‘ladi.

# LD IY, (nn)

### Operation

`IYH ← (nn + 1), IYL ← (nn)`

### Op Code

`LD`

### Operands

`IY, (nn)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` |
| 2 | `0` | `0` | `1` | `0` | `1` | `0` | `1` | `0` | `2A` |
| 3 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | low-order byte |
| 4 | n₁₅ | n₁₄ | n₁₃ | n₁₂ | n₁₁ | n₁₀ | n₉ | n₈ | high-order byte |

### Description

(nn) address tarkibi Index Register IY ning low-order qismiga, keyingi yuqori memory address (nn + 1) tarkibi esa IY ning high-order qismiga yuklanadi. Op codedan keyingi birinchi n operand nn ning low-order byte qiymatidir.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States              | 4 MHz E.T. (µs) |
| -------- | --------------------- | --------------- |
| 6        | 20 (4, 4, 3, 3, 3, 3) | 5.00            |

### Misol

6666h addressda 92h va 6667h addressda DAh bo‘lsa, `LD IY, (6666h)` bajarilgach, Index Register IY da DA92h bo‘ladi.

# LD (nn), HL

### Operation

`(nn + 1) ← H, (nn) ← L`

### Op Code

`LD`

### Operands

`(nn), HL`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `0` | `0` | `1` | `0` | `0` | `0` | `1` | `0` | `22` |
| 2 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | low-order byte |
| 3 | n₁₅ | n₁₄ | n₁₃ | n₁₂ | n₁₁ | n₁₀ | n₉ | n₈ | high-order byte |

### Description

HL register pairning low-order qismi (Register L) tarkibi (nn) memory addressga, high-order qismi (Register H) tarkibi esa keyingi yuqori memory address (nn + 1) ga yuklanadi. Op codedan keyingi birinchi n operand nn ning low-order byte qiymatidir.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 16 (4, 3, 3, 3, 3) | 4.00            |

### Misol

HL register pairda 483Ah bo‘lsa, `LD (0B229h), HL` bajarilgach, B229h addressda 3Ah, B22Ah addressda esa 48h bo‘ladi.

# LD (nn), dd

### Operation

`(nn + 1) ← ddh, (nn) ← ddl`

### Op Code

`LD`

### Operands

`(nn), dd`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` |
| 2 | `0` | `1` | `d₁` | `d₀` | `0` | `0` | `1` | `1` | register pair code |
| 3 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | low-order byte |
| 4 | n₁₅ | n₁₄ | n₁₃ | n₁₂ | n₁₁ | n₁₀ | n₉ | n₈ | high-order byte |

### Description

dd register pairning low-order byte qiymati (nn) memory addressga, high-order byte qiymati esa (nn + 1) memory addressga yuklanadi. dd BC, DE, HL yoki SP register pairni bildiradi; object code qiymatlari quyida berilgan. Op codedan keyingi birinchi n operand ikki byte li memory addressning low-order byte qiymatidir.

| Register pair | Code |
| --- | --- |
| `BC` | `00` |
| `DE` | `01` |
| `HL` | `10` |
| `SP` | `11` |

HL uchun ED 63 shakli ham mavjud; odatda assembler qisqaroq 22 shaklini tanlaydi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States              | 4 MHz E.T. (µs) |
| -------- | --------------------- | --------------- |
| 6        | 20 (4, 4, 3, 3, 3, 3) | 5.00            |

### Misol

BC register pairda 4644h bo‘lsa, `LD (1000h), BC` bajarilgach, 1000h memory locationda 44h, 1001h memory locationda esa 46h bo‘ladi.

# LD (nn), IX

### Operation

`(nn + 1) ← IXH, (nn) ← IXL`

### Op Code

`LD`

### Operands

`(nn), IX`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` |
| 2 | `0` | `0` | `1` | `0` | `0` | `0` | `1` | `0` | `22` |
| 3 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | low-order byte |
| 4 | n₁₅ | n₁₄ | n₁₃ | n₁₂ | n₁₁ | n₁₀ | n₉ | n₈ | high-order byte |

### Description

Index Register IX ning low-order byte qiymati (nn) memory addressga, high-order byte qiymati esa keyingi yuqori address (nn + 1) ga yuklanadi. Op codedan keyingi birinchi n operand nn ning low-order byte qiymatidir.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States              | 4 MHz E.T. (µs) |
| -------- | --------------------- | --------------- |
| 6        | 20 (4, 4, 3, 3, 3, 3) | 5.00            |

### Misol

Index Register IX da 5A30h bo‘lsa, `LD (4392h), IX` bajarilgach, 4392h memory locationda 30h, 4393h memory locationda esa 5Ah bo‘ladi.

# LD (nn), IY

### Operation

`(nn + 1) ← IYH, (nn) ← IYL`

### Op Code

`LD`

### Operands

`(nn), IY`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` |
| 2 | `0` | `0` | `1` | `0` | `0` | `0` | `1` | `0` | `22` |
| 3 | n₇ | n₆ | n₅ | n₄ | n₃ | n₂ | n₁ | n₀ | low-order byte |
| 4 | n₁₅ | n₁₄ | n₁₃ | n₁₂ | n₁₁ | n₁₀ | n₉ | n₈ | high-order byte |

### Description

Index Register IY ning low-order byte qiymati (nn) memory addressga, high-order byte qiymati esa (nn + 1) memory locationga yuklanadi. Op codedan keyingi birinchi n operand nn ning low-order byte qiymatidir.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States              | 4 MHz E.T. (µs) |
| -------- | --------------------- | --------------- |
| 6        | 20 (4, 4, 3, 3, 3, 3) | 5.00            |

### Misol

Index Register IY da 4174h bo‘lsa, `LD (8838h), IY` bajarilgach, 8838h memory locationda 74h, 8839h memory locationda esa 41h bo‘ladi.

# LD SP, HL

### Operation

`SP ← HL`

### Op Code

`LD`

### Operands

`SP, HL`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `0` | `0` | `1` | `F9` |

### Description

HL register pair tarkibi Stack Pointer (SP) ga yuklanadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 1        | 6        | 1.5             |

### Misol

HL register pairda 442Eh bo‘lsa, `LD SP, HL` bajarilgach, Stack Pointerda ham 442Eh bo‘ladi.

# LD SP, IX

### Operation

`SP ← IX`

### Op Code

`LD`

### Operands

`SP, IX`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` |
| 2 | `1` | `1` | `1` | `1` | `1` | `0` | `0` | `1` | `F9` |

### Description

Index Register IX ning 2-byte tarkibi Stack Pointer (SP) ga yuklanadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States  | 4 MHz E.T. (µs) |
| -------- | --------- | --------------- |
| 2        | 10 (4, 6) | 2.50            |

### Misol

Index Register IX da 98DAh bo‘lsa, `LD SP, IX` bajarilgach, Stack Pointerda ham 98DAh bo‘ladi.

# LD SP, IY

### Operation

`SP ← IY`

### Op Code

`LD`

### Operands

`SP, IY`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` |
| 2 | `1` | `1` | `1` | `1` | `1` | `0` | `0` | `1` | `F9` |

### Description

Index Register IY ning 2-byte tarkibi Stack Pointer SP ga yuklanadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States  | 4 MHz E.T. (µs) |
| -------- | --------- | --------------- |
| 2        | 10 (4, 6) | 2.50            |

### Misol

Index Register IY da A227h integer bo‘lsa, `LD SP, IY` bajarilgach, Stack Pointerda ham A227h bo‘ladi.

# PUSH qq

### Operation

`(SP – 2) ← qqL, (SP – 1) ← qqH, SP ← SP − 2`

### Op Code

`PUSH`

### Operand

`qq`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `q₁` | `q₀` | `0` | `1` | `0` | `1` | register pair code |

### Description

qq register pair tarkibi tashqi memorydagi last-in, first-out (LIFO) stackka joylanadi. Stack Pointer (SP) register pair stackning joriy tepasidagi 16-bit addressni saqlaydi. Instruction avval SP ni birga kamaytiradi va qq register pair ning high-order byte qiymatini SP ko‘rsatgan memory addressga yuklaydi. Keyin SP yana birga kamaytiriladi va low-order byte qiymati SP dagi yangi addressga mos memory locationga yuklanadi. qq operand BC, DE, HL yoki AF register pairni bildiradi; object code qiymatlari quyida berilgan.

| Register pair | Code |
| --- | --- |
| `BC` | `00` |
| `DE` | `01` |
| `HL` | `10` |
| `AF` | `11` |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States     | 4 MHz E.T. (µs) |
| -------- | ------------ | --------------- |
| 3        | 11 (5, 3, 3) | 2.75            |

### Misol

AF register pair da 2233h va Stack Pointerda 1007h bo‘lsa, `PUSH AF` bajarilgach, 1006h memory addressda 22h, 1005h memory addressda 33h, Stack Pointerda esa 1005h bo‘ladi.

# PUSH IX

### Operation

`(SP – 2) ← IXL, (SP – 1) ← IXH, SP ← SP − 2`

### Op Code

`PUSH`

### Operand

`IX`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` |
| 2 | `1` | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `E5` |

### Description

Index Register IX tarkibi tashqi memorydagi last-in, first-out (LIFO) stackka joylanadi. Stack Pointer (SP) register pair stackning joriy tepasidagi 16-bit addressni saqlaydi. Instruction avval SP ni birga kamaytiradi va IX ning high-order byte qiymatini SP ko‘rsatgan memory addressga yuklaydi. Keyin SP yana birga kamaytiriladi va low-order byte qiymati SP dagi yangi addressga mos memory locationga yuklanadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 15 (4, 5, 3, 3) | 3.75            |

### Misol

Index Register IX da 2233h va Stack Pointerda 1007h bo‘lsa, `PUSH IX` bajarilgach, 1006h memory addressda 22h, 1005h memory addressda 33h, Stack Pointerda esa 1005h bo‘ladi.

# PUSH IY

### Operation

`(SP – 2) ← IYL, (SP – 1) ← IYH, SP ← SP − 2`

### Op Code

`PUSH`

### Operand

`IY`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` |
| 2 | `1` | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `E5` |

### Description

Index Register IY tarkibi tashqi memorydagi last-in, first-out (LIFO) stackka joylanadi. Stack Pointer (SP) register pair stackning joriy tepasidagi 16-bit addressni saqlaydi. Instruction avval SP ni birga kamaytiradi va IY ning high-order byte qiymatini SP ko‘rsatgan memory addressga yuklaydi. Keyin SP yana birga kamaytiriladi va low-order byte qiymati SP dagi yangi addressga mos memory locationga yuklanadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 15 (4, 5, 3, 3) | 3.75            |

### Misol

Index Register IY da 2233h va Stack Pointerda 1007h bo‘lsa, `PUSH IY` bajarilgach, 1006h memory addressda 22h, 1005h memory addressda 33h, Stack Pointerda esa 1005h bo‘ladi.

# POP qq

### Operation

`qqH ← (SP+1), qqL ← (SP), SP ← SP + 2`

### Op Code

`POP`

### Operand

`qq`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `q₁` | `q₀` | `0` | `0` | `0` | `1` | register pair code |

### Description

Tashqi memorydagi last-in, first-out (LIFO) stackning tepasidagi ikki byte qq register pair ga olinadi. Stack Pointer (SP) register pair stackning joriy tepasidagi 16-bit addressni saqlaydi. Instruction avval SP ko‘rsatgan memory locationdagi byte ni qq ning low-order qismiga yuklaydi. Keyin SP birga oshiriladi va qo‘shni memory location tarkibi qq ning high-order qismiga yuklanadi. So‘ng SP yana birga oshiriladi. qq operand BC, DE, HL yoki AF register pairni bildiradi; object code qiymatlari quyida berilgan.

| Register pair | Code |
| --- | --- |
| `BC` | `00` |
| `DE` | `01` |
| `HL` | `10` |
| `AF` | `11` |

### Condition Bits Affected

BC, DE yoki HL uchun flaglar o‘zgarmaydi. `POP AF` bajarilganda F register stackdan yuklanadi va barcha flag bitlari yuklangan qiymatga mos o‘zgarishi mumkin.

### Timing

| M Cycles | T States     | 4 MHz E.T. (µs) |
| -------- | ------------ | --------------- |
| 3        | 10 (4, 3, 3) | 2.50            |

### Misol

Stack Pointerda 1000h, 1000h memory locationda 55h va 1001h memory locationda 33h bo‘lsa, `POP HL` bajarilgach, HL register pair da 3355h, Stack Pointerda esa 1002h bo‘ladi.

# POP IX

### Operation

`IXH ← (SP+1), IXL ← (SP), SP ← SP + 2`

### Op Code

`POP`

### Operand

`IX`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` |
| 2 | `1` | `1` | `1` | `0` | `0` | `0` | `0` | `1` | `E1` |

### Description

Tashqi memorydagi last-in, first-out (LIFO) stackning tepasidagi ikki byte Index Register IX ga olinadi. Stack Pointer (SP) register pair stackning joriy tepasidagi 16-bit addressni saqlaydi. Instruction avval SP ko‘rsatgan memory locationdagi byte ni IX ning low-order qismiga yuklaydi. Keyin SP birga oshiriladi va qo‘shni memory location tarkibi IX ning high-order qismiga yuklanadi. So‘ng SP yana birga oshiriladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 14 (4, 4, 3, 3) | 3.50            |

### Misol

Stack Pointerda 1000h, 1000h memory locationda 55h va 1001h memory locationda 33h bo‘lsa, `POP IX` bajarilgach, Index Register IX da 3355h, Stack Pointerda esa 1002h bo‘ladi.

# POP IY

### Operation

`IYH ← (SP + 1), IYL ← (SP), SP ← SP + 2`

### Op Code

`POP`

### Operand

`IY`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` |
| 2 | `1` | `1` | `1` | `0` | `0` | `0` | `0` | `1` | `E1` |

### Description

Tashqi memorydagi last-in, first-out (LIFO) stackning tepasidagi ikki byte Index Register IY ga olinadi. Stack Pointer (SP) register pair stackning joriy tepasidagi 16-bit addressni saqlaydi. Instruction avval SP ko‘rsatgan memory locationdagi byte ni IY ning low-order qismiga yuklaydi. Keyin SP birga oshiriladi va qo‘shni memory location tarkibi IY ning high-order qismiga yuklanadi. So‘ng SP yana birga oshiriladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 14 (4, 4, 3, 3) | 3.50            |

### Misol

Stack Pointerda 1000h, 1000h memory locationda 55h va 1001h memory locationda 33h bo‘lsa, `POP IY` bajarilgach, Index Register IY da 3355h, Stack Pointerda esa 1002h bo‘ladi.

