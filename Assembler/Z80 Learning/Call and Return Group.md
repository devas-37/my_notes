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

Opcode jadvallarida birinchi katak byte tartib raqami, keyingi sakkiz katak bit 7 dan bit 0 gacha, so‘ng hex code yoki bit maydoni turi, oxirgi katak esa manbadagi bit matnidir. Manbadagi ayrim bit satrlari hex code bilan mos kelmaydi; fixed opcode bitlari shu hex codega mos berildi va asl matn ham saqlandi. cc₂, cc₁, cc₀ condition code bitlari, t₂, t₁, t₀ esa RST addressini tanlash maydonidir. nn avval low-order n, keyin high-order n byte dan tuziladi; ikkala to‘liq byte jadvalda ko‘rsatilgan. PCH va PCL PC ning high-order va low-order qismlarini bildiradi. Formulalardagi register yozilishining katta-kichik harflari manbadagidek saqlandi.

# CALL nn

### Operation

`(SP – 1) ← PCH, (SP – 2) ← PCL, PC ← nn`

### Op Code

`CALL`

### Operand

`nn`

Assembled object codedagi ikkita n operandning birinchisi ikki byte li memory addressning least-significant byte qiymatidir.

|     |      |      |      |      |      |      |      |      |                       |            |
| --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | --------------------- | ---------- |
| 1   | `1`  | `1`  | `0`  | `0`  | `1`  | `1`  | `0`  | `1`  | `CD`                  | `11001101` |
| 2   | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — low-order byte`  | `n`        |
| 3   | `n₇` | `n₆` | `n₅` | `n₄` | `n₃` | `n₂` | `n₁` | `n₀` | `n — high-order byte` | `n`        |

### Description

Program Counter (PC) ning joriy tarkibi tashqi memory stack tepasiga push qilinadi. Keyin nn operandlar PC ga yuklanadi; PC subroutinening birinchi opcode i fetch qilinadigan memory addressni ko‘rsatadi. Subroutine oxirida stack tepasidagi qiymatni PC ga pop qiladigan RETurn instruction orqali dastlabki program oqimiga qaytish mumkin. Push avval Stack Pointer (SP register pair) tarkibini birga kamaytirib, PC ning high-order byte qiymatini SP ko‘rsatgan memory addressga yuklash orqali bajariladi. So‘ng SP yana birga kamaytiriladi va PC ning low-order byte qiymati stack tepasiga yuklanadi.

Ushbu instruction 3-byte bo‘lgani uchun push bajarilishidan oldin Program Counter uchga oshirilgan bo‘ladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 17 (4, 3, 4, 3, 3) | 4.25            |

### Misol

Program Counterda 1A47h, Stack Pointerda 3002h bo‘lsin. Memory locationlardagi ma’lumotlar quyidagicha. Ustunlar tartibi: location; tarkib.

|         |       |
| ------- | ----- |
| `1A47h` | `CDh` |
| `IA48h` | `35h` |
| `1A49h` | `21h` |

Instruction fetch ketma-ketligi boshlanganda, 3-byte instruction `CD 3521h` CPU ga bajarish uchun fetch qilinadi. Uning mnemonic ekvivalenti — `CALL 2135h`. Bajarilgach, 3001h memory addressda 1Ah, 3000h addressda 4Ah, Stack Pointerda 3000h, Program Counterda esa 2135h bo‘ladi. PC bajariladigan subroutinening birinchi opcode manzilini ko‘rsatadi.

Manba izohi: Manbadagi location jadvalining ikkinchi addressi `IA48h` (I harfi bilan) deb berilgan; asl yozuv saqlandi.

# CALL cc, nn

### Operation

cc shart rost bo‘lsa:

`(sp – 1) ← PCH`

`(sp – 2) ← PCL, pc ← nn`

### Op Code

`CALL`

### Operands

`cc, nn`

Assembled object codedagi ikkita n operandning birinchisi ikki byte li memory addressning least-significant byte qiymatidir.

|     |      |      |       |       |       |      |      |      |                       |            |
| --- | ---- | ---- | ----- | ----- | ----- | ---- | ---- | ---- | --------------------- | ---------- |
| 1   | `1`  | `1`  | `cc₂` | `cc₁` | `cc₀` | `1`  | `0`  | `0`  | `cc field`            | `11010 cc` |
| 2   | `n₇` | `n₆` | `n₅`  | `n₄`  | `n₃`  | `n₂` | `n₁` | `n₀` | `n — low-order byte`  | `n`        |
| 3   | `n₇` | `n₆` | `n₅`  | `n₄`  | `n₃`  | `n₂` | `n₁` | `n₀` | `n — high-order byte` | `n`        |

### Description

cc shart rost bo‘lsa, ushbu instruction Program Counter (PC) ning joriy tarkibini tashqi memory stack tepasiga push qiladi. Keyin nn operandlar PC ga yuklanadi; PC subroutinening birinchi opcode i fetch qilinadigan memory addressni ko‘rsatadi. Subroutine oxirida stack tepasidagi qiymatni PC ga pop qiladigan RETurn instruction orqali dastlabki program oqimiga qaytish mumkin. cc shart yolg‘on bo‘lsa, Program Counter odatdagidek oshiriladi va program ketma-ket keladigan keyingi instruction bilan davom etadi. Stackka push qilish avval Stack Pointer (SP) tarkibini birga kamaytirib, PC ning high-order byte qiymatini SP ko‘rsatgan memory addressga yuklash orqali bajariladi. So‘ng SP yana birga kamaytiriladi va PC ning low-order byte qiymati stack tepasiga yuklanadi.

Ushbu instruction 3-byte bo‘lgani uchun push bajarilishidan oldin Program Counter uchga oshirilgan bo‘ladi.

cc shart Flag Register (Register F) dagi condition bitlarga mos sakkiz holatdan biri sifatida belgilanadi. Quyidagi jadval assembled object codedagi tegishli cc bit maydonlarini ham ko‘rsatadi. Ustunlar tartibi: cc; condition; tegishli flag.

|       |                     |       |
| ----- | ------------------- | ----- |
| `000` | `Non-Zero (NZ)`     | `Z`   |
| `001` | `Zero (Z)`          | `Z`   |
| `010` | `Non Carry (NC)`    | `C`   |
| `011` | `Carry (C)`         | `Z`   |
| `100` | `Parity Odd (PO)`   | `P/V` |
| `101` | `Parity Even (PE)`  | `P/V` |
| `110` | `Sign Positive (P)` | `S`   |
| `111` | `Sign Negative (M)` | `S`   |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

cc shart rost bo‘lganda:

| M Cycles | T States           | 4 MHz E.T. (µs) |
| -------- | ------------------ | --------------- |
| 5        | 17 (4, 3, 4, 3, 3) | 4.25            |

cc shart yolg‘on bo‘lganda:

| M Cycles | T States     | 4 MHz E.T. (µs) |
| -------- | ------------ | --------------- |
| 3        | 10 (4, 3, 3) | 2.50            |

### Misol

F registerdagi C Flag reset holatida, Program Counterda 1A47h, Stack Pointerda 3002h bo‘lsin. Memory locationlardagi ma’lumotlar quyidagicha. Ustunlar tartibi: location; tarkib.

|         |       |
| ------- | ----- |
| `1A47h` | `D4h` |
| `1448h` | `35h` |
| `1A49h` | `21h` |

Instruction fetch ketma-ketligi boshlanganda, 3-byte instruction `D43521h` CPU ga bajarish uchun fetch qilinadi. Uning mnemonic ekvivalenti — `CALL NC, 2135h`. Bajarilgach, 3001h memory addressda 1Ah, 3000h addressda 4Ah, Stack Pointerda 3000h, Program Counterda esa 2135h bo‘ladi. PC bajariladigan subroutinening birinchi opcode manzilini ko‘rsatadi.

Manba izohi: Manbadagi condition jadvalida `011 / Carry (C)` uchun tegishli flag `Z` deb yozilgan; qiymat saqlandi. RET cc jadvalida shu holat uchun C berilgan.

Manba izohi: Memory jadvalidagi ikkinchi address `1448h` deb yozilgan; manba qiymati saqlandi.

# RET

### Operation

`pCL ← (sp), pCH ← (sp+1)`

### Op Code

`RET`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `0` | `0` | `1` | `0` | `0` | `1` | `C9` | `11001001` |

### Description

Stack Pointer (SP) register pair ko‘rsatgan memory locationdagi byte Program Counter (PC) ning low-order sakkiz bitiga ko‘chiriladi. Keyin SP birga oshiriladi. Manbada keyingi jumlaning o‘rtasi tushib qolgan; davomida instruction PC ko‘rsatgan memory locationdan fetch qilinishi aytilgan. Ushbu instruction odatda CALL instruction orqali kirilgan routine tugagach, asosiy programga qaytish uchun ishlatiladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States     | 4 MHz E.T. (µs) |
| -------- | ------------ | --------------- |
| 3        | 10 (4, 3, 3) | 2.50            |

### Misol

Program Counterda 3535h, Stack Pointerda 2000h, 2000h memory locationda B5h va 2001h memory locationda 18h bo‘lsin. `RET` bajarilgach, Stack Pointerda 2002h, Program Counterda esa 18B5h bo‘ladi. PC programning keyingi fetch qilinadigan opcode manzilini ko‘rsatadi.

Manba izohi: RET ning Description matni SP oshirilishidan keyin uzilgan. Operation ifodasi ikkala PC byte i tiklanishini, misol esa yakuniy SP qiymati 2002h bo‘lishini ko‘rsatadi.

# RET cc

### Operation

cc shart rost bo‘lsa, `PCL ← (sp), pCH ← (sp+1)`.

### Op Code

`RET`

### Operand

`cc`

|     |     |     |       |       |       |     |     |     |            |            |
| --- | --- | --- | ----- | ----- | ----- | --- | --- | --- | ---------- | ---------- |
| 1   | `1` | `1` | `cc₂` | `cc₁` | `cc₀` | `0` | `0` | `0` | `cc field` | `11000 cc` |

### Description

cc shart rost bo‘lsa, Stack Pointer (SP) register pair ko‘rsatgan memory locationdagi byte Program Counter (PC) ning low-order sakkiz bitiga ko‘chiriladi. SP birga oshiriladi va SP ning yangi tarkibi ko‘rsatgan memory locationdagi byte PC ning high-order sakkiz bitiga ko‘chiriladi. SP yana birga oshiriladi. Keyingi opcode PC ko‘rsatgan memory locationdan fetch qilinadi. Ushbu instruction odatda CALL instruction orqali kirilgan routine tugagach, asosiy programga qaytish uchun ishlatiladi. cc shart yolg‘on bo‘lsa, PC odatdagidek oshiriladi va program ketma-ket keladigan keyingi instruction bilan davom etadi.

cc shart Flag Register (Register F) dagi condition bitlarga mos sakkiz holatdan biri sifatida belgilanadi. Quyidagi jadval assembled object codedagi tegishli cc bit maydonlarini ham ko‘rsatadi. Ustunlar tartibi: cc; condition; tegishli flag.

|       |                     |       |
| ----- | ------------------- | ----- |
| `000` | `Non-Zero (NZ)`     | `Z`   |
| `001` | `Zero (Z)`          | `Z`   |
| `010` | `Non Carry (NC)`    | `C`   |
| `011` | `Carry (C)`         | `C`   |
| `100` | `Parity Odd (PO)`   | `P/V` |
| `101` | `Parity Even (PE)`  | `P/V` |
| `110` | `Sign Positive (P)` | `S`   |
| `111` | `Sign Negative (M)` | `S`   |

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

cc shart rost bo‘lganda:

| M Cycles | T States     | 4 MHz E.T. (µs) |
| -------- | ------------ | --------------- |
| 3        | 11 (5, 3, 3) | 2.75            |

cc shart yolg‘on bo‘lganda:

| M Cycles | T States | 4 MHz E.T. (µs) |
| -------- | -------- | --------------- |
| 1        | 5        | 1.25            |

### Misol

F registerdagi S flag set holatida, Program Counterda 3535h, Stack Pointerda 2000h, 2000h memory locationda B5h va 2001h memory locationda 18h bo‘lsin. `RET M` bajarilgach, Stack Pointerda 2002h, Program Counterda esa 18B5h bo‘ladi. PC programning keyingi fetch qilinadigan opcode manzilini ko‘rsatadi.

# RETI

### Operation

Interruptdan qaytish.

### Op Code

`RETI`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` | `11001111` |
| 2   | `0` | `1` | `0` | `0` | `1` | `1` | `0` | `1` | `4D` | `01001101` |

### Description

Ushbu instruction maskable interrupt service routine oxirida Program Counter tarkibini tiklash (RET instructionga o‘xshash tarzda) va I/O devicega interrupt routine tugaganini bildirish uchun ishlatiladi. RETI interruptlarning nestingini ham qo‘llab-quvvatlaydi: higher priority device lower priority service routinega xizmat ko‘rsatishni vaqtincha to‘xtata oladi. Biroq ushbu instruction interrupt routinega kirishda o‘chirilgan interruptlarni yoqmaydi. Joriy service routine tugagach interruptlar tan olinishi uchun RETI dan oldin enable interrupt instruction (EI) bajarilishi kerak.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 14 (4, 4, 3, 3) | 3.50            |

### Misol

A va B nomli ikkita interrupt yuboruvchi device daisy-chain configurationda ulangan va A ning priority darajasi B nikidan yuqori bo‘lsin. Manbadagi sxemada quyidagi belgilar ko‘rsatilgan; dastlabki ikki qatorda device, IEI va IEO belgilari, oxirgi qatorda esa qo‘shimcha sxema belgilari saqlangan:

|                       |       |       |
| --------------------- | ----- | ----- |
| `A`                   | `IEI` | `IEO` |
| `B`                   | `IEI` | `IEO` |
| `Qo‘shimcha belgilar` | `+`   | `INT` |

B interrupt hosil qiladi va interrupt acknowledge qilinadi. B ning interrupt enable out (IEO) signali Low holatiga o‘tadi; B ga xizmat ko‘rsatilayotgan paytda lower priority devicelar interrupt yubora olmaydi. Keyin A interrupt hosil qilib, B ga xizmat ko‘rsatishni to‘xtatadi. A ning IEO signali Low holatiga o‘tib, higher priority devicega xizmat ko‘rsatilayotganini bildiradi. A routine tugagach, RETI beriladi va A ning IEO signali reset qilinadi; B routine davom etishi mumkin bo‘ladi. B routine tugaganda ikkinchi RETI beriladi va B ning manbada `IE0` deb yozilgan signali reset qilinib High holatiga o‘tadi. Shundan so‘ng lower priority devicelar interrupt yuborish imkoniga ega bo‘ladi.

Manba izohi: Misol oxirida `IE0` (nol bilan) yozilgan; oldingi matn va sxemada `IEO` ishlatilgan. Manba yozuvi saqlandi.

# RETN

### Operation

Nonmaskable interruptdan qaytish.

### Op Code

`RETN`

### Operands

Yo‘q.

|     |     |     |     |     |     |     |     |     |      |            |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- |
| 1   | `1` | `1` | `1` | `0` | `1` | `1` | `0` | `1` | `ED` | `11001111` |
| 2   | `0` | `1` | `0` | `0` | `0` | `1` | `0` | `1` | `45` | `01001100` |

### Description

Ushbu instruction nonmaskable interrupt service routine oxirida Program Counter tarkibini tiklash uchun ishlatiladi (RET instructionga o‘xshash tarzda). IFF2 holati IFF1 ga qayta ko‘chiriladi. Natijada, maskable interruptlar nonmaskable interruptdan oldin yoqilgan bo‘lsa, RETN dan keyin darhol qayta yoqiladi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States        | 4 MHz E.T. (µs) |
| -------- | --------------- | --------------- |
| 4        | 14 (4, 4, 3, 3) | 3.50            |

### Misol

Nonmaskable Interrupt (NMI) signali kelganda Stack Pointerda 1000h va Program Counterda 1A45h bo‘lsin. CPU keyingi instructionni e’tiborsiz qoldirib, uning o‘rniga 0066h memory addressga restart qiladi. PC ning joriy 1A45h qiymati tashqi stackning 0FFFh va 0FFEh addresslariga high-order byte birinchi bo‘lib push qilinadi. PC ga 0066h yuklanadi. Ushbu address RETN instruction bilan tugaydigan interrupt service routine boshlanishidir.

`RETN` bajarilganda oldingi Program Counter tarkibi tashqi memory stackdan low-order byte birinchi bo‘lib pop qilinadi. Stack Pointer yana 1000h bo‘ladi. Program oqimi to‘xtagan joyidan davom etib, 1A45h addressdan opcode fetch qilinadi.

Manba izohi: Manbada 1A45h ga qaytish bayonidan keyin 0066h ni PC ga yuklash va service routinega kirish haqidagi jumla yana takrorlangan. Keyingi davom matnida RETN dan so‘ng SP = 1000h va fetch address = 1A45h bo‘lishi qayta tasdiqlangan; takrorlar shu misolga birlashtirildi.

# RST p

### Operation

`(SP – 1) ← PCH, (SP – 2) ← PCL, PCH ← 0, PCL ← P`

### Op Code

`RST`

### Operand

`p`

|     |     |     |      |      |      |     |     |     |           |          |
| --- | --- | --- | ---- | ---- | ---- | --- | --- | --- | --------- | -------- |
| 1   | `1` | `1` | `t₂` | `t₁` | `t₀` | `1` | `1` | `1` | `t field` | `11t111` |

### Description

Program Counter (PC) ning joriy tarkibi tashqi memory stackka push qilinadi va p operand belgilagan Page 0 memory location PC ga yuklanadi. Program bajarilishi PC ko‘rsatgan addressdagi opcode dan boshlanadi. Push avval Stack Pointer (SP) tarkibini birga kamaytirib, PC ning high-order byte qiymatini SP ko‘rsatgan memory addressga yuklash orqali bajariladi. So‘ng SP yana birga kamaytiriladi va PC ning low-order byte qiymati SP ko‘rsatgan addressga yuklanadi. Restart instruction quyidagi jadvaldagi sakkiz addressdan biriga jump qilish imkonini beradi. p operand tegishli t maydoni bilan object codega yig‘iladi; manba matnida bu “T state” deb atalgan.

Ustunlar tartibi: p; t.

|       |       |
| ----- | ----- |
| `00h` | `000` |
| `08h` | `001` |
| `10h` | `010` |
| `18h` | `011` |
| `20h` | `100` |
| `28h` | `101` |
| `30h` | `110` |
| `38h` | `111` |

Barcha addresslar memoryning Page 0 qismida joylashgani uchun PC ning high-order byte qismiga 00h yuklanadi. Jadvalning p ustunidan tanlangan qiymat PC ning low-order byte qismiga yuklanadi.

### Condition Bits Affected

Hech biri o‘zgarmaydi.

### Timing

| M Cycles | T States     | 4 MHz E.T. (µs) |
| -------- | ------------ | --------------- |
| 3        | 11 (5, 3, 3) | 2.75            |

### Misol

Program Counterda 15B3h bo‘lsa, `RST 18h` (manbada object code `1101111`) bajarilgach, PC keyingi fetch qilinadigan opcode manzili sifatida 0018h qiymatiga ega bo‘ladi.

Manba izohi: Manba misolidagi object code `1101111` yetti bitdan iborat; yozuv asl holida saqlandi.
