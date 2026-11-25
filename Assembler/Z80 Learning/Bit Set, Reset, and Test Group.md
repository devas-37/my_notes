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

Opcode jadvallarida birinchi katak byte tartib raqami, keyingi sakkiz katak bit 7 dan bit 0 gacha, so‘ng hex code yoki bit maydoni turi, oxirgi katak esa manbadagi bit matnidir. Manbadagi ayrim fixed opcode bit satrlari hex code bilan mos kelmaydi; fixed bitlar shu hex codega mos berildi va asl matn ham saqlandi. b₂, b₁, b₀ bit tanlash maydoni, r₂, r₁, r₀ esa register code maydonidir. d butun 8-bit byte ni egallaydi; d₇…d₀ uning alohida bitlaridir. Indexed instruction byte ketma-ketligi: DD yoki FD, CB, d, opcode. Operation ifodalari va manbadagi noodatiy yozuvlar asl holida saqlandi.

## BIT b, r

### Operation

`Z ← rb`

### Op Code

`BIT`

### Operands

`b, r`

|  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `CB` | `11011001` |
| 2 | `0` | `1` | `b₂` | `b₁` | `b₀` | `r₂` | `r₁` | `r₀` | `b / r field` | `01b r` |

### Description

Ushbu instruction r registerdagi b bitni tekshiradi va Z flagni shunga mos o‘rnatadi. Assembled object codedagi b va r operandlar quyidagi bit maydonlari bilan belgilanadi.

Bit tanlash jadvali. Ustunlar tartibi: tekshiriladigan yoki o‘zgartiriladigan bit raqami; b maydoni.

|  |  |
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

|  |  |
| --- | --- |
| `B` | `000` |
| `C` | `001` |
| `D` | `010` |
| `E` | `011` |
| `H` | `100` |
| `L` | `101` |
| `A` | `111` |

### Condition Bits Affected

S noma’lum. Tekshirilayotgan bit 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H set qilinadi. P/V noma’lum. N reset qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 2 | 8 (4, 4) | 4.50 |

### Misol

B registerdagi bit 2 qiymati 0 bo‘lsa, `BIT 2, B` bajarilgach, F registerdagi Z flag qiymati 1 bo‘ladi, B registerdagi bit 2 esa 0 holatida qoladi. B registerdagi bit 0 — least-significant bit.

Manba izohi: Manbada 8 T States uchun 4 MHz E.T. qiymati `4.50` deb berilgan; asl qiymat saqlandi. 4 MHz da 8 T States 2.00 µs ga teng.

## BIT b, (HL)

### Operation

`Z ← (HL)b`

### Op Code

`BIT`

### Operands

`b, (HL)`

|  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `CB` | `11011001` |
| 2 | `0` | `1` | `b₂` | `b₁` | `b₀` | `1` | `0` | `1` | `b field` | `01b101` |

### Description

Ushbu instruction HL register pair ko‘rsatgan memory locationdagi b bitni tekshiradi va Z flagni shunga mos o‘rnatadi. Assembled object codedagi b operand quyidagi bit maydoni bilan belgilanadi.

Bit tanlash jadvali. Ustunlar tartibi: tekshiriladigan yoki o‘zgartiriladigan bit raqami; b maydoni.

|  |  |
| --- | --- |
| `0` | `000` |
| `1` | `001` |
| `2` | `010` |
| `3` | `011` |
| `4` | `100` |
| `5` | `101` |
| `6` | `110` |
| `1` | `111` |

### Condition Bits Affected

S noma’lum. Tekshirilayotgan bit 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H set qilinadi. P/V noma’lum. H reset qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 3 | 12 (4, 4, 4) | 43.00 |

### Misol

HL register pairda 4444h va manbada 444h deb ko‘rsatilgan memory locationdagi bit 4 qiymati 1 bo‘lsin. `BIT 4, (HL)` bajarilgach, F registerdagi Z flag qiymati 0 bo‘ladi va 4444h memory locationdagi bit 4 qiymati 1 holatida qoladi. 4444h memory locationdagi bit 0 — least-significant bit.

Manba izohi: Manbadagi opcode maydoni `01b101` ko‘rinishida berilgan; jadvaldagi oxirgi uch bit shu yozuvga muvofiq `101` sifatida saqlandi.

Manba izohi: Bit code jadvalining oxirgi qatori `1 / 111` deb berilgan; asl qiymat saqlandi.

Manba izohi: Condition Bits Affected bo‘limida H uchun ham set, ham reset yozilgan; N haqida alohida ma’lumot berilmagan.

Manba izohi: Manbada 12 T States uchun 4 MHz E.T. qiymati `43.00` deb berilgan; asl qiymat saqlandi. 4 MHz da 12 T States 3.00 µs ga teng.

Manba izohi: Misolning boshlanishida `444h`, keyingi matnda esa `4444h` address berilgan; ikkala yozuv ham saqlandi.

## BIT b, (IX+d)

### Operation

`Z ← (IX+d)b`

### Op Code

`BIT`

### Operands

`b, (IX+d)`

|  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` | `11101101` |
| 2 | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `CB` | `11011001` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d` |
| 4 | `0` | `1` | `b₂` | `b₁` | `b₀` | `1` | `1` | `0` | `b field` | `01b110` |

### Description

Ushbu instruction IX register pair tarkibi va two’s complement displacement d yig‘indisi ko‘rsatgan memory locationdagi b bitni tekshiradi va Z flagni shunga mos o‘rnatadi. Assembled object codedagi b operand quyidagi bit maydoni bilan belgilanadi.

Bit tanlash jadvali. Ustunlar tartibi: tekshiriladigan yoki o‘zgartiriladigan bit raqami; b maydoni.

|  |  |
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

S noma’lum. Tekshirilayotgan bit 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H set qilinadi. P/V noma’lum. N reset qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 5 | 20 (4, 4, 3, 5, 4) | 5.00 |

### Misol

Index Register IX da 2000h va 2004h memory locationdagi bit 6 qiymati 1 bo‘lsin. `BIT 6, (IX+4h)` bajarilgach, F registerdagi Z flag qiymati 0 bo‘ladi, 2004h memory locationdagi bit 6 esa 1 holatida qoladi. 2004h memory locationdagi bit 0 — least-significant bit.

## BIT b, (IY+d)

### Operation

`Z ← (IY+d)b`

### Op Code

`BIT`

### Operands

`b, (lY+d)`

|  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` | `11101111` |
| 2 | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `CB` | `11011001` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d` |
| 4 | `0` | `1` | `b₂` | `b₁` | `b₀` | `1` | `1` | `0` | `b field` | `01b110` |

### Description

Ushbu instruction IY register pair tarkibi va two’s complement displacement d yig‘indisi ko‘rsatgan memory locationdagi b bitni tekshiradi va Z flagni shunga mos o‘rnatadi. Assembled object codedagi b operand quyidagi bit maydoni bilan belgilanadi.

Bit tanlash jadvali. Ustunlar tartibi: tekshiriladigan yoki o‘zgartiriladigan bit raqami; b maydoni.

|  |  |
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

S noma’lum. Tekshirilayotgan bit 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H set qilinadi. P/V noma’lum. H reset qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 5 | 20 (4, 4, 3, 5, 4) | 5.00 |

### Misol

Index Register IY da 2000h va 2004h memory locationdagi bit 6 qiymati 1 bo‘lsin. `BIT 6, (IY+4h)` bajarilgach, F registerdagi Z flag qiymati 0 bo‘ladi, 2004h memory locationdagi bit 6 esa 1 holatida qoladi. 2004h memory locationdagi bit 0 — least-significant bit.

Manba izohi: Manbada operand `b, (lY+d)` ko‘rinishida yozilgan. Condition Bits Affected bo‘limida H uchun ham set, ham reset yozilgan; N haqida alohida ma’lumot berilmagan.

## SET b, r

### Operation

`rb ← 1`

### Op Code

`SET`

### Operands

`b, r`

|  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `CB` | `11011001` |
| 2 | `1` | `1` | `b₂` | `b₁` | `b₀` | `r₂` | `r₁` | `r₀` | `b / r field` | `11b r` |

### Description

r registerdagi b bit set qilinadi. r B, C, D, E, H, L yoki A registerlardan biri bo‘lishi mumkin. Assembled object codedagi b va r operandlar quyidagi bit maydonlari bilan belgilanadi.

Bit tanlash jadvali. Ustunlar tartibi: tekshiriladigan yoki o‘zgartiriladigan bit raqami; b maydoni.

|  |  |
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

|  |  |
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

Manbada ushbu instructionning opcode bit sxemasi berilmagan. Descriptiondagi b bit maydoni jadvali saqlandi.

### Description

HL register pair ko‘rsatgan memory locationdagi b bit set qilinadi. Assembled object codedagi b operand quyidagi bit maydoni bilan belgilanadi.

Bit tanlash jadvali. Ustunlar tartibi: tekshiriladigan yoki o‘zgartiriladigan bit raqami; b maydoni.

|  |  |
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

Manbada ushbu instructionning opcode bit sxemasi berilmagan. Descriptiondagi b bit maydoni jadvali saqlandi.

### Description

IX register pair tarkibi va two’s complement integer d yig‘indisi ko‘rsatgan memory locationdagi b bit set qilinadi. Assembled object codedagi b operand quyidagi bit maydoni bilan belgilanadi.

Bit tanlash jadvali. Ustunlar tartibi: tekshiriladigan yoki o‘zgartiriladigan bit raqami; b maydoni.

|  |  |
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

|  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` | `11101111` |
| 2 | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `CB` | `11011001` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d` |
| 4 | `1` | `1` | `b₂` | `b₁` | `b₀` | `1` | `1` | `0` | `b field` | `11b110` |

### Description

IY register pair tarkibi va two’s complement displacement d yig‘indisi ko‘rsatgan memory locationdagi b bit set qilinadi. Assembled object codedagi b operand quyidagi bit maydoni bilan belgilanadi.

Bit tanlash jadvali. Ustunlar tartibi: tekshiriladigan yoki o‘zgartiriladigan bit raqami; b maydoni.

|  |  |
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

Index Register IY da 2000h bo‘lsa, manbada `Set 0, (IY+3h)` deb yozilgan instruction bajarilgach, 2003h memory locationdagi bit 0 qiymati 1 bo‘ladi. 2003h memory locationdagi bit 0 — least-significant bit.

## RES b, m

### Operation

`sb ← 0`

### Op Code

`RES`

### Operands

`b, m`

b operand m operand tarkibidagi istalgan bitni (7 dan 0 gacha) bildiradi. m mos SET instructionlarida ta’riflangan r, (HL), (IX+d) yoki (lY+d) qiymatlardan biri bo‘lishi mumkin. Quyida mumkin bo‘lgan op code/operand kombinatsiyalarining object code sxemalari berilgan.

#### RES b, rn

|  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `CB` | `11011001` |
| 2 | `1` | `0` | `b₂` | `b₁` | `b₀` | `r₂` | `r₁` | `r₀` | `b / r field` | `10b r` |

#### RES b, (HL)

|  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `CB` | `11011001` |
| 2 | `1` | `0` | `b₂` | `b₁` | `b₀` | `1` | `1` | `0` | `b field` | `10b110` |

#### RES b, (IX+d)

|  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` | `11101101` |
| 2 | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `CB` | `11011001` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d` |
| 4 | `1` | `0` | `b₂` | `b₁` | `b₀` | `1` | `1` | `0` | `b field` | `10b110` |

#### RES b, (IY+d)

|  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` | `11101111` |
| 2 | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `CB` | `11011001` |
| 3 | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d` |
| 4 | `1` | `0` | `b₂` | `b₁` | `b₀` | `1` | `1` | `0` | `b field` | `10b110` |

### Description

m operanddagi b bit reset qilinadi.

Bit tanlash jadvali. Ustunlar tartibi: tekshiriladigan yoki o‘zgartiriladigan bit raqami; b maydoni.

|  |  |
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

|  |  |
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
| `RES r` | 4 | 8 (4, 4) | 2.00 |
| `RES (HL)` | 4 | 15 (4, 4, 4, 3) | 3.75 |
| `RES (IX+d)` | 6 | 23 (4, 4, 3, 5, 4, 3) | 5.75 |
| `RES (lY+d)` | 6 | 23 (4, 4, 3, 5, 4, 3) | 5.75 |

### Misol

`RES 6, D` bajarilgach, manbada “register 0” deb yozilgan registerning bit 6 qiymati reset qilinadi. D registerdagi bit 0 — least-significant bit.

Manba izohi: Manbada birinchi operand varianti `RES b, rn` deb berilgan; bu yozuv saqlandi. Jadvaldagi r maydoni quyidagi register code qiymatlariga mos.

Manba izohi: Timing jadvalida `RES r` uchun M Cycles qiymati `4`, T States esa `8 (4, 4)` deb berilgan; ikkita cycle ko‘rsatilganiga qaramay, asl M Cycles qiymati saqlandi.

Manba izohi: Misolda instruction `RES 6, D`, matnda esa “register 0” yozilgan; ikkala yozuv ham saqlandi.
