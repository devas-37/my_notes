# Logic gatelar — mantiqiy elementlar

Logic gate (mantiqiy element) — bir yoki bir nechta ikkilik kirish qiymati ustida mantiqiy amal bajarib, bitta chiqish qiymatini hosil qiladigan raqamli sxema.

- **0** — mantiqiy yolg‘on (odatda past kuchlanish darajasi).
- **1** — mantiqiy rost (odatda yuqori kuchlanish darajasi).

Aniq kuchlanish chegaralari ishlatiladigan elektron texnologiyaga bog‘liq. Mantiqiy elementlar protsessorlar, xotira va boshqa raqamli qurilmalarning asosini tashkil qiladi.

## Asosiy elementlar

| Element | Amal | Chiqish qachon 1 bo‘ladi? | Ifoda |
|---|---|---|---|
| AND | VA | Ikkala kirish ham 1 bo‘lsa | Y = A ∧ B |
| OR | YOKI | Kamida bitta kirish 1 bo‘lsa | Y = A ∨ B |
| NOT | EMAS | Kirish 0 bo‘lsa | Y = ¬A |
| NAND | VA-EMAS | Ikkala kirish bir vaqtda 1 bo‘lmasa | Y = ¬(A ∧ B) |
| NOR | YOKI-EMAS | Ikkala kirish ham 0 bo‘lsa | Y = ¬(A ∨ B) |
| XOR | Istisnoli YOKI | Ikki kirish turlicha bo‘lsa | Y = A ⊕ B |
| XNOR | Tenglik | Ikki kirish bir xil bo‘lsa | Y = ¬(A ⊕ B) |

## Rostlik jadvallari

Rostlik jadvali kirishlarning barcha mumkin bo‘lgan holatlari uchun chiqishni ko‘rsatadi. Quyidagi jadval ikki kirishli elementlar uchun berilgan.

| A | B | AND | OR | NAND | NOR | XOR | XNOR |
|---|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 1 | 1 | 0 | 1 |
| 0 | 1 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 0 | 0 | 0 | 1 |

NOT faqat bitta kirishga ega:

| A | NOT A |
|---|---|
| 0 | 1 |
| 1 | 0 |

## Oddiy misollar

### AND — ikkala shart ham bajarilishi kerak

Qurilma faqat quvvat mavjud **va** ishga tushirish tugmasi bosilgan bo‘lsa ishlaydi:

`Ishlash = Quvvat AND Tugma`

### OR — kamida bitta shart yetarli

Signalizatsiya eshik **yoki** deraza ochilganda ishga tushadi:

`Signal = Eshik OR Deraza`

Ikkalasi ham ochiq bo‘lsa ham chiqish 1 bo‘ladi.

### NOT — qiymatni teskarilash

`Y = NOT A`: A = 1 bo‘lsa, Y = 0; A = 0 bo‘lsa, Y = 1.

### XOR — kirishlar farqini aniqlash

Ikki bit turlicha bo‘lsa, XOR chiqishi 1 bo‘ladi. Shu sababli u ikkilik qo‘shishda ishlatiladi.

## Elementlarni birlashtirish

Murakkab mantiqiy sxemalar bir nechta elementni ulash orqali tuziladi.

Masalan:

`Y = (A AND B) OR (NOT C)`

Hisoblash tartibi:

1. A va B uchun AND natijasini hisoblash.
2. C ni NOT yordamida teskarilash.
3. Ikkala natijani OR orqali birlashtirish.

A = 1, B = 0, C = 0 bo‘lsa:

`Y = (1 AND 0) OR (NOT 0) = 0 OR 1 = 1`

## Yarim qo‘shuvchi — Half Adder

Yarim qo‘shuvchi ikkita bitni qo‘shadi va ikkita natija beradi:

- **Yig‘indi biti:** S = A XOR B.
- **Ko‘chirish biti:** C = A AND B.

| A | B | C — ko‘chirish | S — yig‘indi |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 0 |

Masalan, `1 + 1 = 10₂`: yig‘indi biti 0, keyingi xonaga ko‘chirish biti 1 bo‘ladi.

## Muhim qoidalar

- **NAND va NOR universal elementlar:** faqat NAND yoki faqat NOR elementlaridan foydalanib istalgan Boolean mantiqiy funksiyani qurish mumkin.
- **De Morgan qonunlari:** ¬(A ∧ B) = ¬A ∨ ¬B va ¬(A ∨ B) = ¬A ∧ ¬B.
- **OR va XOR farqi:** A = B = 1 bo‘lganda OR chiqishi 1, XOR chiqishi 0 bo‘ladi.
- Haqiqiy sxemalarda chiqish darhol o‘zgarmaydi: elementlarda kichik **tarqalish kechikishi** mavjud.

## O‘zingizni tekshiring

1. A = 1, B = 0 bo‘lsa, NAND chiqishi qanday?
2. A = 1, B = 1 bo‘lsa, XOR chiqishi qanday?
3. A = 0, B = 0 bo‘lsa, NOR chiqishi qanday?

**Javoblar:** 1) 1; 2) 0; 3) 1.
