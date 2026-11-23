---
name: 74HC299AP — G1 va G2 pinlari
tags: [electronics, shift-register, 74hc299]
---

# 74HC299AP: G1 va G2 nima qiladi?

[[Electronics/Digital Logic/74HC299AP|74HC299AP — universal shift registr]] dagi **/G1 (2-pin)** va **/G2 (3-pin)** parallel chiqishlarni yoqish yoki uzish uchun ishlatiladi. Ikkalasi ham **faol-past**: chiqishlar ishlashi uchun ikkalasi ham 0 bo‘lishi kerak.

| /G1 | /G2 | QA–QH parallel chiqishlari* |
| --- | --- | --- |
| 0 | 0 | Registrdagi qiymat chiqadi |
| 0 | 1 | Hi-Z |
| 1 | 0 | Hi-Z |
| 1 | 1 | Hi-Z |

\* **Parallel yuklashda (`S1=S0=1`) chiqish drayverlari har doim Hi-Z**, shunda A–H pinlaridan ma’lumot kiritiladi.

**Hi-Z** — chiqish elektr jihatdan uzilgandek holat; bu mantiqiy 0 degani emas. Bu bir nechta chip umumiy ma’lumot shinasiga ulanganda, faqat kerakli chip chiqishini yoqishga yordam beradi.

G1/G2 registrdagi ma’lumotni o‘chirmaydi va siljitishni to‘xtatmaydi; **QA′ va QH′ serial chiqishlariga ham ta’sir qilmaydi**.

**Oddiy ulash:** parallel chiqishlar doim kerak bo‘lsa, ikkala pinni GND ga ulang. Boshqarish uchun bittasini GND ga, ikkinchisini mikrokontrollerga ulang: **LOW → chiqish yoqiladi, HIGH → Hi-Z**. Kirishlarni ochiq qoldirmang.

Manba: [Toshiba TC74HC299AP/AF datasheet, 2-bet](https://toshiba.semicon-storage.com/info/TC74HC299AP_datasheet_ja_20140301.pdf?did=15651&prodName=TC74HC299AP).
