---
name: Rotate and Shift Group
status: active
pinned: false
deleted: false
tags:
    - z80
    - rotate
    - shift
---

# Rotate and Shift Group

Ushbu bo‘limda quyidagi rotate va shift group instructionlari tavsiflanadi. Batafsil ma’lumot olish uchun mundarijadagi tegishli instruction havolasini bosing.

## Mundarija

- [RLCA](#rlca)
- [RLA](#rla)
- [RRCA](#rrca)
- [RRA](#rra)
- [RLC r](#rlc-r)
- [RLC (HL)](#rlc-hl)
- [RLC (IX+d)](#rlc-ixd)
- [RLC (IY+d)](#rlc-iyd)
- [RL m](#rl-m)
- [RRC m](#rrc-m)
- [RR m](#rr-m)
- [SLA m](#sla-m)
- [SRA m](#sra-m)
- [SRL m](#srl-m)
- [RLD](#rld)
- [RRD](#rrd)

Operation ifodalari Descriptiondagi bit ko‘chirishlarini ifodalaydi; o‘ng tomondagi barcha qiymatlar operationdan oldingi holatga tegishli. CY — Carry flag; pastki indeks bit raqamini bildiradi. Opcode jadvallarida birinchi katak byte tartib raqami, keyingi sakkiz katak bit 7 dan bit 0 gacha, so‘ng hex code yoki operand turi, oxirgi katak esa manbadagi bit matnidir. Manbadagi ayrim bit satrlari hex code bilan mos kelmaydi; bit kataklari shu hex codega mos berildi va asl matn ham saqlandi. Indexed instruction byte ketma-ketligi: DD yoki FD, CB, d, opcode. d — butun byte ni egallaydigan two’s-complement displacement. r₂, r₁, r₀ register code bitlarini bildiradi.

Misol sxemalaridagi bit kataklari manbada berilgan bit raqamlari tartibida — 7, 6, 4, 1, 0, 2, 5, 3 — saqlandi. “Bit raqami” qatori shu tartibni ko‘rsatadi. RRCA misolidagi alohida bo‘laklar ham o‘z ketma-ketligida berilgan. Manbadagi `lY` yozuvi tegishli operand va Timing qiymatlarida saqlandi.

# RLCA

### Operation

`A₇…A₀ ← A₆ A₅ A₄ A₃ A₂ A₁ A₀ A₇; CY ← A₇`

### Op Code

`RLCA`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `0` | `0` | `0` | `0` | `0` | `1` | `1` | `1` | `07` | `00011100` |

### Description

Accumulator (Register A) tarkibi chapga bir bit positionga rotate qilinadi. Sign bit (bit 7) Carry flagga va bit 0 ga ko‘chiriladi. Bit 0 — least-significant bit.

### Condition Bits Affected

S o‘zgarmaydi. Z o‘zgarmaydi. H reset qilinadi. P/V o‘zgarmaydi. N reset qilinadi. C ga Accumulatorning oldingi bit 7 qiymati ko‘chiriladi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 1        | 4        | 1.00            |

### Misol

Accumulatorning boshlang‘ich tarkibi va `RLCA` bajarilgandan keyingi Accumulator hamda Carry flag qiymatlari:

|              |     |     |     |     |     |     |     |     |              |
| ------------ | --- | --- | --- | --- | --- | --- | --- | --- | ------------ |
| `Bit raqami` | `7` | `6` | `4` | `1` | `0` | `2` | `5` | `3` | `C`          |
| `A — oldin`  | `1` | `0` | `0` | `0` | `0` | `0` | `0` | `1` | `Berilmagan` |
| `A — keyin`  | `0` | `0` | `1` | `0` | `1` | `0` | `0` | `0` | `1`          |

# RLA

### Operation

`A₇…A₀ ← A₆ A₅ A₄ A₃ A₂ A₁ A₀ CY; CY ← A₇`

### Op Code

`RLA`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `0` | `0` | `0` | `1` | `0` | `1` | `1` | `1` | `17` | `00111100` |

### Description

Accumulator (Register A) tarkibi Carry flag orqali chapga bir bit positionga rotate qilinadi. Carry flagning oldingi qiymati bit 0 ga ko‘chiriladi. Bit 0 — least-significant bit.

### Condition Bits Affected

S o‘zgarmaydi. Z o‘zgarmaydi. H reset qilinadi. P/V o‘zgarmaydi. N reset qilinadi. C ga Accumulatorning oldingi bit 7 qiymati ko‘chiriladi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 1        | 4        | 1.00            |

### Misol

Accumulator va Carry flagning boshlang‘ich qiymatlari hamda `RLA` bajarilgandan keyingi qiymatlari:

|              |     |     |     |     |     |     |     |     |     |
| ------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Bit raqami` | `7` | `6` | `4` | `1` | `0` | `2` | `5` | `3` | `C` |
| `A — oldin`  | `0` | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` |
| `A — keyin`  | `1` | `1` | `0` | `0` | `1` | `1` | `1` | `1` | `0` |

# RRCA

### Operation

`A₇…A₀ ← A₀ A₇ A₆ A₅ A₄ A₃ A₂ A₁; CY ← A₀`

### Op Code

`RRCA`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `0` | `0` | `0` | `0` | `1` | `1` | `1` | `1` | `0F` | `00011101` |

### Description

Accumulator (Register A) tarkibi o‘ngga bir bit positionga rotate qilinadi. Bit 0 Carry flagga va bit 7 ga ko‘chiriladi. Bit 0 — least-significant bit.

### Condition Bits Affected

S o‘zgarmaydi. Z o‘zgarmaydi. H reset qilinadi. P/V o‘zgarmaydi. N reset qilinadi. C ga Accumulatorning oldingi bit 0 qiymati ko‘chiriladi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 1        | 4        | 1.00            |

### Misol

Accumulatorning boshlang‘ich ma’lumotlari va `RRCA` bajarilgandan keyingi Accumulator hamda Carry flag sxemalari manbada quyidagi bo‘laklar bilan berilgan:

|                               |                 |
| ----------------------------- | --------------- |
| `Oldin — bit matni`           | `000010`        |
| `Oldin — bit raqamlari matni` | `6410253`       |
| `Oldin — qo‘shimcha belgilar` | `7, 0, 1`       |
| `Keyin — bit matni`           | `001010`        |
| `Keyin — bit raqamlari matni` | `6410253`       |
| `Keyin — qo‘shimcha belgilar` | `7, 1, 0, 1, C` |

Manba izohi: RRCA misolining bitlari alohida bo‘laklarga ajralgan; ularni taxminan birlashtirish o‘rniga, manbadagi barcha bo‘laklar o‘z tartibida saqlandi.

# RRA

### Operation

`A₇…A₀ ← CY A₇ A₆ A₅ A₄ A₃ A₂ A₁; CY ← A₀`

### Op Code

`RRA`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `0` | `0` | `0` | `1` | `1` | `1` | `1` | `1` | `1F` | `00111101` |

### Description

Accumulator (Register A) tarkibi Carry flag orqali o‘ngga bir bit positionga rotate qilinadi. Carry flagning oldingi qiymati bit 7 ga ko‘chiriladi. Bit 0 — least-significant bit.

### Condition Bits Affected

S o‘zgarmaydi. Z o‘zgarmaydi. H reset qilinadi. P/V o‘zgarmaydi. N reset qilinadi. C ga Accumulatorning oldingi bit 0 qiymati ko‘chiriladi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 1        | 4        | 1.00            |

### Misol

Accumulator va Carry flagning boshlang‘ich qiymatlari hamda `RRA` bajarilgandan keyingi qiymatlari:

|              |     |     |     |     |     |     |     |     |     |
| ------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Bit raqami` | `7` | `6` | `4` | `1` | `0` | `2` | `5` | `3` | `C` |
| `A — oldin`  | `1` | `0` | `0` | `1` | `1` | `1` | `0` | `0` | `0` |
| `A — keyin`  | `0` | `0` | `0` | `1` | `0` | `1` | `0` | `1` | `1` |

# RLC r

### Operation

`r₇…r₀ ← r₆ r₅ r₄ r₃ r₂ r₁ r₀ r₇; CY ← r₇`

### Op Code

`RLC`

### Operand

`r`

|     |     |     |     |     |     |      |      |      |                 |            |
| --- | --- | --- | --- | --- | --- | ---- | ---- | ---- | --------------- | ---------- |
| 1   | `1` | `1` | `0` | `0` | `1` | `0`  | `1`  | `1`  | `CB`            | `11011001` |
| 2   | `0` | `0` | `0` | `0` | `0` | `r₂` | `r₁` | `r₀` | `register code` | `00000 r`  |

### Description

r register tarkibi chapga bir bit positionga rotate qilinadi. Bit 7 tarkibi Carry flagga va bit 0 ga ko‘chiriladi. Object codeda r operand quyidagi register code qiymatlari bilan belgilanadi.

r B, C, D, E, H, L yoki A registerlarni bildiradi; object code qiymatlari quyida berilgan.

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

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H reset qilinadi. Parity even bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C ga source registerning oldingi bit 7 qiymati ko‘chiriladi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 2        | 8 (4, 4) | 2.00            |

### Misol

r registerning boshlang‘ich tarkibi va `RLC r` bajarilgandan keyingi register hamda Carry flag qiymatlari:

|              |     |     |     |     |     |     |     |     |              |
| ------------ | --- | --- | --- | --- | --- | --- | --- | --- | ------------ |
| `Bit raqami` | `7` | `6` | `4` | `1` | `0` | `2` | `5` | `3` | `C`          |
| `r — oldin`  | `0` | `0` | `1` | `0` | `1` | `0` | `0` | `0` | `Berilmagan` |
| `r — keyin`  | `0` | `0` | `1` | `0` | `1` | `0` | `0` | `0` | `1`          |

Manba izohi: Manbada RLC r misolining boshlang‘ich va yakuniy bit matni bir xil — `00101000` deb berilgan. Qiymatlar o‘zgartirilmasdan saqlandi.

# RLC (HL)

### Operation

`(HL)₇…(HL)₀ ← (HL)₆ (HL)₅ (HL)₄ (HL)₃ (HL)₂ (HL)₁ (HL)₀ (HL)₇; CY ← (HL)₇`

### Op Code

`RLC`

### Operand

`(HL)`

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `CB` | `11011001` |
| 2   | `0` | `0` | `0` | `0` | `0` | `1` | `1` | `0` | `06` | `00010100` |

### Description

HL register pair ko‘rsatgan memory address tarkibi chapga bir bit positionga rotate qilinadi. Bit 7 tarkibi Carry flagga va bit 0 ga ko‘chiriladi. Bit 0 — least-significant bit.

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H reset qilinadi. Parity even bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C ga source registerning oldingi bit 7 qiymati ko‘chiriladi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 15 (4, 4, 4, 3) | 3.75            |

### Misol

HL register pairda 2828h bo‘lsin. 2828h memory locationning boshlang‘ich tarkibi va `RLC (HL)` bajarilgandan keyingi memory location hamda Carry flag qiymatlari:

|                   |     |     |     |     |     |     |     |     |              |
| ----------------- | --- | --- | --- | --- | --- | --- | --- | --- | ------------ |
| `Bit raqami`      | `7` | `6` | `4` | `1` | `0` | `2` | `5` | `3` | `C`          |
| `(2828h) — oldin` | `1` | `0` | `0` | `0` | `0` | `0` | `0` | `1` | `Berilmagan` |
| `(2828h) — keyin` | `0` | `0` | `1` | `0` | `1` | `0` | `0` | `0` | `1`          |

# RLC (IX+d)

### Operation

`(IX+d)₇…(IX+d)₀ ← (IX+d)₆ (IX+d)₅ (IX+d)₄ (IX+d)₃ (IX+d)₂ (IX+d)₁ (IX+d)₀ (IX+d)₇; CY ← (IX+d)₇`

### Op Code

`RLC`

### Operand

`(IX+d)`

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `1`  | `DD`             | `11101101` |
| 2   | `1`  | `1`  | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `CB`             | `11011001` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |
| 4   | `0`  | `0`  | `0`  | `0`  | `0`  | `1`  | `1`  | `0`  | `06`             | `00010100` |

### Description

Index Register IX tarkibi va two’s-complement displacement integer d yig‘indisi ko‘rsatgan memory address tarkibi chapga bir bit positionga rotate qilinadi. Bit 7 tarkibi Carry flagga va bit 0 ga ko‘chiriladi. Bit 0 — least-significant bit.

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H reset qilinadi. Parity even bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C ga source registerning oldingi bit 7 qiymati ko‘chiriladi.

### Timing

| M Cycles | T States              | 4 MHz E.T. (µs) |
| -------- | --------------------- | --------------- |
| 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |

### Misol

Index Register IX da 1000h bo‘lsin. Manbada 1022h memory location quyidagi boshlang‘ich ma’lumotni saqlashi aytilgan. `RLC (IX+2h)` bajarilgach, 1002h memory location va Carry flag quyidagi yakuniy qiymatlarga ega bo‘ladi:

|                  |     |     |     |     |     |     |     |     |              |
| ---------------- | --- | --- | --- | --- | --- | --- | --- | --- | ------------ |
| `Bit raqami`     | `7` | `6` | `4` | `1` | `0` | `2` | `5` | `3` | `C`          |
| `Memory — oldin` | `1` | `0` | `0` | `0` | `0` | `0` | `0` | `1` | `Berilmagan` |
| `Memory — keyin` | `0` | `0` | `1` | `0` | `1` | `0` | `0` | `0` | `1`          |

Manba izohi: Manbada boshlang‘ich memory location `1022h`, instruction va natijada esa `IX+2h` hamda `1002h` berilgan. Ushbu address nomuvofiqligi saqlandi.

# RLC (IY+d)

### Operation

`(IY+d)₇…(IY+d)₀ ← (IY+d)₆ (IY+d)₅ (IY+d)₄ (IY+d)₃ (IY+d)₂ (IY+d)₁ (IY+d)₀ (IY+d)₇; CY ← (IY+d)₇`

### Op Code

`RLC`

### Operand

`(lY+d)`

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1`  | `FD`             | `11101111` |
| 2   | `1`  | `1`  | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `CB`             | `11011001` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |
| 4   | `0`  | `0`  | `0`  | `0`  | `0`  | `1`  | `1`  | `0`  | `06`             | `00010100` |

### Description

Index Register IY tarkibi va two’s-complement displacement integer d yig‘indisi ko‘rsatgan memory address tarkibi chapga bir bit positionga rotate qilinadi. Bit 7 tarkibi Carry flagga va bit 0 ga ko‘chiriladi. Bit 0 — least-significant bit.

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H reset qilinadi. Parity even bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C ga source registerning oldingi bit 7 qiymati ko‘chiriladi.

### Timing

| M Cycles | T States              | 4 MHz E.T. (µs) |
| -------- | --------------------- | --------------- |
| 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |

### Misol

Index Register IY da 1000h bo‘lsin. 1002h memory location quyidagi boshlang‘ich ma’lumotni saqlaydi. `RLC (IY+2h)` bajarilgach, 1002h memory location va Carry flag quyidagi yakuniy qiymatlarga ega bo‘ladi:

|                  |     |     |     |     |     |     |     |     |              |
| ---------------- | --- | --- | --- | --- | --- | --- | --- | --- | ------------ |
| `Bit raqami`     | `7` | `6` | `4` | `1` | `0` | `2` | `5` | `3` | `C`          |
| `Memory — oldin` | `1` | `0` | `0` | `0` | `0` | `0` | `0` | `1` | `Berilmagan` |
| `Memory — keyin` | `0` | `0` | `1` | `0` | `1` | `0` | `0` | `0` | `1`          |

# RL m

### Operation

`m₇…m₀ ← m₆ m₅ m₄ m₃ m₂ m₁ m₀ CY; CY ← m₇`

### Op Code

`RL`

### Operand

`m`

m operand mos RLC instructionlarida ta’riflangan r, (HL), (IX+d) yoki (lY+d) qiymatlardan biri bo‘lishi mumkin. Quyida object codedagi mumkin bo‘lgan op code/operand kombinatsiyalari berilgan.

#### RL r

|     |     |     |     |     |     |      |      |      |                 |            |
| --- | --- | --- | --- | --- | --- | ---- | ---- | ---- | --------------- | ---------- |
| 1   | `1` | `1` | `0` | `0` | `1` | `0`  | `1`  | `1`  | `CB`            | `11011001` |
| 2   | `0` | `0` | `0` | `1` | `0` | `r₂` | `r₁` | `r₀` | `register code` | `00100 r*` |

#### RL (HL)

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `CB` | `11011001` |
| 2   | `0` | `0` | `0` | `1` | `0` | `1` | `1` | `0` | `16` | `00110100` |

#### RL (IX+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `1`  | `DD`             | `11101101` |
| 2   | `1`  | `1`  | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `CB`             | `11011001` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |
| 4   | `0`  | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `0`  | `16`             | `00110100` |

#### RL (IY+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1`  | `FD`             | `11101111` |
| 2   | `1`  | `1`  | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `CB`             | `11011001` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |
| 4   | `0`  | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `0`  | `16`             | `00110100` |

### Description

m operand tarkibi chapga bir bit positionga rotate qilinadi. Bit 7 tarkibi Carry flagga, Carry flagning oldingi qiymati esa bit 0 ga ko‘chiriladi.

r B, C, D, E, H, L yoki A registerlarni bildiradi; object code qiymatlari quyida berilgan.

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

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H reset qilinadi. Parity even bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C ga source registerning oldingi bit 7 qiymati ko‘chiriladi.

### Timing

| Instruction | M Cycles | T States              | 4 MHz E.T. (µs) |
| ----------- | -------- | --------------------- | --------------- |
| `RL r`      | 2        | 8 (4, 4)              | 2.00            |
| `RL (HL)`   | 4        | 15 (4, 4, 4, 3)       | 3.75            |
| `RL (IX+d)` | 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |
| `RL (IY+d)` | 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |

### Misol

D register va Carry flagning boshlang‘ich qiymatlari hamda `RL D` bajarilgandan keyingi qiymatlari:

|              |     |     |     |     |     |     |     |     |     |
| ------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Bit raqami` | `7` | `6` | `4` | `1` | `0` | `2` | `5` | `3` | `C` |
| `D — oldin`  | `1` | `0` | `0` | `1` | `1` | `1` | `0` | `1` | `0` |
| `D — keyin`  | `0` | `0` | `1` | `1` | `0` | `1` | `0` | `1` | `1` |

Manba izohi: Manbadagi register maydoni `00100 r*` deb berilgan; bit kataklari shu bo‘limdagi 16 hex codega mos `00010 r₂ r₁ r₀` ko‘rinishida berildi. Asl maydon matni ham saqlandi.

# RRC m

### Operation

`m₇…m₀ ← m₀ m₇ m₆ m₅ m₄ m₃ m₂ m₁; CY ← m₀`

### Op Code

`RRC`

### Operand

`m`

m operand mos RLC instructionlarida ta’riflangan r, (HL), (IX+d) yoki (lY+d) qiymatlardan biri bo‘lishi mumkin. Quyida object codedagi mumkin bo‘lgan op code/operand kombinatsiyalari berilgan.

#### RRC r

|     |     |     |     |     |     |      |      |      |                 |            |
| --- | --- | --- | --- | --- | --- | ---- | ---- | ---- | --------------- | ---------- |
| 1   | `1` | `1` | `0` | `0` | `1` | `0`  | `1`  | `1`  | `CB`            | `11011001` |
| 2   | `0` | `0` | `0` | `0` | `1` | `r₂` | `r₁` | `r₀` | `register code` | `00001 r*` |

#### RRC (HL)

|     |     |     |     |     |     |     |     |     |      |                 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | --------------- |
| 1   | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `CB` | `11011001`      |
| 2   | `0` | `0` | `0` | `0` | `1` | `1` | `1` | `0` | `0E` | `00010101 / OE` |

#### RRC (IX+d)

|     |      |      |      |      |      |      |      |      |                  |                 |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | --------------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `1`  | `DD`             | `11101101`      |
| 2   | `1`  | `1`  | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `CB`             | `11011001`      |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`             |
| 4   | `0`  | `0`  | `0`  | `0`  | `1`  | `1`  | `1`  | `0`  | `0E`             | `00010101 / OE` |

#### RRC (IY+d)

|     |      |      |      |      |      |      |      |      |                  |                 |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | --------------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1`  | `FD`             | `11101111`      |
| 2   | `1`  | `1`  | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `CB`             | `11011001`      |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`             |
| 4   | `0`  | `0`  | `0`  | `0`  | `1`  | `1`  | `1`  | `0`  | `0E`             | `00010101 / OE` |

### Description

m operand tarkibi o‘ngga bir bit positionga rotate qilinadi. Bit 0 tarkibi Carry flagga va bit 7 ga ko‘chiriladi. Bit 0 — least-significant bit.

r B, C, D, E, H, L yoki A registerlarni bildiradi; object code qiymatlari quyida berilgan.

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

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H reset qilinadi. Parity even bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C ga source registerning oldingi bit 0 qiymati ko‘chiriladi.

### Timing

| Instruction  | M Cycles | T States              | 4 MHz E.T. (µs) |
| ------------ | -------- | --------------------- | --------------- |
| `RRC r`      | 2        | 8 (4, 4)              | 2.00            |
| `RRC (HL)`   | 4        | 15 (4, 4, 4, 3)       | 3.75            |
| `RRC (IX+d)` | 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |
| `RRC (lY+d)` | 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |

### Misol

A registerning boshlang‘ich tarkibi va `RRC A` bajarilgandan keyingi Register A hamda Carry flag qiymatlari:

|              |     |     |     |     |     |     |     |     |              |
| ------------ | --- | --- | --- | --- | --- | --- | --- | --- | ------------ |
| `Bit raqami` | `7` | `6` | `4` | `1` | `0` | `2` | `5` | `3` | `C`          |
| `A — oldin`  | `0` | `0` | `1` | `0` | `1` | `0` | `1` | `0` | `Berilmagan` |
| `A — keyin`  | `0` | `0` | `1` | `0` | `1` | `0` | `0` | `1` | `1`          |

Manba izohi: Manbada uchta hex code `OE` (O harfi bilan) yozilgan. Hex code katagida `0E`, asl qiymat katagida esa `OE` saqlandi.

# RR m

### Operation

`m₇…m₀ ← CY m₇ m₆ m₅ m₄ m₃ m₂ m₁; CY ← m₀`

### Op Code

`RR`

### Operand

`m`

m operand mos RLC instructionlarida ta’riflangan r, (HL), (IX+d) yoki (lY+d) qiymatlardan biri bo‘lishi mumkin. Quyida object codedagi mumkin bo‘lgan op code/operand kombinatsiyalari berilgan.

#### RR r

|     |     |     |     |     |     |      |      |      |                 |            |
| --- | --- | --- | --- | --- | --- | ---- | ---- | ---- | --------------- | ---------- |
| 1   | `1` | `1` | `0` | `0` | `1` | `0`  | `1`  | `1`  | `CB`            | `11011001` |
| 2   | `0` | `0` | `0` | `1` | `1` | `r₂` | `r₁` | `r₀` | `register code` | `00001 r*` |

#### RR (HL)

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `CB` | `11011001` |
| 2   | `0` | `0` | `0` | `1` | `1` | `1` | `1` | `0` | `1E` | `00110101` |

#### RR (IX+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `1`  | `DD`             | `11101101` |
| 2   | `1`  | `1`  | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `CB`             | `11011001` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |
| 4   | `0`  | `0`  | `0`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1E`             | `00110101` |

#### RR (IY+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1`  | `FD`             | `11101111` |
| 2   | `1`  | `1`  | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `CB`             | `11011001` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |
| 4   | `0`  | `0`  | `0`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1E`             | `00110101` |

### Description

m operand tarkibi Carry flag orqali o‘ngga bir bit positionga rotate qilinadi. Bit 0 tarkibi Carry flagga, Carry flagning oldingi qiymati esa bit 7 ga ko‘chiriladi. Bit 0 — least-significant bit.

r B, C, D, E, H, L yoki A registerlarni bildiradi; object code qiymatlari quyida berilgan.

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

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H reset qilinadi. Parity even bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C ga source registerning oldingi bit 0 qiymati ko‘chiriladi.

### Timing

| Instruction | M Cycles | T States              | 4 MHz E.T. (µs) |
| ----------- | -------- | --------------------- | --------------- |
| `RR r`      | 2        | 8 (4, 4)              | 2.00            |
| `RR (HL)`   | 4        | 15 (4, 4, 4, 3)       | 3.75            |
| `RR (IX+d)` | 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |
| `RR (lY+d)` | 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |

### Misol

HL register pairda 4343h bo‘lsin. 4343h memory location va Carry flagning boshlang‘ich qiymatlari hamda `RR (HL)` bajarilgandan keyingi qiymatlari:

|                   |     |     |     |     |     |     |     |     |     |
| ----------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Bit raqami`      | `7` | `6` | `4` | `1` | `0` | `2` | `5` | `3` | `C` |
| `(4343h) — oldin` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `1` | `0` |
| `(4343h) — keyin` | `0` | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` |

Manba izohi: Manbadagi register maydoni `00001 r*` deb berilgan; bit kataklari shu bo‘limdagi 1E hex codega mos `00011 r₂ r₁ r₀` ko‘rinishida berildi. Asl maydon matni ham saqlandi.

# SLA m

### Operation

`m₇…m₀ ← m₆ m₅ m₄ m₃ m₂ m₁ m₀ 0; CY ← m₇`

### Op Code

`SLA`

### Operand

`m`

m operand mos RLC instructionlarida ta’riflangan r, (HL), (IX+d) yoki (lY+d) qiymatlardan biri bo‘lishi mumkin. Quyida object codedagi mumkin bo‘lgan op code/operand kombinatsiyalari berilgan.

#### SLA r

|     |     |     |     |     |     |      |      |      |                 |            |
| --- | --- | --- | --- | --- | --- | ---- | ---- | ---- | --------------- | ---------- |
| 1   | `1` | `1` | `0` | `0` | `1` | `0`  | `1`  | `1`  | `CB`            | `11011001` |
| 2   | `0` | `0` | `1` | `0` | `0` | `r₂` | `r₁` | `r₀` | `register code` | `00010 r*` |

#### SLA (HL)

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `CB` | `11011001` |
| 2   | `0` | `0` | `1` | `0` | `0` | `1` | `1` | `0` | `26` | `00010110` |

#### SLA (IX+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `1`  | `DD`             | `11101101` |
| 2   | `1`  | `1`  | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `CB`             | `11011001` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |
| 4   | `0`  | `0`  | `1`  | `0`  | `0`  | `1`  | `1`  | `0`  | `26`             | `00010110` |

#### SLA (IY+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1`  | `FD`             | `11101111` |
| 2   | `1`  | `1`  | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `CB`             | `11011001` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |
| 4   | `0`  | `0`  | `1`  | `0`  | `0`  | `1`  | `1`  | `0`  | `26`             | `00010110` |

### Description

m operand tarkibida chapga bir bit positionga arithmetic shift bajariladi. Bit 7 tarkibi Carry flagga ko‘chiriladi. Bit 0 — least-significant bit.

r B, C, D, E, H, L yoki A registerlarni bildiradi; object code qiymatlari quyida berilgan.

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

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H reset qilinadi. Parity even bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C ga oldingi bit 7 qiymati ko‘chiriladi.

### Timing

| Instruction  | M Cycles | T States              | 4 MHz E.T. (µs) |
| ------------ | -------- | --------------------- | --------------- |
| `SLA r`      | 2        | 8 (4, 4)              | 2.00            |
| `SLA (HL)`   | 4        | 15 (4, 4, 4, 3)       | 3.75            |
| `SLA (IX+d)` | 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |
| `SLA (IY+d)` | 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |

### Misol

L registerning boshlang‘ich tarkibi va `SLA L` bajarilgandan keyingi Register L hamda Carry flag qiymatlari:

|              |     |     |     |     |     |     |     |     |              |
| ------------ | --- | --- | --- | --- | --- | --- | --- | --- | ------------ |
| `Bit raqami` | `7` | `6` | `4` | `1` | `0` | `2` | `5` | `3` | `C`          |
| `L — oldin`  | `1` | `0` | `1` | `0` | `1` | `0` | `1` | `0` | `Berilmagan` |
| `L — keyin`  | `0` | `1` | `0` | `1` | `0` | `0` | `1` | `0` | `1`          |

Manba izohi: Manbadagi register maydoni `00010 r*` deb berilgan; bit kataklari shu bo‘limdagi 26 hex codega mos `00100 r₂ r₁ r₀` ko‘rinishida berildi. Asl maydon matni ham saqlandi.

# SRA m

### Operation

`m₇…m₀ ← m₇ m₇ m₆ m₅ m₄ m₃ m₂ m₁; CY ← m₀`

### Op Code

`SRA`

### Operand

`m`

m operand mos RLC instructionlarida ta’riflangan r, (HL), (IX+d) yoki (lY+d) qiymatlardan biri bo‘lishi mumkin. Quyida object codedagi mumkin bo‘lgan op code/operand kombinatsiyalari berilgan.

#### SRA r

|     |     |     |     |     |     |      |      |      |                 |            |
| --- | --- | --- | --- | --- | --- | ---- | ---- | ---- | --------------- | ---------- |
| 1   | `1` | `1` | `0` | `0` | `1` | `0`  | `1`  | `1`  | `CB`            | `11011001` |
| 2   | `0` | `0` | `1` | `0` | `1` | `r₂` | `r₁` | `r₀` | `register code` | `00011 r*` |

#### SRA (HL)

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `CB` | `11011001` |
| 2   | `0` | `0` | `1` | `0` | `1` | `1` | `1` | `0` | `2E` | `00010111` |

#### SRA (IX+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `1`  | `DD`             | `11101101` |
| 2   | `1`  | `1`  | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `CB`             | `11011001` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |
| 4   | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `2E`             | `00010111` |

#### SRA (IY+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1`  | `FD`             | `11101111` |
| 2   | `1`  | `1`  | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `CB`             | `11011001` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |
| 4   | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `2E`             | `00010111` |

### Description

m operand tarkibida o‘ngga bir bit positionga arithmetic shift bajariladi. Bit 0 tarkibi Carry flagga ko‘chiriladi, bit 7 ning oldingi qiymati esa o‘zgarmay qoladi. Bit 0 — least-significant bit.

r B, C, D, E, H, L yoki A registerlarni bildiradi; object code qiymatlari quyida berilgan.

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

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H reset qilinadi. Parity even bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C ga source registerning oldingi bit 0 qiymati ko‘chiriladi.

### Timing

| Instruction  | M Cycles | T States              | 4 MHz E.T. (µs) |
| ------------ | -------- | --------------------- | --------------- |
| `SRA r`      | 2        | 8 (4, 4)              | 2.00            |
| `SRA (HL)`   | 4        | 15 (4, 4, 4, 3)       | 3.75            |
| `SRA (IX+d)` | 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |
| `SRA (lY+d)` | 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |

### Misol

Index Register IX da 1000h bo‘lsin. 1003h memory locationning boshlang‘ich tarkibi va `SRA (IX+3h)` bajarilgandan keyingi memory location hamda Carry flag qiymatlari:

|                   |     |     |     |     |     |     |     |     |              |
| ----------------- | --- | --- | --- | --- | --- | --- | --- | --- | ------------ |
| `Bit raqami`      | `7` | `6` | `4` | `1` | `0` | `2` | `5` | `3` | `C`          |
| `(1003h) — oldin` | `1` | `0` | `1` | `0` | `0` | `0` | `1` | `1` | `Berilmagan` |
| `(1003h) — keyin` | `0` | `0` | `1` | `1` | `1` | `0` | `1` | `1` | `0`          |

Manba izohi: Manbadagi register maydoni `00011 r*` deb berilgan; bit kataklari shu bo‘limdagi 2E hex codega mos `00101 r₂ r₁ r₀` ko‘rinishida berildi. Asl maydon matni ham saqlandi.

# SRL m

### Operation

`m₇…m₀ ← 0 m₇ m₆ m₅ m₄ m₃ m₂ m₁; CY ← m₀`

### Op Code

`SRL`

### Operand

`m`

m operand mos RLC instructionlarida ta’riflangan r, (HL), (IX+d) yoki (lY+d) qiymatlardan biri bo‘lishi mumkin. Quyida object codedagi mumkin bo‘lgan op code/operand kombinatsiyalari berilgan.

#### SRL r

|     |     |     |     |     |     |      |      |      |                 |            |
| --- | --- | --- | --- | --- | --- | ---- | ---- | ---- | --------------- | ---------- |
| 1   | `1` | `1` | `0` | `0` | `1` | `0`  | `1`  | `1`  | `CB`            | `11011001` |
| 2   | `0` | `0` | `1` | `1` | `1` | `r₂` | `r₁` | `r₀` | `register code` | `00111 r*` |

#### SRL (HL)

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `0` | `0` | `1` | `0` | `1` | `1` | `CB` | `11011001` |
| 2   | `0` | `0` | `1` | `1` | `1` | `1` | `1` | `0` | `3E` | `00110111` |

#### SRL (IX+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `1`  | `0`  | `1`  | `DD`             | `11101101` |
| 2   | `1`  | `1`  | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `CB`             | `11011001` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |
| 4   | `0`  | `0`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `3E`             | `00110111` |

#### SRL (IY+d)

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `1`  | `FD`             | `11101111` |
| 2   | `1`  | `1`  | `0`  | `0`  | `1`  | `0`  | `1`  | `1`  | `CB`             | `11011001` |
| 3   | `d₇` | `d₆` | `d₅` | `d₄` | `d₃` | `d₂` | `d₁` | `d₀` | `d — butun byte` | `d`        |
| 4   | `0`  | `0`  | `1`  | `1`  | `1`  | `1`  | `1`  | `0`  | `3E`             | `00110111` |

### Description

m operand tarkibi o‘ngga bir bit positionga shift qilinadi. Bit 0 tarkibi Carry flagga ko‘chiriladi va bit 7 reset qilinadi. Bit 0 — least-significant bit.

r B, C, D, E, H, L yoki A registerlarni bildiradi; object code qiymatlari quyida berilgan.

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

S reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H reset qilinadi. Parity even bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C ga source registerning oldingi bit 0 qiymati ko‘chiriladi.

### Timing

| Instruction  | M Cycles | T States              | 4 MHz E.T. (µs) |
| ------------ | -------- | --------------------- | --------------- |
| `SRL r`      | 2        | 8 (4, 4)              | 2.00            |
| `SRL (HL)`   | 4        | 15 (4, 4, 4, 3)       | 3.75            |
| `SRL (IX+d)` | 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |
| `SRL (lY+d)` | 6        | 23 (4, 4, 3, 5, 4, 3) | 5.75            |

### Misol

B registerning boshlang‘ich tarkibi va `SRL B` bajarilgandan keyingi Register B hamda Carry flag qiymatlari:

|              |     |     |     |     |     |     |     |     |              |
| ------------ | --- | --- | --- | --- | --- | --- | --- | --- | ------------ |
| `Bit raqami` | `7` | `6` | `4` | `1` | `0` | `2` | `5` | `3` | `C`          |
| `B — oldin`  | `1` | `0` | `0` | `1` | `1` | `1` | `0` | `1` | `Berilmagan` |
| `B — keyin`  | `1` | `1` | `0` | `1` | `0` | `0` | `1` | `0` | `1`          |

# RLD

### Operation

`A₃…A₀ ← (HL)₇…(HL)₄; (HL)₇…(HL)₄ ← (HL)₃…(HL)₀; (HL)₃…(HL)₀ ← A₃…A₀; A₇…A₄ o‘zgarmaydi`

### Op Code

`RLD`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` | `11001111` |
| 2   | `0` | `1` | `1` | `0` | `1` | `1` | `1` | `1` | `6F` | `01011111` |

### Description

(HL) memory locationning low-order to‘rt biti (bit 3, 2, 1 va 0) shu memory locationning high-order to‘rt bitiga (bit 7, 6, 5 va 4) ko‘chiriladi. High-order to‘rt bitning oldingi tarkibi Accumulator (Register A) ning low-order to‘rt bitiga, Accumulatorning low-order to‘rt bitining oldingi tarkibi esa (HL) memory locationning low-order to‘rt bitiga ko‘chiriladi. Accumulatorning high-order bitlari o‘zgarmaydi.

(HL) HL register pair ko‘rsatgan memory locationni bildiradi.

### Condition Bits Affected

Operationdan keyin Accumulator manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Operationdan keyin Accumulator 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H reset qilinadi. Operationdan keyin Accumulator parity qiymati even bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 18 (4, 4, 3, 4, 3) | 4.50            |

### Misol

HL register pairda 5000h bo‘lsin. Accumulator va 5000h memory locationning boshlang‘ich tarkibi hamda `RLD` bajarilgandan keyingi tarkibi:

|                       |     |     |     |     |     |     |     |     |
| --------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Bit raqami`          | `7` | `6` | `4` | `1` | `0` | `2` | `5` | `3` |
| `Accumulator — oldin` | `0` | `1` | `1` | `1` | `0` | `0` | `1` | `1` |
| `(5000h) — oldin`     | `0` | `0` | `1` | `0` | `1` | `0` | `1` | `0` |
| `Accumulator — keyin` | `0` | `1` | `1` | `1` | `1` | `0` | `1` | `0` |
| `(5000h) — keyin`     | `0` | `0` | `1` | `1` | `0` | `0` | `0` | `1` |

# RRD

### Operation

`A₃…A₀ ← (HL)₃…(HL)₀; (HL)₇…(HL)₄ ← A₃…A₀; (HL)₃…(HL)₀ ← (HL)₇…(HL)₄; A₇…A₄ o‘zgarmaydi`

### Op Code

`RRD`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` | `11001111` |
| 2   | `0` | `1` | `1` | `0` | `0` | `1` | `1` | `1` | `67` | `01011110` |

### Description

(HL) memory locationning low-order to‘rt biti (bit 3, 2, 1 va 0) Accumulator (Register A) ning low-order to‘rt bitiga ko‘chiriladi. Accumulatorning low-order to‘rt bitining oldingi tarkibi (HL) memory locationning high-order to‘rt bitiga (bit 7, 6, 5 va 4), (HL) ning high-order to‘rt bitining oldingi tarkibi esa (HL) ning low-order to‘rt bitiga ko‘chiriladi. Accumulatorning high-order bitlari o‘zgarmaydi.

(HL) HL register pair ko‘rsatgan memory locationni bildiradi.

### Condition Bits Affected

Operationdan keyin Accumulator manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Operationdan keyin Accumulator 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H reset qilinadi. Operationdan keyin Accumulator parity qiymati even bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 18 (4, 4, 3, 4, 3) | 4.50            |

### Misol

HL register pairda 5000h bo‘lsin. Accumulator va 5000h memory locationning boshlang‘ich tarkibi hamda `RRD` bajarilgandan keyingi tarkibi:

|                       |     |     |     |     |     |     |     |     |
| --------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Bit raqami`          | `7` | `6` | `4` | `1` | `0` | `2` | `5` | `3` |
| `Accumulator — oldin` | `1` | `0` | `0` | `0` | `0` | `1` | `0` | `0` |
| `(5000h) — oldin`     | `0` | `0` | `0` | `0` | `0` | `0` | `1` | `0` |
| `Accumulator — keyin` | `1` | `0` | `0` | `0` | `0` | `0` | `0` | `0` |
| `(5000h) — keyin`     | `0` | `1` | `0` | `1` | `0` | `0` | `0` | `0` |
