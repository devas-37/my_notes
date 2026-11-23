---
name: Z80 pinlari va ularning vazifalari
tags:
  - Z80
  - pinout
  - electronics
---

# Z80 pinlari va ularning vazifalari

Z80 — 8 bitli ma’lumotlar shinasi va 16 bitli manzil shinasiga ega protsessor. Pinlar xotira va tashqi qurilmalar bilan aloqa qilish, interruptlarni qabul qilish, kutish holatini boshqarish hamda shinani boshqa qurilmaga topshirish uchun xizmat qiladi.

Ushbu qayd foydalanuvchi yuborgan **Zilog Z80 CPU User Manual, UM008011-0816**, “Pin Functions” bo‘limidan olingan parcha asosida tozalandi va o‘zbekchaga moslashtirildi. Sahifa raqamlari, sarlavha qoldiqlari, bo‘linib ketgan so‘zlar va chizma OCR qoldiqlari olib tashlandi. Quyidagi misollar va amaliy izohlar asosiy tavsiflarni tushuntirish uchun qo‘shilgan.

## 1. Signal belgilarini tushunish

| Belgi yoki atama | Ma’nosi |
|---|---|
| Input — kirish | Signalni tashqi qurilma beradi, CPU qabul qiladi. |
| Output — chiqish | Signalni CPU hosil qiladi. |
| Input/output | Pin turli vaqtda kirish yoki chiqish bo‘lib ishlaydi. |
| Active Low | Signal LOW, ya’ni mantiqiy 0 bo‘lganda faol. |
| Active High | Signal HIGH, ya’ni mantiqiy 1 bo‘lganda faol. |
| Tristate, uch holatli | Chiqish 0, 1 yoki yuqori impedansli Z holatiga o‘ta oladi. |
| Negative edge-triggered | HIGH → LOW o‘tish cheti hodisani ishga tushiradi. |

Bu qaydda faol-past signallar `/RD`, `/MREQ` kabi yoziladi. Datasheetda ularning ustiga chiziq qo‘yilishi mumkin.

**Z — uchinchi kuchlanish sathi emas.** Yuqori impedans holatida CPU chiqishi shinani 0 yoki 1 ga faol tortmaydi; boshqa qurilma uni boshqara oladi. Uni doimiy LOW holatiga tenglashtirish xato.

Manzil va ma’lumotlar shinasidagi “active High” esa bitlarning oddiy musbat mantiqda ifodalanishini anglatadi: HIGH — 1, LOW — 0. Barcha bitlar bir vaqtda HIGH bo‘lishi talab qilinmaydi.

## 2. Manzil va ma’lumotlar shinalari

### A15–A0 — Address Bus

**Turi:** chiqish, musbat mantiq, uch holatli.

16 ta pin CPU murojaat qilayotgan manzilni uzatadi. A0 — eng kichik, A15 — eng katta razryad.

$$
2^{16} = 65536\ \text{bayt} = 64\ \text{KiB}
$$

Shuning uchun bevosita xotira manzillari `0000h–FFFFh` oralig‘ida bo‘ladi. Manbadagi “64 KB” shu 65 536 baytli maydonni bildiradi.

Shina ikki turdagi murojaatda ishlatiladi:

- **Xotira:** `/MREQ` bilan birga RAM yoki ROM manzili.
- **I/O:** `/IORQ` bilan birga tashqi port manzili.

**Misol:** CPU `4000h` manzilidan bayt o‘qisa, shu manzil A15–A0 ga chiqariladi; tegishli xotira mikrosxemasi manzil dekoderi orqali tanlanadi.

> [!NOTE]
> Manzilning o‘zi amal turini bildirmaydi. Bir xil raqam xotira manzili ham, I/O port manzili ham bo‘lishi mumkin; farqni boshqaruv signallari belgilaydi.

**I/O bo‘yicha qo‘shimcha izoh:** qo‘llanma I/O manzili sifatida A7–A0 ni ta’kidlaydi. Biroq yuqori A15–A8 bitlari ham I/O siklida qiymatga ega: masalan, `OUT (n),A` buyrug‘ida yuqori bayt A registridan, `OUT (C),r` turida esa B registridan keladi. Dekoder faqat pastki 8 bitni yoki to‘liq 16 bitni hisobga olishi mumkin. Shu sababli “Z80 da yuqori manzil bitlari I/O vaqtida ishlamaydi” deb tushunish noto‘g‘ri.

### D7–D0 — Data Bus

**Turi:** ikki yo‘nalishli, musbat mantiq, uch holatli.

8 bitli shina xotira va I/O qurilmalari bilan ma’lumot almashadi:

- O‘qishda tashqi qurilma ma’lumotni chiqaradi, CPU qabul qiladi.
- Yozishda CPU ma’lumotni chiqaradi, tashqi qurilma qabul qiladi.

D0 — eng kichik, D7 — eng katta bit. Buyruq kodlari ham shu shina orqali o‘qiladi.

> [!IMPORTANT]
> Bir vaqtning o‘zida faqat bitta qurilma ma’lumotlar shinasini faol boshqarishi kerak. Masalan, ROM va I/O qurilmasi bir paytda turli qiymat chiqarsa, shina to‘qnashuvi yuz beradi.

## 3. Xotira va I/O boshqaruv signallari

### /MREQ — Memory Request

**Turi:** chiqish, faol LOW, uch holatli.

Manzil shinasida xotira murojaati uchun manzil mavjudligini bildiradi. O‘qish yoki yozishni `/RD` va `/WR` ajratadi.

`/MREQ` refresh siklida ham faollashadi. Shuning uchun uning o‘zi oddiy xotira o‘qilayotganini anglatmaydi.

### /IORQ — Input/Output Request

**Turi:** chiqish, faol LOW, uch holatli.

Oddiy I/O siklida manzil shinasining pastki qismida port manzili mavjudligini bildiradi:

- `/IORQ + /RD` — portdan o‘qish.
- `/IORQ + /WR` — portga yozish.

`/IORQ` `/M1` bilan birga faollashsa, bu **interrupt acknowledge**, ya’ni interruptni qabul qilish siklidir. Bunda tegishli interrupt qurilmasi javob baytini ma’lumotlar shinasiga chiqarishi mumkin. Baytning vazifasi interrupt rejimiga bog‘liq.

### /RD — Read

**Turi:** chiqish, faol LOW, uch holatli.

CPU xotira yoki I/O qurilmasidan ma’lumot o‘qimoqchi ekanini bildiradi. Manzil bo‘yicha tanlangan qurilma ushbu signal asosida D7–D0 ga ma’lumot chiqaradi.

### /WR — Write

**Turi:** chiqish, faol LOW, uch holatli.

CPU ma’lumotlar shinasiga yozish uchun ma’lumot chiqarganini bildiradi. Tanlangan xotira yoki I/O qurilmasi uni o‘z vaqt talablariga muvofiq qabul qiladi.

### /M1 — Machine Cycle One

**Turi:** chiqish, faol LOW.

Asosiy qo‘llanishlari:

- `/M1 + /MREQ` — buyruq kodini olish, ya’ni **opcode fetch** sikli.
- `/M1 + /IORQ` — interrupt acknowledge sikli.

CPU xotiradan buyruq tarkibidagi operandlarni ham o‘qiydi, lekin har bir o‘qish opcode fetch emas. Prefiksli buyruqlarda bir nechta M1 sikli bo‘lishi mumkin; barcha buyruq baytlari avtomatik ravishda M1 orqali o‘qilmaydi.

### Signallarni birga o‘qish

Quyidagi jadval siklning mazmunli faol qismidagi kombinatsiyalarni ko‘rsatadi; aniq vaqt diagrammasi o‘rnini bosmaydi.

| Amal | Faol signallar | Ma’lumot yo‘nalishi |
|---|---|---|
| Xotiradan oddiy o‘qish | /MREQ, /RD | Xotira → CPU |
| Xotiraga yozish | /MREQ, /WR | CPU → xotira |
| I/O dan o‘qish | /IORQ, /RD | Qurilma → CPU |
| I/O ga yozish | /IORQ, /WR | CPU → qurilma |
| Opcode fetchning o‘qish qismi | /M1, /MREQ, /RD | Xotira → CPU |
| Interrupt acknowledge | /M1, /IORQ | Interrupt rejimiga bog‘liq |
| DRAM refresh | /RFSH, /MREQ | Oddiy ma’lumot almashinuvi emas |

## 4. Interruptlar va HALT

### /INT — Interrupt Request

**Turi:** kirish, faol LOW, sath bo‘yicha seziladi.

Odatda I/O qurilmasi protsessordan e’tibor talab qilish uchun ishlatadi. CPU so‘rovni joriy buyruq tugagach, maskalanadigan interruptlarga ruxsat berilgan bo‘lsa qabul qiladi.

Ruxsatning asosiy ichki holati **IFF1** bilan bog‘liq:

- `DI` — maskalanadigan interruptlarni taqiqlaydi.
- `EI` — ularni yoqadi; INT qabul qilinishi EI dan keyingi bitta buyruq bajarilguncha kechiktiriladi.

`/INT` odatda wired-OR usulida birlashtiriladi va bunday ulanishda tashqi pull-up talab qilinadi.

### /NMI — Nonmaskable Interrupt

**Turi:** kirish, HIGH → LOW cheti bilan ishga tushadi.

NMI maskalanmaydigan interrupt:

- `/INT` dan yuqori ustuvorlikka ega.
- Joriy buyruq oxirida qabul qilinadi.
- IFF1 orqali taqiqlanmaydi; `DI` uni o‘chirmaydi.
- CPU boshqaruvni `0066h` manziliga beradi.

**Muhim farq:** `/INT` uchun LOW sathi muhim; `/NMI` uchun esa pasayuvchi chet muhim. NMI ni LOW da ushlab turishning o‘zi ketma-ket yangi NMI hodisalari hosil qilmaydi.

### /HALT — HALT State

**Turi:** chiqish, faol LOW.

CPU `HALT` buyrug‘ini bajarganini bildiradi. Bu pin CPU ni tashqaridan to‘xtatadigan kirish emas, uning holatini bildiruvchi chiqishdir.

HALT vaqtida:

- Keyingi dastur buyruqlari bajarilishi kutiladi.
- CPU ichki NOP sikllarini bajarib, xotira refreshini davom ettiradi.
- Takt ishlashda davom etadi.
- Qabul qilinadigan NMI yoki ruxsat berilgan INT CPU ni bu holatdan chiqaradi.
- RESET ham HALT holatini tugatadi, lekin dasturni qayta boshlaydi.

`DI; HALT` holatida oddiy INT yetarli emas; NMI yoki RESET kerak bo‘ladi.

Batafsil: [[Electronics/Processors/Z80 CPU HALT|Z80 CPU — HALT]].

## 5. Shinani boshqa qurilmaga topshirish

### /BUSREQ — Bus Request

**Turi:** kirish, faol LOW.

Ba’zi chizmalarda **/BUSRQ** deb qisqartiriladi; bu o‘sha signal.

DMA kontrolleri kabi tashqi qurilma shinalarni vaqtincha egallash uchun uni LOW qiladi. BUSREQ:

- NMI dan ham yuqori ustuvorlikka ega.
- Joriy **mashina sikli** oxirida tan olinadi.
- A15–A0, D7–D0 hamda `/MREQ`, `/IORQ`, `/RD`, `/WR` ni yuqori impedans holatiga o‘tkazadi.

Mashina sikli butun buyruq bilan bir xil emas: bitta buyruqda bir nechta mashina sikli bo‘lishi mumkin.

BUSREQ odatda wired-OR ulanishga mos ishlatiladi; bunday sxemada tashqi pull-up kerak.

### /BUSACK — Bus Acknowledge

**Turi:** chiqish, faol LOW.

CPU yuqoridagi shinalar va boshqaruv chiqishlarini Z holatiga o‘tkazib, ularni bo‘shatganini tashqi qurilmaga bildiradi.

Oddiy ketma-ketlik:

1. Tashqi qurilma `/BUSREQ = 0` qiladi.
2. CPU joriy mashina siklini tugatadi.
3. CPU tegishli chiqishlarni Z holatiga o‘tkazib, `/BUSACK = 0` qiladi.
4. Tashqi qurilma shinalarni boshqaradi.
5. Ish tugagach, tashqi qurilma shinalarni bo‘shatib, BUSREQ so‘rovini bekor qiladi.
6. CPU shinani qayta egallab, ishini davom ettiradi.

**Amaliy qoida:** BUSREQ berilgan zahoti shina bo‘shadi deb hisoblamang; BUSACK tasdig‘ini kutish kerak.

> [!WARNING]
> Uzoq DMA davrida CPU odatdagi DRAM refreshini bajara olmaydi. DRAM ishlatilsa, refresh uzilishining ruxsat etilgan muddati yoki tashqi refresh boshqaruvi hisobga olinadi.

## 6. Kutish, qayta boshlash va refresh

### /WAIT — Wait

**Turi:** kirish, faol LOW.

Manzillangan xotira yoki I/O qurilmasi ma’lumot almashishga hali tayyor emasligini bildiradi. CPU tegishli namunalash nuqtalarida WAIT ni tekshirib, siklga qo‘shimcha kutish taktlarini kiritadi.

**Misol:** sekin ROM o‘z ma’lumotini vaqtida tayyorlay olmasa, tashqi mantiq WAIT orqali CPU o‘qish siklini uzaytirishi mumkin.

WAIT CPU ning registrlari va dasturini qayta boshlamaydi; davom etayotgan almashinuvni uzaytiradi. Juda uzoq WAIT davri DRAM refreshiga xalaqit berishi mumkin.

### /RESET — Reset

**Turi:** kirish, faol LOW.

RESET CPU ni boshlang‘ich holatga keltiradi:

- Interrupt ruxsat flip-floplari tozalanadi.
- **PC = 0000h** bo‘ladi.
- **I = 00h** va **R = 00h** bo‘ladi.
- Interrupt rejimi **IM 0** ga o‘rnatiladi.
- Reset davomida manzil va ma’lumotlar shinalari yuqori impedans holatiga o‘tadi.
- Boshqaruv chiqishlari nofaol holatga o‘tadi.

Reset tugashi uchun signal kamida **uchta to‘liq takt sikli** davomida faol bo‘lishi kerak. Bu vaqt davomida takt ta’minlanishi lozim.

**RESET barcha umumiy registrlar va RAM ni nol qilmaydi.** Dastur kerakli registrlarni, stek ko‘rsatkichini va xotira holatini o‘zi tayyorlashi kerak. Resetdan keyingi dastur boshlanishi `0000h` manzilidan bo‘ladi.

### /RFSH — Refresh

**Turi:** chiqish, faol LOW.

`/RFSH` va `/MREQ` birga faol bo‘lganda, tizim manzil shinasining pastki yetti biti DRAM uchun refresh manzili sifatida ishlatilishi mumkin.

**Nega kerak?** DRAM ma’lumotni saqlash uchun davriy yangilashni talab qiladi. Z80 refresh uchun sikllar va manzil chiqaradi; uni haqiqiy DRAM boshqaruv signallariga moslashtirish tashqi sxemaning vazifasi.

Qo‘shimcha izoh: refresh manzilining yuqori bayti I registridan, pastki qismi R registridan keladi; R ning pastki yetti biti avtomatik yangilanadi. Har bir DRAM turining qator soni va vaqt talablari alohida hisobga olinadi.

**SRAM uchun refresh kerak emas.** SRAM ishlatilgan tizimda RFSH chiqishi ulanmasligi mumkin; biroq ROM/RAM o‘qishni faqat MREQ asosida emas, RD bilan ham to‘g‘ri boshqarish kerak.

## 7. Takt va quvvat

### CLK — Clock

**Turi:** kirish.

Bir fazali tashqi takt signali. CPU ichki operatsiyalarining vaqtini belgilaydi. Manbada u **MOS-level clock** deb ta’riflangan.

Takt chastotasi va signal sathlari ishlatilayotgan aniq NMOS yoki CMOS Z80 modelining datasheetiga mos bo‘lishi kerak. Bitta variantning elektr talablari barcha Z80 lar uchun avtomatik ravishda to‘g‘ri kelmaydi.

### +5V va GND

Foydalanuvchi yuborgan chizmada:

- **+5V / VCC** — quvvat kirishi.
- **GND** — umumiy nol nuqta.

Quvvat talablari aniq chip variantiga qarab tekshiriladi. Amaliy sxemada CPU quvvat pinlari yoniga bypass kondensator joylashtiriladi.

## 8. Ko‘p chalkashadigan tushunchalar

| Tushuncha | To‘g‘ri talqin |
|---|---|
| HALT | Dastur bajarilishi kutadi, lekin takt va refresh davom etadi. |
| WAIT | Joriy xotira yoki I/O almashinuvi uzayadi. |
| BUSREQ/BUSACK | CPU shinani boshqa boshqaruvchiga vaqtincha topshiradi. |
| RESET | CPU boshlang‘ich holatga o‘tib, 0000h dan boshlaydi. |
| M1 | Opcode fetch yoki IORQ bilan birga interrupt acknowledge belgisi. |
| RFSH | DRAM yangilash sikli belgisi. |
| Z holati | Chiqish shinani faol boshqarmaydi. |
| Faol LOW | 0 — faol, 1 — nofaol. |

### Wired-OR va pull-up haqida

Wired-OR deganda mos open-collector yoki open-drain chiqishlar bitta so‘rov chizig‘iga ulanadi: istalgan qurilma chiziqni LOW ga tortib, so‘rov bildiradi. Pull-up rezistor esa hech kim LOW ga tortmaganda chiziqni HIGH holatda ushlab turadi.

Oddiy push-pull chiqishlarni shu usulda bevosita birlashtirish mumkin emas. Ishlatilmayotgan boshqaruv kirishlari ham o‘z datasheetiga mos aniq nofaol sathda ushlab turiladi.

## 9. Pin raqamlari haqida

Bu qaydda **signal vazifalari** berildi. Yuborilgan chizmadagi raqamlar OCR sabab aralashib ketgan; ulardan taxminiy fizik pinout tuzilmadi.

Sxema yoki PCB uchun aniq korpusning — masalan, DIP-40 yoki boshqa variantning — datasheetdagi pin joylashuvi olinadi. Bir xil signal nomi barcha korpuslarda bir xil pin raqamini anglatmaydi.

## Manba va bog‘liq qayd

- Foydalanuvchi yuborgan **Zilog Z80 CPU User Manual, UM008011-0816**, “Architectural Overview / Pin Functions”, 5–7-betlar parchasi — asosiy tavsiflar manbasi.
- [Zilog Z80 CPU User Manual — asl hujjat havolasi](https://www.zilog.com/docs/z80/um0080.pdf).
- [[Electronics/Processors/Z80 CPU HALT|Z80 CPU — HALT]].
