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

<table>
  <tr><td><code>dd</code></td><td>BC, DE, HL yoki SP register pair.</td></tr>
  <tr><td><code>qq</code></td><td>BC, DE, HL yoki AF register pair.</td></tr>
  <tr><td><code>nn</code></td><td>16-bit integer yoki memory address; op codedan keyin avval low-order byte, keyin high-order byte keladi.</td></tr>
  <tr><td><code>n</code></td><td>Butun 8-bit byte ni egallaydi; nn qiymatining ketma-ket ikki byte i sxemada alohida qatorlarda beriladi.</td></tr>
  <tr><td><code>d₁ d₀</code>, <code>q₁ q₀</code></td><td>Register pairning 2-bit object code qiymati.</td></tr>
  <tr><td><code>ddh</code>, <code>ddl</code>, <code>qqH</code>, <code>qqL</code></td><td>Register pairning high-order va low-order qismlari.</td></tr>
  <tr><td><code>IXh</code>, <code>IXI</code>, <code>IYh</code>, <code>IYI</code></td><td>Manbadagi Index Register qismlari belgilari: high-order va low-order; PUSH/POP formulalarida IXH, IXL, IYH, IYL ishlatilgan.</td></tr>
  <tr><td>Bit sxemalari</td><td>Har bir qator bitta byte; bitlar chapdan o‘ngga bit 7 dan bit 0 gacha, qatorlar esa byte ketma-ketligida berilgan. Birinchi katak — byte tartib raqami.</td></tr>
  <tr><td><code>4 MHz E.T. (µs)</code></td><td>4 MHz dagi execution time, µs hisobida.</td></tr>
</table>

# LD dd, nn

### Operation

`dd ← nn`

### Op Code

`LD`

### Operands

`dd, nn`

<table>
  <tr><td>1</td><td><code>0</code></td><td><code>0</code></td><td><code>d₁</code></td><td><code>d₀</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td>register pair code</td></tr>
  <tr><td>2</td><td colspan="8"><code>n</code></td><td>low-order byte</td></tr>
  <tr><td>3</td><td colspan="8"><code>n</code></td><td>high-order byte</td></tr>
</table>

### Description

2-byte integer nn dd register pairga yuklanadi. dd BC, DE, HL yoki SP register pairni bildiradi; object code qiymatlari quyida berilgan. Op codedan keyingi birinchi n operand low-order byte hisoblanadi.

<table>
  <tr><td><code>BC</code></td><td><code>00</code></td></tr>
  <tr><td><code>DE</code></td><td><code>01</code></td></tr>
  <tr><td><code>HL</code></td><td><code>10</code></td></tr>
  <tr><td><code>SP</code></td><td><code>11</code></td></tr>
</table>

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States     | 4 MHz E.T. (µs) |
| -------- | ------------ | --------------- |
| 2        | 10 (4, 3, 3) | 2.50            |

### Misol

`LD HL, 5000h` bajarilgach, HL register pairda 5000h bo‘ladi.

Manba izohi: Manbada M Cycles qiymati 2 deb berilgan; T States tarkibida esa uchta cycle — (4, 3, 3) ko‘rsatilgan.

# LD IX, nn

### Operation

`IX ← nn`

### Op Code

`LD`

### Operands

`IX, nn`

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>DD</code></td></tr>
  <tr><td>2</td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>21</code></td></tr>
  <tr><td>3</td><td colspan="8"><code>n</code></td><td>low-order byte</td></tr>
  <tr><td>4</td><td colspan="8"><code>n</code></td><td>high-order byte</td></tr>
</table>

### Description

n integer Index Register IX ga yuklanadi. Op codedan keyingi birinchi n operand low-order byte hisoblanadi.

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

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>FD</code></td></tr>
  <tr><td>2</td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>21</code></td></tr>
  <tr><td>3</td><td colspan="8"><code>n</code></td><td>low-order byte</td></tr>
  <tr><td>4</td><td colspan="8"><code>n</code></td><td>high-order byte</td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>2A</code></td></tr>
  <tr><td>2</td><td colspan="8"><code>n</code></td><td>low-order byte</td></tr>
  <tr><td>3</td><td colspan="8"><code>n</code></td><td>high-order byte</td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>ED</code></td></tr>
  <tr><td>2</td><td><code>0</code></td><td><code>1</code></td><td><code>d₁</code></td><td><code>d₀</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td>register pair code</td></tr>
  <tr><td>3</td><td colspan="8"><code>n</code></td><td>low-order byte</td></tr>
  <tr><td>4</td><td colspan="8"><code>n</code></td><td>high-order byte</td></tr>
</table>

### Description

(nn) address tarkibi dd register pairning low-order qismiga, keyingi yuqori memory address (nn + 1) tarkibi esa dd ning high-order qismiga yuklanadi. dd BC, DE, HL yoki SP register pairni bildiradi; object code qiymatlari quyida berilgan. Op codedan keyingi birinchi n operand (nn) ning low-order byte qiymatidir.

<table>
  <tr><td><code>BC</code></td><td><code>00</code></td></tr>
  <tr><td><code>DE</code></td><td><code>01</code></td></tr>
  <tr><td><code>HL</code></td><td><code>10</code></td></tr>
  <tr><td><code>SP</code></td><td><code>11</code></td></tr>
</table>

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

`IXh ← (nn + 1), IXI ← (nn)`

### Op Code

`LD`

### Operands

`IX, (nn)`

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>DD</code></td></tr>
  <tr><td>2</td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>2A</code></td></tr>
  <tr><td>3</td><td colspan="8"><code>n</code></td><td>low-order byte</td></tr>
  <tr><td>4</td><td colspan="8"><code>n</code></td><td>high-order byte</td></tr>
</table>

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

`IYh ← (nn + 1), IYI ← nn)`

### Op Code

`LD`

### Operands

`IY, (nn)`

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>FD</code></td></tr>
  <tr><td>2</td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>2A</code></td></tr>
  <tr><td>3</td><td colspan="8"><code>n</code></td><td>low-order byte</td></tr>
  <tr><td>4</td><td colspan="8"><code>n</code></td><td>high-order byte</td></tr>
</table>

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

Manba izohi: Manbaning Operation ifodasida ochuvchi qavs tushib qolgan: Description bo‘yicha low-order qism uchun `IYI ← (nn)` nazarda tutilgan.

# LD (nn), HL

### Operation

`(nn + 1) ← H, (nn) ← L`

### Op Code

`LD`

### Operands

`(nn), HL`

<table>
  <tr><td>1</td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>22</code></td></tr>
  <tr><td>2</td><td colspan="8"><code>n</code></td><td>low-order byte</td></tr>
  <tr><td>3</td><td colspan="8"><code>n</code></td><td>high-order byte</td></tr>
</table>

### Description

HL register pairning low-order qismi (Register L) tarkibi (nn) memory addressga, high-order qismi (Register H) tarkibi esa keyingi yuqori memory address (nn + 1) ga yuklanadi. Op codedan keyingi birinchi n operand nn ning low-order byte qiymatidir.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 16 (4, 3, 3, 3, 3) | 4.00            |

### Misol

HL register pairda 483Ah bo‘lsa, manbada `LD (B2291 – 1), HL` deb yozilgan instruction bajarilgach, B229h addressda 3Ah, B22Ah addressda esa 48h bo‘ladi. Misolda keltirilgan natijaga mos instruction — `LD (B229h), HL`.

# LD (nn), dd

### Operation

`(nn + 1) ← ddh, (nn) ← ddl`

### Op Code

`LD`

### Operands

`(nn), dd`

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>ED</code></td></tr>
  <tr><td>2</td><td><code>0</code></td><td><code>1</code></td><td><code>d₁</code></td><td><code>d₀</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td>register pair code</td></tr>
  <tr><td>3</td><td colspan="8"><code>n</code></td><td>low-order byte</td></tr>
  <tr><td>4</td><td colspan="8"><code>n</code></td><td>high-order byte</td></tr>
</table>

### Description

dd register pairning low-order byte qiymati (nn) memory addressga, high-order byte qiymati esa (nn + 1) memory addressga yuklanadi. dd BC, DE, HL yoki SP register pairni bildiradi; object code qiymatlari quyida berilgan. Op codedan keyingi birinchi n operand ikki byte li memory addressning low-order byte qiymatidir.

<table>
  <tr><td><code>BC</code></td><td><code>00</code></td></tr>
  <tr><td><code>DE</code></td><td><code>01</code></td></tr>
  <tr><td><code>HL</code></td><td><code>10</code></td></tr>
  <tr><td><code>SP</code></td><td><code>11</code></td></tr>
</table>

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

`(nn + 1) ← IXh, (nn) ← IXI`

### Op Code

`LD`

### Operands

`(nn), IX`

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>DD</code></td></tr>
  <tr><td>2</td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>22</code></td></tr>
  <tr><td>3</td><td colspan="8"><code>n</code></td><td>low-order byte</td></tr>
  <tr><td>4</td><td colspan="8"><code>n</code></td><td>high-order byte</td></tr>
</table>

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

`(nn + 1) ← IYh, (nn) ← IYI`

### Op Code

`LD`

### Operands

`(nn), IY`

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>FD</code></td></tr>
  <tr><td>2</td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>22</code></td></tr>
  <tr><td>3</td><td colspan="8"><code>n</code></td><td>low-order byte</td></tr>
  <tr><td>4</td><td colspan="8"><code>n</code></td><td>high-order byte</td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>F9</code></td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>DD</code></td></tr>
  <tr><td>2</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>F9</code></td></tr>
</table>

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

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>FD</code></td></tr>
  <tr><td>2</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>F9</code></td></tr>
</table>

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

`(SP – 2) ← qqL, (SP – 1) ← qqH`

### Op Code

`PUSH`

### Operand

`qq`

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>q₁</code></td><td><code>q₀</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td>register pair code</td></tr>
</table>

### Description

qq register pair tarkibi tashqi memorydagi last-in, first-out (LIFO) stackka joylanadi. Stack Pointer (SP) register pair stackning joriy tepasidagi 16-bit addressni saqlaydi. Instruction avval SP ni birga kamaytiradi va qq register pair ning high-order byte qiymatini SP ko‘rsatgan memory addressga yuklaydi. Keyin SP yana birga kamaytiriladi va low-order byte qiymati SP dagi yangi addressga mos memory locationga yuklanadi. qq operand BC, DE, HL yoki AF register pairni bildiradi; object code qiymatlari quyida berilgan.

<table>
  <tr><td><code>BC</code></td><td><code>00</code></td></tr>
  <tr><td><code>DE</code></td><td><code>01</code></td></tr>
  <tr><td><code>HL</code></td><td><code>10</code></td></tr>
  <tr><td><code>AF</code></td><td><code>11</code></td></tr>
</table>

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

`(SP – 2) ← IXL, (SP – 1) ← IXH`

### Op Code

`PUSH`

### Operand

`IX`

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>DD</code></td></tr>
  <tr><td>2</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>E5</code></td></tr>
</table>

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

`(SP – 2) ← IYL, (SP – 1) ← IYH`

### Op Code

`PUSH`

### Operand

`IY`

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>FD</code></td></tr>
  <tr><td>2</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>E5</code></td></tr>
</table>

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

`qqH ← (SP+1), qqL ← (SP)`

### Op Code

`POP`

### Operand

`qq`

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>q₁</code></td><td><code>q₀</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td>register pair code</td></tr>
</table>

### Description

Tashqi memorydagi last-in, first-out (LIFO) stackning tepasidagi ikki byte qq register pair ga olinadi. Stack Pointer (SP) register pair stackning joriy tepasidagi 16-bit addressni saqlaydi. Instruction avval SP ko‘rsatgan memory locationdagi byte ni qq ning low-order qismiga yuklaydi. Keyin SP birga oshiriladi va qo‘shni memory location tarkibi qq ning high-order qismiga yuklanadi. So‘ng SP yana birga oshiriladi. qq operand BC, DE, HL yoki AF register pairni bildiradi; object code qiymatlari quyida berilgan.

<table>
  <tr><td><code>BC</code></td><td><code>00</code></td></tr>
  <tr><td><code>DE</code></td><td><code>01</code></td></tr>
  <tr><td><code>HL</code></td><td><code>10</code></td></tr>
  <tr><td><code>AF</code></td><td><code>11</code></td></tr>
</table>

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States     | 4 MHz E.T. (µs) |
| -------- | ------------ | --------------- |
| 3        | 10 (4, 3, 3) | 2.50            |

### Misol

Stack Pointerda 1000h, 1000h memory locationda 55h va 1001h memory locationda 33h bo‘lsa, `POP HL` bajarilgach, HL register pair da 3355h, Stack Pointerda esa 1002h bo‘ladi.

# POP IX

### Operation

`IXH ← (SP+1), IXL ← (SP)`

### Op Code

`POP`

### Operand

`IX`

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>DD</code></td></tr>
  <tr><td>2</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>E1</code></td></tr>
</table>

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

`IYH ← (SP – X1), IYL ← (SP)`

### Op Code

`POP`

### Operand

`IY`

<table>
  <tr><td>1</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>FD</code></td></tr>
  <tr><td>2</td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>E1</code></td></tr>
</table>

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

Manba izohi: Manbaning Operation ifodasida `(SP – X1)` yozilgan. Description va misolga ko‘ra, high-order byte uchun `(SP + 1)` nazarda tutilgan.
