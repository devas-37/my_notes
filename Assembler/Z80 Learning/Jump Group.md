---
name: Jump Group
status: active
pinned: false
deleted: false
tags:
    - z80
    - jump
---

# Jump Group

Ushbu bo‘limda quyidagi jump group instructionlari tavsiflanadi. Batafsil ma’lumot olish uchun mundarijadagi tegishli instruction havolasini bosing.

## Mundarija

- [JP nn](#jp-nn)
- [JP cc, nn](#jp-cc-nn)
- [JR e](#jr-e)
- [JR C, e](#jr-c-e)
- [JR NC, e](#jr-nc-e)
- [JR Z, e](#jr-z-e)
- [JR NZ, e](#jr-nz-e)
- [JP (HL)](#jp-hl)
- [JP (IX)](#jp-ix)
- [JP (IY)](#jp-iy)
- [DJNZ e](#djnz-e)

Opcode jadvallarida byte tartibi va bitlar 7 dan 0 gacha ko‘rsatiladi.

# JP nn

### Operation

`PC ← nn`

### Op Code

`JP`

### Operand

`nn`

Ushbu assembled object codedagi birinchi n operand ikki byte li addressning low-order byte qiymatidir.

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `0` | `0` | `0` | `1` | `1` | `C3` |
| 2 | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — low-order byte` |
| 3 | `n₁₅` | `n₁₄` | `n₁₃` | `n₁₂` | `n₁₁` | `n₁₀` | `n₉` | `n₈` | `n — high-order byte` |

### Description

nn operand Program Counter (PC) register pairga yuklanadi. Keyingi instruction PC ning yangi tarkibi ko‘rsatgan memory locationdan fetch qilinadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 3 | 10 (4, 3, 3) | 2.50 |

# JP cc, nn

### Operation

cc shart rost bo‘lsa, `PC ← nn`.

### Op Code

`JP`

### Operands

`cc, nn`

Ushbu assembled object codedagi birinchi n operand ikki byte li memory addressning low-order byte qiymatidir. Opcode byte condition code maydonini o‘z ichiga oladi.

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `cc₂` | `cc₁` | `cc₀` | `0` | `1` | `0` | `condition code` |
| 2 | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — low-order byte` |
| 3 | `n₁₅` | `n₁₄` | `n₁₃` | `n₁₂` | `n₁₁` | `n₁₀` | `n₉` | `n₈` | `n — high-order byte` |

### Description

cc shart rost bo‘lsa, instruction nn operandni Program Counter (PC) register pairga yuklaydi va program nn addressdan boshlanadigan instruction bilan davom etadi. cc shart yolg‘on bo‘lsa, Program Counter odatdagidek oshiriladi va program ketma-ket keladigan keyingi instruction bilan davom etadi. cc shart Flag Register (Register F) dagi condition bitlarga mos sakkiz holatdan biri sifatida belgilanadi. Quyidagi jadval assembled object codedagi tegishli cc bit maydonlarini ko‘rsatadi.

Ustunlar tartibi: cc bit maydoni; condition; tegishli flag.

| cc | Condition | Flag |
| --- | --- | --- |
| `000` | `Non-Zero (NZ)` | `Z` |
| `001` | `Zero (Z)` | `Z` |
| `010` | `No Carry (NC)` | `C` |
| `011` | `Carry (C)` | `C` |
| `100` | `Parity Odd (PO)` | `P/V` |
| `101` | `Parity Even (PE)` | `P/V` |
| `110` | `Sign Positive (P)` | `S` |
| `111` | `Sign Negative (M)` | `S` |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 3 | 10 (4, 3, 3) | 2.50 |

### Misol

Carry flag (F registerdagi C flag) set holatida va 1520h addressda 03h bo‘lsa, `JP C, 1520h` bajarilgach, Program Counterda 1520h bo‘ladi. Keyingi machine cycleda CPU 1520h addressdan 03h byte ni fetch qiladi.

# JR e

### Operation

`PC ← PC + (e−2) (PC keyingi instruction manzili)`

### Op Code

`JR`

### Operand

`e`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `0` | `0` | `0` | `1` | `1` | `0` | `0` | `0` | `18` |
| 2 | `(e–2)₇` | `(e–2)₆` | `(e–2)₅` | `(e–2)₄` | `(e–2)₃` | `(e–2)₂` | `(e–2)₁` | `(e–2)₀` | `e–2 — butun byte` |

### Description

Ushbu instruction programning boshqa qismlariga unconditional branching qilish imkonini beradi. Displacement e qiymati Program Counter (PC) ga qo‘shiladi va keyingi instruction PC ning yangi tarkibi ko‘rsatgan memory locationdan fetch qilinadi. Jump instruction opcode manzilidan hisoblanadi va −126 dan +129 byte gacha bo‘lgan oraliqni qamrab oladi. Assembler PC ning ikki marta oshirilishini avtomatik hisobga oladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 3 | 12 (4, 3, 5) | 3.00 |

### Misol

480 addressdan oldinga besh locationga jump qilish uchun quyidagi assembly language statement ishlatiladi:

```asm
JR $+5
```

Hosil bo‘ladigan object code va yakuniy Program Counter qiymati quyida berilgan. Har bir qatorda avval location, keyin instruction byte yoki PC belgisi ko‘rsatilgan:

| Address / Register | Qiymat |
| --- | --- |
| `480` | `18` |
| `481` | `03` |
| `482` | `–` |
| `483` | `–` |
| `484` | `–` |
| `485` | `← jumpdan keyingi PC` |

# JR C, e

### Operation

C = 0 bo‘lsa, keyingi instructionga o‘tiladi.

C = 1 bo‘lsa, `PC ← PC + (e−2) (PC keyingi instruction manzili)`.

### Op Code

`JR`

### Operands

`C, e`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `0` | `0` | `1` | `1` | `1` | `0` | `0` | `0` | `38` |
| 2 | `(e–2)₇` | `(e–2)₆` | `(e–2)₅` | `(e–2)₄` | `(e–2)₃` | `(e–2)₂` | `(e–2)₁` | `(e–2)₀` | `e–2 — butun byte` |

### Description

Ushbu instruction Carry Flag tekshiruvi natijasiga qarab programning boshqa qismlariga conditional branching qilish imkonini beradi. Flag 1 ga teng bo‘lsa, encoded displacement (e−2) qiymati keyingi instruction manziliga (PC) qo‘shiladi va keyingi instruction PC ning yangi tarkibi ko‘rsatgan memory locationdan fetch qilinadi. Jump instruction opcode manzilidan hisoblanadi va −126 dan +129 byte gacha bo‘lgan oraliqni qamrab oladi. Assembler PC ning ikki marta oshirilishini avtomatik hisobga oladi.

Flag 0 ga teng bo‘lsa, ushbu instructiondan keyingi memory locationdagi instruction bajariladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

Shart bajarilganda:

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 3 | 12 (4, 3, 5) | 3.00 |

Shart bajarilmaganda:

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 2 | 7 (4, 3) | 1.75 |

### Misol

Carry flag set holatida va 480 addressdan orqaga to‘rt locationga jump qilish kerak bo‘lsin. Assembly language statement manbada quyidagicha berilgan:

```asm
JR C, $-4
```

Hosil bo‘ladigan object code va yakuniy Program Counter qiymati. Ustunlar tartibi: location; instruction byte yoki PC belgisi.

| Address / Register | Qiymat |
| --- | --- |
| `47C` | `← jumpdan keyingi PC` |
| `47D` | `–` |
| `47E` | `–` |
| `47F` | `–` |
| `480` | `38` |
| `481` | `FA (two’s complement −6)` |

# JR NC, e

### Operation

C = 1 bo‘lsa, keyingi instructionga o‘tiladi.

C = 0 bo‘lsa, `PC ← PC + (e−2) (PC keyingi instruction manzili)`.

### Op Code

`JR`

### Operands

`NC, e`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `0` | `0` | `1` | `1` | `0` | `0` | `0` | `0` | `30` |
| 2 | `(e–2)₇` | `(e–2)₆` | `(e–2)₅` | `(e–2)₄` | `(e–2)₃` | `(e–2)₂` | `(e–2)₁` | `(e–2)₀` | `e–2 — butun byte` |

### Description

Ushbu instruction Carry Flag tekshiruvi natijasiga qarab programning boshqa qismlariga conditional branching qilish imkonini beradi. Flag 0 ga teng bo‘lsa, encoded displacement (e−2) qiymati keyingi instruction manziliga (PC) qo‘shiladi va keyingi instruction PC ning yangi tarkibi ko‘rsatgan memory locationdan fetch qilinadi. Jump instruction opcode manzilidan hisoblanadi va −126 dan +129 byte gacha bo‘lgan oraliqni qamrab oladi. Assembler PC ning ikki marta oshirilishini avtomatik hisobga oladi.

Flag 1 ga teng bo‘lsa, ushbu instructiondan keyingi memory locationdagi instruction bajariladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

Shart bajarilganda:

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 3 | 12 (4, 3, 5) | 3.00 |

Shart bajarilmaganda:

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 2 | 7 (4, 3) | 1.75 |

### Misol

Carry Flag reset holatida va jump instructionning o‘zini takrorlash kerak bo‘lsin. Assembly language statement manbada quyidagicha berilgan:

```asm
JR NC, $
```

Hosil bo‘ladigan object code va jumpdan keyingi Program Counter qiymati. Ustunlar tartibi: location; instruction byte va PC belgisi.

| Address / Register | Qiymat |
| --- | --- |
| `480` | `30; ← jumpdan keyingi PC` |
| `481` | `FE` |

# JR Z, e

### Operation

Z = 0 bo‘lsa, keyingi instructionga o‘tiladi.

Z = 1 bo‘lsa, `PC ← PC + (e−2) (PC keyingi instruction manzili)`.

### Op Code

`JR`

### Operands

`Z, e`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `0` | `0` | `1` | `0` | `1` | `0` | `0` | `0` | `28` |
| 2 | `(e–2)₇` | `(e–2)₆` | `(e–2)₅` | `(e–2)₄` | `(e–2)₃` | `(e–2)₂` | `(e–2)₁` | `(e–2)₀` | `e–2 — butun byte` |

### Description

Ushbu instruction Zero Flag tekshiruvi natijasiga qarab programning boshqa qismlariga conditional branching qilish imkonini beradi. Flag 1 ga teng bo‘lsa, encoded displacement (e−2) qiymati keyingi instruction manziliga (PC) qo‘shiladi va keyingi instruction PC ning yangi tarkibi ko‘rsatgan memory locationdan fetch qilinadi. Jump instruction opcode manzilidan hisoblanadi va −126 dan +129 byte gacha bo‘lgan oraliqni qamrab oladi. Assembler PC ning ikki marta oshirilishini avtomatik hisobga oladi.

Flag 0 ga teng bo‘lsa, ushbu instructiondan keyingi memory locationdagi instruction bajariladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

Shart bajarilganda:

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 3 | 12 (4, 3, 5) | 3.00 |

Shart bajarilmaganda:

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 2 | 7 (4, 3) | 1.75 |

### Misol

Zero Flag set holatida va 300 addressdan oldinga besh locationga jump qilish kerak bo‘lsin. Quyidagi assembly language statement ishlatiladi:

```asm
JR Z, $+5
```

Hosil bo‘ladigan object code va yakuniy Program Counter qiymati. Ustunlar tartibi: location; instruction byte yoki PC belgisi.

| Address / Register | Qiymat |
| --- | --- |
| `300` | `28` |
| `301` | `03` |
| `302` | `–` |
| `303` | `–` |
| `304` | `–` |
| `305` | `← jumpdan keyingi PC` |

# JR NZ, e

### Operation

Z = 1 bo‘lsa, keyingi instructionga o‘tiladi.

Z = 0 bo‘lsa, `PC ← PC + (e−2) (PC keyingi instruction manzili)`.

### Op Code

`JR`

### Operands

`NZ, e`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `0` | `0` | `1` | `0` | `0` | `0` | `0` | `0` | `20` |
| 2 | `(e–2)₇` | `(e–2)₆` | `(e–2)₅` | `(e–2)₄` | `(e–2)₃` | `(e–2)₂` | `(e–2)₁` | `(e–2)₀` | `e–2 — butun byte` |

### Description

Ushbu instruction Zero Flag tekshiruvi natijasiga qarab programning boshqa qismlariga conditional branching qilish imkonini beradi. Flag 0 ga teng bo‘lsa, encoded displacement (e−2) qiymati keyingi instruction manziliga (PC) qo‘shiladi va keyingi instruction PC ning yangi tarkibi ko‘rsatgan memory locationdan fetch qilinadi. Jump instruction opcode manzilidan hisoblanadi va −126 dan +129 byte gacha bo‘lgan oraliqni qamrab oladi. Assembler PC ning ikki marta oshirilishini avtomatik hisobga oladi.

Flag 1 ga teng bo‘lsa, ushbu instructiondan keyingi memory locationdagi instruction bajariladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

Shart bajarilganda:

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 3 | 12 (4, 3, 5) | 3.00 |

Shart bajarilmaganda:

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 2 | 7 (4, 3) | 1.75 |

### Misol

Zero Flag reset holatida va 480 addressdan orqaga to‘rt locationga jump qilish kerak bo‘lsin. Assembly language statement manbada quyidagicha berilgan:

```asm
JR NZ, $-4
```

Hosil bo‘ladigan object code va yakuniy Program Counter qiymati. Ustunlar tartibi: location; instruction byte yoki PC belgisi.

| Address / Register | Qiymat |
| --- | --- |
| `47C` | `← jumpdan keyingi PC` |
| `47D` | `–` |
| `47E` | `–` |
| `47F` | `–` |
| `480` | `20` |
| `481` | `FA (two’s complement −6)` |

# JP (HL)

### Operation

`PC ← HL`

### Op Code

`JP`

### Operand

`(HL)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `0` | `1` | `0` | `0` | `1` | `E9` |

### Description

Program Counter (PC) ga HL register pair tarkibi yuklanadi. Keyingi instruction PC ning yangi tarkibi ko‘rsatgan memory locationdan fetch qilinadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 1 | 4 | 1.00 |

### Misol

Program Counterda 1000h va HL register pairda 4800h bo‘lsa, `JP (HL)` bajarilgach, Program Counterda 4800h bo‘ladi.

# JP (IX)

### Operation

`PC ← IX`

### Op Code

`JP`

### Operand

`(IX)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `1` | `1` | `1` | `0` | `1` | `DD` |
| 2 | `1` | `1` | `1` | `0` | `1` | `0` | `0` | `1` | `E9` |

### Description

Program Counter (PC) ga IX register pair tarkibi yuklanadi. Keyingi instruction PC ning yangi tarkibi ko‘rsatgan memory locationdan fetch qilinadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 2 | 8 (4, 4) | 2.00 |

### Misol

Program Counterda 1000h va IX register pairda 4800h bo‘lsa, `JP (IX)` bajarilgach, Program Counterda 4800h bo‘ladi.

# JP (IY)

### Operation

`PC ← IY`

### Op Code

`JP`

### Operand

`(IY)`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `1` | `1` | `1` | `0` | `1` | `FD` |
| 2 | `1` | `1` | `1` | `0` | `1` | `0` | `0` | `1` | `E9` |

### Description

Program Counter (PC) ga IY register pair tarkibi yuklanadi. Keyingi instruction PC ning yangi tarkibi ko‘rsatgan memory locationdan fetch qilinadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 2 | 8 (4, 4) | 2.00 |

### Misol

Program Counterda 1000h va IY register pairda 4800h bo‘lsa, `JP (IY)` bajarilgach, Program Counterda 4800h bo‘ladi.

# DJNZ e

### Operation

`B ← B – 1`

B = 0 bo‘lsa, keyingi instructionga o‘tiladi.

B ≠ 0 bo‘lsa, `PC ← PC + (e−2) (PC keyingi instruction manzili)`.

### Op Code

`DJNZ`

### Operand

`e`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `0` | `0` | `0` | `1` | `0` | `0` | `0` | `0` | `10` |
| 2 | `(e–2)₇` | `(e–2)₆` | `(e–2)₅` | `(e–2)₄` | `(e–2)₃` | `(e–2)₂` | `(e–2)₁` | `(e–2)₀` | `e–2 — butun byte` |

### Description

Ushbu instruction conditional jump instructionlariga o‘xshaydi, biroq branchingni aniqlash uchun register qiymati ishlatiladi. B register birga kamaytiriladi. Natija nonzero bo‘lsa, encoded displacement (e−2) qiymati keyingi instruction manziliga (PC) qo‘shiladi. Keyingi instruction PC ning yangi tarkibi ko‘rsatgan memory locationdan fetch qilinadi. Jump instruction opcode manzilidan hisoblanadi va −126 dan +129 byte gacha bo‘lgan oraliqni qamrab oladi. Assembler PC ning ikki marta oshirilishini avtomatik hisobga oladi.

Kamaytirish natijasida B 0 ga teng bo‘lsa, ushbu instructiondan keyingi memory locationdagi instruction bajariladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

B ≠ 0 bo‘lganda:

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 3 | 13 (5, 3, 5) | 3.25 |

B = 0 bo‘lganda:

| M Cycles | T States | 4 MHz E.T. (µs) |
| --- | --- | --- |
| 2 | 8 (5, 3) | 2.00 |

### Misol

DJNZ instructiondan foydalanish odatiy software routine orqali ko‘rsatilgan. Routine bir qatorni input buffer (INBUF) dan output buffer (OUTBUF) ga ko‘chiradi. CR topilguncha yoki 80 byte ko‘chirilguncha — qaysi biri oldin yuz bersa — byte larni ko‘chirish davom etadi. Assembly misoli:

```asm
LD B, 80;Set up counter
LD HL, Inbuf;Set up pointers
LD DE, Outbuf
LOOP: LD A, (HL);Get next byte from
;input buffer
LD (DE), A;Store in output buffer
CP 0Dh;Is it a CR?
JR Z, DONE;Yes finished
INC HL;Increment pointers
INC DE
DJNZ LOOP;Loop back if 80
;bytes have not
;been moved
DONE:
```

