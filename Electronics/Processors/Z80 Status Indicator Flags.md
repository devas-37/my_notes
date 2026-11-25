---
name: Z80 Status Indicator Flags
status: active
pinned: false
deleted: false
tags:
  - z80
  - flags
  - registers
---

# Z80 Status Indicator Flags

F va F' Flag registerlari Z80 CPU operationlari natijasidagi holatlarni saqlaydi. F asosiy, F' esa alternate register set tarkibiga kiradi. Quyidagi tavsif klassik Z80 arxitekturasiga tegishli.

## Mundarija

- [Flag Register bit o‘rinlari](#flag-register-bit-orinlari)
- [Flag ta’riflari](#flag-tariflari)
- [Carry Flag](#carry-flag)
- [Add/Subtract Flag](#addsubtract-flag)
- [Decimal Adjust Accumulator](#decimal-adjust-accumulator)
- [Parity/Overflow Flag](#parityoverflow-flag)
- [Half Carry Flag](#half-carry-flag)
- [Zero Flag](#zero-flag)
- [Sign Flag](#sign-flag)
- [Conditional instructionlar](#conditional-instructionlar)
- [Instructionlar va flaglar](#instructionlar-va-flaglar)
- [Flaglarni saqlash va tiklash](#flaglarni-saqlash-va-tiklash)
- [Z80 Instruction Description](#z80-instruction-description)

## Flag Register bit o‘rinlari

**21-jadval. Flag Register bit o‘rinlari**

| Bit | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|---|---|---|---|---|---|---|---|---|
| Position | S | Z | Y | H | X | P/V | N | C |

Oltita flag rasmiy hujjatlashtirilgan. Bit 3 va bit 5 klassik Z80 da mavjud, ammo undocumented hisoblanadi. C, P/V, Z va S conditional JP, CALL va RET instructionlarida tekshiriladi. JR faqat C va Z shartlarini qo‘llaydi. H va N uchun bevosita conditional jump mavjud emas; ular BCD arithmetic uchun ham ishlatiladi.

## Flag ta’riflari

**22-jadval. Flag ta’riflari**

| Symbol | Field name | Vazifasi |
|---|---|---|
| C | Carry Flag | Carry yoki borrow |
| N | Add/Subtract | DAA uchun amal turi |
| P/V | Parity/Overflow Flag | Parity, signed overflow yoki instructionga xos holat |
| H | Half Carry Flag | Half carry yoki half borrow |
| Z | Zero Flag | Nol natija yoki instructionga xos shart |
| S | Sign Flag | Sign bit yoki instructionga xos shart |
| X | Undocumented F3 | Bit 3 |
| Y | Undocumented F5 | Bit 5 |

## Carry Flag

ADD va ADC instructionlari unsigned natija operand hajmidan oshganda C ni set qiladi. SUB, SBC va CP instructionlari borrow talab qilganda C ni set qiladi. Aks holda C reset qilinadi. ADC va SBC oldingi C qiymatini ham hisobga oladi. Saqlangan Carry extended precision arithmetic uchun ishlatiladi. DAA ham C ni decimal correction qoidalariga muvofiq yangilaydi.

RLA, RRA, RL va RR instructionlari Carry orqali rotate qiladi. Bu ko‘p byte’li qiymatlarni shift qilish imkonini beradi. RLCA, RLC va SLA bit 7 ni C ga; RRCA, RRC, SRA va SRL bit 0 ni C ga ko‘chiradi. RLA/RL va RRA/RR ham mos ravishda bit 7 va bit 0 ni C ga ko‘chiradi.

AND, OR va XOR C ni reset qiladi. SCF C ni set qiladi, CCF esa complement qiladi.

| Amal | Natija (8-bit) | C |
|---|---|---:|
| FFh + 01h | 00h | 1 |
| 7Fh + 01h | 80h | 0 |
| 00h − 01h | FFh | 1 |
| 05h − 03h | 02h | 0 |

```asm
LD A, 0FFh
ADD A, 1
; A = 00h, C = 1, Z = 1
```

16-bit qiymatni Carry orqali chapga shift qilish:

```asm
SLA L
RL H
```

L ning bit 7 qiymati H ning bit 0 qismiga o‘tadi. Yakuniy C eski H ning bit 7 qiymatini saqlaydi.

## Add/Subtract Flag

DAA instruction N yordamida addition va subtraction uchun correction yo‘nalishini tanlaydi. ADD, ADC va INC N ni reset qiladi; SUB, SBC, CP, DEC va NEG N ni set qiladi. N barcha instructionlarda amalning matematik turini anglatmaydi: masalan, CPL N ni set qiladi, logical instructionlar esa reset qiladi.

## Decimal Adjust Accumulator

DAA alohida flag emas. U A registeridagi binary arithmetic natijasini packed BCD formatiga moslaydi. Correction A, N, H va C qiymatlariga bog‘liq. Addition uchun kerakli 06h va/yoki 60h correction qo‘shiladi; subtraction uchun H va C asosida correction ayiriladi. DAA N ni saqlaydi, S, Z, H, P/V va C ni o‘z qoidalari bo‘yicha yangilaydi.

```asm
LD A, 45h
ADD A, 38h
; A = 7Dh
DAA
; A = 83h (BCD 83)
```

```asm
LD A, 45h
SUB 18h
; A = 2Dh
DAA
; A = 27h (BCD 27)
```

DAA oddiy binary sonni decimal formatga konvertatsiya qiluvchi universal instruction emas. Operandlar valid packed BCD bo‘lishi kerak.

## Parity/Overflow Flag

P/V bajarilgan instructionga qarab turli ma’nolarga ega. 8-bit signed arithmetic diapazoni −128 dan +127 gacha, 16-bit signed arithmetic diapazoni −32768 dan +32767 gacha. Overflow tegishli diapazondan chiqilganda yuz beradi. 16-bit ADD HL,ss P/V ni o‘zgartirmaydi; ADC HL,ss va SBC HL,ss esa signed overflow bo‘yicha yangilaydi.

### Addition misoli

Signlari turlicha operandlar oddiy additionda signed overflow hosil qilmaydi. Signlari bir xil operandlarning natijasi boshqa signga ega bo‘lsa, overflow yuz beradi.

| Rol | Decimal | Binary |
|---|---:|---|
| ADDEND | +120 | 01111000 |
| AUGEND | +105 | 01101001 |
| Matematik SUM | +225 | — |
| 8-bit SUM | −31 (signed), 225 (unsigned) | 11100001 |

P/V = 1, S = 1, C = 0. Asl matndagi −95 qiymati −31 ga tuzatildi.

### Subtraction misoli

Signlari turlicha operandlarni ayirishda overflow yuz berishi mumkin. Bir xil signli operandlarning oddiy subtraction amali signed overflow hosil qilmaydi.

| Rol | Decimal | Binary |
|---|---:|---|
| MINUEND | +127 | 01111111 |
| SUBTRAHEND | −64 | 11000000 |
| Matematik DIFFERENCE | +191 | — |
| 8-bit DIFFERENCE | −65 (signed), 191 (unsigned) | 10111111 |

P/V = 1, S = 1, C = 1. C unsigned borrow ni, P/V signed overflow ni bildiradi.

### Overflow va parityni aniqlash

Addition uchun sign bitga kiruvchi va undan chiquvchi Carry qiymatlarining XOR natijasi overflow ni bildiradi.

$$
V = C_{in} \oplus C_{out}
$$

Logical AND, OR, XOR hamda CB-prefixed rotate/shift instructionlarida P/V natijaning even parity holatini ko‘rsatadi. RLCA, RRCA, RLA va RRA esa P/V ni o‘zgartirmaydi.

| Binary | 1 bitlar soni | P/V (parity) |
|---|---:|---:|
| 00000000 | 0 | 1 |
| 00000001 | 1 | 0 |
| 00000011 | 2 | 1 |
| 11111111 | 8 | 1 |

CPI, CPIR, CPD, CPDR va LDI, LDIR, LDD, LDDR instructionlarida P/V decrement qilingan BC qiymati nol bo‘lmasa 1, aks holda 0 bo‘ladi.

LD A,I va LD A,R IFF2 qiymatini P/V ga ko‘chiradi. Ayrim NMOS Z80 variantlarida instruction yakunida INT qabul qilinishi P/V qiymatiga ta’sir qilishi mumkin.

IN r,(C) P/V ni input byte paritysiga moslaydi. IN A,(n) flaglarni o‘zgartirmaydi. Block I/O instructionlarida P/V alohida qoidaga ega.

### Carry va Overflow farqi

| Amal | Natija | C | P/V |
|---|---|---:|---:|
| 7Fh + 01h | 80h | 0 | 1 |
| FFh + 01h | 00h | 1 | 0 |
| 80h + 80h | 00h | 1 | 1 |
| 01h + 01h | 02h | 0 | 0 |

C unsigned arithmetic uchun, overflow esa signed arithmetic uchun muhim.

## Half Carry Flag

H 8-bit arithmeticda bit 3 va bit 4 orasidagi Carry yoki Borrow holatini bildiradi. DAA undan packed BCD natijasini tuzatish uchun foydalanadi.

**23-jadval. Half Carry Flag add/subtract operationlari**

| H Flag | Add | Subtract |
|---|---|---|
| 1 | Bit 3 dan bit 4 ga Carry yuz beradi | Bit 4 dan quyi nibblega Borrow yuz beradi |
| 0 | Half carry yo‘q | Half borrow yo‘q |

16-bit ADD, ADC va SBC instructionlarida H bit 11 va bit 12 chegarasidagi carry yoki borrow ni bildiradi. AND H ni set qiladi; OR va XOR reset qiladi.

```asm
LD A, 0Fh
ADD A, 1
; A = 10h, H = 1, C = 0
```

## Zero Flag

Z tegishli arithmetic yoki logical natija nol bo‘lsa set qilinadi. Natija A registerida saqlanishi shart emas: INC B yoki DEC C ham Z ni yangilaydi.

CP operand bilan A ni ayirish orqali taqqoslaydi, lekin A ni o‘zgartirmaydi. CPI, CPIR, CPD va CPDR A bilan (HL) qiymatini taqqoslaydi. Tenglikda Z = 1.

BIT b,r yoki BIT b,(HL) tekshirilayotgan bitning complement qiymatini Z ga yozadi. Indexed BIT instructionlarida ham shu qoida amal qiladi.

INI, IND, OUTI va OUTD instructionlarida Z decrement qilingan B nol bo‘lsa set qilinadi. IN r,(C) input byte nol bo‘lsa Z ni set qiladi.

```asm
LD A, 42h
CP 42h
JR Z, equal
; Teng emas holati
equal:
```

## Sign Flag

S odatda natijaning eng yuqori bitini saqlaydi: 8-bit natijada bit 7, 16-bit natijada bit 15. Biroq instructionga xos istisnolar mavjud. BIT instructionida S faqat bit 7 tekshirilganda va u 1 bo‘lganda set qilinadi, boshqa hollarda reset qilinadi. IN r,(C) S ni input byte bit 7 qiymatiga moslaydi.

Two’s complement notationda bit 7 nol bo‘lsa qiymat manfiy emas (0–127), bir bo‘lsa manfiy (−128 dan −1 gacha).

| Hex | Binary | Unsigned | Signed |
|---|---|---:|---:|
| 00h | 00000000 | 0 | 0 |
| 7Fh | 01111111 | 127 | 127 |
| 80h | 10000000 | 128 | −128 |
| FFh | 11111111 | 255 | −1 |

S flagning o‘zi signed comparison uchun har doim yetarli emas: subtraction overflow yuz berganda S XOR P/V hisobga olinishi kerak.

## Conditional instructionlar

| Condition | Shart | JP | JR | CALL | RET |
|---|---|---|---|---|---|
| NZ | Z = 0 | Ha | Ha | Ha | Ha |
| Z | Z = 1 | Ha | Ha | Ha | Ha |
| NC | C = 0 | Ha | Ha | Ha | Ha |
| C | C = 1 | Ha | Ha | Ha | Ha |
| PO | P/V = 0 | Ha | Yo‘q | Ha | Ha |
| PE | P/V = 1 | Ha | Yo‘q | Ha | Ha |
| P | S = 0 | Ha | Yo‘q | Ha | Ha |
| M | S = 1 | Ha | Yo‘q | Ha | Ha |

CP operand bajarilgandan keyin unsigned taqqoslash:

| Shart | Flag |
|---|---|
| A < operand | C = 1 |
| A = operand | Z = 1 |
| A >= operand | C = 0 |
| A > operand | C = 0 va Z = 0 |

Signed taqqoslashda A < operand sharti S XOR P/V = 1 bo‘ladi. Tenglik uchun Z ishlatiladi. Z80 da S XOR P/V ni bevosita tekshiruvchi conditional instruction mavjud emas.

## Instructionlar va flaglar

Quyidagi jadval oltita documented flagga tegishli. `—` o‘zgarmaydi, `R` natija yoki instruction qoidasi bo‘yicha yangilanadi, `V` overflow, `P` parity.

| Instruction | S | Z | H | P/V | N | C |
|---|---|---|---|---|---|---|
| ADD A,s / ADC A,s | R | R | R | V | 0 | R |
| SUB s / SBC A,s / CP s | R | R | R | V | 1 | R |
| INC r | R | R | R | V | 0 | — |
| DEC r | R | R | R | V | 1 | — |
| AND s | R | R | 1 | P | 0 | 0 |
| OR s / XOR s | R | R | 0 | P | 0 | 0 |
| ADD HL,ss | — | — | R | — | 0 | R |
| ADC HL,ss | R | R | R | V | 0 | R |
| SBC HL,ss | R | R | R | V | 1 | R |
| INC ss / DEC ss | — | — | — | — | — | — |
| RLCA / RRCA / RLA / RRA | — | — | 0 | — | 0 | R |
| CB rotate/shift | R | R | 0 | P | 0 | R |
| BIT b,r | R | R | 1 | Z | 0 | — |
| SET / RES | — | — | — | — | — | — |
| CPL | — | — | 1 | — | 1 | — |
| SCF | — | — | 0 | — | 0 | 1 |
| CCF | — | — | Old C | — | 0 | NOT C |
| DAA | R | R | R | P | — | R |
| LD A,I / LD A,R | R | R | 0 | IFF2 | 0 | — |
| LDI / LDD / LDIR / LDDR | — | — | 0 | BC ≠ 0 | 0 | — |
| CPI / CPD / CPIR / CPDR | R | R | R | BC ≠ 0 | 1 | — |
| IN r,(C) | R | R | 0 | P | 0 | — |
| NOP / HALT / DJNZ | — | — | — | — | — | — |

Undocumented X/Y flaglari ko‘pincha natijaning bit 3 va bit 5 qiymatlariga bog‘liq, lekin CP, indexed BIT, block instructionlar va boshqa holatlarda maxsus qoidalar mavjud. Emulator uchun ularni umumiy natija bitlari sifatida amalga oshirish yetarli emas.

## Flaglarni saqlash va tiklash

F registeriga LD F,n orqali bevosita yozib bo‘lmaydi. AF pair orqali stackda saqlash va tiklash mumkin.

```asm
PUSH AF
; Flaglarni o‘zgartiruvchi amallar
POP AF
```

EX AF,AF' asosiy va alternate Accumulator/Flag pairlarini almashtiradi. F qiymatini HL orqali ko‘rish uchun, stack tayyor bo‘lsa:

```asm
PUSH AF
POP HL
; H = A, L = F
```

Bu misol HL tarkibini o‘zgartiradi.

## Z80 Instruction Description

Har bir instructionning execution time (E.T.) qiymati 4 MHz clock uchun microsecond hisobida beriladi. Jami machine cyclelar (M) va T States soni ko‘rsatiladi.

### Timing

| M Cycles | T States | 4 MHz E.T. (µs) |
|---|---|---|
| 2 | 7 (4, 3) | 1.75 |

Birinchi machine cycle 4 T States, ikkinchisi 3 T States davom etadi. Jami 7 T States.

$$
t_{\mu s} = \frac{T\ States}{f_{MHz}}
$$

| Clock | 7 T States |
|---|---:|
| 4 MHz | 1.75 µs |
| 6 MHz | 1.1667 µs |

WAIT state va tashqi bus boshqaruvi haqiqiy execution time qiymatini uzaytirishi mumkin. Instruction formatlarida most-significant bit chapda, least-significant bit o‘ngda ko‘rsatiladi.

Manba: foydalanuvchi taqdim etgan Z80 CPU User Manual tarjimasi. Texnik tuzatishlar va qo‘shimcha misollar klassik Z80 arxitekturasi asosida kiritilgan.
