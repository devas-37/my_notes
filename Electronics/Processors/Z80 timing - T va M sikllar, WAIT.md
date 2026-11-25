# Z80 timing — T-takt, M-sikl va WAIT

Z80 buyruqni bir yo‘la bajarmaydi: uni aniq ketma-ketlikdagi kichik amallarga ajratadi. **Buyruq bir yoki bir nechta mashina siklidan, har bir mashina sikli esa bir nechta takt davridan tashkil topadi.**

Ushbu qayd berilgan Zilog qo‘llanmasi parchasining tozalangan o‘zbekcha bayoni va uni tushunishga yordam beradigan qo‘shimcha misollardan iborat.

Z80 protsessori buyruqlarni quyidagi asosiy amallar orqali bajaradi:

- Xotiradan o‘qish yoki xotiraga yozish.
- I/O qurilmasidan o‘qish yoki unga yozish.
- Interrupt so‘rovini tasdiqlash — interrupt acknowledge.

Buyruqlar shu kabi asosiy amallar ketma-ketligidan tuziladi. Qo‘llanmaning umumiy bayonida bunday amallar uchun **3–6 takt davri** ko‘rsatilgan. Tashqi xotira yoki qurilma sekin ishlasa, sikl kutish holatlari bilan uzaytirilishi mumkin.

Takt davrlari **T-sikllar yoki T-holatlar**, asosiy amallar esa **M-sikllar — mashina sikllari** deb ataladi.

Berilgan matndagi 4-rasm misolida bitta buyruq M1, M2 va M3 mashina sikllaridan iborat. Bu barcha buyruqlar aynan uchta mashina siklidan iborat degani emas.

Buyruqning birinchi mashina sikli — **M1, opcode fetch**, ya’ni bajariladigan buyruq kodini xotiradan olish sikli. Matnda uning davomiyligi WAIT bilan uzaytirilmasa **4, 5 yoki 6 T** deb berilgan.

Keyingi mashina sikllari CPU bilan xotira yoki I/O qurilmalari orasida ma’lumot almashadi. Umumiy bayonda ular **3–5 T** bo‘lishi, WAIT yordamida esa uzaytirilishi aytiladi. Aniq buyruq uchun uning timing jadvaliga qarash kerak.

Xotiradan o‘qish/fetch siklida CPU **T2 va keyingi har bir TW holatida CLK signalining tushuvchi frontida WAIT kirishini tekshiradi**. WAIT faol bo‘lsa, keyingi taktga yana kutish holati qo‘shiladi. Shu yo‘l bilan o‘qish sikli xotiraning ma’lumotni tayyorlash tezligiga moslashtiriladi.

## 2. Uch xil vaqt birligi

| Tushuncha | Ma’nosi | Qanday o‘qiladi? |
|---|---|---|
| T-takt / T-state | CLK signalining bitta to‘liq davri | T1, T2 va T3 — ketma-ket taktlar |
| M-sikl / machine cycle | Bitta asosiy amal uchun ketadigan taktlar guruhi | M1 — kod olish, keyingi sikl — ma’lumot o‘qish kabi |
| Buyruq sikli / instruction cycle | Bitta buyruqni to‘liq bajarish vaqti | Shu buyruqdagi barcha M-sikllar yig‘indisi |

**T2 — ikki taktlik vaqt emas**, sikl ichidagi ikkinchi taktning nomi. Xuddi shunday, M3 uch takt degani emas: u buyruqdagi uchinchi mashina siklini bildiradi.

### Taktni real vaqtga aylantirish

$$
t_T = \frac{1}{f_{CLK}}
$$

Masalan, CLK = 4 MHz bo‘lsa:

$$
t_T = \frac{1}{4\,000\,000} = 250\text{ ns} = 0.25\text{ µs}
$$

Shunda 4 T = 1 µs, 10 T = 2.5 µs. Bu hisobga qo‘shimcha WAIT holatlari kiritilmagan.

## 3. Amaliy misol: bitta buyruq, uchta M-sikl

Quyidagi buyruqni olaylik:

```asm
LD (HL), 5Ah
```

Bu buyruq `5Ah` qiymatini HL ko‘rsatgan xotira manziliga yozadi. Uning WAITsiz vaqti **3 M-sikl, jami 10 T: 4 + 3 + 3**. [Zilog qo‘llanmasi, “LD (HL), n”, bosma 89-bet](https://www.grimware.org/lib/exe/fetch.php/documentations/devices/z80/datasheets/z80.cpu.user.manual.2005.zilog.pdf#page=109).

Misol uchun, HL = 8000h, buyruq esa 2000h manzilida joylashgan bo‘lsin:

| Sikl | Amal | Manzil | Davomiylik |
|---|---|---|---|
| M1 | Buyruq kodini olish | 2000h | 4 T |
| M2 | Buyruqdan keyingi 5Ah operandini o‘qish | 2001h | 3 T |
| M3 | 5Ah qiymatini xotiraga yozish | 8000h | 3 T |

```text
Bitta buyruq: LD (HL), 5Ah

|       M1       |     M2     |     M3     |
| T1 T2 T3 T4    | T1 T2 T3   | T1 T2 T3   |
| kodni olish    | 5Ah o‘qish | 5Ah yozish |

Jami: 4 + 3 + 3 = 10 T
```

2000h va 8000h manzillari tushuntirish uchun tanlangan. Diagramma vaqt guruhlarini ko‘rsatadi; elektr signallarining aniq frontlari tasviri emas.

## 4. WAIT siklni qanday uzaytiradi?

WAIT — faol LOW kirish:

- **WAIT = 0:** qurilma kutishni talab qiladi.
- **WAIT = 1:** kirish qo‘shimcha kutishni talab qilmaydi.

Oddiy xotira o‘qish sikli misolida:

```text
Kutishsiz:       T1 → T2 → T3
Bitta kutish:    T1 → T2 → TW → T3
Ikkita kutish:   T1 → T2 → TW → TW → T3
```

CPU T2 ning tushuvchi frontida WAIT = 0 ni ko‘rsa, T3 ga o‘tishdan oldin TW qo‘shadi. TW ning tushuvchi frontida ham WAIT = 0 bo‘lsa, yana TW qo‘shiladi. Tegishli tekshirish frontida WAIT = 1 bo‘lganda sikl davom etadi.

**TW ham bitta to‘liq takt davri.** Bu vaqt davomida CLK ishlashda davom etadi; WAIT takt generatorini o‘chirib qo‘ymaydi.

Masalan, yuqoridagi 10 T buyruqning M2 sikliga ikkita TW qo‘shilsa:

$$
N_T = 4 + (3 + 2) + 3 = 12
$$

4 MHz da:

$$
t = 12 \times 0.25\text{ µs} = 3\text{ µs}
$$

Demak, qo‘shimcha ikki TW bajarilish vaqtini 0.5 µs ga oshirdi. Bu misolda boshqa sikllarga WAIT qo‘shilmagan deb olinmoqda.

> [!IMPORTANT]
> WAIT istalgan paytda o‘zgarsa, CPU darhol javob beradi deb bo‘lmaydi. Uning qiymati belgilangan CLK frontida tekshiriladi. Sxemada signalning shu frontga nisbatan setup va hold talablari bajarilishi kerak.

## 5. Xotira va I/O kutishlarini farqlash

Oddiy xotira read/write sikli odatda **3 T**. I/O read/write sikliga esa Z80 **bitta avtomatik kutish holatini** qo‘shadi; qo‘shimcha tashqi kutishsiz u **4 T** bo‘ladi. Bu I/O qurilmasiga manzilni aniqlab, zarur bo‘lsa WAIT talabini berishga vaqt yaratadi. Tashqi WAIT uni yana uzaytirishi mumkin. [Zilog qo‘llanmasi, “Memory Read Or Write” va “Input or Output Cycles”, bosma 13–14-betlar](https://www.grimware.org/lib/exe/fetch.php/documentations/devices/z80/datasheets/z80.cpu.user.manual.2005.zilog.pdf#page=33).

Shuning uchun T2 haqidagi xotira qoidasini barcha shina sikllariga bir xil qo‘llash kerak emas: I/O uchun uning alohida timing diagrammasiga qaraladi.

## 6. M1 va refresh haqida qo‘shimcha

Oddiy 4 T fetch siklining T3–T4 qismida DRAM uchun refresh amalga oshiriladi. Bu fazada manzil shinasi avvalgi buyruq manzilini saqlab turishi shart emas; refresh manzili uzatiladi. [Zilog qo‘llanmasi, “Instruction Fetch”, bosma 12–13-betlar](https://www.grimware.org/lib/exe/fetch.php/documentations/devices/z80/datasheets/z80.cpu.user.manual.2005.zilog.pdf#page=32).

M1 atamasi bilan **/M1 fizik signalini** ham farqlash lozim. Prefiksli buyruqda bir nechta opcode-fetch sikli bo‘lishi mumkin; interrupt acknowledge vaqtida ham /M1 faollashadi. Demak, /M1 ning har bir faollashishi yangi assembler buyrug‘i boshlandi degani emas. [Zilog qo‘llanmasi, “Pin Functions” va “Interrupt Request/Acknowledge Cycle”](https://www.grimware.org/lib/exe/fetch.php/documentations/devices/z80/datasheets/z80.cpu.user.manual.2005.zilog.pdf).

## 7. Eslab qolish uchun

- **CLK chastotasi** — sekundiga nechta takt borligini bildiradi.
- **T soni** — amal yoki buyruqqa nechta takt ketishini bildiradi.
- **M soni** — buyruq nechta mashina sikliga bo‘linganini bildiradi.
- **WAIT** — tashqi qurilma tezligiga moslashish uchun joriy almashinuvni uzaytiradi.

Shu sababli “4 MHz CPU sekundiga 4 million buyruq bajaradi” degan xulosa noto‘g‘ri. Masalan, har biri 10 T talab qiladigan buyruqlar uchun, qo‘shimcha kutishlar va interruptlarsiz nazariy tezlik 4 000 000 / 10 = 400 000 buyruq/s bo‘ladi.

## Manba va bog‘liq qaydlar

Asosiy bayon — foydalanuvchi yuborgan **Zilog Z80 CPU User Manual, UM008011-0816, “Timing”** parchasi. Undagi 4-rasm va 10-bet havolalari o‘sha nashrga tegishli; rasmning o‘zi bu qaydga ko‘chirilmagan. Qo‘shimcha aniqliklar uchun yuqorida Zilog’ning **UM008005-0205** nashri nusxasiga havolalar berilgan; uning bet raqamlari farq qiladi.

- [[Electronics/Processors/Z80 pinlari va ularning vazifalari|Z80 pinlari va signallari]]
- [[Electronics/Processors/Z80 CPU HALT|HALT holati]]
- [[Electronics/Processors/Z80|Z80]]
