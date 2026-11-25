---
name: CPU Register
status: active
pinned: false
deleted: false
tags:
    - z80
    - cpu
    - registers
---

# CPU Register

Z80 CPU dasturchi foydalanishi mumkin bo‘lgan 208 bit read/write memoryga ega. 2-rasm bu memory 18 ta 8-bit register va to‘rtta 16-bit register sifatida qanday tashkil etilganini ko‘rsatadi. Z80 CPU ning barcha registerlari static RAM yordamida amalga oshirilgan. Registerlar tarkibiga oltitadan general-purpose registerga ega ikkita to‘plam kiradi. Ular alohida 8-bit registerlar yoki juftlangan 16-bit registerlar sifatida ishlatilishi mumkin. Shuningdek, Accumulator va Flag registerlarining ikkita to‘plami hamda oltita special-purpose register mavjud.

Manba: Z80 CPU User Manual, UM008011-0816.

## Mundarija

- [CPU Register Configuration (2-rasm)](#cpu-register-configuration-2-rasm)
- [Special-Purpose Registers](#special-purpose-registers)
- [Program Counter (PC)](#program-counter-pc)
- [Stack Pointer (SP)](#stack-pointer-sp)
- [Two Index Registers (IX and IY)](#two-index-registers-ix-and-iy)
- [Interrupt Page Address (I) Register](#interrupt-page-address-i-register)
- [Memory Refresh (R) Register](#memory-refresh-r-register)
- [Accumulator and Flag Registers](#accumulator-and-flag-registers)
- [General Purpose Registers](#general-purpose-registers)
- [Arithmetic Logic Unit](#arithmetic-logic-unit)
- [Instruction Register and CPU Control](#instruction-register-and-cpu-control)

## CPU Register Configuration (2-rasm)

2-rasm. CPU registerlarining tuzilishi.

General-purpose registerlar, Accumulator va Flags uchun Main Register Set hamda Alternate Register Set quyida berilgan.

| Vazifasi | Main Register Set | Alternate Register Set | Hajmi |
| ------------------------ | --- | ---- | ----- |
| Accumulator              | `A` | `A'` | 8-bit |
| Flags                    | `F` | `F'` | 8-bit |
| General-purpose register | `B` | `B'` | 8-bit |
| General-purpose register | `C` | `C'` | 8-bit |
| General-purpose register | `D` | `D'` | 8-bit |
| General-purpose register | `E` | `E'` | 8-bit |
| General-purpose register | `H` | `H'` | 8-bit |
| General-purpose register | `L` | `L'` | 8-bit |

General-purpose registerlar Main Register Set ichida `BC`, `DE`, `HL`, Alternate Register Set ichida esa `BC'`, `DE'`, `HL'` ko‘rinishidagi 16-bit register pairlarni hosil qiladi.

Special-purpose registerlar quyidagicha.

| Vazifasi | Register | Hajmi |
| ---------------- | ---- | ------ |
| Index Register   | `IX` | 16-bit |
| Index Register   | `IY` | 16-bit |
| Stack Pointer    | `SP` | 16-bit |
| Program Counter  | `PC` | 16-bit |
| Interrupt Vector | `I`  | 8-bit  |
| Memory Refresh   | `R`  | 8-bit  |

Manba izohi: 2-rasmning HTML matnida B/C qatori `BCB 'B '` ko‘rinishida berilgan. Yuqoridagi jadvalda Alternate Register Set uchun `B'` va `C'` shu manbaning General Purpose Registers bo‘limidagi `BC'` juftligiga muvofiq ko‘rsatildi.

## Special-Purpose Registers

### Program Counter (PC)

Program Counter memorydan fetch qilinayotgan joriy instructionning 16-bit addressini saqlaydi. Uning tarkibi address liniyalariga uzatilgach, Program Counter avtomatik ravishda oshiriladi. Program jump sodir bo‘lganda, yangi qiymat Program Counterga avtomatik joylashtiriladi va incrementer natijasining o‘rnini egallaydi.

### Stack Pointer (SP)

Stack Pointer tashqi tizim RAM memorysining istalgan qismida joylashgan stackning joriy tepasidagi 16-bit addressni saqlaydi. Tashqi stack memory last-in first-out (LIFO) tartibida tashkil etilgan. PUSH va POP instructionlari orqali muayyan CPU registerlaridan ma’lumotni stackka push qilish yoki stackdan muayyan CPU registerlariga pop qilish mumkin. Stackdan pop qilinadigan ma’lumot har doim unga eng oxirgi push qilingan ma’lumotdir. Stack multiple level interruptlarni va cheklanmagan subroutine nestingni sodda amalga oshirishga, shuningdek, ma’lumotlar bilan ishlashning ko‘plab turlarini soddalashtirishga imkon beradi.

### Two Index Registers (IX and IY)

Ikkita mustaqil Index Register indexed addressing modelarida ishlatiladigan 16-bit base addressni saqlaydi. Bu mode da Index Register ma’lumot yoziladigan yoki o‘qiladigan memory hududini ko‘rsatish uchun base sifatida ishlatiladi. Indexed instructionlarga ushbu basedan displacementni belgilaydigan qo‘shimcha byte kiritiladi. Displacement two’s complement signed integer sifatida beriladi. Bu addressing mode ko‘plab programlarni, ayniqsa data tablelardan foydalanadigan programlarni sezilarli darajada soddalashtiradi.

### Interrupt Page Address (I) Register

Z80 CPU interruptga javoban istalgan memory locationga indirect call qilish mumkin bo‘lgan mode da ishlay oladi. I register shu maqsadda ishlatiladi va indirect addressning high-order sakkiz bitini saqlaydi; interrupt yuborayotgan device esa addressning low-order sakkiz bitini taqdim etadi. Bu imkoniyat interrupt routinelarni memoryning istalgan joyida dinamik joylashtirishga va routinega murojaat qilish vaqtini kamaytirishga yordam beradi.

### Memory Refresh (R) Register

Z80 CPU memory refresh counterga ega. Bu dynamic memorylardan static memorylar kabi oson foydalanish imkonini beradi. Ushbu 8-bit registerning yetti biti har bir instruction fetchdan keyin avtomatik oshiriladi. Sakkizinchi bit `LD R, A` instruction orqali dasturlangan holatida qoladi. CPU fetch qilingan instructionni decode qilib bajarayotganda, refresh counterdagi ma’lumot refresh control signal bilan birga address busning pastki qismiga chiqariladi. Ushbu refresh mode dasturchining aralashuvini talab qilmaydi va CPU ishini sekinlashtirmaydi. Dasturchi sinov maqsadida R registerga qiymat yuklashi mumkin, ammo odatda bu register dasturchi tomonidan ishlatilmaydi. Refresh vaqtida I register tarkibi address busning yuqori sakkiz bitiga joylashtiriladi.

## Accumulator and Flag Registers

CPU ikkita mustaqil 8-bit Accumulator va ularga tegishli 8-bit Flag registerlarga ega. Accumulator 8-bit arithmetic yoki logical operationlar natijalarini saqlaydi. Flag Register esa 8-bit yoki 16-bit operationlarning muayyan holatlarini, masalan, operation natijasi 0 ga teng yoki teng emasligini ko‘rsatadi. Dasturchi bitta exchange instruction yordamida Accumulator va Flag juftligini tanlaydi; shu tariqa ikkala juftlikdan istalgani bilan ishlash mumkin.

## General Purpose Registers

Har biri oltita 8-bit registerdan iborat ikkita mos general-purpose register to‘plami mavjud. Ular alohida 8-bit registerlar yoki 16-bit register pairlar sifatida ishlatilishi mumkin. Bir to‘plam `BC`, `DE`, `HL`, ikkinchi to‘plam esa `BC'`, `DE'`, `HL'` deb ataladi. Dasturchi istalgan vaqtda butun to‘plam uchun bitta exchange command orqali ishlatiladigan registerlar to‘plamini tanlay oladi.

Tez interrupt response talab qilinadigan tizimlarda bitta general-purpose registerlar to‘plami va bitta Accumulator/Flag Register juftligi shu tezkor routine uchun ajratilishi mumkin. Routineni almashtirish uchun bitta exchange command bajariladi. Interrupt yoki subroutinega ishlov berishda register tarkibini tashqi stackka saqlash va undan qayta tiklash zarurati bartaraf etilgani sababli interrupt service vaqti sezilarli kamayadi. General-purpose registerlar keng doiradagi vazifalarda qo‘llanadi. Ular programlashni, ayniqsa tashqi read/write memory hajmi kam bo‘lgan ROM-based tizimlarda, soddalashtiradi.

## Arithmetic Logic Unit

CPU ning 8-bit arithmetic va logical instructionlari Arithmetic Logic Unit (ALU) da bajariladi. ALU ichki data bus orqali registerlar va tashqi data bus bilan ma’lumot almashadi. ALU quyidagi funksiyalarni bajaradi:

- Add
- Subtract
- Logical AND
- Logical OR
- Logical exclusive OR
- Compare
- Chapga yoki o‘ngga shift yoxud rotate (arithmetic va logical)
- Increment
- Decrement
- Set bit
- Reset bit
- Test bit

## Instruction Register and CPU Control

Har bir instruction memorydan fetch qilinganda, Instruction Registerga joylashtiriladi va decode qilinadi. Control bo‘limi bu vazifani bajaradi, keyin registerlardan ma’lumot o‘qish yoki ularga yozish, ALU ni boshqarish va zarur tashqi control signallarni ta’minlash uchun kerakli control signallarni hosil qilib uzatadi.
