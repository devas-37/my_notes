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

Bit sxemalarida har bir qator bitta byte: birinchi katak byte tartib raqami, keyingi sakkiz katak bit 7 dan bit 0 gacha, so‘ng hex code yoki operand turi, oxirgi katak esa manbadagi bit matnidir. Manbadagi ayrim bit satrlari hex code bilan mos kelmaydi; bit kataklari shu hex codega mos berildi, asl bit matni ham saqlandi. r₂, r₁, r₀ register code bitlarini bildiradi. n va d butun byte ni egallaydi; n₇…n₀ va d₇…d₀ ularning alohida bitlaridir. d — two’s-complement displacement. CY — Carry Flag (F registerdagi C).

Manbada ayrim joylarda IY o‘rniga `lY` yozilgan; bunday yozuvlar formula va tegishli manba qiymatlarida saqlandi.

# ADD A, r

### Operation

`A ← A + r`

### Op Code

`ADD`

### Operands

`A, r`

|     |     |     |     |     |     |      |      |      |                 |          |
| --- | --- | --- | --- | --- | --- | ---- | ---- | ---- | --------------- | -------- |
| 1   | `1` | `0` | `0` | `0` | `0` | `r₂` | `r₁` | `r₀` | `register code` | `100r00` |

### Description

r register tarkibi Accumulator tarkibiga qo‘shiladi va natija Accumulatorda saqlanadi. r belgisi A, B, C, D, E, H yoki L registerlarni bildiradi; ularning object code qiymatlari quyidagi jadvalda berilgan.

|     |       |
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

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `0`  | `0`  | `1`  | `1`  | `0`  | `C6`             | `11010100` |
| 2   | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — butun byte` | `n`        |

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

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `0` | `0` | `0` | `0` | `1` | `1` | `0` | `86` | `10010100` |

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

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `1`  | `DD`             | `11101101` |
| 2   | `1`  | `0`  | `0`  | `0`  | `0`  | `1`  | `1`  | `0`  | `86`             | `10010100` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

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

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1`  | `FD`             | `11101111` |
| 2   | `1`  | `0`  | `0`  | `0`  | `0`  | `1`  | `1`  | `0`  | `86`             | `10010100` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

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

|     |     |     |     |     |     |      |      |      |                 |            |
| --- | --- | --- | --- | --- | --- | ---- | ---- | ---- | --------------- | ---------- |
| 1   | `1` | `0` | `0` | `0` | `1` | `r₂` | `r₁` | `r₀` | `register code` | `10001 r*` |

#### ADC A, n

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `0`  | `1`  | `1`  | `1`  | `0`  | `CE`             | `11010101` |
| 2   | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — butun byte` | `n`        |

#### ADC A, (HL)

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `0` | `0` | `0` | `1` | `1` | `1` | `0` | `8E` | `10010101` |

#### ADC A, (IX+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `1`  | `DD`             | `11110101` |
| 2   | `1`  | `0`  | `0`  | `0`  | `1`  | `1`  | `1`  | `0`  | `8E`             | `10010101` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

#### ADC A, (IY+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1`  | `FD`             | `11101111` |
| 2   | `1`  | `0`  | `0`  | `0`  | `1`  | `1`  | `1`  | `0`  | `8E`             | `10010101` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

### Description

s operand va Carry Flag (F registerdagi C) Accumulator tarkibiga qo‘shiladi va natija Accumulatorda saqlanadi.

r B, C, D, E, H, L yoki A registerlarni bildiradi; ularning object code qiymatlari quyida berilgan.

|     |       |
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
| `ADC A, (lY+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

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

|     |     |     |     |     |     |      |      |      |                 |            |
| --- | --- | --- | --- | --- | --- | ---- | ---- | ---- | --------------- | ---------- |
| 1   | `1` | `0` | `0` | `1` | `0` | `r₂` | `r₁` | `r₀` | `register code` | `10100 r*` |

#### SUB n

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `0`  | `1`  | `1`  | `0`  | `D6`             | `11110100` |
| 2   | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — butun byte` | `n`        |

#### SUB (HL)

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `0` | `96` | `10110100` |

#### SUB (IX+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `1`  | `DD`             | `11101101` |
| 2   | `1`  | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `0`  | `96`             | `10110100` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

#### SUB (IY+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1`  | `FD`             | `11101111` |
| 2   | `1`  | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `0`  | `96`             | `10110100` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

### Description

s operand Accumulator tarkibidan ayiriladi va natija Accumulatorda saqlanadi.

r B, C, D, E, H, L yoki A registerlarni bildiradi; ularning object code qiymatlari quyida berilgan.

|     |       |
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
| `SUB (lY+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

### Misol

Accumulatorda 29h va D registerda 11h bo‘lsa, `SUB D` bajarilgach, Accumulatorda 18h bo‘ladi.

Manba izohi: Manbadagi register bit maydoni `10100 r*` ko‘rinishida berilgan. Bu shu fayldagi `SUB (HL)` uchun 96 hex code bilan mos kelmaydi; jadvalda ushbu hex codega mos `10010 r₂ r₁ r₀` ko‘rsatilgan.

# SBC A, s

### Operation

`A ← A – s – CY`

### Op Code

`SBC`

### Operands

`A, s`

s operand mos ravishda ADD instructionlarida ta’riflangan r, n, (HL), (IX+d) yoki (lY+d) qiymatlardan biri bo‘lishi mumkin. Quyida mumkin bo‘lgan op code/operand kombinatsiyalarining object code sxemalari berilgan.

#### SBC A, r

|     |     |     |     |     |     |      |      |      |                 |            |
| --- | --- | --- | --- | --- | --- | ---- | ---- | ---- | --------------- | ---------- |
| 1   | `1` | `0` | `0` | `1` | `1` | `r₂` | `r₁` | `r₀` | `register code` | `10101 r*` |

#### SBC A, n

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `1`  | `0`  | `DE`             | `11110101` |
| 2   | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — butun byte` | `n`        |

#### SBC A, (HL)

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `0` | `0` | `1` | `1` | `1` | `1` | `0` | `9E` | `10110101` |

#### SBC A, (IX+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `1`  | `DD`             | `11101101` |
| 2   | `1`  | `0`  | `0`  | `1`  | `1`  | `1`  | `1`  | `0`  | `9E`             | `10110101` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

#### SBC A, (IY+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1`  | `FD`             | `11101111` |
| 2   | `1`  | `0`  | `0`  | `1`  | `1`  | `1`  | `1`  | `0`  | `9E`             | `10110101` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

### Description

s operand va Carry flag (F registerdagi C) Accumulator tarkibidan ayiriladi va natija Accumulatorda saqlanadi.

r B, C, D, E, H, L yoki A registerlarni bildiradi; ularning object code qiymatlari quyida berilgan.

|     |       |
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
| `SBC A, (lY+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

### Misol

Accumulatorda 16h, carry flag set holatida, HL register pairda 3433h va 3433h addressda 05h bo‘lsa, `SBC A, (HL)` bajarilgach, Accumulatorda 10h bo‘ladi.

Manba izohi: Manbadagi register bit maydoni `10101 r*` ko‘rinishida berilgan; jadvalda shu fayldagi 9E hex codega mos `10011 r₂ r₁ r₀` ko‘rsatilgan.

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

|     |     |     |     |     |     |      |      |      |                 |            |
| --- | --- | --- | --- | --- | --- | ---- | ---- | ---- | --------------- | ---------- |
| 1   | `1` | `0` | `1` | `0` | `0` | `r₂` | `r₁` | `r₀` | `register code` | `10010 r*` |

#### AND n

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `0`  | `0`  | `1`  | `1`  | `0`  | `E6`             | `11010110` |
| 2   | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — butun byte` | `nn`       |

#### AND (HL)

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `0` | `1` | `0` | `0` | `1` | `1` | `0` | `A6` | `10010110` |

#### AND (IX+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `1`  | `DD`             | `11101101` |
| 2   | `1`  | `0`  | `1`  | `0`  | `0`  | `1`  | `1`  | `0`  | `A6`             | `10010110` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

#### AND (IY+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1`  | `FD`             | `11101111` |
| 2   | `1`  | `0`  | `1`  | `0`  | `0`  | `1`  | `1`  | `0`  | `A6`             | `10010110` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

### Description

s operand ko‘rsatgan byte bilan Accumulatordagi byte o‘rtasida logical AND operation bajariladi; natija Accumulatorda saqlanadi.

r B, C, D, E, H, L yoki A registerlarni bildiradi; ularning object code qiymatlari quyida berilgan.

|     |       |
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
| `AND (IX+d)` | 5        | 19 (4, 4, 3. 5, 3) | 4.75            |

### Misol

B registerda 7Bh (0111 1011) va Accumulatorda C3h (1100 0011) bo‘lsa, `AND B` bajarilgach, Accumulatorda 43h (0100 0011) bo‘ladi.

Manba izohi: Manbadagi register bit maydoni `10010 r*` ko‘rinishida berilgan; jadvalda shu fayldagi A6 hex codega mos `10100 r₂ r₁ r₀` ko‘rsatilgan.

Manba izohi: Immediate sxemadagi `nn` matni manbada qo‘shilib qolgan; instruction `AND n` sifatida berilganligi uchun n bitta to‘liq byte qatorida ko‘rsatildi.

Manba izohi: Manbada P/V uchun overflow holatida ham, boshqa holatda ham reset yozilgan. Timing jadvalining oxirgi qatori ham `AND (IX+d)` deb takrorlangan va T States tarkibida `(4, 4, 3. 5, 3)` yozilgan; bu qiymatlar jadvalda saqlandi.

# OR s

### Operation

`A ← A ˅ s`

### Op Code

`OR`

### Operand

`s`

s operand mos ravishda ADD instructionlarida ta’riflangan r, n, (HL), (IX+d) yoki (lY+d) qiymatlardan biri bo‘lishi mumkin. Quyida mumkin bo‘lgan op code/operand kombinatsiyalarining object code sxemalari berilgan.

#### OR r

|     |     |     |     |     |     |      |      |      |                 |            |
| --- | --- | --- | --- | --- | --- | ---- | ---- | ---- | --------------- | ---------- |
| 1   | `1` | `0` | `1` | `1` | `0` | `r₂` | `r₁` | `r₀` | `register code` | `10110 r*` |

#### OR n

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `0`  | `1`  | `1`  | `0`  | `F6`             | `11110110` |
| 2   | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — butun byte` | `n`        |

#### OR (HL)

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `0` | `1` | `1` | `0` | `1` | `1` | `0` | `B6` | `10110110` |

#### OR (IX+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `1`  | `DD`             | `11101101` |
| 2   | `1`  | `0`  | `1`  | `1`  | `0`  | `1`  | `1`  | `0`  | `B6`             | `10110110` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

#### OR (IY+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1`  | `FD`             | `11101111` |
| 2   | `1`  | `0`  | `1`  | `1`  | `0`  | `1`  | `1`  | `0`  | `B6`             | `10110110` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

### Description

s operand ko‘rsatgan byte bilan Accumulatordagi byte o‘rtasida logical OR operation bajariladi; natija Accumulatorda saqlanadi.

r B, C, D, E, H, L yoki A registerlarni bildiradi; ularning object code qiymatlari quyida berilgan.

|     |       |
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
| `OR (lY+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

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

|     |     |     |     |     |     |      |      |      |                 |            |
| --- | --- | --- | --- | --- | --- | ---- | ---- | ---- | --------------- | ---------- |
| 1   | `1` | `0` | `1` | `0` | `1` | `r₂` | `r₁` | `r₀` | `register code` | `10011 r*` |

#### XOR n

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `EE`             | `11010111` |
| 2   | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — butun byte` | `n`        |

#### XOR (HL)

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `0` | `1` | `0` | `1` | `1` | `1` | `0` | `AE` | `10010111` |

#### XOR (IX+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `1`  | `DD`             | `11101101` |
| 2   | `1`  | `0`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `AE`             | `10010111` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

#### XOR (IY+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1`  | `FD`             | `11101111` |
| 2   | `1`  | `0`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `AE`             | `10010111` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

### Description

s operand ko‘rsatgan byte bilan Accumulatordagi byte o‘rtasida logical exclusive-OR operation bajariladi; natija Accumulatorda saqlanadi.

r B, C, D, E, H, L yoki A registerlarni bildiradi; ularning object code qiymatlari quyida berilgan.

|     |       |
| --- | ----- |
| `B` | `000` |
| `C` | `001` |
| `D` | `010` |
| `E` | `011` |
| `H` | `100` |
| `L` | `101` |
| `A` | `1l1` |

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H reset qilinadi. Parity even bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C reset qilinadi.

### Timing

| Instruction  | M Cycles | T States           | 4 MHz E.T. (µs) |
| ------------ | -------- | ------------------ | --------------- |
| `XOR r`      | 1        | 4                  | 1.00            |
| `XOR n`      | 2        | 7 (4, 3)           | 1.75            |
| `XOR (HL)`   | 2        | 7 (4, 3)           | 1.75            |
| `XOR (IX+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |
| `XOR (lY+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

### Misol

Accumulatorda 96h (1001 0110) bo‘lsa, `XOR 5Dh` (5Dh = 0101 1101) bajarilgach, Accumulatorda CBh (1100 1011) bo‘ladi.

Manba izohi: Manbadagi register bit maydoni `10011 r*` ko‘rinishida berilgan; jadvalda shu fayldagi AE hex codega mos `10101 r₂ r₁ r₀` ko‘rsatilgan.

Manba izohi: Register code jadvalida A uchun `1l1` yozilgan; undagi o‘rta belgi kichik l harfidir. Manba qiymati saqlandi.

# CP s

### Operation

`A – s`

### Op Code

`CP`

### Operand

`s`

s operand mos ravishda ADD instructionlarida ta’riflangan r, n, (HL), (IX+d) yoki (lY+d) qiymatlardan biri bo‘lishi mumkin. Quyida mumkin bo‘lgan op code/operand kombinatsiyalarining object code sxemalari berilgan.

#### CP r

|     |     |     |     |     |     |      |      |      |                 |            |
| --- | --- | --- | --- | --- | --- | ---- | ---- | ---- | --------------- | ---------- |
| 1   | `1` | `0` | `1` | `1` | `1` | `r₂` | `r₁` | `r₀` | `register code` | `10111 r*` |

#### CP n

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `FE`             | `11110111` |
| 2   | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — butun byte` | `n`        |

#### CP (HL)

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `0` | `1` | `1` | `1` | `1` | `1` | `0` | `BE` | `10110111` |

#### CP (IX+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `1`  | `DD`             | `11101101` |
| 2   | `1`  | `0`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `BE`             | `10110111` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

#### CP (IY+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1`  | `FD`             | `11101111` |
| 2   | `1`  | `0`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `BE`             | `10110111` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

### Description

s operand tarkibi Accumulator tarkibi bilan taqqoslanadi. Qiymatlar teng bo‘lsa, Z flag set qilinadi. Instruction bajarilishi Accumulator tarkibiga ta’sir qilmaydi.

r B, C, D, E, H, L yoki A registerlarni bildiradi; ularning object code qiymatlari quyida berilgan.

|     |       |
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
| `CP (lY+d)` | 5        | 19 (4, 4, 3, 5, 3) | 4.75            |

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

|     |     |     |      |      |      |     |     |     |                 |          |
| --- | --- | --- | ---- | ---- | ---- | --- | --- | --- | --------------- | -------- |
| 1   | `0` | `0` | `r₂` | `r₁` | `r₀` | `1` | `0` | `0` | `register code` | `00r001` |

### Description

r register birga oshiriladi. r A, B, C, D, E, H yoki L registerlardan birini bildiradi; ularning object code qiymatlari quyidagi jadvalda berilgan.

|     |       |
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

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `0` | `0` | `1` | `1` | `0` | `1` | `0` | `0` | `34` | `00100110` |

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

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `1`  | `DD`             | `11101101` |
| 2   | `0`  | `0`  | `1`  | `1`  | `0`  | `1`  | `0`  | `0`  | `34`             | `00100110` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

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

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1`  | `FD`             | `11101111` |
| 2   | `0`  | `0`  | `1`  | `1`  | `0`  | `1`  | `0`  | `0`  | `34`             | `00100110` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

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

|     |     |     |      |      |      |     |     |     |                 |          |
| --- | --- | --- | ---- | ---- | ---- | --- | --- | --- | --------------- | -------- |
| 1   | `0` | `0` | `r₂` | `r₁` | `r₀` | `1` | `0` | `1` | `register code` | `00r011` |

#### DEC (HL)

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `0` | `0` | `1` | `1` | `0` | `1` | `0` | `1` | `35` | `00101110` |

#### DEC (IX+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `1`  | `DD`             | `11101101` |
| 2   | `0`  | `0`  | `1`  | `1`  | `0`  | `1`  | `0`  | `1`  | `35`             | `00101110` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

#### DEC (IY+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1`  | `FD`             | `11101111` |
| 2   | `0`  | `0`  | `1`  | `1`  | `0`  | `1`  | `0`  | `1`  | `35`             | `00101110` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |

### Description

m operand ko‘rsatgan byte birga kamaytiriladi.

r B, C, D, E, H, L yoki A registerlarni bildiradi; ularning object code qiymatlari quyida berilgan.

|     |       |
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
| `DEC (lY+d)` | 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |

### Misol

D registerda 2Ah bo‘lsa, `DEC D` bajarilgach, D registerda 29h bo‘ladi.
