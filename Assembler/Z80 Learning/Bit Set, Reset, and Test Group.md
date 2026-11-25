---
name: Bit Set, Reset, and Test Group
status: active
pinned: false
deleted: false
tags:
  - z80
  - bit
  - set-reset-test
---

# Bit Set, Reset, and Test Group

Ushbu bo‘limda quyidagi bit set, reset va test group instructionlari tavsiflanadi. Batafsil ma’lumot olish uchun mundarijadagi tegishli instruction havolasini bosing.

## Mundarija

- [BIT b, r](#bit-b-r)
- [BIT b, (HL)](#bit-b-hl)
- [BIT b, (IX+d)](#bit-b-ixd)
- [BIT b, (IY+d)](#bit-b-iyd)
- [SET b, r](#set-b-r)
- [SET b, (HL)](#set-b-hl)
- [SET b, (IX+d)](#set-b-ixd)
- [SET b, (IY+d)](#set-b-iyd)
- [RES b, m](#res-b-m)

Opcode jadvallarida byte tartib raqami, bit 7 dan bit 0 gacha va Hex / Operand ko‘rsatilgan. b₂…b₀ — bit raqami, r₂…r₀ — register code, d₇…d₀ — signed 8-bit displacement. Indexed instruction byte ketma-ketligi: DD yoki FD, CB, d, opcode.

## BIT b, r

### Operation

`Z ← NOT rb`

### Op Code

`BIT`

### Operands

`b, r`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 0 | 0 | 1 | 0 | 1 | 1 | CB |
| 2 | 0 | 1 | b₂ | b₁ | b₀ | r₂ | r₁ | r₀ | b / r field |

### Description

Ushbu instruction r registerdagi b bitni tekshiradi va Z flagni shunga mos o‘rnatadi. Assembled object codedagi b va r operandlar quyidagi bit maydonlari bilan belgilanadi.

Bit tanlash jadvali. Ustunlar tartibi: tekshiriladigan yoki o‘zgartiriladigan bit raqami; b maydoni.

| Bit raqami | b maydoni |
| --- | --- |
| `0` | `000` |
| `1` | `001` |
| `2` | `010` |
| `3` | `011` |
| `4` | `100` |
| `5` | `101` |
| `6` | `110` |
| `7` | `111` |

Register code jadvali. Ustunlar tartibi: register; r maydoni.

| Register | r maydoni |
| --- | --- |
| `B` | `000` |
| `C` | `001` |
| `D` | `010` |
| `E` | `011` |
| `H` | `100` |
| `L` | `101` |
| `A` | `111` |

### Condition Bits Affected

S faqat bit 7 tekshirilganda va u 1 bo‘lganda set qilinadi; aks holda reset qilinadi. Tekshirilayotgan bit 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H set qilinadi. P/V Z bilan bir xil. N reset qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 2 | 8 (4, 4) | 2.00 |

### Misol

B registerdagi bit 2 qiymati 0 bo‘lsa, `BIT 2, B` bajarilgach, F registerdagi Z flag qiymati 1 bo‘ladi, B registerdagi bit 2 esa 0 holatida qoladi. B registerdagi bit 0 — least-significant bit.

## BIT b, (HL)

### Operation

`Z ← NOT (HL)b`

### Op Code

`BIT`

### Operands

`b, (HL)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 0 | 0 | 1 | 0 | 1 | 1 | CB |
| 2 | 0 | 1 | b₂ | b₁ | b₀ | 1 | 1 | 0 | b field |

### Description

Ushbu instruction HL register pair ko‘rsatgan memory locationdagi b bitni tekshiradi va Z flagni shunga mos o‘rnatadi. Assembled object codedagi b operand quyidagi bit maydoni bilan belgilanadi.

Bit tanlash jadvali. Ustunlar tartibi: tekshiriladigan yoki o‘zgartiriladigan bit raqami; b maydoni.

| Bit raqami | b maydoni |
| --- | --- |
| `0` | `000` |
| `1` | `001` |
| `2` | `010` |
| `3` | `011` |
| `4` | `100` |
| `5` | `101` |
| `6` | `110` |
| `7` | `111` |

### Condition Bits Affected

S faqat bit 7 tekshirilganda va u 1 bo‘lganda set qilinadi; aks holda reset qilinadi. Tekshirilayotgan bit 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H set qilinadi. P/V Z bilan bir xil. N reset qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 3 | 12 (4, 4, 4) | 3.00 |

### Misol

HL register pairda 4444h va 4444h memory locationdagi bit 4 qiymati 1 bo‘lsin. `BIT 4, (HL)` bajarilgach, F registerdagi Z flag qiymati 0 bo‘ladi va 4444h memory locationdagi bit 4 qiymati 1 holatida qoladi. 4444h memory locationdagi bit 0 — least-significant bit.

## BIT b, (IX+d)

### Operation

`Z ← NOT (IX+d)b`

### Op Code

`BIT`

### Operands

`b, (IX+d)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 0 | 1 | 1 | 1 | 0 | 1 | DD |
| 2 | 1 | 1 | 0 | 0 | 1 | 0 | 1 | 1 | CB |
| 3 | d₇ | d₆ | d₅ | d₄ | d₃ | d₂ | d₁ | d₀ | d |
| 4 | 0 | 1 | b₂ | b₁ | b₀ | 1 | 1 | 0 | b field |

### Description

Ushbu instruction IX register pair tarkibi va two’s complement displacement d yig‘indisi ko‘rsatgan memory locationdagi b bitni tekshiradi va Z flagni shunga mos o‘rnatadi. Assembled object codedagi b operand quyidagi bit maydoni bilan belgilanadi.

Bit tanlash jadvali. Ustunlar tartibi: tekshiriladigan yoki o‘zgartiriladigan bit raqami; b maydoni.

| Bit raqami | b maydoni |
| --- | --- |
| `0` | `000` |
| `1` | `001` |
| `2` | `010` |
| `3` | `011` |
| `4` | `100` |
| `5` | `101` |
| `6` | `110` |
| `7` | `111` |

### Condition Bits Affected

S faqat bit 7 tekshirilganda va u 1 bo‘lganda set qilinadi; aks holda reset qilinadi. Tekshirilayotgan bit 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H set qilinadi. P/V Z bilan bir xil. N reset qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 5 | 20 (4, 4, 3, 5, 4) | 5.00 |

### Misol

Index Register IX da 2000h va 2004h memory locationdagi bit 6 qiymati 1 bo‘lsin. `BIT 6, (IX+4h)` bajarilgach, F registerdagi Z flag qiymati 0 bo‘ladi, 2004h memory locationdagi bit 6 esa 1 holatida qoladi. 2004h memory locationdagi bit 0 — least-significant bit.

## BIT b, (IY+d)

### Operation

`Z ← NOT (IY+d)b`

### Op Code

`BIT`

### Operands

`b, (IY+d)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 1 | FD |
| 2 | 1 | 1 | 0 | 0 | 1 | 0 | 1 | 1 | CB |
| 3 | d₇ | d₆ | d₅ | d₄ | d₃ | d₂ | d₁ | d₀ | d |
| 4 | 0 | 1 | b₂ | b₁ | b₀ | 1 | 1 | 0 | b field |

### Description

Ushbu instruction IY register pair tarkibi va two’s complement displacement d yig‘indisi ko‘rsatgan memory locationdagi b bitni tekshiradi va Z flagni shunga mos o‘rnatadi. Assembled object codedagi b operand quyidagi bit maydoni bilan belgilanadi.

Bit tanlash jadvali. Ustunlar tartibi: tekshiriladigan yoki o‘zgartiriladigan bit raqami; b maydoni.

| Bit raqami | b maydoni |
| --- | --- |
| `0` | `000` |
| `1` | `001` |
| `2` | `010` |
| `3` | `011` |
| `4` | `100` |
| `5` | `101` |
| `6` | `110` |
| `7` | `111` |

### Condition Bits Affected

S faqat bit 7 tekshirilganda va u 1 bo‘lganda set qilinadi; aks holda reset qilinadi. Tekshirilayotgan bit 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H set qilinadi. P/V Z bilan bir xil. N reset qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 5 | 20 (4, 4, 3, 5, 4) | 5.00 |

### Misol

Index Register IY da 2000h va 2004h memory locationdagi bit 6 qiymati 1 bo‘lsin. `BIT 6, (IY+4h)` bajarilgach, F registerdagi Z flag qiymati 0 bo‘ladi, 2004h memory locationdagi bit 6 esa 1 holatida qoladi. 2004h memory locationdagi bit 0 — least-significant bit.

## SET b, r

### Operation

`rb ← 1`

### Op Code

`SET`

### Operands

`b, r`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 0 | 0 | 1 | 0 | 1 | 1 | CB |
| 2 | 1 | 1 | b₂ | b₁ | b₀ | r₂ | r₁ | r₀ | b / r field |

### Description

r registerdagi b bit set qilinadi. r B, C, D, E, H, L yoki A registerlardan biri bo‘lishi mumkin. Assembled object codedagi b va r operandlar quyidagi bit maydonlari bilan belgilanadi.

Bit tanlash jadvali. Ustunlar tartibi: tekshiriladigan yoki o‘zgartiriladigan bit raqami; b maydoni.

| Bit raqami | b maydoni |
| --- | --- |
| `0` | `000` |
| `1` | `001` |
| `2` | `010` |
| `3` | `011` |
| `4` | `100` |
| `5` | `101` |
| `6` | `110` |
| `7` | `111` |

Register code jadvali. Ustunlar tartibi: register; r maydoni.

| Register | r maydoni |
| --- | --- |
| `B` | `000` |
| `C` | `001` |
| `D` | `010` |
| `E` | `011` |
| `H` | `100` |
| `L` | `101` |
| `A` | `111` |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 2 | 8 (4, 4) | 2.00 |

### Misol

`SET 4, A` bajarilgach, A registerdagi bit 4 set qilinadi. Bit 0 — least-significant bit.

## SET b, (HL)

### Operation

`(HL)b ← 1`

### Op Code

`SET`

### Operands

`b, (HL)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 0 | 0 | 1 | 0 | 1 | 1 | CB |
| 2 | 1 | 1 | b₂ | b₁ | b₀ | 1 | 1 | 0 | b field |

### Description

HL register pair ko‘rsatgan memory locationdagi b bit set qilinadi. Assembled object codedagi b operand quyidagi bit maydoni bilan belgilanadi.

Bit tanlash jadvali. Ustunlar tartibi: tekshiriladigan yoki o‘zgartiriladigan bit raqami; b maydoni.

| Bit raqami | b maydoni |
| --- | --- |
| `0` | `000` |
| `1` | `001` |
| `2` | `010` |
| `3` | `011` |
| `4` | `100` |
| `5` | `101` |
| `6` | `110` |
| `7` | `111` |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 4 | 15 (4, 4, 4, 3) | 3.75 |

### Misol

HL register pairda 3000h bo‘lsa, `SET 4, (HL)` bajarilgach, 3000h memory locationdagi bit 4 qiymati 1 bo‘ladi. 3000h memory locationdagi bit 0 — least-significant bit.

## SET b, (IX+d)

### Operation

`(IX+d)b ← 1`

### Op Code

`SET`

### Operands

`b, (IX+d)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 0 | 1 | 1 | 1 | 0 | 1 | DD |
| 2 | 1 | 1 | 0 | 0 | 1 | 0 | 1 | 1 | CB |
| 3 | d₇ | d₆ | d₅ | d₄ | d₃ | d₂ | d₁ | d₀ | d |
| 4 | 1 | 1 | b₂ | b₁ | b₀ | 1 | 1 | 0 | b field |

### Description

IX register pair tarkibi va two’s complement integer d yig‘indisi ko‘rsatgan memory locationdagi b bit set qilinadi. Assembled object codedagi b operand quyidagi bit maydoni bilan belgilanadi.

Bit tanlash jadvali. Ustunlar tartibi: tekshiriladigan yoki o‘zgartiriladigan bit raqami; b maydoni.

| Bit raqami | b maydoni |
| --- | --- |
| `0` | `000` |
| `1` | `001` |
| `2` | `010` |
| `3` | `011` |
| `4` | `100` |
| `5` | `101` |
| `6` | `110` |
| `7` | `111` |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 6 | 23 (4, 4, 3, 5, 4, 3) | 5.75 |

### Misol

Index registerda 2000h bo‘lsa, `SET 0, (IX + 3h)` bajarilgach, 2003h memory locationdagi bit 0 qiymati 1 bo‘ladi. 2003h memory locationdagi bit 0 — least-significant bit.

## SET b, (IY+d)

### Operation

`(IY + d) b ← 1`

### Op Code

`SET`

### Operands

`b, (IY + d)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 1 | FD |
| 2 | 1 | 1 | 0 | 0 | 1 | 0 | 1 | 1 | CB |
| 3 | d₇ | d₆ | d₅ | d₄ | d₃ | d₂ | d₁ | d₀ | d |
| 4 | 1 | 1 | b₂ | b₁ | b₀ | 1 | 1 | 0 | b field |

### Description

IY register pair tarkibi va two’s complement displacement d yig‘indisi ko‘rsatgan memory locationdagi b bit set qilinadi. Assembled object codedagi b operand quyidagi bit maydoni bilan belgilanadi.

Bit tanlash jadvali. Ustunlar tartibi: tekshiriladigan yoki o‘zgartiriladigan bit raqami; b maydoni.

| Bit raqami | b maydoni |
| --- | --- |
| `0` | `000` |
| `1` | `001` |
| `2` | `010` |
| `3` | `011` |
| `4` | `100` |
| `5` | `101` |
| `6` | `110` |
| `7` | `111` |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 6 | 23 (4, 4, 3, 5, 4, 3) | 5.75 |

### Misol

Index Register IY da 2000h bo‘lsa, `SET 0, (IY+3h)` instruction bajarilgach, 2003h memory locationdagi bit 0 qiymati 1 bo‘ladi. 2003h memory locationdagi bit 0 — least-significant bit.

## RES b, m

### Operation

`mb ← 0`

### Op Code

`RES`

### Operands

`b, m`

b operand m operand tarkibidagi istalgan bitni (7 dan 0 gacha) bildiradi. m mos SET instructionlarida ta’riflangan r, (HL), (IX+d) yoki (IY+d) qiymatlardan biri bo‘lishi mumkin. Quyida mumkin bo‘lgan op code/operand kombinatsiyalarining object code sxemalari berilgan.

#### RES b, r

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 0 | 0 | 1 | 0 | 1 | 1 | CB |
| 2 | 1 | 0 | b₂ | b₁ | b₀ | r₂ | r₁ | r₀ | b / r field |

#### RES b, (HL)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 0 | 0 | 1 | 0 | 1 | 1 | CB |
| 2 | 1 | 0 | b₂ | b₁ | b₀ | 1 | 1 | 0 | b field |

#### RES b, (IX+d)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 0 | 1 | 1 | 1 | 0 | 1 | DD |
| 2 | 1 | 1 | 0 | 0 | 1 | 0 | 1 | 1 | CB |
| 3 | d₇ | d₆ | d₅ | d₄ | d₃ | d₂ | d₁ | d₀ | d |
| 4 | 1 | 0 | b₂ | b₁ | b₀ | 1 | 1 | 0 | b field |

#### RES b, (IY+d)

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 1 | FD |
| 2 | 1 | 1 | 0 | 0 | 1 | 0 | 1 | 1 | CB |
| 3 | d₇ | d₆ | d₅ | d₄ | d₃ | d₂ | d₁ | d₀ | d |
| 4 | 1 | 0 | b₂ | b₁ | b₀ | 1 | 1 | 0 | b field |

### Description

m operanddagi b bit reset qilinadi.

Bit tanlash jadvali. Ustunlar tartibi: tekshiriladigan yoki o‘zgartiriladigan bit raqami; b maydoni.

| Bit raqami | b maydoni |
| --- | --- |
| `0` | `000` |
| `1` | `001` |
| `2` | `010` |
| `3` | `011` |
| `4` | `100` |
| `5` | `101` |
| `6` | `110` |
| `7` | `111` |

Register code jadvali. Ustunlar tartibi: register; r maydoni.

| Register | r maydoni |
| --- | --- |
| `B` | `000` |
| `C` | `001` |
| `D` | `010` |
| `E` | `011` |
| `H` | `100` |
| `L` | `101` |
| `A` | `111` |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| Instruction | M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- | --- |
| `RES b, r` | 2 | 8 (4, 4) | 2.00 |
| `RES b, (HL)` | 4 | 15 (4, 4, 4, 3) | 3.75 |
| `RES b, (IX+d)` | 6 | 23 (4, 4, 3, 5, 4, 3) | 5.75 |
| `RES b, (IY+d)` | 6 | 23 (4, 4, 3, 5, 4, 3) | 5.75 |

### Misol

`RES 6, D` bajarilgach, D registerdagi bit 6 qiymati reset qilinadi. D registerdagi bit 0 — least-significant bit.

