# Z80 ASM: binary (bitli) amallar

Binary amallar bayta ichidagi bitlar bilan ishlaydi. Z80 da bayt 8 bit: `7 6 5 4 3 2 1 0`. Bit 0 — eng kichik, bit 7 — eng katta razryad. Masalan, `00001000` — 3-bit yoqilgan, qiymati 8.

Misollarda sonlar `h` bilan hexadecimal yozilgan: `0Fh = 00001111`, `80h = 10000000`. Binary literal yozish sintaksisi assemblerga bog‘liq. `;` dan keyingi qism izoh.

## AND, OR, XOR: niqob bilan ishlash

Niqob (mask) qaysi bitlar bilan ishlashni belgilaydi. Bu uch buyruq natijani `A` registriga yozadi.

| Amal | Har bir bit uchun qoida | Qachon kerak? |
| --- | --- | --- |
| `AND` | Ikkalasi 1 bo‘lsa 1 | Kerakli bitlarni ajratish, boshqalarini tozalash |
| `OR` | Kamida bittasi 1 bo‘lsa 1 | Tanlangan bitlarni yoqish |
| `XOR` | Bitlar har xil bo‘lsa 1 | Tanlangan bitlarni teskarilash |

```asm
ld a,0B6h       ; 10110110
and 0Fh        ; 00000110: pastki 4 bit qoldi

ld a,20h       ; 00100000
or 04h         ; 00100100: 2-bit yoqildi

ld a,24h       ; 00100100
xor 04h        ; 00100000: 2-bit teskarilandi
```

Bir bitni o‘chirish uchun niqobda shu bit 0, qolganlari 1 bo‘ladi:

```asm
and 0FBh       ; 11111011: A ning 2-bitini o‘chiradi
xor a          ; A = 0; Carry ham 0 bo‘ladi
```

Qo‘llanishlar: o‘yin holatlari, tugmalar holati, grafik piksel ma’lumotlari va qurilma boshqaruv baytlari.

## BIT, SET, RES: bitta bit bilan ishlash

```asm
bit 3,b        ; B ning 3-bitini tekshiradi, B o‘zgarmaydi
jr z,bit_off   ; bit 0 bo‘lsa sakraydi
; bit 1 bo‘lgandagi kod shu yerda

bit_off:
set 3,b        ; 3-bit = 1
res 3,b        ; 3-bit = 0
```

`BIT` dan so‘ng `Z=1` tekshirilgan bit 0 ekanini bildiradi; `Z=0` esa bit 1 ekanini bildiradi. `SET` va `RES` flaglarni o‘zgartirmaydi. Xotirada ham ishlaydi: `set 3,(hl)`.

Bitta belgini tekshirishda `BIT`, bir nechta bitni birgalikda ajratishda `AND` qulay.

## CPL: hamma bitlarni teskarilash

```asm
ld a,0Fh       ; 00001111
cpl            ; 11110000
```

Invert qilingan niqob yoki active-low ma’lumot uchun foydali. `CPL` faqat A bilan ishlaydi. Bu arifmetik minus emas: two’s complement manfiy qiymat uchun `NEG` ishlatiladi.

## Shift: bitlarni surish

| Buyruq | Bo‘shagan joyga nima kiradi? | Qo‘llanish |
| --- | --- | --- |
| `SLA r` | O‘ngdan 0 | Chapga surish, ×2 |
| `SRL r` | Chapdan 0 | Ishorasiz qiymatni ÷2 |
| `SRA r` | Chapdan eski 7-bit | Ishorali qiymatni o‘ngga surish |

```asm
ld b,12
sla b          ; B = 24
srl b          ; B = 12

ld a,0F8h      ; signed: -8
sra a          ; 0FCh: -4
```

Chiqib ketgan bit Carry (`C`) ga tushadi. Chapga surishda yuqori bit yo‘qolishi mumkin; ×2 faqat natija sig‘sa aniq. O‘ngga surish qoldiqni tashlaydi. `SRA` manfiy toq qiymatni pastga yaxlitlaydi: -3 → -2.

## Rotate: aylantirish

`RLC` / `RRC` chetdan chiqqan bitni qarama-qarshi chetga qaytaradi va Carry ga ham yozadi. `RL` / `RR` esa oldingi Carry ni ichkariga kiritadi.

```asm
ld a,81h       ; 10000001
rlc a          ; 00000011, C=1
```

Bu bit oqimlari, aylanuvchi niqoblar va ko‘p baytli qiymatlar uchun kerak. Masalan, HL ni chapga bir bit surish:

```asm
sla l          ; L ning eski 7-biti Carry ga
rl h           ; Carry H ning 0-bitiga kiradi
```

## Flaglar va amaliy tanlov

- `AND`, `OR`, `XOR`: nol natijada Z o‘rnatiladi; Carry tozalanadi. Shu sababli oldingi Carry kerak bo‘lsa ehtiyot bo‘ling.
- `BIT`: qiymatni saqlab, bitta bitni tekshiradi; Carry saqlanadi.
- `CPL`: Z va Carry ni saqlaydi; yangi A nol ekanini flagdan bilib bo‘lmaydi.
- `SLA/SRL/SRA`, `RLC/RRC/RL/RR`: chiqayotgan bit Carry ga tushadi; Z natijaga qarab yangilanadi.
- `RLCA/RRCA/RLA/RRA` — faqat A uchun alohida variantlar; ular Z ni yangilamaydi.

Apparat portlari bilan ishlaganda qurilma hujjatini tekshiring: ayrim bitlar active-low yoki yozilganda maxsus ta’sirga ega. Oddiy RAM uchun to‘g‘ri bo‘lgan o‘qish–o‘zgartirish–yozish usuli har bir portga mos kelmaydi.

## Manba

[Zilog — Z80 Family CPU User Manual](https://www.zilog.com/docs/z80/z80cpu_um.pdf), mantiqiy amallar, bitlarni boshqarish va rotate/shift bo‘limlari. Rasmiy havola boshqa sahifaga yo‘naltirsa, [Harvarddagi qo‘llanma nusxasi](https://cscie93.dce.harvard.edu/fall2024/slides/Zilog%20Z80%20Family%20CPU%20User%20Manual%20z80cpu_um.pdf) orqali qidirish mumkin.
