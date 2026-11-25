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

<table>
  <tr><td><code>r</code>, <code>r′</code></td><td>A, B, C, D, E, H yoki L register.</td></tr>
  <tr><td><code>n</code></td><td>8-bit immediate integer.</td></tr>
  <tr><td><code>nn</code></td><td>16-bit memory address; avval low-order byte, keyin high-order byte beriladi.</td></tr>
  <tr><td><code>d</code></td><td>8-bit two’s-complement displacement (−128…+127).</td></tr>
  <tr><td><code>(HL)</code>, <code>(BC)</code>, <code>(DE)</code>, <code>(nn)</code></td><td>Qavs ichidagi address ko‘rsatgan memory location tarkibi.</td></tr>
  <tr><td><code>(IX+d)</code>, <code>(IY+d)</code></td><td>Index Register va displacement yig‘indisi ko‘rsatgan memory location tarkibi.</td></tr>
  <tr><td><code>r₂ r₁ r₀</code>, <code>r′₂ r′₁ r′₀</code></td><td>Registerning 3-bit object code qiymati.</td></tr>
  <tr><td><code>n₇…n₀</code>, <code>d₇…d₀</code></td><td>n yoki d ning alohida bitlari; jadvalda chapdan o‘ngga bit 7…0 tartibida.</td></tr>
  <tr><td><code>← n →</code>, <code>← d →</code></td><td>Qiymat butun 8-bit byte bo‘ylab joylashishini bildiradi.</td></tr>
  <tr><td><code>4 MHz E.T. (µs)</code></td><td>4 MHz dagi execution time; T States ÷ 4.</td></tr>
</table>

# LD r, r'

### Operation

`r ← r′`

### Op Code

`LD`

### Operands

`r, r′`

<table>
  <tr><td>1</td><td><code>0</code></td><td><code>1</code></td><td><code>r₂</code></td><td><code>r₁</code></td><td><code>r₀</code></td><td><code>r′₂</code></td><td><code>r′₁</code></td><td><code>r′₀</code></td><td>register code</td></tr>
</table>

### Description

Istalgan r′ register tarkibi r registerga yuklanadi. r va r′ A, B, C, D, E, H yoki L registerni bildiradi; ularning object code qiymatlari quyidagi jadvalda berilgan.

<table>
  <tr><td>A</td><td>1</td><td>1</td><td>1</td><td><code>111</code></td></tr>
  <tr><td>B</td><td>0</td><td>0</td><td>0</td><td><code>000</code></td></tr>
  <tr><td>C</td><td>0</td><td>0</td><td>1</td><td><code>001</code></td></tr>
  <tr><td>D</td><td>0</td><td>1</td><td>0</td><td><code>010</code></td></tr>
  <tr><td>E</td><td>0</td><td>1</td><td>1</td><td><code>011</code></td></tr>
  <tr><td>H</td><td>1</td><td>0</td><td>0</td><td><code>100</code></td></tr>
  <tr><td>L</td><td>1</td><td>0</td><td>1</td><td><code>101</code></td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>0</code></td><td><code>0</code></td><td><code>r₂</code></td><td><code>r₁</code></td><td><code>r₀</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td>register code</td></tr>
  <tr><td>2</td><td><code>n₇</code></td><td><code>n₆</code></td><td><code>n₅</code></td><td><code>n₄</code></td><td><code>n₃</code></td><td><code>n₂</code></td><td><code>n₁</code></td><td><code>n₀</code></td><td>← n →</td></tr>
</table>

### Description

8-bit integer n istalgan r registerga yuklanadi. r A, B, C, D, E, H yoki L registerni bildiradi; object code qiymatlari quyida berilgan.

<table>
  <tr><td>A</td><td>1</td><td>1</td><td>1</td><td><code>111</code></td></tr>
  <tr><td>B</td><td>0</td><td>0</td><td>0</td><td><code>000</code></td></tr>
  <tr><td>C</td><td>0</td><td>0</td><td>1</td><td><code>001</code></td></tr>
  <tr><td>D</td><td>0</td><td>1</td><td>0</td><td><code>010</code></td></tr>
  <tr><td>E</td><td>0</td><td>1</td><td>1</td><td><code>011</code></td></tr>
  <tr><td>H</td><td>1</td><td>0</td><td>0</td><td><code>100</code></td></tr>
  <tr><td>L</td><td>1</td><td>0</td><td>1</td><td><code>101</code></td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>0</code></td><td><code>1</code></td><td><code>r₂</code></td><td><code>r₁</code></td><td><code>r₀</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td>register code</td></tr>
</table>

### Description

HL register pair ko‘rsatgan memory locationdagi 8-bit qiymat r registerga yuklanadi. r A, B, C, D, E, H yoki L registerni bildiradi; object code qiymatlari quyida berilgan.

<table>
  <tr><td>A</td><td>1</td><td>1</td><td>1</td><td><code>111</code></td></tr>
  <tr><td>B</td><td>0</td><td>0</td><td>0</td><td><code>000</code></td></tr>
  <tr><td>C</td><td>0</td><td>0</td><td>1</td><td><code>001</code></td></tr>
  <tr><td>D</td><td>0</td><td>1</td><td>0</td><td><code>010</code></td></tr>
  <tr><td>E</td><td>0</td><td>1</td><td>1</td><td><code>011</code></td></tr>
  <tr><td>H</td><td>1</td><td>0</td><td>0</td><td><code>100</code></td></tr>
  <tr><td>L</td><td>1</td><td>0</td><td>1</td><td><code>101</code></td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td>DDh</td></tr>
  <tr><td>2</td><td><code>0</code></td><td><code>1</code></td><td><code>r₂</code></td><td><code>r₁</code></td><td><code>r₀</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td>register code</td></tr>
  <tr><td>3</td><td><code>d₇</code></td><td><code>d₆</code></td><td><code>d₅</code></td><td><code>d₄</code></td><td><code>d₃</code></td><td><code>d₂</code></td><td><code>d₁</code></td><td><code>d₀</code></td><td>← d →</td></tr>
</table>

### Description

Index Register IX tarkibiga two’s-complement displacement d qo‘shilib, memory address hisoblanadi. Shu memory location tarkibi r registerga yuklanadi. r A, B, C, D, E, H yoki L registerni bildiradi.

<table>
  <tr><td>A</td><td>1</td><td>1</td><td>1</td><td><code>111</code></td></tr>
  <tr><td>B</td><td>0</td><td>0</td><td>0</td><td><code>000</code></td></tr>
  <tr><td>C</td><td>0</td><td>0</td><td>1</td><td><code>001</code></td></tr>
  <tr><td>D</td><td>0</td><td>1</td><td>0</td><td><code>010</code></td></tr>
  <tr><td>E</td><td>0</td><td>1</td><td>1</td><td><code>011</code></td></tr>
  <tr><td>H</td><td>1</td><td>0</td><td>0</td><td><code>100</code></td></tr>
  <tr><td>L</td><td>1</td><td>0</td><td>1</td><td><code>101</code></td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td>FDh</td></tr>
  <tr><td>2</td><td><code>0</code></td><td><code>1</code></td><td><code>r₂</code></td><td><code>r₁</code></td><td><code>r₀</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td>register code</td></tr>
  <tr><td>3</td><td><code>d₇</code></td><td><code>d₆</code></td><td><code>d₅</code></td><td><code>d₄</code></td><td><code>d₃</code></td><td><code>d₂</code></td><td><code>d₁</code></td><td><code>d₀</code></td><td>← d →</td></tr>
</table>

### Description

Index Register IY tarkibiga two’s-complement displacement d qo‘shilib, memory address hisoblanadi. Shu memory location tarkibi r registerga yuklanadi. r A, B, C, D, E, H yoki L registerni bildiradi.

<table>
  <tr><td>A</td><td>1</td><td>1</td><td>1</td><td><code>111</code></td></tr>
  <tr><td>B</td><td>0</td><td>0</td><td>0</td><td><code>000</code></td></tr>
  <tr><td>C</td><td>0</td><td>0</td><td>1</td><td><code>001</code></td></tr>
  <tr><td>D</td><td>0</td><td>1</td><td>0</td><td><code>010</code></td></tr>
  <tr><td>E</td><td>0</td><td>1</td><td>1</td><td><code>011</code></td></tr>
  <tr><td>H</td><td>1</td><td>0</td><td>0</td><td><code>100</code></td></tr>
  <tr><td>L</td><td>1</td><td>0</td><td>1</td><td><code>101</code></td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>r₂</code></td><td><code>r₁</code></td><td><code>r₀</code></td><td>register code</td></tr>
</table>

### Description

r register tarkibi HL register pair ko‘rsatgan memory locationga yuklanadi. r A, B, C, D, E, H yoki L registerni bildiradi; object code qiymatlari quyida berilgan.

<table>
  <tr><td>A</td><td>1</td><td>1</td><td>1</td><td><code>111</code></td></tr>
  <tr><td>B</td><td>0</td><td>0</td><td>0</td><td><code>000</code></td></tr>
  <tr><td>C</td><td>0</td><td>0</td><td>1</td><td><code>001</code></td></tr>
  <tr><td>D</td><td>0</td><td>1</td><td>0</td><td><code>010</code></td></tr>
  <tr><td>E</td><td>0</td><td>1</td><td>1</td><td><code>011</code></td></tr>
  <tr><td>H</td><td>1</td><td>0</td><td>0</td><td><code>100</code></td></tr>
  <tr><td>L</td><td>1</td><td>0</td><td>1</td><td><code>101</code></td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td>DDh</td></tr>
  <tr><td>2</td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>r₂</code></td><td><code>r₁</code></td><td><code>r₀</code></td><td>register code</td></tr>
  <tr><td>3</td><td><code>d₇</code></td><td><code>d₆</code></td><td><code>d₅</code></td><td><code>d₄</code></td><td><code>d₃</code></td><td><code>d₂</code></td><td><code>d₁</code></td><td><code>d₀</code></td><td>← d →</td></tr>
</table>

### Description

r register tarkibi Index Register IX tarkibi va two’s-complement displacement d yig‘indisi ko‘rsatgan memory addressga yuklanadi. r A, B, C, D, E, H yoki L registerni bildiradi.

<table>
  <tr><td>A</td><td>1</td><td>1</td><td>1</td><td><code>111</code></td></tr>
  <tr><td>B</td><td>0</td><td>0</td><td>0</td><td><code>000</code></td></tr>
  <tr><td>C</td><td>0</td><td>0</td><td>1</td><td><code>001</code></td></tr>
  <tr><td>D</td><td>0</td><td>1</td><td>0</td><td><code>010</code></td></tr>
  <tr><td>E</td><td>0</td><td>1</td><td>1</td><td><code>011</code></td></tr>
  <tr><td>H</td><td>1</td><td>0</td><td>0</td><td><code>100</code></td></tr>
  <tr><td>L</td><td>1</td><td>0</td><td>1</td><td><code>101</code></td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td>FDh</td></tr>
  <tr><td>2</td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>r₂</code></td><td><code>r₁</code></td><td><code>r₀</code></td><td>register code</td></tr>
  <tr><td>3</td><td><code>d₇</code></td><td><code>d₆</code></td><td><code>d₅</code></td><td><code>d₄</code></td><td><code>d₃</code></td><td><code>d₂</code></td><td><code>d₁</code></td><td><code>d₀</code></td><td>← d →</td></tr>
</table>

### Description

r register tarkibi Index Register IY tarkibi va two’s-complement displacement d yig‘indisi ko‘rsatgan memory addressga yuklanadi. r qiymati quyidagi jadval bo‘yicha kodlanadi.

<table>
  <tr><td>A</td><td>1</td><td>1</td><td>1</td><td><code>111</code></td></tr>
  <tr><td>B</td><td>0</td><td>0</td><td>0</td><td><code>000</code></td></tr>
  <tr><td>C</td><td>0</td><td>0</td><td>1</td><td><code>001</code></td></tr>
  <tr><td>D</td><td>0</td><td>1</td><td>0</td><td><code>010</code></td></tr>
  <tr><td>E</td><td>0</td><td>1</td><td>1</td><td><code>011</code></td></tr>
  <tr><td>H</td><td>1</td><td>0</td><td>0</td><td><code>100</code></td></tr>
  <tr><td>L</td><td>1</td><td>0</td><td>1</td><td><code>101</code></td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td>36h</td></tr>
  <tr><td>2</td><td><code>n₇</code></td><td><code>n₆</code></td><td><code>n₅</code></td><td><code>n₄</code></td><td><code>n₃</code></td><td><code>n₂</code></td><td><code>n₁</code></td><td><code>n₀</code></td><td>← n →</td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td>DDh</td></tr>
  <tr><td>2</td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td>36h</td></tr>
  <tr><td>3</td><td><code>d₇</code></td><td><code>d₆</code></td><td><code>d₅</code></td><td><code>d₄</code></td><td><code>d₃</code></td><td><code>d₂</code></td><td><code>d₁</code></td><td><code>d₀</code></td><td>← d →</td></tr>
  <tr><td>4</td><td><code>n₇</code></td><td><code>n₆</code></td><td><code>n₅</code></td><td><code>n₄</code></td><td><code>n₃</code></td><td><code>n₂</code></td><td><code>n₁</code></td><td><code>n₀</code></td><td>← n →</td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td>FDh</td></tr>
  <tr><td>2</td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td>36h</td></tr>
  <tr><td>3</td><td><code>d₇</code></td><td><code>d₆</code></td><td><code>d₅</code></td><td><code>d₄</code></td><td><code>d₃</code></td><td><code>d₂</code></td><td><code>d₁</code></td><td><code>d₀</code></td><td>← d →</td></tr>
  <tr><td>4</td><td><code>n₇</code></td><td><code>n₆</code></td><td><code>n₅</code></td><td><code>n₄</code></td><td><code>n₃</code></td><td><code>n₂</code></td><td><code>n₁</code></td><td><code>n₀</code></td><td>← n →</td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td>0Ah</td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td>1Ah</td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td>3Ah</td></tr>
  <tr><td>2</td><td><code>n₇</code></td><td><code>n₆</code></td><td><code>n₅</code></td><td><code>n₄</code></td><td><code>n₃</code></td><td><code>n₂</code></td><td><code>n₁</code></td><td><code>n₀</code></td><td>← n → (nn low-order byte)</td></tr>
  <tr><td>3</td><td><code>n₇</code></td><td><code>n₆</code></td><td><code>n₅</code></td><td><code>n₄</code></td><td><code>n₃</code></td><td><code>n₂</code></td><td><code>n₁</code></td><td><code>n₀</code></td><td>← n → (nn high-order byte)</td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td>02h</td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td>12h</td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td>32h</td></tr>
  <tr><td>2</td><td><code>n₇</code></td><td><code>n₆</code></td><td><code>n₅</code></td><td><code>n₄</code></td><td><code>n₃</code></td><td><code>n₂</code></td><td><code>n₁</code></td><td><code>n₀</code></td><td>← n → (nn low-order byte)</td></tr>
  <tr><td>3</td><td><code>n₇</code></td><td><code>n₆</code></td><td><code>n₅</code></td><td><code>n₄</code></td><td><code>n₃</code></td><td><code>n₂</code></td><td><code>n₁</code></td><td><code>n₀</code></td><td>← n → (nn high-order byte)</td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td>EDh</td></tr>
  <tr><td>2</td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td>57h</td></tr>
</table>

### Description

Interrupt Vector Register I tarkibi Accumulatorga yuklanadi.

### Condition Bits Affected

<table>
  <tr><td>S</td><td>I register qiymati manfiy bo‘lsa set, aks holda reset qilinadi.</td></tr>
  <tr><td>Z</td><td>I register qiymati 0 bo‘lsa set, aks holda reset qilinadi.</td></tr>
  <tr><td>H</td><td>reset qilinadi.</td></tr>
  <tr><td>P/V</td><td>IFF2 tarkibi ko‘chiriladi.</td></tr>
  <tr><td>N</td><td>reset qilinadi.</td></tr>
  <tr><td>C</td><td>O‘zgarmaydi.</td></tr>
</table>

Instruction bajarilayotganda interrupt yuz bersa, Parity flag qiymati 0 bo‘ladi.

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

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td>EDh</td></tr>
  <tr><td>2</td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td>5Fh</td></tr>
</table>

### Description

Memory Refresh Register R tarkibi Accumulatorga yuklanadi.

### Condition Bits Affected

<table>
  <tr><td>S</td><td>R register qiymati manfiy bo‘lsa set, aks holda reset qilinadi.</td></tr>
  <tr><td>Z</td><td>R register qiymati 0 bo‘lsa set, aks holda reset qilinadi.</td></tr>
  <tr><td>H</td><td>reset qilinadi.</td></tr>
  <tr><td>P/V</td><td>IFF2 tarkibi ko‘chiriladi.</td></tr>
  <tr><td>N</td><td>reset qilinadi.</td></tr>
  <tr><td>C</td><td>O‘zgarmaydi.</td></tr>
</table>

Instruction bajarilayotganda interrupt yuz bersa, Parity flag qiymati 0 bo‘ladi.

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

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td>EDh</td></tr>
  <tr><td>2</td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td>47h</td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td>EDh</td></tr>
  <tr><td>2</td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td>4Fh</td></tr>
</table>

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

<table>
  <tr><td>LD r, r′ — Operation</td><td><code>r, ← r′</code> yozuvidagi ortiqcha vergul olib tashlandi.</td></tr>
  <tr><td>IY bilan ishlaydigan instructionlar</td><td><code>lY</code> → <code>IY</code>; Operation ichidagi <code>D</code> → <code>d</code>.</td></tr>
  <tr><td>LD (IX+d), r — misol</td><td><code>LID</code> → <code>LD</code>.</td></tr>
  <tr><td>LD (IY+d), r — misol</td><td>Hex address <code>2A15</code> → <code>2A15h</code>.</td></tr>
  <tr><td>LD (nn), A — misol</td><td>Buzilgan <code>LD (3141h), AD7h</code> matni <code>LD (3141h), A</code> va natija <code>D7h</code> ko‘rinishida tiklandi.</td></tr>
  <tr><td>LD A, I — Operation</td><td><code>A ← 1</code> → <code>A ← I</code>.</td></tr>
  <tr><td>LD r, (IX+d) va LD (IY+d), n — Timing</td><td>Manbadagi 2.50 qiymati 19 T States / 4 MHz = 4.75 µs bo‘yicha tuzatildi.</td></tr>
  <tr><td>Register jadvali</td><td>Buzilgan <code>Register r, C</code> headeri r va r′ uchun 3-bit register code jadvali ko‘rinishida tiklandi.</td></tr>
</table>
