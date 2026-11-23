---
name: Decoder va encoder IClar
tags: [electronics, logic, decoder, encoder]
---

# Decoder va encoder IClar

**Decoder (dekoder):** ikkilik kodga qarab bitta chiqishni faollashtiradi: $n$ ta kirish → $2^n$ ta chiqish.  
**Encoder (enkoder):** faol kirishning raqamini ikkilik kodga aylantiradi: $2^n$ ta kirish → $n$ ta chiqish.

Ular **kombinatsion mantiq**: chiqish joriy kirishlarga bog‘liq, ma’lumotni saqlamaydi.

## Decoder: 2 → 4 truth table

Quyida **faol daraja 1**, qurilma yoqilgan deb olingan. `A1` — katta bit.

| A1 | A0 | Y0 | Y1 | Y2 | Y3 |
|---|---|---|---|---|---|
| 0 | 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 0 | 0 |
| 1 | 0 | 0 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 | 0 | 1 |

Masalan, `10₂ = 2` → `Y2` faol. Har bir chiqish kirish bitlarining mos kombinatsiyasini AND bilan aniqlaydi: $Y_2 = A_1 \land \neg A_0$.

**Qo‘llanish:** xotira chipini tanlash, qurilmalarni manzil bo‘yicha yoqish.

## Encoder: 4 → 2 truth table

Quyida **faol daraja 1**, bir vaqtda faqat bitta kirish faol.

| D3 | D2 | D1 | D0 | A1 | A0 |
|---|---|---|---|---|---|
| 0 | 0 | 0 | 1 | 0 | 0 |
| 0 | 0 | 1 | 0 | 0 | 1 |
| 0 | 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 0 | 0 | 1 | 1 |

Masalan, `D2` faol → `10₂`. Oddiy encoderda $A_1 = D_2 \lor D_3$, $A_0 = D_1 \lor D_3$.

- Hech bir kirish faol bo‘lmasa ham bu sxema `00` chiqaradi; `D0` dan ajratish uchun **valid** signali kerak.
- Bir nechta kirish faol bo‘lsa, oddiy encoder natijasi noaniq. **Priority encoder** ustuvorligi yuqori kirishni tanlaydi.

**Qo‘llanish:** tugmalarni kodlash, uzilish so‘rovlarining ustuvorligini aniqlash.

## Haqiqiy IC misollari

- **74HC138:** 3 → 8 decoder; tanlangan chiqish **0**, qolganlari **1** bo‘ladi. Enable kirishlari to‘g‘ri holatda bo‘lishi kerak. [TI manbasi](https://www.ti.com/product/SN74HC138)
- **74HC148:** 8 → 3 priority encoder; ma’lumot kirishlari va kod chiqishlari **active-low**. [TI datasheet](https://www.ti.com/lit/ds/symlink/sn74hc148.pdf)

**Eslatma:** yuqoridagi jadvallar umumiy active-high misollar; 74HC138/148 uchun aynan datasheet jadvalidan foydalaniladi. Pin nomidagi chiziq yoki `/EN`, `/Y` belgisi odatda **0 da faol** ekanini bildiradi.
