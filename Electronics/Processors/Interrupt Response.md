---
name: Interrupt Response
status: active
pinned: false
deleted: false
tags:
  - Z80
  - interrupt
---

# Interrupt’ga javob berish

## Mundarija

- [Interrupt’ga javob berish](#interruptga-javob-berish)
- [Interrupt’ni yoqish va o‘chirish](#interruptni-yoqish-va-ochirish)
- [CPU javobi](#cpu-javobi)
  - [Mode 0](#mode-0)
  - [Mode 1](#mode-1)
  - [Mode 2](#mode-2)

Interrupt tashqi qurilmalarga CPU ishini vaqtincha to‘xtatish va interrupt service routine (ISR) bajarilishini boshlash imkonini beradi. Bu rutina odatda CPU bilan tashqi qurilma o‘rtasida ma’lumot, holat yoki boshqaruv axborotini almashishni o‘z ichiga oladi. Rutina tugagach, CPU dastur bajarilishini saqlangan qaytish manzilidan davom ettiradi.

## Interrupt’ni yoqish va o‘chirish

Z80 CPU’da ikkita interrupt kirishi mavjud: maskalanadigan `INT` va maskalanmaydigan `NMI`. INT active LOW, NMI esa falling edge orqali aniqlanadi. NMI dasturiy ravishda DI orqali taqiqlanmaydi va odatda muhim funksiyalar uchun ajratiladi. Interrupt so‘rovlari odatda joriy instruction yakunida tekshiriladi; takrorlanuvchi block instructionlar iteratsiyalari orasida ham qabul qilinishi mumkin. NMI ustuvor hisoblanadi.

Dasturchi vaqt cheklovlari mavjud bo‘lgan davrlarda maskalanadigan interruptlarni `DI` orqali o‘chirishi va `EI` orqali yoqishi mumkin. `IFF1` reset holatida CPU maskalanadigan INT ni qabul qilmaydi, ammo NMI qabul qilinishi mumkin.

Ikkita interrupt enable flip-flop — `IFF1` va `IFF2` — Figure 16’da ko‘rsatilgan.

![CleanShot 2026-11-25 at 13.28.40.png](<../../assets/99d2e8e8-c584-4ef9-918a-1d0e306a6410-CleanShot-2026-11-25-at-13-28-40.png>)

`IFF1` maskalanadigan interruptlarni qabul qilishni boshqaradi, `IFF2` esa NMI vaqtida interrupt enable holatini saqlashga xizmat qiladi.

CPU reset qilinganda ikkala flip-flop ham reset qilinadi. `EI` ikkala flip-flopni set qiladi, lekin kutayotgan INT so‘rovi EI dan keyingi instruction bajarilmaguncha qabul qilinmaydi. Bu kechikish, masalan, `EI` dan keyin return instructioni bajarilganda, qaytish tugashidan oldin maskalanadigan interrupt qabul qilinishining oldini oladi. Maskalanadigan interrupt qabul qilinganda IFF1 va IFF2 avtomatik reset qilinadi.

> [!NOTE]
> EI, DI, CPU reset va maskalanadigan interrupt qabul qilinishi ikkala flip-flopni bir xil qiymatga o‘rnatadi. NMI vaqtida esa ularning qiymatlari farq qilishi mumkin.

NMI qabul qilinganda IFF1 reset qilinadi, IFF2 esa o‘zgarmaydi. Shunday qilib, odatiy holatda NMI dan oldingi interrupt enable holati IFF2 da saqlanadi. Bu mexanizm barcha CPU registerlarini avtomatik saqlamaydi. NMI routine ichida yangi NMI falling edge yuzaga kelishi mumkin; IFF2 ichma-ich interruptlar uchun alohida stack emas.

`LD A,I` yoki `LD A,R` bajarilganda IFF2 qiymati P/V flagga ko‘chiriladi. Ayrim NMOS Z80 variantlarida instruction yakunida maskalanadigan interrupt qabul qilinsa, P/V reset bo‘lishi mumkin.

`RETN` stackdan PC ni tiklaydi va IFF2 qiymatini IFF1 ga ko‘chiradi. Agar ISR davomida IFF2 o‘zgartirilmagan bo‘lsa, NMI dan oldingi interrupt enable holati tiklanadi. `RETI` ham IFF2 → IFF1 amalini bajaradi, bundan tashqari Z80 daisy-chain peripheral qurilmalariga interrupt routine tugaganini bildiradi.

**Table 1. Interrupt’ni yoqish va o‘chirish: flip-flop’lar**

| Amal | IFF1 | IFF2 | Izoh |
| --- | --- | --- | --- |
| CPU reset | 0 | 0 | Maskalanadigan INT o‘chiriladi. |
| `DI` | 0 | 0 | Maskalanadigan INT o‘chiriladi. |
| `EI` | 1 | 1 | INT keyingi instruction yakunidan so‘ng qabul qilinishi mumkin. |
| `LD A,I` | O‘zgarmaydi | O‘zgarmaydi | IFF2 → P/V. |
| `LD A,R` | O‘zgarmaydi | O‘zgarmaydi | IFF2 → P/V. |
| INT qabul qilinishi | 0 | 0 | Maskalanadigan interrupt o‘chiriladi. |
| NMI qabul qilinishi | 0 | O‘zgarmaydi | Maskalanadigan interrupt o‘chiriladi. |
| `RETN` | IFF2 | O‘zgarmaydi | IFF2 → IFF1; PC stackdan tiklanadi. |
| `RETI` | IFF2 | O‘zgarmaydi | IFF2 → IFF1; PC tiklanadi; daisy-chain interrupt yakuni. |

## CPU javobi

NMI so‘rovi IFF1 qiymatidan qat’i nazar, tegishli instruction chegarasida qabul qilinadi. CPU qaytish manzilini stackka yozadi va PC ni `0066h` ga o‘rnatadi. Bu RST ga o‘xshash amal, biroq manzil sakkizta dasturiy RST manzilidan farq qiladi. NMI javobi 11 T States talab qiladi (tashqi wait state bo‘lmasa). ISR ishlashi uchun SP oldindan yozish mumkin bo‘lgan xotiraga o‘rnatilishi kerak.

CPU maskalanadigan interruptga uchta mode’dan birida javob beradi.

### Mode 0

Mode 0 interruptga javob berish jihatidan 8080A mode’iga o‘xshaydi. Interrupt yuborayotgan qurilma interrupt acknowledge siklida data busga opcode joylashtiradi va CPU uni bajaradi. Ko‘pincha bu bir byte’li RST instructioni bo‘ladi. Ko‘p byte’li instruction, masalan CALL, ishlatilsa, qolgan operand byte’larini ham tegishli bus sikllarida taqdim etish uchun mos hardware zarur.

Odatdagi RST instructioniga nisbatan interrupt acknowledge sikli ikkita qo‘shimcha T State talab qiladi. Bu tashqi daisy-chain priority boshqaruviga vaqt beradi. RST ishlatilganda javob 13 T States davom etadi. 13-sahifadagi Figure 9 va Figure 10’da interrupt response timing ko‘rsatilgan. RESET dan keyin CPU avtomatik ravishda Mode 0 ga o‘tadi.

### Mode 1

Mode 1 da CPU maskalanadigan interruptga javoban qaytish manzilini stackka yozadi va `0038h` manziliga o‘tadi. Bu RST 38h ga o‘xshaydi. NMI dan farqli ravishda ikkala IFF reset qilinadi. Interrupt javobi 13 T States talab qiladi. Tashqi qurilma opcode yoki vector taqdim etishi shart emas.

### Mode 2

Mode 2 interruptga javob berishning eng keng imkoniyatli mode’idir. Qurilma taqdim etgan 8-bit vector yordamida xotiradagi ISR manzilini indirect usulda olish mumkin.

Dasturchi ISR larning 16-bit boshlang‘ich manzillari jadvalini tashkil qiladi. Pointer’ning yuqori sakkiz biti I registeridan, quyi sakkiz biti interrupt acknowledge vaqtida qurilma taqdim etgan vectordan olinadi. I registeriga qiymat `LD I,A` orqali yuklanadi. CPU reset qilinganda I = 0 bo‘ladi.

`pointer = (I << 8) | vector`

Odatda vector juft qiymatga ega bo‘ladi, chunki jadvaldagi har bir ISR manzili ikki byte egallaydi. Biroq klassik Z80 vectorning bit 0 qiymatini majburan nol qilmaydi: barcha sakkiz bit pointer hosil qilishda ishlatiladi. Toq vector ham ishlashi mumkin, ammo jadval yozuvlari ustma-ust tushmasligi uchun ehtiyot bo‘lish kerak.

Jadvaldagi birinchi byte ISR manzilining quyi qismini, keyingi byte yuqori qismini tashkil qiladi. Interruptlar yoqilishidan oldin jadval to‘g‘ri manzillar bilan to‘ldirilishi kerak. Jadval RAM da joylashsa, dasturchi uni o‘zgartirishi mumkin va turli qurilmalarga alohida ISR orqali xizmat ko‘rsatiladi.

Masalan, I = 40h va vector = 20h bo‘lsa:

| Xotira manzili | Qiymat | Vazifasi |
| --- | --- | --- |
| 4020h | 34h | ISR manzilining quyi byte’i |
| 4021h | 12h | ISR manzilining yuqori byte’i |

CPU 1234h manziliga o‘tadi. Jadvaldan ikkinchi byte olishda 16-bit manzil increment qilinadi; vector FFh bo‘lsa, keyingi byte boshqa 256-byte sahifada joylashishi mumkin.

CPU avtomatik ravishda PC ni stackka yozadi, jadvaldan ISR manzilini oladi va shu manzilga o‘tadi. Javob 19 T States talab qiladi: vector olish uchun 7, PC ni saqlash uchun 6 va ISR manzilini olish uchun 6.

Z80 peripheral qurilmalarida daisy-chain priority interrupt tuzilmasi mavjud bo‘lib, interrupt acknowledge vaqtida dasturlangan vectorni CPU ga avtomatik taqdim etadi. Batafsil ma’lumot uchun *Z80 CPU Peripherals User Manual (UM0081)*ga qarang.

![CleanShot 2026-11-25 at 13.29.02.png](<../../assets/45973c43-89e0-4d68-9579-40514d69ba76-CleanShot-2026-11-25-at-13-29-02.png>)

| Interrupt | Javob manzili | T States |
| --- | --- | --- |
| NMI | 0066h | 11 |
| IM 0 | Qurilma bergan instructionga bog‘liq | RST uchun 13 |
| IM 1 | 0038h | 13 |
| IM 2 | Vector table orqali | 19 |

Timing qiymatlari tashqi wait state bo‘lmagan holat uchun berilgan.
