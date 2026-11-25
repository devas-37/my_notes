---
name: Call and Return Group
status: active
pinned: false
deleted: false
tags:
    - z80
    - call
    - return
---

# Call and Return Group

Ushbu bo‘limda quyidagi call va return group instructionlari tavsiflanadi. Batafsil ma’lumot olish uchun mundarijadagi tegishli instruction havolasini bosing.

## Mundarija

- [CALL nn](#call-nn)
- [CALL cc, nn](#call-cc-nn)
- [RET](#ret)
- [RET cc](#ret-cc)
- [RETI](#reti)
- [RETN](#retn)
- [RST p](#rst-p)

Opcode jadvallarida byte tartib raqami, bit 7 dan bit 0 gacha va Hex / Operand ustunlari berilgan. cc₂…cc₀ condition code, t₂…t₀ RST address maydonidir. nn little-endian tartibda: avval low byte, keyin high byte. PCH va PCL PC ning high va low qismlaridir. Operation formulalarida PC instruction fetch tugaganidan keyingi qiymatni bildiradi; stack manzillari dastlabki SP ga nisbatan berilgan.

# CALL nn

### Operation

`(SP – 1) ← PCH, (SP – 2) ← PCL, SP ← SP – 2, PC ← nn`

### Op Code

`CALL`

### Operand

`nn`

Assembled object codedagi ikkita n operandning birinchisi ikki byte li memory addressning least-significant byte qiymatidir.

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `0` | `1` | `1` | `0` | `1` | `CD` |
| 2 | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — low-order byte` |
| 3 | `n₁₅` | `n₁₄` | `n₁₃` | `n₁₂` | `n₁₁` | `n₁₀` | `n₉` | `n₈` | `n — high-order byte` |

### Description

Program Counter (PC) ning joriy tarkibi tashqi memory stack tepasiga push qilinadi. Keyin nn operandlar PC ga yuklanadi; PC subroutinening birinchi opcode i fetch qilinadigan memory addressni ko‘rsatadi. Subroutine oxirida stack tepasidagi qiymatni PC ga pop qiladigan RETurn instruction orqali dastlabki program oqimiga qaytish mumkin. Push avval Stack Pointer (SP register pair) tarkibini birga kamaytirib, PC ning high-order byte qiymatini SP ko‘rsatgan memory addressga yuklash orqali bajariladi. So‘ng SP yana birga kamaytiriladi va PC ning low-order byte qiymati stack tepasiga yuklanadi.

Ushbu instruction 3-byte bo‘lgani uchun push bajarilishidan oldin Program Counter uchga oshirilgan bo‘ladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5 | 17 (4, 3, 4, 3, 3) | 4.25 |

### Misol

Program Counterda 1A47h, Stack Pointerda 3002h bo‘lsin. Memory locationlardagi ma’lumotlar quyidagicha. Ustunlar tartibi: location; tarkib.

| Address | Tarkib |
| --- | --- |
| `1A47h` | `CDh` |
| `1A48h` | `35h` |
| `1A49h` | `21h` |

Instruction fetch ketma-ketligi boshlanganda, 3-byte instruction `CD 35 21` CPU ga bajarish uchun fetch qilinadi. Uning mnemonic ekvivalenti — `CALL 2135h`. Bajarilgach, 3001h memory addressda 1Ah, 3000h addressda 4Ah, Stack Pointerda 3000h, Program Counterda esa 2135h bo‘ladi. PC bajariladigan subroutinening birinchi opcode manzilini ko‘rsatadi.

# CALL cc, nn

### Operation

cc shart rost bo‘lsa:

`(SP – 1) ← PCH`

`(SP – 2) ← PCL, SP ← SP – 2, PC ← nn`

### Op Code

`CALL`

### Operands

`cc, nn`

Assembled object codedagi ikkita n operandning birinchisi ikki byte li memory addressning least-significant byte qiymatidir.

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `cc₂` | `cc₁` | `cc₀` | `1` | `0` | `0` | `cc field` |
| 2 | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — low-order byte` |
| 3 | `n₁₅` | `n₁₄` | `n₁₃` | `n₁₂` | `n₁₁` | `n₁₀` | `n₉` | `n₈` | `n — high-order byte` |

### Description

cc shart rost bo‘lsa, ushbu instruction Program Counter (PC) ning joriy tarkibini tashqi memory stack tepasiga push qiladi. Keyin nn operandlar PC ga yuklanadi; PC subroutinening birinchi opcode i fetch qilinadigan memory addressni ko‘rsatadi. Subroutine oxirida stack tepasidagi qiymatni PC ga pop qiladigan RETurn instruction orqali dastlabki program oqimiga qaytish mumkin. cc shart yolg‘on bo‘lsa, Program Counter odatdagidek oshiriladi va program ketma-ket keladigan keyingi instruction bilan davom etadi. Stackka push qilish avval Stack Pointer (SP) tarkibini birga kamaytirib, PC ning high-order byte qiymatini SP ko‘rsatgan memory addressga yuklash orqali bajariladi. So‘ng SP yana birga kamaytiriladi va PC ning low-order byte qiymati stack tepasiga yuklanadi.

Ushbu instruction 3-byte bo‘lgani uchun push bajarilishidan oldin Program Counter uchga oshirilgan bo‘ladi.

cc shart Flag Register (Register F) dagi condition bitlarga mos sakkiz holatdan biri sifatida belgilanadi. Quyidagi jadval assembled object codedagi tegishli cc bit maydonlarini ham ko‘rsatadi. Ustunlar tartibi: cc; condition; tegishli flag.

| cc | Condition | Flag | Shart |
| --- | --- | --- | --- |
| `000` | `Non-Zero (NZ)` | `Z` | Z = 0 |
| `001` | `Zero (Z)` | `Z` | Z = 1 |
| `010` | `Non Carry (NC)` | `C` | C = 0 |
| `011` | `Carry (C)` | `C` | C = 1 |
| `100` | `Parity Odd (PO)` | `P/V` | P/V = 0 |
| `101` | `Parity Even (PE)` | `P/V` | P/V = 1 |
| `110` | `Sign Positive (P)` | `S` | S = 0 |
| `111` | `Sign Negative (M)` | `S` | S = 1 |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

cc shart rost bo‘lganda:

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5 | 17 (4, 3, 4, 3, 3) | 4.25 |

cc shart yolg‘on bo‘lganda:

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | ------------ | --------------- |
| 3 | 10 (4, 3, 3) | 2.50 |

### Misol

F registerdagi C Flag reset holatida, Program Counterda 1A47h, Stack Pointerda 3002h bo‘lsin. Memory locationlardagi ma’lumotlar quyidagicha. Ustunlar tartibi: location; tarkib.

| Address | Tarkib |
| --- | --- |
| `1A47h` | `D4h` |
| `1A48h` | `35h` |
| `1A49h` | `21h` |

Instruction fetch ketma-ketligi boshlanganda, 3-byte instruction `D4 35 21` CPU ga bajarish uchun fetch qilinadi. Uning mnemonic ekvivalenti — `CALL NC, 2135h`. Bajarilgach, 3001h memory addressda 1Ah, 3000h addressda 4Ah, Stack Pointerda 3000h, Program Counterda esa 2135h bo‘ladi. PC bajariladigan subroutinening birinchi opcode manzilini ko‘rsatadi.

# RET

### Operation

`PCL ← (SP), PCH ← (SP + 1), SP ← SP + 2`

### Op Code

`RET`

### Operands

Yo‘q.

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `0` | `0` | `1` | `0` | `0` | `1` | `C9` |

### Description

Stack Pointer (SP) register pair ko‘rsatgan memory locationdagi byte Program Counter (PC) ning low-order sakkiz bitiga ko‘chiriladi. Keyin SP birga oshiriladi. SP ko‘rsatgan yangi memory locationdagi byte PC ning high-order qismiga yuklanadi. SP yana birga oshiriladi. Keyingi instruction PC ko‘rsatgan addressdan fetch qilinadi. Ushbu instruction odatda CALL instruction orqali kirilgan routine tugagach, asosiy programga qaytish uchun ishlatiladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | ------------ | --------------- |
| 3 | 10 (4, 3, 3) | 2.50 |

### Misol

Program Counterda 3535h, Stack Pointerda 2000h, 2000h memory locationda B5h va 2001h memory locationda 18h bo‘lsin. `RET` bajarilgach, Stack Pointerda 2002h, Program Counterda esa 18B5h bo‘ladi. PC programning keyingi fetch qilinadigan opcode manzilini ko‘rsatadi.

# RET cc

### Operation

cc shart rost bo‘lsa, `PCL ← (SP), PCH ← (SP + 1), SP ← SP + 2`.

### Op Code

`RET`

### Operand

`cc`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `cc₂` | `cc₁` | `cc₀` | `0` | `0` | `0` | `cc field` |

### Description

cc shart rost bo‘lsa, Stack Pointer (SP) register pair ko‘rsatgan memory locationdagi byte Program Counter (PC) ning low-order sakkiz bitiga ko‘chiriladi. SP birga oshiriladi va SP ning yangi tarkibi ko‘rsatgan memory locationdagi byte PC ning high-order sakkiz bitiga ko‘chiriladi. SP yana birga oshiriladi. Keyingi opcode PC ko‘rsatgan memory locationdan fetch qilinadi. Ushbu instruction odatda CALL instruction orqali kirilgan routine tugagach, asosiy programga qaytish uchun ishlatiladi. cc shart yolg‘on bo‘lsa, PC odatdagidek oshiriladi va program ketma-ket keladigan keyingi instruction bilan davom etadi.

cc shart Flag Register (Register F) dagi condition bitlarga mos sakkiz holatdan biri sifatida belgilanadi. Quyidagi jadval assembled object codedagi tegishli cc bit maydonlarini ham ko‘rsatadi. Ustunlar tartibi: cc; condition; tegishli flag.

| cc | Condition | Flag | Shart |
| --- | --- | --- | --- |
| `000` | `Non-Zero (NZ)` | `Z` | Z = 0 |
| `001` | `Zero (Z)` | `Z` | Z = 1 |
| `010` | `Non Carry (NC)` | `C` | C = 0 |
| `011` | `Carry (C)` | `C` | C = 1 |
| `100` | `Parity Odd (PO)` | `P/V` | P/V = 0 |
| `101` | `Parity Even (PE)` | `P/V` | P/V = 1 |
| `110` | `Sign Positive (P)` | `S` | S = 0 |
| `111` | `Sign Negative (M)` | `S` | S = 1 |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

cc shart rost bo‘lganda:

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | ------------ | --------------- |
| 3 | 11 (5, 3, 3) | 2.75 |

cc shart yolg‘on bo‘lganda:

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 1 | 5 | 1.25 |

### Misol

F registerdagi S flag set holatida, Program Counterda 3535h, Stack Pointerda 2000h, 2000h memory locationda B5h va 2001h memory locationda 18h bo‘lsin. `RET M` bajarilgach, Stack Pointerda 2002h, Program Counterda esa 18B5h bo‘ladi. PC programning keyingi fetch qilinadigan opcode manzilini ko‘rsatadi.

# RETI

### Operation

Interruptdan qaytish.

`PCL ← (SP), PCH ← (SP + 1), SP ← SP + 2, IFF1 ← IFF2`

### Op Code

`RETI`

### Operands

Yo‘q.

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` |
| 2 | `0` | `1` | `0` | `0` | `1` | `1` | `0` | `1` | `4D` |

### Description

Ushbu instruction maskable interrupt service routine oxirida Program Counter tarkibini tiklash (RET instructionga o‘xshash tarzda) va I/O devicega interrupt routine tugaganini bildirish uchun ishlatiladi. RETI interruptlarning nestingini ham qo‘llab-quvvatlaydi: higher priority device lower priority service routinega xizmat ko‘rsatishni vaqtincha to‘xtata oladi. RETI IFF2 qiymatini IFF1 ga ko‘chiradi. Maskable interrupt qabul qilinganda ikkala IFF reset qilinadi, shuning uchun RETI o‘zi odatda interruptlarni qayta yoqmaydi. Joriy service routine tugagach interruptlar tan olinishi uchun RETI dan oldin enable interrupt instruction (EI) bajarilishi kerak.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4 | 14 (4, 4, 3, 3) | 3.50 |

### Misol

A va B nomli ikkita interrupt yuboruvchi device daisy-chain configurationda ulangan va A ning priority darajasi B nikidan yuqori bo‘lsin. Manbadagi sxemada quyidagi belgilar ko‘rsatilgan; dastlabki ikki qatorda device, IEI va IEO belgilari, oxirgi qatorda esa qo‘shimcha sxema belgilari saqlangan:

| Device / belgi | IEI / belgi | IEO / belgi |
| --- | --- | --- |
| `A` | `IEI` | `IEO` |
| `B` | `IEI` | `IEO` |
| `Qo‘shimcha belgilar` | `+` | `INT` |

B interrupt hosil qiladi va interrupt acknowledge qilinadi. B ning interrupt enable out (IEO) signali Low holatiga o‘tadi; B ga xizmat ko‘rsatilayotgan paytda lower priority devicelar interrupt yubora olmaydi. Keyin A interrupt hosil qiladi va maskable interruptlar qayta yoqilgan bo‘lsa, B routine vaqtincha to‘xtatiladi. A ning IEO signali Low holatiga o‘tib, higher priority devicega xizmat ko‘rsatilayotganini bildiradi. A routine tugagach, RETI beriladi va A ning IEO signali reset qilinadi; B routine davom etishi mumkin bo‘ladi. B routine tugaganda ikkinchi RETI beriladi va B ning IEO signali reset qilinib High holatiga o‘tadi. Shundan so‘ng lower priority devicelar interrupt yuborish imkoniga ega bo‘ladi.

# RETN

### Operation

Nonmaskable interruptdan qaytish.

`PCL ← (SP), PCH ← (SP + 1), SP ← SP + 2, IFF1 ← IFF2`

### Op Code

`RETN`

### Operands

Yo‘q.

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` |
| 2 | `0` | `1` | `0` | `0` | `0` | `1` | `0` | `1` | `45` |

### Description

Ushbu instruction nonmaskable interrupt service routine oxirida Program Counter tarkibini tiklash uchun ishlatiladi (RET instructionga o‘xshash tarzda). IFF2 holati IFF1 ga qayta ko‘chiriladi. Natijada, maskable interruptlar nonmaskable interruptdan oldin yoqilgan bo‘lsa, RETN dan keyin darhol qayta yoqiladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4 | 14 (4, 4, 3, 3) | 3.50 |

### Misol

Nonmaskable Interrupt (NMI) signali kelganda Stack Pointerda 1000h va Program Counterda 1A45h bo‘lsin. CPU joriy instructionni tugatgach, 0066h memory addressga restart qiladi. PC ning joriy 1A45h qiymati tashqi stackning 0FFFh va 0FFEh addresslariga high-order byte birinchi bo‘lib push qilinadi. PC ga 0066h yuklanadi. Ushbu address RETN instruction bilan tugaydigan interrupt service routine boshlanishidir.

`RETN` bajarilganda oldingi Program Counter tarkibi tashqi memory stackdan low-order byte birinchi bo‘lib pop qilinadi. Stack Pointer yana 1000h bo‘ladi. Program oqimi to‘xtagan joyidan davom etib, 1A45h addressdan opcode fetch qilinadi.

# RST p

### Operation

`(SP – 1) ← PCH, (SP – 2) ← PCL, SP ← SP – 2, PC ← p`

### Op Code

`RST`

### Operand

`p`

| Byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Hex / Operand |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `1` | `1` | `t₂` | `t₁` | `t₀` | `1` | `1` | `1` | `t field` |

### Description

Program Counter (PC) ning joriy tarkibi tashqi memory stackka push qilinadi va p operand belgilagan Page 0 memory location PC ga yuklanadi. Program bajarilishi PC ko‘rsatgan addressdagi opcode dan boshlanadi. Push avval Stack Pointer (SP) tarkibini birga kamaytirib, PC ning high-order byte qiymatini SP ko‘rsatgan memory addressga yuklash orqali bajariladi. So‘ng SP yana birga kamaytiriladi va PC ning low-order byte qiymati SP ko‘rsatgan addressga yuklanadi. Restart instruction quyidagi jadvaldagi sakkiz addressdan biriga jump qilish imkonini beradi. p operand tegishli t maydoni bilan object codega yig‘iladi; bu timing T State emas, opcode bit maydonidir.

Ustunlar tartibi: p; t.

| p | t | Opcode |
| --- | --- | --- |
| `00h` | `000` | `C7h` |
| `08h` | `001` | `CFh` |
| `10h` | `010` | `D7h` |
| `18h` | `011` | `DFh` |
| `20h` | `100` | `E7h` |
| `28h` | `101` | `EFh` |
| `30h` | `110` | `F7h` |
| `38h` | `111` | `FFh` |

Barcha addresslar memoryning Page 0 qismida joylashgani uchun PC ning high-order byte qismiga 00h yuklanadi. Jadvalning p ustunidan tanlangan qiymat PC ning low-order byte qismiga yuklanadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | ------------ | --------------- |
| 3 | 11 (5, 3, 3) | 2.75 |

### Misol

Program Counterda 15B3h bo‘lsa, `RST 18h` (object code `11011111`, DFh) bajarilgach, PC keyingi fetch qilinadigan opcode manzili sifatida 0018h qiymatiga ega bo‘ladi. Stackka qaytish manzili 15B4h yoziladi va SP ikki birlikka kamayadi.

