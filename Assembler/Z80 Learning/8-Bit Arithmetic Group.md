---
name: 8-Bit Arithmetic Group
status: active
pinned: false
deleted: false
tags:
    - z80
    - arithmetic
---

# 8-Bit Arithmetic Group

Ushbu bo‘limda quyidagi 8-bit arithmetic group instructionlari tavsiflanadi. Batafsil ma’lumot olish uchun mundarijadagi tegishli instruction havolasini bosing.

## Mundarija

- [ADD A, r](#add-a-r)
- [ADD A, n](#add-a-n)
- [ADD A, (HL)](#add-a-hl)
- [ADD A, (IX + d)](#add-a-ix--d)
- [ADD A, (IY + d)](#add-a-iy--d)
- [ADC A, s](#adc-a-s)
- [SUB s](#sub-s)
- [SBC A, s](#sbc-a-s)
- [AND s](#and-s)
- [OR s](#or-s)
- [XOR s](#xor-s)
- [CP s](#cp-s)
- [INC r](#inc-r)
- [INC (HL)](#inc-hl)
- [INC (IX+d)](#inc-ixd)
- [INC (IY+d)](#inc-iyd)
- [DEC m](#dec-m)

Bit sxemalarida har bir qator bitta byte: birinchi katak byte tartib raqami, keyingi sakkiz katak bit 7 dan bit 0 gacha, oxirgi katak hex code yoki operand turidir. r₂, r₁, r₀ register code bitlarini bildiradi. n va d butun byte ni egallaydi; n₇…n₀ va d₇…d₀ ularning alohida bitlaridir. d — two’s-complement displacement. CY — Carry Flag (F registerdagi C).

Manbada ayrim joylarda IY o‘rniga `lY` yozilgan; bunday yozuvlar formula va tegishli manba qiymatlarida saqlandi.

# ADD A, r

### Operation

`A ← A + r`

### Op Code

`ADD`

### Operands

`A, r`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `0` | `0` | `0` | `0` | `r₂` | `r₁` | `r₀` | `register code` |

### Description

r register tarkibi Accumulator tarkibiga qo‘shiladi va natija Accumulatorda saqlanadi. r belgisi A, B, C, D, E, H yoki L registerlarni bildiradi; ularning object code qiymatlari quyidagi jadvalda berilgan.

| Register | Register code |
| --- | ----- |
| `A` | `111` |
| `B` | `000` |
| `C` | `001` |
| `D` | `010` |
| `E` | `011` |
| `H` | `100` |
| `L` | `101` |

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 3 dan carry bo‘lsa, H set qilinadi; aks holda reset qilinadi. Overflow bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. Bit 7 dan carry bo‘lsa, C set qilinadi; aks holda reset qilinadi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 1        | 4        | 1.00            |

### Misol

Accumulatorda 44h va Register C da 11h bo‘lsa, `ADD A, C` bajarilgach, Accumulatorda 55h bo‘ladi.

# ADD A, n

### Operation

`A ← A + n`

### Op Code

`ADD`

### Operands

`A, n`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `0` | `0` | `1` | `1` | `0` | `C6` |
| 2 | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — butun byte` |

### Description

n integer Accumulator tarkibiga qo‘shiladi va natija Accumulatorda saqlanadi.

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 3 dan carry bo‘lsa, H set qilinadi; aks holda reset qilinadi. Overflow bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. Bit 7 dan carry bo‘lsa, C set qilinadi; aks holda reset qilinadi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 2        | 7 (4, 3) | 1.75            |

### Misol

Accumulatorda 23h bo‘lsa, `ADD A, 33h` bajarilgach, Accumulatorda 56h bo‘ladi.

# ADD A, (HL)

### Operation

`A ← A + (HL)`

### Op Code

`ADD`

### Operands

`A, (HL)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `0` | `0` | `0` | `0` | `1` | `1` | `0` | `86` |

### Description

HL register pair ko‘rsatgan memory addressdagi byte Accumulator tarkibiga qo‘shiladi va natija Accumulatorda saqlanadi.

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 3 dan carry bo‘lsa, H set qilinadi; aks holda reset qilinadi. Overflow bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. Bit 7 dan carry bo‘lsa, C set qilinadi; aks holda reset qilinadi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 2        | 7 (4, 3) | 1.75            |

### Misol

Accumulatorda A0h, HL register pairda 2323h va 2323h memory locationda 08h bo‘lsa, `ADD A, (HL)` bajarilgach, Accumulatorda A8h bo‘ladi.

# ADD A, (IX + d)

### Operation

`A ← A + (IX+d)`

### Op Code

`ADD`

### Operands

`A, (IX + d)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` |
| 2 | `1` | `0` | `0` | `0` | `0` | `1` | `1` | `0` | `86` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

### Description

Index Register IX (IX register pair) tarkibiga two’s complement displacement d qo‘shilib, memory address aniqlanadi. So‘ng shu address tarkibi Accumulator tarkibiga qo‘shiladi va natija Accumulatorda saqlanadi.

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 3 dan carry bo‘lsa, H set qilinadi; aks holda reset qilinadi. Overflow bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. Bit 7 dan carry bo‘lsa, C set qilinadi; aks holda reset qilinadi.

### Timing

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

### Misol

Accumulatorda 11h, Index Register IX da 1000h va 1005h memory locationda 22h bo‘lsa, `ADD A, (IX + 5h)` bajarilgach, Accumulatorda 33h bo‘ladi.

# ADD A, (IY + d)

### Operation

`A ← A + (IY+d)`

### Op Code

`ADD`

### Operands

`A, (IY + d)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` |
| 2 | `1` | `0` | `0` | `0` | `0` | `1` | `1` | `0` | `86` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

### Description

Index Register IY (IY register pair) tarkibiga two’s complement displacement d qo‘shilib, memory address aniqlanadi. So‘ng shu address tarkibi Accumulator tarkibiga qo‘shiladi va natija Accumulatorda saqlanadi.

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 3 dan carry bo‘lsa, H set qilinadi; aks holda reset qilinadi. Overflow bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. Bit 7 dan carry bo‘lsa, C set qilinadi; aks holda reset qilinadi.

### Timing

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

### Misol

Accumulatorda 11h, Index Register IY da 1000h va 1005h memory locationda 22h bo‘lsa, `ADD A, (IY + 5h)` bajarilgach, Accumulatorda 33h bo‘ladi.

# ADC A, s

### Operation

`A ← A + s + CY`

### Op Code

`ADC`

### Operands

`A, s`

s operand mos ravishda ADD instructionlarida ta’riflangan r, n, (HL), (IX+d) yoki (lY+d) qiymatlardan biri bo‘lishi mumkin. Quyida mumkin bo‘lgan op code/operand kombinatsiyalarining object code sxemalari berilgan.

#### ADC A, r

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `0` | `0` | `0` | `1` | `r₂` | `r₁` | `r₀` | `register code` |

#### ADC A, n

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `0` | `1` | `1` | `1` | `0` | `CE` |
| 2 | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — butun byte` |

#### ADC A, (HL)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `0` | `0` | `0` | `1` | `1` | `1` | `0` | `8E` |

#### ADC A, (IX+d)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` |
| 2 | `1` | `0` | `0` | `0` | `1` | `1` | `1` | `0` | `8E` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

#### ADC A, (IY+d)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` |
| 2 | `1` | `0` | `0` | `0` | `1` | `1` | `1` | `0` | `8E` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

### Description

s operand va Carry Flag (F registerdagi C) Accumulator tarkibiga qo‘shiladi va natija Accumulatorda saqlanadi.

r B, C, D, E, H, L yoki A registerlarni bildiradi; ularning object code qiymatlari quyida berilgan.

| Register | Register code |
| --- | ----- |
| `B` | `000` |
| `C` | `001` |
| `D` | `010` |
| `E` | `011` |
| `H` | `100` |
| `L` | `101` |
| `A` | `111` |

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 3 dan carry bo‘lsa, H set qilinadi; aks holda reset qilinadi. Overflow bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. Bit 7 dan carry bo‘lsa, C set qilinadi; aks holda reset qilinadi.

### Timing

| Instruction     | M Cycles | T States           | 4 MHz E.T. (µs) |
| --------------- | -------- | ------------------ | --------------- |
| `ADC A, r`      | 1        | 4                  | 1.00            |
| `ADC A, n`      | 2        | 7 (4, 3)           | 1.75            |
| `ADC A, (HL)`   | 2        | 7 (4, 3)           | 1.75            |
| `ADC A, (IX+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |
| `ADC A, (IY+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

### Misol

Accumulatorda 16h, Carry Flag set holatida, HL register pairda 6666h va 6666h addressda 10h bo‘lsa, `ADC A, (HL)` bajarilgach, Accumulatorda 27h bo‘ladi.

# SUB s

### Operation

`A ← A – s`

### Op Code

`SUB`

### Operand

`s`

s operand mos ravishda ADD instructionlarida ta’riflangan r, n, (HL), (IX+d) yoki (lY+d) qiymatlardan biri bo‘lishi mumkin. Quyida mumkin bo‘lgan op code/operand kombinatsiyalarining object code sxemalari berilgan.

#### SUB r

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `0` | `0` | `1` | `0` | `r₂` | `r₁` | `r₀` | `register code` |

#### SUB n

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `0` | `1` | `1` | `0` | `D6` |
| 2 | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — butun byte` |

#### SUB (HL)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `0` | `96` |

#### SUB (IX+d)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` |
| 2 | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `0` | `96` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

#### SUB (IY+d)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` |
| 2 | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `0` | `96` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

### Description

s operand Accumulator tarkibidan ayiriladi va natija Accumulatorda saqlanadi.

r B, C, D, E, H, L yoki A registerlarni bildiradi; ularning object code qiymatlari quyida berilgan.

| Register | Register code |
| --- | ----- |
| `B` | `000` |
| `C` | `001` |
| `D` | `010` |
| `E` | `011` |
| `H` | `100` |
| `L` | `101` |
| `A` | `111` |

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 4 dan borrow bo‘lsa, H set qilinadi; aks holda reset qilinadi. Overflow bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N set qilinadi. Borrow bo‘lsa, C set qilinadi; aks holda reset qilinadi.

### Timing

| Instruction  | M Cycles | T States           | 4 MHz E.T. (µs) |
| ------------ | -------- | ------------------ | --------------- |
| `SUB r`      | 1        | 4                  | 1.00            |
| `SUB n`      | 2        | 7 (4, 3)           | 1.75            |
| `SUB (HL)`   | 2        | 7 (4, 3)           | 1.75            |
| `SUB (IX+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |
| `SUB (IY+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

### Misol

Accumulatorda 29h va D registerda 11h bo‘lsa, `SUB D` bajarilgach, Accumulatorda 18h bo‘ladi.

# SBC A, s

### Operation

`A ← A – s – CY`

### Op Code

`SBC`

### Operands

`A, s`

s operand mos ravishda ADD instructionlarida ta’riflangan r, n, (HL), (IX+d) yoki (lY+d) qiymatlardan biri bo‘lishi mumkin. Quyida mumkin bo‘lgan op code/operand kombinatsiyalarining object code sxemalari berilgan.

#### SBC A, r

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `0` | `0` | `1` | `1` | `r₂` | `r₁` | `r₀` | `register code` |

#### SBC A, n

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `1` | `0` | `DE` |
| 2 | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — butun byte` |

#### SBC A, (HL)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `0` | `0` | `1` | `1` | `1` | `1` | `0` | `9E` |

#### SBC A, (IX+d)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` |
| 2 | `1` | `0` | `0` | `1` | `1` | `1` | `1` | `0` | `9E` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

#### SBC A, (IY+d)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` |
| 2 | `1` | `0` | `0` | `1` | `1` | `1` | `1` | `0` | `9E` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

### Description

s operand va Carry flag (F registerdagi C) Accumulator tarkibidan ayiriladi va natija Accumulatorda saqlanadi.

r B, C, D, E, H, L yoki A registerlarni bildiradi; ularning object code qiymatlari quyida berilgan.

| Register | Register code |
| --- | ----- |
| `B` | `000` |
| `C` | `001` |
| `D` | `010` |
| `E` | `011` |
| `H` | `100` |
| `L` | `101` |
| `A` | `111` |

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 4 dan borrow bo‘lsa, H set qilinadi; aks holda reset qilinadi. Overflow bo‘lsa, P/V reset qilinadi; aks holda ham reset qilinadi. N set qilinadi. Borrow bo‘lsa, C set qilinadi; aks holda reset qilinadi.

### Timing

| Instruction     | M Cycles | T States           | 4 MHz E.T. (µs) |
| --------------- | -------- | ------------------ | --------------- |
| `SBC A, r`      | 1        | 4                  | 1.00            |
| `SBC A, n`      | 2        | 7 (4, 3)           | 1.75            |
| `SBC A, (HL)`   | 2        | 7 (4, 3)           | 1.75            |
| `SBC A, (IX+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |
| `SBC A, (IY+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

### Misol

Accumulatorda 16h, carry flag set holatida, HL register pairda 3433h va 3433h addressda 05h bo‘lsa, `SBC A, (HL)` bajarilgach, Accumulatorda 10h bo‘ladi.

Manba izohi: Manbada P/V uchun overflow holatida ham, boshqa holatda ham reset yozilgan. Ushbu matn saqlandi.

# AND s

### Operation

`A ← A ˄ s`

### Op Code

`AND`

### Operand

`s`

s operand mos ravishda ADD instructionlarida ta’riflangan r, n, (HL), (IX+d) yoki (lY+d) qiymatlardan biri bo‘lishi mumkin. Quyida mumkin bo‘lgan op code/operand kombinatsiyalarining object code sxemalari berilgan.

#### AND r

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `0` | `1` | `0` | `0` | `r₂` | `r₁` | `r₀` | `register code` |

#### AND n

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `0` | `0` | `1` | `1` | `0` | `E6` |
| 2 | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — butun byte` |

#### AND (HL)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `0` | `1` | `0` | `0` | `1` | `1` | `0` | `A6` |

#### AND (IX+d)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` |
| 2 | `1` | `0` | `1` | `0` | `0` | `1` | `1` | `0` | `A6` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

#### AND (IY+d)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` |
| 2 | `1` | `0` | `1` | `0` | `0` | `1` | `1` | `0` | `A6` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

### Description

s operand ko‘rsatgan byte bilan Accumulatordagi byte o‘rtasida logical AND operation bajariladi; natija Accumulatorda saqlanadi.

r B, C, D, E, H, L yoki A registerlarni bildiradi; ularning object code qiymatlari quyida berilgan.

| Register | Register code |
| --- | ----- |
| `B` | `000` |
| `C` | `001` |
| `D` | `010` |
| `E` | `011` |
| `H` | `100` |
| `L` | `101` |
| `A` | `111` |

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H set qilinadi. Overflow bo‘lsa, P/V reset qilinadi; aks holda ham reset qilinadi. N reset qilinadi. C reset qilinadi.

### Timing

| Instruction  | M Cycles | T States           | 4 MHz E.T. (µs) |
| ------------ | -------- | ------------------ | --------------- |
| `AND r`      | 1        | 4                  | 1.00            |
| `AND n`      | 2        | 7 (4, 3)           | 1.75            |
| `AND (HL)`   | 2        | 7 (4, 3)           | 1.75            |
| `AND (IX+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |
| `AND (IY+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

### Misol

B registerda 7Bh (0111 1011) va Accumulatorda C3h (1100 0011) bo‘lsa, `AND B` bajarilgach, Accumulatorda 43h (0100 0011) bo‘ladi.

Manba izohi: Manbada P/V uchun overflow holatida ham, boshqa holatda ham reset yozilgan. Timing jadvalidagi takrorlangan IX qatori IY ga va T States yozuvi to‘g‘ri formatga tuzatildi.

# OR s

### Operation

`A ← A ˅ s`

### Op Code

`OR`

### Operand

`s`

s operand mos ravishda ADD instructionlarida ta’riflangan r, n, (HL), (IX+d) yoki (lY+d) qiymatlardan biri bo‘lishi mumkin. Quyida mumkin bo‘lgan op code/operand kombinatsiyalarining object code sxemalari berilgan.

#### OR r

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `0` | `1` | `1` | `0` | `r₂` | `r₁` | `r₀` | `register code` |

#### OR n

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `F6` |
| 2 | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — butun byte` |

#### OR (HL)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `0` | `1` | `1` | `0` | `1` | `1` | `0` | `B6` |

#### OR (IX+d)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` |
| 2 | `1` | `0` | `1` | `1` | `0` | `1` | `1` | `0` | `B6` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

#### OR (IY+d)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` |
| 2 | `1` | `0` | `1` | `1` | `0` | `1` | `1` | `0` | `B6` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

### Description

s operand ko‘rsatgan byte bilan Accumulatordagi byte o‘rtasida logical OR operation bajariladi; natija Accumulatorda saqlanadi.

r B, C, D, E, H, L yoki A registerlarni bildiradi; ularning object code qiymatlari quyida berilgan.

| Register | Register code |
| --- | ----- |
| `B` | `000` |
| `C` | `001` |
| `D` | `010` |
| `E` | `011` |
| `H` | `100` |
| `L` | `101` |
| `A` | `111` |

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H reset qilinadi. Overflow bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C reset qilinadi.

### Timing

| Instruction | M Cycles | T States           | 4 MHz E.T. (µs) |
| ----------- | -------- | ------------------ | --------------- |
| `OR r`      | 1        | 4                  | 1.00            |
| `OR n`      | 2        | 7 (4, 3)           | 1.75            |
| `OR (HL)`   | 2        | 7 (4, 3)           | 1.75            |
| `OR (IX+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |
| `OR (IY+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

### Misol

H registerda 48h (0100 0100) va Accumulatorda 12h (0001 0010) bo‘lsa, `OR H` bajarilgach, Accumulatorda 5Ah (01011010) bo‘ladi.

Manba izohi: Manba misolida 48h uchun `0100 0100` yozilgan; 48h ga mos bit qiymati `0100 1000`. Misoldagi asl bit matni saqlandi.

Manba izohi: Manbaning operandlar haqidagi gapida `C–` yozilgan; register code jadvalida C berilgan.

# XOR s

### Operation

`A ← A ⊕ s`

### Op Code

`XOR`

### Operand

`s`

s operand mos ravishda ADD instructionlarida ta’riflangan r, n, (HL), (IX+d) yoki (lY+d) qiymatlardan biri bo‘lishi mumkin. Quyida mumkin bo‘lgan op code/operand kombinatsiyalarining object code sxemalari berilgan.

#### XOR r

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `0` | `1` | `0` | `1` | `r₂` | `r₁` | `r₀` | `register code` |

#### XOR n

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `EE` |
| 2 | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — butun byte` |

#### XOR (HL)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `0` | `1` | `0` | `1` | `1` | `1` | `0` | `AE` |

#### XOR (IX+d)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` |
| 2 | `1` | `0` | `1` | `0` | `1` | `1` | `1` | `0` | `AE` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

#### XOR (IY+d)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` |
| 2 | `1` | `0` | `1` | `0` | `1` | `1` | `1` | `0` | `AE` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

### Description

s operand ko‘rsatgan byte bilan Accumulatordagi byte o‘rtasida logical exclusive-OR operation bajariladi; natija Accumulatorda saqlanadi.

r B, C, D, E, H, L yoki A registerlarni bildiradi; ularning object code qiymatlari quyida berilgan.

| Register | Register code |
| --- | ----- |
| `B` | `000` |
| `C` | `001` |
| `D` | `010` |
| `E` | `011` |
| `H` | `100` |
| `L` | `101` |
| `A` | `111` |

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H reset qilinadi. Parity even bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C reset qilinadi.

### Timing

| Instruction  | M Cycles | T States           | 4 MHz E.T. (µs) |
| ------------ | -------- | ------------------ | --------------- |
| `XOR r`      | 1        | 4                  | 1.00            |
| `XOR n`      | 2        | 7 (4, 3)           | 1.75            |
| `XOR (HL)`   | 2        | 7 (4, 3)           | 1.75            |
| `XOR (IX+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |
| `XOR (IY+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

### Misol

Accumulatorda 96h (1001 0110) bo‘lsa, `XOR 5Dh` (5Dh = 0101 1101) bajarilgach, Accumulatorda CBh (1100 1011) bo‘ladi.

# CP s

### Operation

`A – s`

### Op Code

`CP`

### Operand

`s`

s operand mos ravishda ADD instructionlarida ta’riflangan r, n, (HL), (IX+d) yoki (lY+d) qiymatlardan biri bo‘lishi mumkin. Quyida mumkin bo‘lgan op code/operand kombinatsiyalarining object code sxemalari berilgan.

#### CP r

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `0` | `1` | `1` | `1` | `r₂` | `r₁` | `r₀` | `register code` |

#### CP n

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `FE` |
| 2 | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — butun byte` |

#### CP (HL)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `0` | `1` | `1` | `1` | `1` | `1` | `0` | `BE` |

#### CP (IX+d)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` |
| 2 | `1` | `0` | `1` | `1` | `1` | `1` | `1` | `0` | `BE` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

#### CP (IY+d)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` |
| 2 | `1` | `0` | `1` | `1` | `1` | `1` | `1` | `0` | `BE` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

### Description

s operand tarkibi Accumulator tarkibi bilan taqqoslanadi. Qiymatlar teng bo‘lsa, Z flag set qilinadi. Instruction bajarilishi Accumulator tarkibiga ta’sir qilmaydi.

r B, C, D, E, H, L yoki A registerlarni bildiradi; ularning object code qiymatlari quyida berilgan.

| Register | Register code |
| --- | ----- |
| `B` | `000` |
| `C` | `001` |
| `D` | `010` |
| `E` | `011` |
| `H` | `100` |
| `L` | `101` |
| `A` | `111` |

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 4 dan borrow bo‘lsa, H set qilinadi; aks holda reset qilinadi. Overflow bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N set qilinadi. Borrow bo‘lsa, C set qilinadi; aks holda reset qilinadi.

### Timing

| Instruction | M Cycles | T States           | 4 MHz E.T. (µs) |
| ----------- | -------- | ------------------ | --------------- |
| `CP r`      | 1        | 4                  | 1.00            |
| `CP n`      | 2        | 7 (4, 3)           | 1.75            |
| `CP (HL)`   | 2        | 7 (4, 3)           | 1.75            |
| `CP (IX+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |
| `CP (IY+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

### Misol

Accumulatorda 63h, HL register pairda 6000h va 6000h memory locationda 60h bo‘lsa, `CP (HL)` bajarilgach, F registerdagi PN flag reset qilinadi.

Manba izohi: Misoldagi `PN` flag nomi manbadagidek saqlandi; Condition Bits Affected bo‘limida P/V belgisi ishlatilgan.

# INC r

### Operation

`r ← r + 1`

### Op Code

`INC`

### Operand

`r`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `0` | `0` | `r₂` | `r₁` | `r₀` | `1` | `0` | `0` | `register code` |

### Description

r register birga oshiriladi. r A, B, C, D, E, H yoki L registerlardan birini bildiradi; ularning object code qiymatlari quyidagi jadvalda berilgan.

| Register | Register code |
| --- | ----- |
| `A` | `111` |
| `B` | `000` |
| `C` | `001` |
| `D` | `010` |
| `E` | `011` |
| `H` | `100` |
| `L` | `101` |

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 3 dan carry bo‘lsa, H set qilinadi; aks holda reset qilinadi. Operationdan oldin r 7Fh bo‘lgan bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 1        | 4        | 1.00            |

### Misol

D registerda 28h bo‘lsa, `INC D` bajarilgach, D registerda 29h bo‘ladi.

# INC (HL)

### Operation

`(HL) ← (HL) + 1`

### Op Code

`INC`

### Operand

`(HL)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `0` | `0` | `1` | `1` | `0` | `1` | `0` | `0` | `34` |

### Description

HL register pair ko‘rsatgan addressdagi byte birga oshiriladi.

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 3 dan carry bo‘lsa, H set qilinadi; aks holda reset qilinadi. Operationdan oldin (HL) 7Fh bo‘lgan bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States     | 4 MHz E.T. (µs) |
| -------- | ------------ | --------------- |
| 3        | 11 (4, 4, 3) | 2.75            |

### Misol

HL register pairda 3434h va 3434h addressda 82h bo‘lsa, `INC (HL)` bajarilgach, 3434h memory locationda 83h bo‘ladi.

# INC (IX+d)

### Operation

`(IX+d) ← (IX+d) + 1`

### Op Code

`INC`

### Operands

`(IX+d)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` |
| 2 | `0` | `0` | `1` | `1` | `0` | `1` | `0` | `0` | `34` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

### Description

Index Register IX (IX register pair) tarkibiga two’s-complement displacement integer d qo‘shilib, memory address aniqlanadi. So‘ng shu address tarkibi birga oshiriladi.

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 3 dan carry bo‘lsa, H set qilinadi; aks holda reset qilinadi. Operationdan oldin (IX+d) 7Fh bo‘lgan bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States              | 4 MHz E.T. (µs) |
| -------- | --------------------- | --------------- |
| 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |

### Misol

Index Register IX da 2020h va 2030h memory locationda 34h bo‘lsa, `INC (IX+10h)` bajarilgach, 2030h memory locationda 35h bo‘ladi.

# INC (IY+d)

### Operation

`(lY+d) ← (lY+d) + 1`

### Op Code

`INC`

### Operands

`(lY+d)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` |
| 2 | `0` | `0` | `1` | `1` | `0` | `1` | `0` | `0` | `34` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

### Description

Index Register IY (IY register pair) tarkibiga two’s-complement displacement integer d qo‘shilib, memory address aniqlanadi. So‘ng shu address tarkibi birga oshiriladi.

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 3 dan carry bo‘lsa, H set qilinadi; aks holda reset qilinadi. Operationdan oldin (lY+d) 7Fh bo‘lgan bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States              | 4 MHz E.T. (µs) |
| -------- | --------------------- | --------------- |
| 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |

### Misol

Index Register IY da 2020h va 2030h memory locationda 34h bo‘lsa, `INC (IY+10h)` bajarilgach, 2030h memory locationda 35h bo‘ladi.

# DEC m

### Operation

`m ← m – 1`

### Op Code

`DEC`

### Operand

`m`

m operand mos ravishda INC instructionlarida ta’riflangan r, (HL), (IX+d) yoki (lY+d) qiymatlardan biri bo‘lishi mumkin. Quyida mumkin bo‘lgan op code/operand kombinatsiyalarining object code sxemalari berilgan.

#### DEC r

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `0` | `0` | `r₂` | `r₁` | `r₀` | `1` | `0` | `1` | `register code` |

#### DEC (HL)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `0` | `0` | `1` | `1` | `0` | `1` | `0` | `1` | `35` |

#### DEC (IX+d)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` |
| 2 | `0` | `0` | `1` | `1` | `0` | `1` | `0` | `1` | `35` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

#### DEC (IY+d)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` |
| 2 | `0` | `0` | `1` | `1` | `0` | `1` | `0` | `1` | `35` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` |

### Description

m operand ko‘rsatgan byte birga kamaytiriladi.

r B, C, D, E, H, L yoki A registerlarni bildiradi; ularning object code qiymatlari quyida berilgan.

| Register | Register code |
| --- | ----- |
| `B` | `000` |
| `C` | `001` |
| `D` | `010` |
| `E` | `011` |
| `H` | `100` |
| `L` | `101` |
| `A` | `111` |

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 4 dan borrow bo‘lsa, H set qilinadi; aks holda reset qilinadi. Operationdan oldin m 80h bo‘lgan bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N set qilinadi. C o‘zgarmaydi.

### Timing

| Instruction  | M Cycles | T States              | 4 MHz E.T. (µs) |
| ------------ | -------- | --------------------- | --------------- |
| `DEC r`      | 1        | 4                     | 1.00            |
| `DEC (HL)`   | 3        | 11 (4, 4, 3)          | 2.75            |
| `DEC (IX+d)` | 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |
| `DEC (IY+d)` | 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |

### Misol

D registerda 2Ah bo‘lsa, `DEC D` bajarilgach, D registerda 29h bo‘ladi.
