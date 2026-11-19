# Z80 ASM: LDIR va boshqa blok buyruqlari

Blok buyruqlari ketma-ket baytlarni ko‘chirish, qidirish yoki port orqali uzatishga xizmat qiladi. Operandlar registrlarda beriladi: `ldir` yoniga argument yozilmaydi. Misollarda `h` — hexadecimal son, `;` — izoh.

## LDI, LDIR, LDD, LDDR: xotirani ko‘chirish

- `HL` — manba manzili.
- `DE` — qabul qiluvchi manzil.
- `BC` — baytlar soni.

| Buyruq | Bir qadam | Takrorlash |
| --- | --- | --- |
| `LDI` | `(DE) ← (HL)`, HL va DE +1, BC −1 | Bir marta |
| `LDIR` | LDI kabi | BC = 0 bo‘lguncha |
| `LDD` | `(DE) ← (HL)`, HL va DE −1, BC −1 | Bir marta |
| `LDDR` | LDD kabi | BC = 0 bo‘lguncha |

`I` — increment, `D` — decrement, `R` — repeat. Manzillar yo‘nalishi o‘zgaradi, hisoblagich esa doim kamayadi.

```asm
ld hl,8000h     ; manba
ld de,9000h     ; qabul qiluvchi
ld bc,0100h     ; 256 bayt
ldir
```

Natija: `8000h–80FFh` baytlari `9000h–90FFh` ga ko‘chadi; `HL=8100h`, `DE=9100h`, `BC=0`. `A` o‘zgarmaydi.

Muhim: boshlang‘ich `BC=0` bo‘lsa, LDIR hech narsa qilmasdan tugamaydi: 65 536 bayt ko‘chiradi. Nol uzunlikni oldindan tekshiring:

```asm
; HL, DE, BC oldindan tayyorlangan; A o‘zgaradi
ld a,b
or c
jr z,copy_done
ldir
copy_done:
```

### Ustma-ust tushadigan bloklar

Qabul qiluvchi blok manbadan yuqorida boshlanib, u bilan kesishsa, oldinga nusxalash hali o‘qilmagan baytlarni bosib ketishi mumkin. Oxiridan boshlang:

```asm
; 8000h–800Fh ni 8004h–8013h ga siljitish
ld hl,800Fh
ld de,8013h
ld bc,16
lddr
```

### Bir qiymat bilan to‘ldirish

Bitta baytni yozib, uni keyingi manzillarga yoyish mumkin:

```asm
ld hl,9000h
ld de,9001h
ld bc,255
ld (hl),0
ldir             ; jami 256 bayt nol bo‘ladi
```

Bu usul ataylab kesishadigan blokdan foydalanadi. Uzunlik 1 bo‘lsa faqat birinchi baytni yozing; `BC=0` bilan LDIR chaqirmang.

## CPI, CPIR, CPD, CPDR: bayt qidirish

`A` — qidiriladigan qiymat, `HL` — manzil, `BC` — tekshiriladigan baytlar soni. Taqqoslash xotira va A ni o‘zgartirmaydi.

| Buyruq | HL yo‘nalishi | Ishlash |
| --- | --- | --- |
| `CPI` / `CPD` | +1 / −1 | Bir baytni solishtirish, BC −1 |
| `CPIR` / `CPDR` | +1 / −1 | Moslik topilguncha yoki BC = 0 bo‘lguncha |

```asm
ld a,0
ld hl,8000h
ld bc,100
cpir
jr nz,not_found
; Z=1: nol bayt topildi; HL undan keyingi manzilda
dec hl           ; HL topilgan baytni ko‘rsatadi
; topilgan bayt bilan ishlash...
not_found:
```

Moslikni `Z` orqali tekshiring: oxirgi baytda ham topilishi mumkin, shu sabab `BC=0` topilmadi degani emas. `CPDR` dan keyin topilgan manzilni olish uchun `inc hl` kerak. Dastlabki `BC=0` qidirishni bo‘sh qilmaydi: moslik oldin topilmasa, 65 536 bayt tekshiriladi.

## INI, INIR, IND, INDR va OUTI, OTIR, OUTD, OTDR

Bu oilalarda **hisoblagich B**, C esa portning pastki manzil bayti. HL xotirani ko‘rsatadi.

| Bir qadam | Takrorlanuvchi | Yo‘nalish |
| --- | --- | --- |
| `INI` | `INIR` | Port → xotira, HL +1 |
| `IND` | `INDR` | Port → xotira, HL −1 |
| `OUTI` | `OTIR` | Xotira → port, HL +1 |
| `OUTD` | `OTDR` | Xotira → port, HL −1 |

### Registrlarning vazifasi

- `HL` — xotiradagi bufer manzili.
- `C` — port manzilining pastki 8 biti.
- `B` — baytlar hisoblagichi; port manzilining yuqori 8 bitiga ham ta’sir qiladi.
- `A` — bu buyruqlarda ma’lumot tashish uchun ishlatilmaydi va o‘zgarmaydi.

`LDIR` xotiradan xotiraga ko‘chiradi. Blok I/O buyruqlari esa tashqi qurilma porti bilan xotira orasida ma’lumot uzatadi.

### INI: bitta baytni portdan o‘qish

`INI` — Input and Increment. Bitta bajarilishda portdan bir bayt olinib, `(HL)` ga yoziladi; `HL` 1 ga oshadi, `B` 1 ga kamayadi:

```text
(HL) ← portdan o‘qilgan bayt
HL   ← HL + 1
B    ← B − 1
```

```asm
ld hl,8000h      ; qabul qilish buferi
ld c,20h         ; portning pastki manzili
ld b,3           ; baytlar hisoblagichi
ini
```

Portdan `A5h` kelsa, natija: `[8000h]=A5h`, `HL=8001h`, `B=2`, `C=20h`.

**INI o‘zi takrorlanmaydi.** B hali 2 bo‘lsa ham, protsessor keyingi buyruqqa o‘tadi.

### INIR: B nol bo‘lguncha o‘qish

Oxiridagi `R` — Repeat. Yuqoridagi misolda `INI` o‘rniga `INIR` ishlatilsa, uchta bayt olinadi. Qurilma ketma-ket `A5h`, `12h`, `7Fh` bersin:

| Qadam | Yozilgan joy | Qiymat | Keyingi HL | Qolgan B |
| --- | --- | --- | --- | --- |
| 1 | `8000h` | `A5h` | `8001h` | 2 |
| 2 | `8001h` | `12h` | `8002h` | 1 |
| 3 | `8002h` | `7Fh` | `8003h` | 0 |

Takrorlanish sharti jihatidan quyidagi siklga o‘xshaydi; bajarilish vaqti bir xil emas:

```asm
again:
    ini
    jr nz,again  ; INI dan keyin Z=1 bo‘lsa, B=0
```

### IND va INDR: xotira manzili kamayadi

Bu buyruqlar ham portdan o‘qiydi, faqat har baytdan keyin `HL` 1 ga kamayadi. `B` ham avvalgidek kamayadi; `C` o‘zgarmaydi.

```asm
ld hl,8002h
ld c,20h
ld b,3
indr
```

Baytlar kelish tartibida `8002h`, `8001h`, `8000h` manzillariga yoziladi. Yakunda `HL=7FFFh`, `B=0`. `IND` esa faqat bitta baytni o‘qiydi.

### OUTI, OTIR, OUTD, OTDR: xotiradan portga chiqarish

`OUTI` bir baytni `(HL)` dan portga chiqaradi, `HL` ni oshiradi va `B` ni kamaytiradi. `OTIR` shu amalni B nol bo‘lguncha takrorlaydi:

```asm
ld hl,8000h      ; yuboriladigan ma’lumot
ld c,20h
ld b,3
otir
```

`8000h`, `8001h`, `8002h` dagi uchta bayt shu tartibda chiqariladi. Yakunda `HL=8003h`, `B=0`.

`OUTD` va `OTDR` da xotira manzili har qadamda kamayadi. Masalan, `HL=8002h`, `B=3` bilan `OTDR` baytlarni `8002h → 8001h → 8000h` tartibida chiqaradi.

### Muhim chekka holatlar va apparat xususiyatlari

- Boshlang‘ich `B=0` bilan takrorlanuvchi buyruq **256 bayt** uzatadi: birinchi kamaytirishda `00h → FFh` bo‘ladi. Nol uzunlik kerak bo‘lsa, buyruqdan oldin tekshirish lozim.
- Z80 port manzili 16 bitli. Yuqori bayt B ga bog‘liq bo‘lgani uchun hisoblagich kamayganda to‘liq port manzili ham o‘zgaradi. Qurilma faqat pastki 8 bitni dekodlasa, bu bir xil port bo‘lib ko‘rinadi.
- Bu buyruqlar qurilmaning “tayyor” statusini avtomatik tekshirmaydi. Qurilma har bayt oldidan status so‘rasa, alohida sikl kerak.
- Takrorlanishlar orasida interrupt qabul qilinishi mumkin. Interrupt kodi ishlatayotgan `BC`, `HL` va boshqa zarur registrlarni saqlab, tiklashi kerak.

## Flaglar va vaqt

Ko‘chirish oilasida S, Z, C saqlanadi; H va N tozalanadi; P/V qolgan BC nol emasligini bildiradi. Qidirishda Z moslikni, P/V esa BC nol emasligini bildiradi; C saqlanadi. Blok I/O flaglarini oddiy CP natijasi deb talqin qilmang.

Klassik Z80 da bir qadamli variantlar 16 T-state oladi. Takrorlanuvchi variantlarda davom etuvchi qadam 21, oxirgisi 16 T-state: N qadam uchun `21×N−5` (WAIT va interrupt vaqtlarisiz). Interruptlar qadamlar orasida qabul qilinishi mumkin; blok amali atomar emas.

## Manba

[Zilog Z80 CPU User Manual, UM008011-0816 — nusxa](https://zany80.github.io/documentation/Z80/UserManual.html), “Exchange, Block Transfer, and Search Group” va “Input and Output Group”. [Zilog rasmiy PDF manzili](https://www.zilog.com/docs/z80/z80cpu_um.pdf).
