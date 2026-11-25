---
name: Input and Output Group
status: active
pinned: false
deleted: false
tags:
    - z80
    - input
    - output
---

# Input and Output Group

Ushbu bo‘limda quyidagi input va output group instructionlari tavsiflanadi. Batafsil ma’lumot olish uchun mundarijadagi tegishli instruction havolasini bosing.

## Mundarija

- [IN A, (n)](#in-a-n)
- [IN r (C)](#in-r-c)
- [INI](#ini)
- [INIR](#inir)
- [IND](#ind)
- [INDR](#indr)
- [OUT (n), A](#out-n-a)
- [OUT (C), r](#out-c-r)
- [OUTI](#outi)
- [OTIR](#otir)
- [OUTD](#outd)
- [OTDR](#otdr)

Opcode jadvallarida birinchi katak byte tartib raqami, keyingi sakkiz katak bit 7 dan bit 0 gacha, so‘ng hex code yoki operand turi, oxirgi katak esa manbadagi bit matnidir. Manbadagi ayrim bit satrlari hex code bilan mos kelmaydi; fixed opcode bitlari shu hex codega mos berildi va asl matn ham saqlandi. n butun 8-bit byte ni egallaydi; n₇…n₀ uning alohida bitlaridir. r₂, r₁, r₀ register code bitlarini bildiradi.

# IN A, (n)

### Operation

`A ← (n)`

### Op Code

`IN`

### Operands

`A, (n)`

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `1`  | `0`  | `1`  | `1`  | `DB`             | `11111001` |
| 2   | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — butun byte` | `n`        |

### Description

n operand 256 ta mumkin bo‘lgan portdan biridagi I/O deviceni tanlash uchun address busning pastki yarmiga (A0–A7) joylashtiriladi. Shu vaqtda Accumulator tarkibi address busning yuqori yarmida (A8–A15) ham paydo bo‘ladi. Keyin tanlangan portdan bir byte data busga joylashtirilib, CPU dagi Accumulator (Register A) ga yoziladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States     | 4 MHz LT. (µs) |
| -------- | ------------ | -------------- |
| 3        | 11 (4, 3, 4) | 2.75           |

### Misol

Accumulatorda 23h va 01h I/O port addressga mos peripheral deviceda 7Bh byte mavjud bo‘lsin. `IN A, (01h)` bajarilgach, Accumulatorda 7Bh bo‘ladi.

Manba izohi: Manbaning Timing sarlavhasida `4 MHz LT.` yozilgan; shu yozuv saqlandi.

# IN r (C)

### Operation

`r ← (C)`

### Op Code

`IN`

### Operands

`r, (C)`

|     |     |     |      |      |      |     |     |     |                 |            |
| --- | --- | --- | ---- | ---- | ---- | --- | --- | --- | --------------- | ---------- |
| 1   | `1` | `1` | `1`  | `0`  | `1`  | `1` | `0` | `1` | `ED`            | `11001111` |
| 2   | `0` | `1` | `r₂` | `r₁` | `r₀` | `0` | `0` | `0` | `register code` | `01r000`   |

### Description

C register tarkibi 256 ta mumkin bo‘lgan portdan biridagi I/O deviceni tanlash uchun address busning pastki yarmiga (A0–A7) joylashtiriladi. Shu vaqtda B register tarkibi address busning yuqori yarmiga (A8–A15) joylashtiriladi. Keyin tanlangan portdan bir byte data busga joylashtirilib, CPU dagi r registerga yoziladi. r quyidagi CPU registerlaridan birini bildiradi; jadvalda har biri uchun tegishli 3-bit r maydoni berilgan. Input data tekshirilishi natijasida flaglar o‘zgaradi.

Ustunlar tartibi: register; r bit maydoni. Flag qatorida manbadagi opcode izohi ham berilgan.

|        |                                              |
| ------ | -------------------------------------------- |
| `Flag` | `110 — Undefined op code; flagni set qiladi` |
| `B`    | `000`                                        |
| `C`    | `001`                                        |
| `D`    | `010`                                        |
| `E`    | `011`                                        |
| `H`    | `100`                                        |
| `L`    | `101`                                        |
| `A`    | `111`                                        |

### Condition Bits Affected

Input data manfiy bo‘lsa, S set qilinadi; aks holda reset qilinadi. Input data 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H reset qilinadi. Parity even bo‘lsa, P/V set qilinadi; aks holda reset qilinadi. N reset qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States     | 4 MHz E.T. (µs) |
| -------- | ------------ | --------------- |
| 3        | 12 (4, 4, 4) | 3.00            |

### Misol

C registerda 07h, B registerda 10h va 07h I/O port addressga mos peripheral deviceda 7Bh byte mavjud bo‘lsin. `IN D, (C)` command bajarilgach, D registerda 7Bh bo‘ladi.

# INI

### Operation

`(HL) ← (C), B ← B – 1, HL ← HL + 1`

### Op Code

`INI`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` | `11001111` |
| 2   | `1` | `0` | `1` | `0` | `0` | `0` | `1` | `0` | `A2` | `10010010` |

### Description

C register tarkibi 256 ta mumkin bo‘lgan portdan biridagi I/O deviceni tanlash uchun address busning pastki yarmiga (A0–A7) joylashtiriladi. B register byte counter sifatida ishlatilishi mumkin; uning joriy tarkibi shu vaqtda address busning yuqori yarmiga (A8–A15) joylashtiriladi. Tanlangan portdan bir byte data busga joylashtiriladi va CPU ga yoziladi. So‘ng HL register pair tarkibi address busga joylashtiriladi va input byte tegishli memory locationga yoziladi. Oxirida byte counter birga kamaytiriladi va HL register pair birga oshiriladi.

### Condition Bits Affected

S noma’lum. B – 1 = 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H noma’lum. P/V noma’lum. N set qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 16 (4, 5, 3, 4) | 4.00            |

### Misol

C registerda 07h, B registerda 10h, HL register pairda 1000h va 07h I/O port addressga mos peripheral deviceda 7Bh byte mavjud bo‘lsin. `INI` bajarilgach, 1000h memory locationda 7Bh, HL register pairda 1001h, B registerda esa 0Fh bo‘ladi.

# INIR

### Operation

`(HL) ← (C), B ← B – 1, HL ← HL +1`

### Op Code

`INIR`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` | `11001111` |
| 2   | `1` | `0` | `1` | `1` | `0` | `0` | `1` | `0` | `B2` | `10110010` |

### Description

C register tarkibi 256 ta mumkin bo‘lgan portdan biridagi I/O deviceni tanlash uchun address busning pastki yarmiga (A0–A7) joylashtiriladi. B register byte counter sifatida ishlatiladi; uning joriy tarkibi shu vaqtda address busning yuqori yarmiga (A8–A15) joylashtiriladi. Tanlangan portdan bir byte data busga joylashtiriladi va CPU ga yoziladi. So‘ng HL register pair tarkibi address busga joylashtiriladi va input byte tegishli memory locationga yoziladi. Keyin HL register pair birga oshiriladi va byte counter birga kamaytiriladi. B ni kamaytirish natijasida u 0 ga teng bo‘lsa, instruction tugaydi. B 0 ga teng bo‘lmasa, Program Counter (PC) ikkiga kamaytiriladi va instruction takrorlanadi. Har bir ma’lumot ko‘chirishdan keyin interruptlar tan olinadi va ikkita refresh cycle bajariladi. Instruction bajarilishidan oldin B 0 ga o‘rnatilgan bo‘lsa, 256 byte ma’lumot input qilinadi.

### Condition Bits Affected

S noma’lum. Z set qilinadi. H noma’lum. P/V noma’lum. N set qilinadi. C o‘zgarmaydi.

### Timing

B ≠ 0 bo‘lganda:

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 21 (4, 5, 3, 4, 5) | 5.25            |

B = 0 bo‘lganda:

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 16 (4, 5, 3, 4) | 4.00            |

### Misol

C registerda 07h, B registerda 03h va HL register pairda 1000h bo‘lsin. 07h I/O port addressga mos peripheral deviceda quyidagi byte ketma-ketligi mavjud:

|       |
| ----- |
| `51h` |
| `A9h` |
| `03h` |

`INIR` bajarilgach, HL register pairda 1003h, B registerda 0 bo‘ladi. Memory locationlardagi ma’lumotlar quyidagicha. Ustunlar tartibi: memory location; tarkib.

|         |       |
| ------- | ----- |
| `1000h` | `51h` |
| `1001h` | `A9h` |
| `1002h` | `03h` |

# IND

### Operation

`(HL) ← (C), B ← B – 1, HL ← HL – 1`

### Op Code

`IND`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` | `11001111` |
| 2   | `1` | `0` | `1` | `0` | `1` | `0` | `1` | `0` | `AA` | `10010011` |

### Description

C register tarkibi 256 ta mumkin bo‘lgan portdan biridagi I/O deviceni tanlash uchun address busning pastki yarmiga (A0–A7) joylashtiriladi. B register byte counter sifatida ishlatilishi mumkin; uning joriy tarkibi shu vaqtda address busning yuqori yarmiga (A8–A15) joylashtiriladi. Tanlangan portdan bir byte data busga joylashtiriladi va CPU ga yoziladi. So‘ng HL register pair tarkibi address busga joylashtiriladi va input byte tegishli memory locationga yoziladi. Oxirida byte counter va HL register pair birga kamaytiriladi.

### Condition Bits Affected

S noma’lum. B – 1 = 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H noma’lum. P/V noma’lum. N set qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 16 (4, 5, 3, 4) | 4.00            |

### Misol

C registerda 07h, B registerda 10h, HL register pairda 1000h va 07h I/O port addressga mos peripheral deviceda 7Bh byte mavjud bo‘lsin. `IND` bajarilgach, 1000h memory locationda 7Bh, HL register pairda 0FFFh, B registerda esa 0Fh bo‘ladi.

# INDR

### Operation

`(HL) ← (C), B ← 131, HL ← HL1`

### Op Code

`INDR`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` | `11001111` |
| 2   | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `0` | `BA` | `10110011` |

### Description

C register tarkibi 256 ta mumkin bo‘lgan portdan biridagi I/O deviceni tanlash uchun address busning pastki yarmiga (A0–A7) joylashtiriladi. B register byte counter sifatida ishlatiladi; uning joriy tarkibi shu vaqtda address busning yuqori yarmiga (A8–A15) joylashtiriladi. Tanlangan portdan bir byte data busga joylashtiriladi va CPU ga yoziladi. So‘ng HL register pair tarkibi address busga joylashtiriladi va input byte tegishli memory locationga yoziladi. Keyin HL va byte counter birga kamaytiriladi. B ni kamaytirish natijasida u 0 ga teng bo‘lsa, instruction tugaydi. B 0 ga teng bo‘lmasa, Program Counter (PC) ikkiga kamaytiriladi va instruction takrorlanadi. Har bir ma’lumot ko‘chirishdan keyin interruptlar tan olinadi va ikkita refresh cycle bajariladi. Instruction bajarilishidan oldin B 0 ga o‘rnatilgan bo‘lsa, 256 byte ma’lumot input qilinadi.

### Condition Bits Affected

S noma’lum. Z set qilinadi. H noma’lum. P/V noma’lum. N set qilinadi. C o‘zgarmaydi.

### Timing

B ≠ 0 bo‘lganda:

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 21 (4, 5, 3, 4, 5) | 5.25            |

B = 0 bo‘lganda:

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 16 (4, 5, 3, 4) | 4.00            |

### Misol

C registerda 07h, B registerda 03h va HL register pairda 1000h bo‘lsin. 07h I/O port addressga mos peripheral deviceda quyidagi byte ketma-ketligi mavjud:

|       |
| ----- |
| `51h` |
| `A9h` |
| `03h` |

`INDR` bajarilgach, HL register pairda 0FFDh, B registerda 0 bo‘ladi. Memory locationlardagi ma’lumotlar quyidagicha. Ustunlar tartibi: memory location; tarkib.

|         |       |
| ------- | ----- |
| `0FFEh` | `03h` |
| `0FFFh` | `A9h` |
| `1000h` | `51h` |

Manba izohi: Manbada Operation `(HL) ← (C), B ← 131, HL ← HL1` deb berilgan. Description bo‘yicha B va HL birga kamaytiriladi; formula asl yozilishida saqlandi.

# OUT (n), A

### Operation

`(n) ← A`

### Op Code

`OUT`

### Operands

`(n), A`

|     |      |      |      |      |      |      |      |      |                  |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `1`  | `0`  | `0`  | `1`  | `1`  | `D3`             | `11111000` |
| 2   | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — butun byte` | `n`        |

### Description

n operand 256 ta mumkin bo‘lgan portdan biridagi I/O deviceni tanlash uchun address busning pastki yarmiga (A0–A7) joylashtiriladi. Shu vaqtda Accumulator (Register A) tarkibi address busning yuqori yarmida (A8–A15) ham paydo bo‘ladi. Keyin Accumulatordagi byte data busga joylashtirilib, tanlangan peripheral devicega yoziladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States     | 4 MHz E.T. (µs) |
| -------- | ------------ | --------------- |
| 3        | 11 (4, 3, 4) | 2.75            |

### Misol

Accumulatorda 23h bo‘lsa, manbada `OUT (01h)` deb berilgan instruction bajarilgach, 23h byte 01h I/O port addressga mos peripheral devicega yoziladi.

Manba izohi: Manba misolidagi `OUT (01h)` yozuvida A operand ko‘rsatilmagan; instruction bo‘limining nomi `OUT (n), A`.

# OUT (C), r

### Operation

`(C) ← r`

### Op Code

`OUT`

### Operands

`(C), r`

|     |     |     |      |      |      |     |     |     |                 |            |
| --- | --- | --- | ---- | ---- | ---- | --- | --- | --- | --------------- | ---------- |
| 1   | `1` | `1` | `1`  | `0`  | `1`  | `1` | `0` | `1` | `ED`            | `11001111` |
| 2   | `0` | `1` | `r₂` | `r₁` | `r₀` | `0` | `0` | `1` | `register code` | `01r001`   |

### Description

C register tarkibi 256 ta mumkin bo‘lgan portdan biridagi I/O deviceni tanlash uchun address busning pastki yarmiga (A0–A7) joylashtiriladi. Shu vaqtda B register tarkibi address busning yuqori yarmiga (A8–A15) joylashtiriladi. Keyin r registerdagi byte data busga joylashtirilib, tanlangan peripheral devicega yoziladi. r quyidagi CPU registerlaridan birini bildiradi; jadvalda assembled object codedagi har bir registerga mos 3-bit r maydoni ko‘rsatilgan.

Ustunlar tartibi: register; r bit maydoni.

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

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States     | 4 MHz E.T. (µs) |
| -------- | ------------ | --------------- |
| 3        | 12 (4, 4, 4) | 3.00            |

### Misol

C registerda 01h va D registerda 5Ah bo‘lsa, `OUT (C), D` bajarilgach, 5Ah byte 01h I/O port addressga mos peripheral devicega yoziladi.

# OUTI

### Operation

`(C) ← (HL), B ← B – 1, HL ← HL + 1`

### Op Code

`OUTI`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` | `11001111` |
| 2   | `1` | `0` | `1` | `0` | `0` | `0` | `1` | `1` | `A3` | `10011010` |

### Description

HL register pair tarkibi memory locationni tanlash uchun address busga joylashtiriladi. Shu memory locationdagi byte vaqtincha CPU da saqlanadi. Byte counter (B) birga kamaytirilgach, C register tarkibi 256 ta mumkin bo‘lgan portdan biridagi I/O deviceni tanlash uchun address busning pastki yarmiga (A0–A7) joylashtiriladi. B register byte counter sifatida ishlatilishi mumkin; uning kamaytirilgan qiymati address busning yuqori yarmiga (A8–A15) joylashtiriladi. Output byte data busga joylashtirilib, tanlangan peripheral devicega yoziladi. Keyin HL register pair birga oshiriladi.

### Condition Bits Affected

S noma’lum. B – 1 = 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H noma’lum. P/V noma’lum. N set qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 16 (4, 5, 3, 4) | 4.00            |

### Misol

C registerda 07h, B registerda 10h bo‘lsin. HL register pairning boshlang‘ich qiymati manbada `100014`, 1000h memory address tarkibi esa `5914` deb berilgan. `OUTI` bajarilgach, B registerda 0Fh, HL register pairda 1001h bo‘ladi va 59h byte 07h I/O port addressga mos peripheral devicega yoziladi.

Manba izohi: Manba misolidagi `100014` va `5914` yozuvlari saqlandi. Misoldagi memory address 1000h va output byte 59h sifatida ko‘rsatilgan.

# OTIR

### Operation

`(C) ← (HL), B ← B – 1, HL ← HL + 1`

### Op Code

`OTIR`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` | `11001111` |
| 2   | `1` | `0` | `1` | `1` | `0` | `0` | `1` | `1` | `B3` | `10111010` |

### Description

HL register pair tarkibi memory locationni tanlash uchun address busga joylashtiriladi. Shu memory locationdagi byte vaqtincha CPU da saqlanadi. Byte counter (B) birga kamaytirilgach, C register tarkibi 256 ta mumkin bo‘lgan portdan biridagi I/O deviceni tanlash uchun address busning pastki yarmiga (A0–A7) joylashtiriladi. B register byte counter sifatida ishlatilishi mumkin; uning kamaytirilgan qiymati address busning yuqori yarmiga (A8–A15) joylashtiriladi. Output byte data busga joylashtirilib, tanlangan peripheral devicega yoziladi. Keyin HL register pair birga oshiriladi. B ni kamaytirish natijasida u 0 ga teng bo‘lsa, instruction tugaydi. B 0 ga teng bo‘lmasa, Program Counter (PC) ikkiga kamaytiriladi va instruction takrorlanadi. Har bir ma’lumot ko‘chirishdan keyin interruptlar tan olinadi va ikkita refresh cycle bajariladi. Instruction bajarilishidan oldin B 0 ga o‘rnatilgan bo‘lsa, 256 byte ma’lumot output qilinadi.

### Condition Bits Affected

S noma’lum. Z set qilinadi. H noma’lum. P/V noma’lum. N set qilinadi. C o‘zgarmaydi.

### Timing

B ≠ 0 bo‘lganda:

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 21 (4, 5, 3, 4, 5) | 5.25            |

B = 0 bo‘lganda:

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 16 (4, 5, 3, 4) | 4.00            |

### Misol

C registerda 07h, B registerda 03h va HL register pairda 1000h bo‘lsin. Memory locationlardagi ma’lumotlar quyidagicha. Ustunlar tartibi: memory location; tarkib.

|         |       |
| ------- | ----- |
| `1000h` | `51h` |
| `1001h` | `A9h` |
| `1002h` | `03h` |

`OTIR` bajarilgach, HL register pairda 1003h, B registerda 0 bo‘ladi. 07h I/O port addressga mos peripheral devicega byte lar quyidagi ketma-ketlikda yoziladi:

|       |
| ----- |
| `51h` |
| `A9h` |
| `03h` |

# OUTD

### Operation

`(C) ← (HL), B ← B – 1, HL ← HL – 1`

### Op Code

`OUTD`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` | `11001111` |
| 2   | `1` | `0` | `1` | `0` | `1` | `0` | `1` | `1` | `AB` | `10011011` |

### Description

HL register pair tarkibi memory locationni tanlash uchun address busga joylashtiriladi. Shu memory locationdagi byte vaqtincha CPU da saqlanadi. Byte counter (B) birga kamaytirilgach, C register tarkibi 256 ta mumkin bo‘lgan portdan biridagi I/O deviceni tanlash uchun address busning pastki yarmiga (A0–A7) joylashtiriladi. B register byte counter sifatida ishlatilishi mumkin; uning kamaytirilgan qiymati address busning yuqori yarmiga (A8–A15) joylashtiriladi. Output byte data busga joylashtirilib, tanlangan peripheral devicega yoziladi. Keyin HL register pair birga kamaytiriladi.

### Condition Bits Affected

S noma’lum. B – 1 = 0 bo‘lsa, Z set qilinadi; aks holda reset qilinadi. H noma’lum. P/V noma’lum. N set qilinadi. C o‘zgarmaydi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 16 (4, 5, 3. 4) | 4.00            |

### Misol

C registerda 07h, B registerda 10h, HL register pairda 1000h va 1000h memory locationda 59h bo‘lsin. `OUTD` bajarilgach, B registerda 0Fh, HL register pairda 0FFFh bo‘ladi va 59h byte 07h I/O port addressga mos peripheral devicega yoziladi.

Manba izohi: Manbaning T States tarkibida `(4, 5, 3. 4)` yozilgan; nuqta asl holida saqlandi.

# OTDR

### Operation

`(C) ← (HL), B ← B – 1, HL ← HL – 1`

### Op Code

`OTDR`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` | `11001111` |
| 2   | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `1` | `BB` | `10111011` |

### Description

HL register pair tarkibi memory locationni tanlash uchun address busga joylashtiriladi. Shu memory locationdagi byte vaqtincha CPU da saqlanadi. Byte counter (B) birga kamaytirilgach, C register tarkibi 256 ta mumkin bo‘lgan portdan biridagi I/O deviceni tanlash uchun address busning pastki yarmiga (A0–A7) joylashtiriladi. B register byte counter sifatida ishlatilishi mumkin; uning kamaytirilgan qiymati address busning yuqori yarmiga (A8–A15) joylashtiriladi. Output byte data busga joylashtirilib, tanlangan peripheral devicega yoziladi. Keyin HL register pair birga kamaytiriladi. B ni kamaytirish natijasida u 0 ga teng bo‘lsa, instruction tugaydi. B 0 ga teng bo‘lmasa, Program Counter (PC) ikkiga kamaytiriladi va instruction takrorlanadi. Har bir ma’lumot ko‘chirishdan keyin interruptlar tan olinadi va ikkita refresh cycle bajariladi. Instruction bajarilishidan oldin B 0 ga o‘rnatilgan bo‘lsa, 256 byte ma’lumot output qilinadi.

### Condition Bits Affected

S noma’lum. Z set qilinadi. H noma’lum. P/V noma’lum. N set qilinadi. C o‘zgarmaydi.

### Timing

B ≠ 0 bo‘lganda:

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 21 (4, 5, 3, 4, 5) | 5.25            |

B = 0 bo‘lganda:

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 16 (4, 5, 3, 4) | 4.00            |

### Misol

C registerda 07h, B registerda 03h va HL register pairda 1000h bo‘lsin. Memory locationlardagi ma’lumotlar quyidagicha. Ustunlar tartibi: memory location; tarkib.

|         |       |
| ------- | ----- |
| `0FFEh` | `51h` |
| `0FFFh` | `A9h` |
| `1000h` | `03h` |

`OTDR` bajarilgach, HL register pairda 0FFDh, B registerda 0 bo‘ladi. 07h I/O port addressga mos peripheral devicega byte lar quyidagi ketma-ketlikda yoziladi:

|       |
| ----- |
| `03h` |
| `A9h` |
| `51h` |
