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

Interrupt tashqi qurilmalarga CPU ishini vaqtincha to‘xtatish va CPU’ni tashqi qurilmaga xizmat ko‘rsatish rutinasi bajarilishini boshlashga majbur qilish imkonini beradi. Bu rutina odatda CPU bilan tashqi qurilma o‘rtasida ma’lumot, holat yoki boshqaruv axborotini almashishni o‘z ichiga oladi. Xizmat ko‘rsatish rutinasi tugagach, CPU interrupt tufayli to‘xtatilgan amalni bajarishga qaytadi.

## Interrupt’ni yoqish va o‘chirish

Z80 CPU’da ikkita interrupt kirishi mavjud: dasturiy ravishda maskalanadigan interrupt (`INT`) va maskalanmaydigan interrupt (`NMI`). Dasturchi maskalanmaydigan interrupt’ni o‘chira olmaydi; tashqi qurilma uni so‘raganda, u qabul qilinadi. Bu interrupt odatda muhim funksiyalar uchun ajratiladi. Dasturchi interrupt’larni tanlab yoqishi yoki o‘chirishi mumkin. Bu dasturda interrupt’ga yo‘l qo‘ymaydigan vaqt cheklovlari mavjud bo‘lgan davrlarda interrupt’ni o‘chirib qo‘yish imkonini beradi. Z80 CPU’da interrupt enable flip-flop (`IFF`) mavjud bo‘lib, dasturchi uni Enable Interrupt (`EI`) va Disable Interrupt (`DI`) instruction’lari yordamida set yoki reset qiladi. `IFF` reset holatida bo‘lsa, CPU interrupt’ni qabul qila olmaydi.

Ikkita enable flip-flop — `IFF1` va `IFF2` — Figure 16’da ko‘rsatilgan.

![CleanShot 2026-11-25 at 13.28.40.png](<../../assets/99d2e8e8-c584-4ef9-918a-1d0e306a6410-CleanShot-2026-11-25-at-13-28-40.png>)

`IFF1` holati interrupt’larni taqiqlash uchun ishlatiladi, `IFF2` esa `IFF1` holatini vaqtincha saqlash uchun xizmat qiladi.

CPU reset qilinganda, `IFF1` ham, `IFF2` ham reset holatiga o‘tadi va interrupt’lar o‘chiriladi. Dasturchi istalgan vaqtda `EI` instruction’i yordamida interrupt’larni yoqishi mumkin. `EI` bajarilganda, kutayotgan interrupt so‘rovi `EI`dan keyingi instruction bajarilmaguncha qabul qilinmaydi. Bitta instruction’ga teng bu kechikish keyingi instruction return instruction’i bo‘lganda zarur: return tugamaguncha interrupt’larga ruxsat berilmaydi. `EI` instruction’i `IFF1` va `IFF2`ni enable holatiga o‘tkazadi. CPU maskalanadigan interrupt’ni qabul qilganda, `IFF1` va `IFF2` avtomatik ravishda reset qilinadi; dasturchi yangi `EI` instruction’ini bajarmaguncha keyingi interrupt’lar taqiqlanadi.

> [!NOTE]
> Yuqoridagi barcha holatlarda `IFF1` va `IFF2` doimo bir-biriga teng bo‘ladi.

`IFF2`ning vazifasi — maskalanmaydigan interrupt yuz berganda `IFF1` holatini saqlash. Maskalanmaydigan interrupt qabul qilinganda, dasturchi qayta yoqmaguncha keyingi interrupt’larni oldini olish uchun `IFF1` reset qilinadi. Shunday qilib, maskalanmaydigan interrupt qabul qilingach, maskalanadigan interrupt’lar o‘chiriladi, ammo `IFF1`ning oldingi holati saqlanadi. Bu CPU’ning maskalanmaydigan interrupt’dan bevosita oldingi to‘liq holatini istalgan vaqtda tiklash imkonini beradi. Load Register A with Register I (`LD A,I`) yoki Load Register A with Register R (`LD A,R`) instruction’i bajarilganda, `IFF2` holati parity flag’ga ko‘chiriladi; u yerda bu holatni tekshirish yoki saqlash mumkin.

`IFF1` holatini tiklashning ikkinchi usuli — Return From Nonmaskable Interrupt (`RETN`) instruction’ini bajarish. Bu instruction maskalanmaydigan interrupt’ga xizmat ko‘rsatish rutinasi tugaganini bildiradi va `IFF2` mazmuni `IFF1`ga qayta ko‘chiriladi. Shu tariqa `IFF1`ning maskalanmaydigan interrupt qabul qilinishidan bevosita oldingi holati avtomatik tiklanadi.

Table 1 turli instruction’larning ikkita enable flip-flop’ga ta’sirini umumlashtiradi.

**Table 1. Interrupt’ni yoqish va o‘chirish: flip-flop’lar**

Ustunlar tartibi: amal, `IFF1`, `IFF2`, izoh.

|  |  |  |  |
| --- | --- | --- | --- |
| CPU reset | 0 | 0 | Maskalanadigan `INT` o‘chiriladi. |
| `DI` instruction’ini bajarish | 0 | 0 | Maskalanadigan `INT` o‘chiriladi. |
| `EI` instruction’ini bajarish | 1 | 1 | Maskalanadigan `INT` yoqiladi. |
| `LD A,I` instruction’ini bajarish | * | * | `IFF2` → parity flag. |
| `LD A,R` instruction’ini bajarish | * | * | `IFF2` → parity flag. |
| `NMI`ni qabul qilish | 0 | * | Maskalanadigan interrupt o‘chiriladi. |
| `RETN` instruction’ini bajarish | IFF2 | * | `IFF2` → `IFF1`. Maskalanmaydigan interrupt’ga xizmat ko‘rsatish rutinasi tugaganini bildiradi. |

## CPU javobi

CPU maskalanmaydigan interrupt’ni har doim qabul qiladi. Bu interrupt qabul qilinganda, CPU o‘qib olgan keyingi instruction’ni e’tiborsiz qoldirib, uning o‘rniga `0066h` manzilida restart bajaradi. CPU restart instruction’ini bajargandek ishlaydi, biroq manzil sakkizta dasturiy restart manzilidan farq qiladi. Restart — xotiraning Page 0 qismidagi muayyan manzilga call qilishdir.

CPU’ni maskalanadigan interrupt’ga uchta mode’dan istalgan birida javob beradigan qilib dasturlash mumkin.

### Mode 0

Mode 0 interrupt’ga javob berish jihatidan 8080A mode’iga o‘xshaydi. Mode 0’da interrupt yuborayotgan qurilma data bus’ga istalgan instruction’ni joylashtirishi mumkin va CPU uni bajaradi. Demak, keyingi bajariladigan instruction’ni interrupt yuborayotgan qurilma taqdim etadi. Ko‘pincha bu restart instruction’i bo‘ladi, chunki bunda qurilma faqat bir byte’li instruction taqdim etishi kerak. Shuningdek, boshqa istalgan instruction, masalan, xotiraning istalgan manziliga uch byte’li call ham bajarilishi mumkin.

Bu instruction’ni bajarish uchun talab qilinadigan clock cycle’lar soni instruction’ning odatdagi cycle’lari sonidan ikkitaga ko‘p bo‘ladi. Buning sababi — CPU priority boshqaruvi uchun tashqi daisy-chain ishlashiga yetarli vaqt berish maqsadida interrupt’ga javob berish sikliga avtomatik ravishda ikkita wait state qo‘shadi. 13-sahifadagi Figure 9 va Figure 10’da interrupt’ga javob berish timing’i ko‘rsatilgan. `RESET` berilgach, CPU avtomatik ravishda interrupt Mode 0’ga o‘tadi.

### Mode 1

Dasturchi Mode 1’ni tanlaganda, CPU interrupt’ga javoban `0038h` manzilida restart bajaradi. Natijada javob maskalanmaydigan interrupt’ga beriladigan javob bilan bir xil bo‘ladi, faqat call manzili `0066h` o‘rniga `0038h` bo‘ladi. Qo‘shilgan ikkita wait state sababli restart instruction’ini tugatish uchun talab qilinadigan cycle’lar soni odatdagidan ikkitaga ko‘p bo‘ladi.

### Mode 2

Mode 2 — interrupt’ga javob berishning eng keng imkoniyatli mode’i. Foydalanuvchi taqdim etgan bitta 8-bit byte yordamida xotiraning istalgan manziliga indirect call qilish mumkin.

Mode 2’da dasturchi har bir interrupt’ga xizmat ko‘rsatish rutinasi uchun 16-bit boshlang‘ich manzillar jadvalini yuritadi. Bu jadval xotiraning istalgan joyida bo‘lishi mumkin. Interrupt qabul qilinganda, kerakli xizmat ko‘rsatish rutinasining boshlang‘ich manzilini jadvaldan olish uchun 16-bit pointer tuzilishi kerak. Pointer’ning yuqori sakkiz biti `I` register mazmunidan olinadi. Dasturchi `I` register’ga tegishli qiymatni, masalan, `LD I,A` yordamida yuklashi kerak. CPU reset qilinganda, `I` register tozalanib, boshlang‘ich qiymati `0` bo‘ladi. Pointer’ning quyi sakkiz bitini interrupt yuborayotgan qurilma taqdim etishi kerak. Qurilmadan faqat yettita bit talab qilinadi, chunki eng kichik qiymatli bit `0` bo‘lishi shart. Bu talab xizmat ko‘rsatish rutinasining to‘liq 16-bit boshlang‘ich manzilini hosil qilish uchun pointer orqali ikkita yonma-yon byte olinishi bilan bog‘liq; manzillar har doim juft joylashuvdan boshlanishi kerak.

Jadvaldagi birinchi byte manzilning eng kichik qiymatli qismini, ya’ni quyi qismini tashkil qiladi. Har qanday interrupt qabul qilinishidan oldin dasturchi jadvalni to‘g‘ri manzillar bilan to‘ldirishi kerak.

Jadvalni read/write xotirada saqlash orqali dasturchi uni o‘zgartirishi mumkin. Bu, shuningdek, alohida tashqi qurilmalarga turli xizmat ko‘rsatish rutinalari orqali xizmat ko‘rsatish imkonini beradi.

Interrupt yuborayotgan qurilma pointer’ning quyi qismini taqdim etganda, CPU avtomatik ravishda program counter’ni stack’ka joylaydi, jadvaldan boshlang‘ich manzilni oladi va shu manzilga jump bajaradi. Bu javob mode’ini tugatish uchun 19 ta clock period talab qilinadi: interrupt yuborayotgan qurilmadan quyi sakkiz bitni olish uchun yettita, program counter’ni saqlash uchun oltita va jump manzilini olish uchun oltita.

Z80 tashqi qurilmalarida daisy-chain priority interrupt tuzilmasi mavjud bo‘lib, u interrupt acknowledge vaqtida dasturlangan vector’ni CPU’ga avtomatik taqdim etadi. Batafsil ma’lumot uchun *Z80 CPU Peripherals User Manual (UM0081)*ga qarang.

![CleanShot 2026-11-25 at 13.29.02.png](<../../assets/45973c43-89e0-4d68-9579-40514d69ba76-CleanShot-2026-11-25-at-13-29-02.png>)
