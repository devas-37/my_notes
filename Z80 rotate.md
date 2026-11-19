# Z80 rotate — bitlarni aylantirish

## Interaktiv mashq

Har bir bitni va `CY` ni bosib o‘zgartiring, keyin `RLC`, `RRC`, `RL` yoki `RR` ni sinang. Buyruqlarni ketma-ket bosib aylanishni kuzating.

<interactive src="z80-rotate" />

## Asosiy g‘oya

**Rotate** — baytdagi bitlarni chapga yoki o‘ngga aylantirish. Chetdan chiqqan bit boshqa tomonga qaytadi yoki Carry orqali o‘tadi.

8 bitli registrni shunday tasavvur qilamiz:

```text
Bit raqami:  7 6 5 4 3 2 1 0
Qiymat:      1 0 0 1 0 1 1 0
             ↑             ↑
          chap chet     o‘ng chet
```

**Carry (CY)** — F registridagi bitta flag. Uni vaqtincha bitta bit saqlaydigan qo‘shimcha katak deb tasavvur qilish mumkin. Bu notedagi `CY` — Carry flag; `C` esa alohida registr nomi ham bo‘lishi mumkin.

## Ikki xil aylantirish

### 1. Circular: bit bevosita boshqa chetga qaytadi

- `RLC`: chapga aylantiradi; eski bit 7 → bit 0 va CY.
- `RRC`: o‘ngga aylantiradi; eski bit 0 → bit 7 va CY.

Eski CY natijaga ta’sir qilmaydi.

```text
RLC:  10010110 → 00101101    CY = 1
      ↑                ↑
      └── shu bit ──────┘

RRC:  10010111 → 11001011    CY = 1
```

### 2. Through Carry: bit CY orqali o‘tadi

- `RL`: chapga; eski CY → bit 0, eski bit 7 → yangi CY.
- `RR`: o‘ngga; eski CY → bit 7, eski bit 0 → yangi CY.

Bu safar **eski CY muhim**. Bayt va CY birgalikda 9 bitli halqa kabi ishlaydi.

```text
RL, eski CY = 0:
      10010110 → 00101100    yangi CY = 1

RL, eski CY = 1:
      10010110 → 00101101    yangi CY = 1

RR, eski CY = 0:
      10010111 → 01001011    yangi CY = 1

RR, eski CY = 1:
      10010111 → 11001011    yangi CY = 1
```

**Farqni eslab qolish:** `RLC/RRC` da chiqqan bit qaytadi; `RL/RR` da eski Carry kiradi.

## Buyruqlar jadvali

| Buyruq | Yo‘nalish | Bo‘shagan joyga nima kiradi? | Yangi CY |
|---|---|---|---|
| `RLC r` | Chapga | Eski bit 7 → bit 0 | Eski bit 7 |
| `RRC r` | O‘ngga | Eski bit 0 → bit 7 | Eski bit 0 |
| `RL r` | Chapga | Eski CY → bit 0 | Eski bit 7 |
| `RR r` | O‘ngga | Eski CY → bit 7 | Eski bit 0 |

Bu yerda `r` — `A`, `B`, `C`, `D`, `E`, `H` yoki `L`. Masalan: `RLC B`, `RR A`. Xotira uchun `(HL)`, `(IX+d)`, `(IY+d)` shakllari ham bor.

## Faqat A uchun qisqa buyruqlar

| Buyruq | Bitlar bo‘yicha mos amal |
|---|---|
| `RLCA` | `RLC A` |
| `RRCA` | `RRC A` |
| `RLA` | `RL A` |
| `RRA` | `RR A` |

Ular operandsiz yoziladi: `RLCA`, **`RLCA A` emas**.

**Muhim farq — flaglarda:**

- `RLCA`, `RRCA`, `RLA`, `RRA`: S, Z, P/V o‘zgarmaydi.
- `RLC`, `RRC`, `RL`, `RR`: S va Z natijaga qarab, P/V esa natijaning juft paritetiga qarab yangilanadi.
- Ikkala guruhda ham H va N nol bo‘ladi; CY jadvaldagi kabi yangilanadi.

Demak, `RLCA` va `RLC A` A registrida bir xil bit natijasini beradi, lekin flaglar holati bir xil bo‘lishi shart emas. Masalan, `RLCA` dan keyingi `JR Z` A ning yangi qiymati nol ekanini tekshirmaydi: Z oldingi holatida qolgan bo‘ladi.

## Kod bilan ko‘ramiz

### Oddiy aylantirish

```asm
LD A,81h     ; A = 10000001
RLCA         ; A = 00000011, CY = 1
RLCA         ; A = 00000110, CY = 0
```

Birinchi qadamda chapdagi `1` o‘ng tomonga qaytdi. Ikkinchi qadamda chapdan `0` chiqdi.

### Carry orqali aylantirish

```asm
LD A,80h     ; A = 10000000
OR A         ; A o‘zgarmaydi, CY = 0
RLA          ; A = 00000000, CY = 1
RLA          ; A = 00000001, CY = 0
```

Birinchi `RLA` da `1` Carry ga o‘tdi. Ikkinchisida o‘sha `1` A ning bit 0 joyiga kirdi.

### Ikki baytni bog‘lash

```asm
; HL = 8001h
SLA L        ; L = 02h, CY = 0
RL H         ; H = 00h, CY = 1
; HL = 0002h, eski bit 15 Carry ga chiqdi
```

Bu 16 bitli qiymatni chapga bir bit suradi. `SLA L` pastki baytdan chiqqan bitni CY ga beradi; `RL H` uni yuqori baytga olib kiradi. Shu sabab `RL/RR` ko‘p baytli amallarda foydali.

## Rotate va shift farqi

**Rotate** bitni aylantiradi. **Shift** esa bo‘shagan joyni o‘z qoidasiga ko‘ra to‘ldiradi.

```text
Boshlanish:   10000001
RLC natijasi: 00000011    chetdagi 1 qaytdi
SLA natijasi: 00000010    o‘ngga 0 kirdi
```

Shuning uchun rotate ni har doim «2 ga ko‘paytirish» deb tushunmang: qaytib kirgan bit son qiymatini o‘zgartiradi.

## O‘zingizni tekshiring

Har bir savolni alohida boshlang:

1. `A = 10000001`, `RRC A` → ?
2. `A = 10000001`, `CY = 0`, `RL A` → ?
3. `A = 10000001`, `CY = 1`, `RR A` → ?

Javoblar:

1. `A = 11000000`, `CY = 1`.
2. `A = 00000010`, `CY = 1`.
3. `A = 11000000`, `CY = 1`.

## Eslab qolish

- **L** — left, chapga; **R** — right, o‘ngga.
- `RLC/RRC` — bayt ichida aylanish, chiqqan bit CY ga ham ko‘chiriladi.
- `RL/RR` — Carry ham aylanishga qatnashadi.
- `RLCA/RRCA/RLA/RRA` — faqat A uchun; Z flagini yangilamaydi.

Manba: [Zilog Z80 CPU User Manual — Rotate and Shift Group](https://www.zilog.com/docs/z80/um0080.pdf). Misollar o‘rganishni osonlashtirish uchun tuzilgan.
