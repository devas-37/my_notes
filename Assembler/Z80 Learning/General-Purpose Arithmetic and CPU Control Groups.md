---
name: General-Purpose Arithmetic and CPU Control Groups
status: active
pinned: false
deleted: false
tags:
    - z80
    - arithmetic
    - cpu-control
---

# General-Purpose Arithmetic and CPU Control Groups

Ushbu bo‘limda quyidagi general-purpose arithmetic va CPU control group instructionlari tavsiflanadi. Batafsil ma’lumot olish uchun mundarijadagi tegishli instruction havolasini bosing.

## Mundarija

- [DAA](#daa)
- [CPL](#cpl)
- [NEG](#neg)
- [CCF](#ccf)
- [SCF](#scf)
- [NOP](#nop)
- [HALT](#halt)
- [DI](#di)
- [EI](#ei)
- [IM 0](#im-0)
- [IM 1](#im-1)
- [IM 2](#im-2)

Bit sxemalarida har bir qator bitta byte: birinchi katak byte tartib raqami, keyingi sakkiz katak bit 7 dan bit 0 gacha, so‘ng hex code, oxirgi katak esa manbadagi bit matnidir. Manbadagi ayrim bit satrlari hex code bilan mos kelmaydi; bit kataklari shu hex codega mos berildi, asl bit matni ham saqlandi. CY — Carry flag.

# DAA

### Operation

`@`

### Op Code

`DAA`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `0` | `0` | `1` | `0` | `0` | `1` | `1` | `1` | `27` | `00011110` |

### Description

Ushbu instruction BCD addition va subtraction operationlari uchun Accumulatorni shartli ravishda tuzatadi. Addition (ADD, ADC, INC) yoki subtraction (SUB, SBC, DEC, NEG) uchun bajariladigan operation quyidagi jadvalda ko‘rsatilgan.

Ustunlar tartibi: Operation; DAA dan oldingi C; upper digitdagi hex qiymat (bit 7–4); DAA dan oldingi H; lower digitdagi hex qiymat (bit 3–0); byte ga qo‘shiladigan son; DAA dan keyingi C; manbadagi birlashtirilgan qator matni.

|                      |     |       |     |       |      |     |                  |
| -------------------- | --- | ----- | --- | ----- | ---- | --- | ---------------- |
| `ADD, ADC, INC`      | `0` | `9–0` | `0` | `0–9` | `00` | `0` | `09–000–9000`    |
| `ADD, ADC, INC`      | `0` | `0–8` | `0` | `A–F` | `06` | `0` | `00–80A–F060`    |
| `ADD, ADC, INC`      | `0` | `0–9` | `1` | `0–3` | `06` | `0` | `00–910–3060`    |
| `ADD, ADC, INC`      | `0` | `A–F` | `0` | `0–9` | `60` | `1` | `ADD0A–F00–9601` |
| `ADD, ADC, INC`      | `0` | `9–F` | `0` | `A–F` | `66` | `1` | `ADC09–F0A–F661` |
| `ADD, ADC, INC`      | `0` | `A–F` | `1` | `0–3` | `66` | `1` | `INC0A–F10–3661` |
| `ADD, ADC, INC`      | `1` | `0–2` | `0` | `0–9` | `60` | `1` | `10–200–9601`    |
| `ADD, ADC, INC`      | `1` | `0–2` | `0` | `A–F` | `66` | `1` | `10–20A–F661`    |
| `ADD, ADC, INC`      | `1` | `0–3` | `1` | `0–3` | `66` | `1` | `10–310–3661`    |
| `SUB, SBC, DEC, NEG` | `0` | `0–9` | `0` | `0–9` | `00` | `0` | `SUB00–900–9000` |
| `SUB, SBC, DEC, NEG` | `0` | `0–8` | `1` | `6–F` | `FA` | `0` | `SBC00–816–FFA0` |
| `SUB, SBC, DEC, NEG` | `1` | `7–F` | `0` | `0–9` | `A0` | `1` | `DEC17–F00–9A01` |
| `SUB, SBC, DEC, NEG` | `1` | `6–7` | `1` | `6–F` | `9A` | `1` | `NEG16–716–F9A1` |

### Condition Bits Affected

Operationdan keyin Accumulatorning most-significant biti 1 bo‘lsa, S set qilinadi; aks holda reset qilinadi. Operationdan keyin Accumulator 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H uchun yuqoridagi DAA instruction jadvaliga qarang. Operationdan keyin Accumulatorda even parity bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N o‘zgarmaydi. C uchun yuqoridagi DAA instruction jadvaliga qarang.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 1        | 4        | 1.00            |

### Misol

15 (BCD) va 27 (BCD) o‘rtasida addition operation bajariladi. Oddiy decimal arithmetic quyidagi natijani beradi:

```text
  15
+ 27
----
  42
```

Ularning binary ko‘rinishlari Accumulatorda standard binary arithmetic bo‘yicha qo‘shiladi:

```text
  00010101
+ 00100111
----------
  00111100 = 3C
```

Bu yig‘indi kerakli BCD ko‘rinishini bermaydi. DAA natijani tuzatib, to‘g‘ri BCD ko‘rinishini hosil qiladi:

```text
  00111100
+ 00000110
----------
  01000010 = 42
```

Manba izohi: Manbada Operation `@` belgisi bilan berilgan; belgi saqlandi.

Manba izohi: DAA jadvalidagi birinchi upper digit oralig‘i `9–0`, oxirgi upper digit oralig‘i esa `6–7` deb berilgan; ikkala qiymat ham manbadagidek saqlandi.

# CPL

### Operation

`A ← A`

### Op Code

`CPL`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `0` | `0` | `1` | `0` | `1` | `1` | `1` | `1` | `2F` | `00011111` |

### Description

Accumulator (Register A) tarkibi invert qilinadi (one’s complement).

### Condition Bits Affected

S o‘zgarmaydi. Z o‘zgarmaydi. H set qilinadi. P/V o‘zgarmaydi. N set qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 1        | 4        | 1.00            |

### Misol

Accumulatorda `1011 0100` bo‘lsa, `CPL` bajarilgach, Accumulatorda `01001011` bo‘ladi.

Manba izohi: Manbada Operation `A ← A` ko‘rinishida berilgan. Description va misolda esa one’s complement bajarilishi ko‘rsatilgan.

# NEG

### Operation

`A ← 0 – A`

### Op Code

`NEG`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` | `11001111` |
| 2   | `0` | `1` | `0` | `0` | `0` | `1` | `0` | `0` | `44` | `01000100` |

### Description

Accumulator tarkibi inkor qilinadi (two’s complement). Bu Accumulator tarkibini noldan ayirish bilan bir xil. Manbada 80h address o‘zgarmasligi aytilgan.

### Condition Bits Affected

Natija manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Natija 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. Bit 4 dan borrow bo‘lsa, H set qilinadi; aks holda reset qilinadi. Operationdan oldin Accumulator 80h bo‘lgan bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N set qilinadi. Operationdan oldin Accumulator 00h bo‘lmagan bo‘lsa, C set qilinadi; aks holda reset qilinadi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 2        | 8 (4, 4) | 2.00            |

### Misol

Accumulatordagi boshlang‘ich ma’lumot va `NEG` bajarilgandan keyingi ma’lumot manbada quyidagi bit satrlari bilan berilgan. Har bir qatorda avval holat, keyin bit 7 dan bit 0 gacha ko‘rsatilgan:

|                        |     |     |     |     |     |     |     |     |
| ---------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Bajarilishidan oldin` | `1` | `0` | `1` | `0` | `0` | `0` | `0` | `1` |
| `Bajarilgandan keyin`  | `0` | `1` | `0` | `0` | `0` | `0` | `1` | `1` |

Manba izohi: Manbada “80h address” deyiladi; Descriptiondagi operation Accumulator tarkibiga tegishli.

Manba izohi: Misoldagi `10100001` va `01000011` bit satrlari manbadagidek saqlandi; ular bir-birining two’s complement qiymati emas.

# CCF

### Operation

`CY ← CY`

### Op Code

`CCF`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `0` | `0` | `1` | `1` | `1` | `1` | `1` | `1` | `3F` | `00111111` |

### Description

F registerdagi Carry flag invert qilinadi.

### Condition Bits Affected

S o‘zgarmaydi. Z o‘zgarmaydi. Oldingi carry qiymati H ga ko‘chiriladi. P/V o‘zgarmaydi. N reset qilinadi. Operationdan oldin CY 0 bo‘lgan bo‘lsa, C set qilinadi; aks holda reset qilinadi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 1        | 4        | 1.00            |

Manba izohi: Manbada Operation `CY ← CY` ko‘rinishida berilgan. Description bo‘yicha Carry flag invert qilinadi.

# SCF

### Operation

`CY ← 1`

### Op Code

`SCF`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `0` | `0` | `1` | `1` | `0` | `1` | `1` | `1` | `37` | `00111110` |

### Description

F registerdagi Carry flag set qilinadi.

### Condition Bits Affected

S o‘zgarmaydi. Z o‘zgarmaydi. H reset qilinadi. P/V o‘zgarmaydi. N reset qilinadi. C set qilinadi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 1        | 4        | 1.00            |

# NOP

### Operation

`—`

### Op Code

`NOP`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `00` | `00000000` |

### Description

CPU ushbu machine cycle davomida hech qanday operation bajarmaydi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 1        | 4        | 1.00            |

# HALT

### Operation

`—`

### Op Code

`HALT`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `0` | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `76` | `01110110` |

### Description

HALT instruction keyingi interrupt yoki reset kelguncha CPU ishini to‘xtatib turadi. HALT holatida processor memory refresh logicni saqlash uchun NOP instructionlarini bajaradi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 1        | 4        | 1.00            |

# DI

### Operation

`IFF ← 0`

### Op Code

`DI`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `1` | `1` | `0` | `0` | `1` | `1` | `F3` | `11111010` |

### Description

DI interrupt enable flip-floplarni (IFF1 va IFF2) reset qilish orqali maskable interruptni o‘chiradi.

Ushbu instruction bajarilayotgan vaqtda maskable interrupt o‘chiriladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 1        | 4        | 1.00            |

### Misol

CPU `DI` instructionni bajargach, maskable interrupt keyinchalik `EI` instruction bilan qayta yoqilguncha o‘chirilgan bo‘ladi. CPU Interrupt Request (INT) signaliga javob bermaydi.

# EI

### Operation

`IFF ← 1`

### Op Code

`EI`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `1` | `FB` | `11111011` |

### Description

Enable interrupt instruction ikkala interrupt enable flip-flopni (manbada IFFI va IFF2) logic 1 ga o‘rnatib, maskable interruptni tan olishga imkon beradi.

Ushbu instruction va undan keyingi instruction bajarilayotgan vaqtda maskable interruptlar o‘chirilgan bo‘ladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 1        | 4        | 1.00            |

### Misol

CPU `EI` va undan keyingi `RETI` instructionlar ketma-ketligini bajarganda, maskable interrupt `RETI` bajarilgach yoqiladi.

Manba izohi: Manbada birinchi flip-flop `IFFI` deb yozilgan; DI bo‘limida u `IFF1` deb berilgan.

# IM 0

### Operation

Interrupt Mode 0 ni o‘rnatish.

### Op Code

`IM`

### Operand

`0`

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` | `11001111` |
| 2   | `0` | `1` | `0` | `0` | `0` | `1` | `1` | `0` | `46` | `01010100` |

### Description

IM 0 instruction Interrupt Mode 0 ni o‘rnatadi. Bu mode da interrupt yuborayotgan device CPU bajarishi uchun data busga istalgan instructionni joylashtirishi mumkin. Multi-byte instructionning birinchi byte i interrupt acknowledge cycle davomida o‘qiladi. Keyingi byte lar odatiy memory read ketma-ketligi orqali o‘qiladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 2        | 8 (4, 4) | 2.00            |

# IM 1

### Operation

Interrupt Mode 1 ni o‘rnatish.

### Op Code

`IM`

### Operand

`1`

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` | `11001111` |
| 2   | `0` | `1` | `0` | `1` | `0` | `1` | `1` | `0` | `56` | `01110100` |

### Description

IM 1 instruction Interrupt Mode 1 ni o‘rnatadi. Bu mode da processor interruptga javoban 0038h addressda restart bajaradi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 2        | 8 (4, 4) | 2.00            |

# IM 2

### Operation

Interrupt Mode 2 ni o‘rnatish.

### Op Code

`IM`

### Operand

`2`

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` | `11001111` |
| 2   | `0` | `1` | `0` | `1` | `1` | `1` | `1` | `0` | `5E` | `01110101` |

### Description

IM 2 instruction vectored Interrupt Mode 2 ni o‘rnatadi. Bu mode peripheral device taqdim etadigan 8-bit vector orqali istalgan memory locationga indirect call qilish imkonini beradi. Vector indirect pointerning least-significant sakkiz bitini tashkil qiladi, CPU dagi I register esa most-significant sakkiz bitni beradi. Ushbu address vector tabledagi interrupt service routine boshlanish addressini ko‘rsatadigan yozuvga yo‘naltiradi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 2        | 8 (4, 4) | 2.00            |
