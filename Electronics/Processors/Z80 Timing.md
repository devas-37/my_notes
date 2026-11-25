---
name: Timing
status: active
pinned: false
deleted: false
tags:
    - z80
    - timing
---

# Timing

Ushbu bo‘lim Z80 CPU ning asosiy machine cyclelari va ulardagi timingni tavsiflaydi.

## Mundarija

- [Asosiy CPU timing](#asosiy-cpu-timing)
- [Machine cycle va vaqt hisoblash](#machine-cycle-va-vaqt-hisoblash)
- [Instruction Fetch](#instruction-fetch)
- [Memory Read or Write](#memory-read-or-write)
- [Input or Output Cycles](#input-or-output-cycles)
- [Bus Request/Acknowledge Cycle](#bus-requestacknowledge-cycle)
- [Interrupt Request/Acknowledge Cycle](#interrupt-requestacknowledge-cycle)
- [Nonmaskable Interrupt Response](#nonmaskable-interrupt-response)
- [HALT Exit](#halt-exit)
- [Power-Down Acknowledge Cycle](#power-down-acknowledge-cycle)
- [Power-Down Release Cycle](#power-down-release-cycle)
- [Control signal’lar va amaliy tekshiruv](#control-signallar-va-amaliy-tekshiruv)

## Asosiy CPU timing

Z80 CPU instructionlarni aniq belgilangan asosiy operationlar ketma-ketligini bajarish orqali amalga oshiradi. Bu operationlar quyidagilarni o‘z ichiga oladi:

- Memory read yoki write.
- I/O device read yoki write.
- Interrupt acknowledge.

Barcha instructionlar asosiy operationlar ketma-ketligidan iborat. Oddiy memory va I/O operationlari odatda 3–6 clock period davom etadi; ayrim machine cycle’lar bundan uzunroq bo‘lishi mumkin yoki CPU ni tashqi devicelar tezligiga moslashtirish uchun uzaytirilishi mumkin. Clock periodlar time (T) cycle, operationlar esa machine (M) cycle deb ataladi.

Figure 4 odatiy instruction muayyan M va T cyclelar ketma-ketligidan tashkil topishini ko‘rsatadi. Undagi instruction uchta machine cycle — M1, M2 va M3 — dan iborat. Har qanday instructionning birinchi machine cycle i fetch cycle bo‘lib, odatda to‘rt T State davom etadi, ayrim instructionlarda esa ichki amallar sababli uzayadi; /WAIT signal bilan uzaytirilgan holatlar bundan mustasno. Fetch cycle (M1) keyingi bajariladigan instructionning opcode ini fetch qilish uchun ishlatiladi. Keyingi machine cyclelar CPU bilan memory yoki I/O devicelar orasida ma’lumot ko‘chiradi va odatda uch yoki to‘rt T State davom etadi; ichki amallar qo‘shimcha T State talab qilishi mumkin. Ular ham tashqi devicelarni CPU bilan sinxronlash uchun wait statelar yordamida uzaytirilishi mumkin. Quyidagi bo‘limlarda asosiy machine cyclelar ichidagi timing tavsiflanadi.

T2 va undan keyingi har bir keyingi /WAIT state (TW) davomida CPU /WAIT liniyasini clockning falling edge ida sample qiladi. Shu vaqtda /WAIT active bo‘lsa, keyingi cycleda yana bir /WAIT state kiritiladi. Bu usul read davomiyligini istalgan memory devicening access time iga moslashtirishga imkon beradi. Automatic /WAIT state haqida batafsil ma’lumot manbaning 10-sahifasidagi [Input or Output Cycles](#input-or-output-cycles) bo‘limida berilgan.

![CleanShot 2026-11-25 at 13.16.29.png](<../../assets/a19840aa-f6fc-47cc-b6d1-cad72f332228-CleanShot-2026-11-25-at-13-16-29.png>)

## Machine cycle va vaqt hisoblash

| Cycle yoki response | T States | 4 MHz | 6 MHz |
|---|---:|---:|---:|
| Oddiy opcode fetch | 4 | 1 µs | 666.7 ns |
| Memory Read | 3 | 750 ns | 500 ns |
| Memory Write | 3 | 750 ns | 500 ns |
| I/O Read | 4 | 1 µs | 666.7 ns |
| I/O Write | 4 | 1 µs | 666.7 ns |
| HALT takroriy M1 | 4 | 1 µs | 666.7 ns |
| IM 1 to‘liq response | 13 | 3.25 µs | 2.167 µs |
| IM 2 to‘liq response | 19 | 4.75 µs | 3.167 µs |
| NMI to‘liq response | 11 | 2.75 µs | 1.833 µs |

Qiymatlar tashqi WAIT state bo‘lmagan holat uchun. Interrupt response vaqti ISR instructionlarini yoki joriy instruction tugashini kutish vaqtini o‘z ichiga olmaydi.

$$
t = \frac{N_T}{f_{CLK}}
$$

6 MHz da bitta T State taxminan 166.7 ns. Har bir qo‘shimcha WAIT state shuncha vaqt qo‘shadi.

## Instruction Fetch

Figure 5 M1 (opcode fetch) cycle davomidagi timingni ko‘rsatadi. M1 cycle boshida Program Counter address busga joylashtiriladi. Yarim clock cycle o‘tgach, /MREQ signal active bo‘ladi. Shu vaqtga kelib memory address barqarorlashgan bo‘ladi; shuning uchun /MREQ ning falling edge idan dynamic memorylar uchun bevosita chip enable clock sifatida foydalanish mumkin. /RD liniyasi ham active bo‘lib, memorydan o‘qiladigan ma’lumot CPU data busiga chiqarilishi kerakligini bildiradi.

CPU memorydan kelgan data bus ma’lumotini T3 state clockining rising edge ida sample qiladi. Shu edge /RD va /MREQ signallarini o‘chirish uchun ham ishlatiladi. Natijada, CPU ma’lumotni /RD inactive bo‘lishidan oldin sample qiladi. Fetch cycle ning T3 va T4 clock statelari dynamic memorylarni refresh qilish uchun ishlatiladi. CPU shu vaqt ichida fetch qilingan instructionni decode qilib bajaradi; shuning uchun bir vaqtda boshqa operation bajarilmaydi.

T3 va T4 davomida address busning pastki yetti biti memory refresh addressni saqlaydi. /RFSH signal active bo‘lib, barcha dynamic memorylarda refresh read bajarilishi kerakligini bildiradi. Turli memory segmentlaridan ma’lumot data busga bir vaqtda chiqarilmasligi uchun refresh davrida /RD signal hosil qilinmaydi. Shu davrdagi /MREQ signaldan barcha memory elementlarida refresh read bajarish uchun foydalanish kerak. Refresh signaldan yakka holda foydalanib bo‘lmaydi, chunki refresh addressning barqarorligi faqat /MREQ davrida kafolatlanadi.

![CleanShot 2026-11-25 at 13.10.56.png](<../../assets/778d1515-7160-4d6b-87f2-5ccf55569212-CleanShot-2026-11-25-at-13-10-56.png>)

## Memory Read or Write

Figure 6 opcode fetchdan tashqari memory read yoki write cyclelarining timingini ko‘rsatadi. Memory /WAIT signal orqali wait state talab qilmasa, bu cyclelar odatda uch clock period davom etadi. /MREQ va /RD signallari fetch cycle dagi kabi ishlatiladi.

Memory write cycleda ham /MREQ address bus barqarorlashganda active bo‘ladi. Shu sababli undan dynamic memorylar uchun bevosita chip enable sifatida foydalanish mumkin. /WR liniyasi data busdagi ma’lumot barqaror bo‘lganda active bo‘ladi; shuning uchun undan deyarli istalgan semiconductor memory uchun bevosita R/W pulse sifatida foydalanish mumkin. Bundan tashqari, /WR signal address va data bus tarkibi o‘zgarishidan yarim T state oldin inactive bo‘ladi. Bu deyarli barcha semiconductor memory turlarining overlap talablarini qondiradi.

![CleanShot 2026-11-25 at 13.11.29.png](<../../assets/bdbd1c9f-984b-424e-9a2b-4799e7a17970-CleanShot-2026-11-25-at-13-11-29.png>)

## Input or Output Cycles

Figure 7 I/O read yoki I/O write operationni ko‘rsatadi. I/O operationlar davomida bitta wait state avtomatik kiritiladi. Sababi, /IORQ active bo‘lishi bilan CPU /WAIT liniyasini sample qilishi orasidagi vaqt qisqa. Qo‘shimcha state bo‘lmasa, I/O port o‘z addressini decode qilib, zarur bo‘lganda /WAIT liniyasini active qilish uchun yetarli vaqtga ega bo‘lmaydi. Bu wait state bo‘lmasa, CPU ning to‘liq tezligida ishlaydigan MOS I/O devicelarni loyihalash ham qiyinlashadi. Ushbu wait state davomida /WAIT request signal sample qilinadi.

Read I/O operationda /RD liniyasi memory read holatidagi kabi addresslangan portni data busga chiqarish uchun ishlatiladi. Write operationlarda /WR liniyasi I/O port uchun clock vazifasini bajaradi.

![CleanShot 2026-11-25 at 13.12.32.png](<../../assets/d7f29dd3-11b0-4182-b4f9-718d403c99f8-CleanShot-2026-11-25-at-13-12-32.png>)

> [!NOTE]
> Figure 7 dagi TW — avtomatik kiritiladigan /WAIT state.

## Bus Request/Acknowledge Cycle

Figure 8 Bus Request/Acknowledge cycle timingini ko‘rsatadi. CPU /BUSREQ signalni istalgan machine cycle ning oxirgi clock periodi rising edge ida sample qiladi. /BUSREQ active bo‘lsa, keyingi clock pulse ning rising edge ida CPU o‘z address, data va tristate control signallarini high-impedance holatga o‘tkazadi. Shu vaqtda istalgan tashqi device memory va I/O devicelar orasida ma’lumot ko‘chirish uchun buslarni boshqarishi mumkin. Bu operation odatda cycle stealing yordamidagi Direct Memory Access (DMA) deb ataladi.

CPU odatda joriy machine cycle tugagach bus boshqaruvini topshiradi. /WAIT orqali uzaytirilgan cycle javobni ham kechiktiradi. Tashqi controller bus boshqaruvini zarur bo‘lgancha clock cycle davomida saqlab turishi mumkin. Uzoq DMA cyclelar va dynamic memorylar ishlatilsa, tashqi controller refresh funksiyasini ham bajaradi. Bunday vaziyat DMA boshqaruvida katta data blocklar ko‘chirilganda yuz beradi. Bus boshqaruvi tashqi qurilmada bo‘lganida CPU interrupt xizmatini boshlamaydi. /NMI falling edge orqali aniqlanadi; /INT esa tegishli sampling nuqtasida LOW bo‘lishi kerak.

![CleanShot 2026-11-25 at 13.14.27.png](<../../assets/8508edc2-5923-45bc-8c66-32957bb0a0fd-CleanShot-2026-11-25-at-13-14-27.png>)

## Interrupt Request/Acknowledge Cycle

Figure 9 interrupt cycle timingini ko‘rsatadi. CPU /INT interrupt signalni har bir instruction oxiridagi yakuniy clockning rising edge ida sample qiladi. CPU ichidagi software orqali boshqariladigan interrupt enable flip-flop set qilinmagan bo‘lsa yoki /BUSREQ active bo‘lsa, signal qabul qilinmaydi.

Signal qabul qilinganda maxsus M1 cycle hosil qilinadi. Ushbu M1 davomida odatdagi /MREQ o‘rniga /IORQ signal active bo‘ladi. Bu interrupt yuborgan device data busga 8-bit vector joylashtirishi mumkinligini bildiradi. Cyclega avtomatik ravishda ikkita wait state qo‘shiladi. Bu statelar ripple priority interrupt schemeni oson amalga oshirish uchun kerak: ripple signallar barqarorlashishi va response vectorni qaysi I/O device uzatishini aniqlash uchun yetarli vaqt ajratiladi. CPU interrupt response vectordan qanday foydalanishi manbaning 17-sahifasidagi Interrupt Response bo‘limida batafsil tavsiflangan.

![CleanShot 2026-11-25 at 13.17.23.png](<../../assets/3c51be6e-4eaa-4867-b00f-c7b65c4a0f7b-CleanShot-2026-11-25-at-13-17-23.png>)

## Nonmaskable Interrupt Response

Figure 10 nonmaskable interrupt uchun request/acknowledge cycleni ko‘rsatadi. /NMI falling edge orqali aniqlanadi va odatda joriy instruction tugagach xizmat ko‘rsatiladi. U /INT dan yuqori priorityga ega va DI orqali o‘chirib bo‘lmaydi. Odatda undan elektr ta’minoti uzilishi yaqinlashayotgani kabi muhim signallarga darhol javob berish uchun foydalaniladi.

CPU ning nonmaskable interruptga javobi opcode fetch (M1) cycle’iga o‘xshaydi. Farqi shundaki, data bus tarkibi e’tiborga olinmaydi; processor Program Counterni tashqi stackka avtomatik saqlab, 0066h addressga jump qiladi. Ushbu interrupt ishlatilsa, nonmaskable interrupt service routine shu manzildan boshlanishi yoki shu manzilda ISR ga jump joylashtirilishi kerak.

![CleanShot 2026-11-25 at 13.17.38.png](<../../assets/ab309bfb-e4f0-49c1-a728-81f291725543-CleanShot-2026-11-25-at-13-17-38.png>)

## HALT Exit

Software HALT instruction bajarilganda CPU interrupt kelguncha NOP instructionlarini bajaradi. Bu nonmaskable interrupt yoki interrupt flip-flop yoqilgan holatdagi maskable interrupt bo‘lishi mumkin. Figure 11 da ko‘rsatilganidek, har bir takroriy M1 cycle yakunida interrupt qabul qilish shartlari tekshiriladi; /NMI falling edge orqali aniqlanadi.

Nonmaskable interrupt kelganda yoki maskable interrupt kelib, interrupt enable flip-flop set holatida bo‘lganda, keyingi rising clock edge ida HALT holatidan chiqiladi. Keyingi cycle qabul qilingan interrupt turiga mos interrupt acknowledge cycle bo‘ladi. Ikkalasi bir vaqtda kelsa, prioritysi yuqori bo‘lgani uchun nonmaskable interrupt acknowledge qilinadi.

HALT holatida NOP instructionlarini bajarishdan maqsad memory refresh signallarini active saqlashdir. Bu holatdagi har bir cycle odatdagi M1 (fetch) cycle bo‘lib, memorydan kelgan ma’lumot e’tiborga olinmasligi va NOP instruction CPU ichida majburan bajarilishi bilan farq qiladi. Shu vaqtda HALT acknowledge signal active bo‘lib, processor HALT holatida ekanini bildiradi.

![CleanShot 2026-11-25 at 13.18.23.png](<../../assets/845705e5-bf6f-4aff-b554-3fb2b5003dc2-CleanShot-2026-11-25-at-13-18-23.png>)

> [!NOTE]
> HALT opcode qayta bajarilmaydi: takroriy M1 cycle davomida o‘qilgan byte e’tiborga olinmaydi va ichki NOP bajariladi. /RESET ham HALT holatini tugatadi.

## Power-Down Acknowledge Cycle

Clock’ni to‘xtatishga ruxsat beruvchi static CMOS Z80 modelida clock input High yoki Low sathda to‘xtatilsa, CPU ishini to‘xtatadi va barcha register hamda control signallarini saqlaydi. Tegishli CMOS model datasheet’ida ko‘rsatilgan shartlarda ICC2 (standby supply current) faqat HALT instruction bajarilishidan keyingi machine cycle ning T4 state i davomida tizim clocki Low sathda to‘xtatilganda kafolatlanadi. HALT instruction yordamida amalga oshiriladigan power-down funksiyasining timing diagrammasi Figure 12 da ko‘rsatilgan.

![CleanShot 2026-11-25 at 13.19.00.png](<../../assets/15843a68-8bf7-4ade-bcad-7429921d7915-CleanShot-2026-11-25-at-13-19-00.png>)

## Power-Down Release Cycle

Power-down holatidan chiqish uchun Z80 CPU ga tizim clockini qayta uzatish kerak. Clock CLK inputga berilganda, CPU ishini power-down boshlangan nuqtadan davom ettiradi. Bu xususiyatni NMOS Z80 uchun umumlashtirish mumkin emas; aniq model datasheet’idagi clock talablari tekshirilishi kerak. Ushbu holatdan chiqish timing diagrammalari manbada Figures 13–15 sifatida ko‘rsatilgan.

Power-down holatiga kirish uchun HALT instruction bajarilgan bo‘lsa, Z80 CPU HALT holatiga ham kiradi. Tizim clocki qayta uzatilgach, CPU ga interrupt signal — /NMI yoki ruxsat etilgan /INT — yoxud /RESET signal berilishi kerak.

![CleanShot 2026-11-25 at 13.19.34.png](<../../assets/5e0d4bd6-21c6-4af5-815b-16b5e728de33-CleanShot-2026-11-25-at-13-19-34.png>)

![CleanShot 2026-11-25 at 13.20.00.png](<../../assets/1c78aef6-bc19-4358-822f-1f42a743015f-CleanShot-2026-11-25-at-13-20-00.png>)


## Control signal’lar va amaliy tekshiruv

`/` belgisi signal active LOW ekanini bildiradi.

| Cycle | Asosiy aktiv signal’lar |
|---|---|
| Opcode fetch | `/M1`, `/MREQ`, `/RD` |
| Refresh | `/MREQ`, `/RFSH` |
| Memory read | `/MREQ`, `/RD` |
| Memory write | `/MREQ`, `/WR` |
| I/O read | `/IORQ`, `/RD` |
| I/O write | `/IORQ`, `/WR` |
| INT acknowledge | `/M1`, `/IORQ` |
| Bus grant | `/BUSACK` |

Signal’lar butun cycle davomida bir vaqtda aktiv turishi shart emas. Aniq edge va setup/hold qiymatlari CPU modelining datasheet’idan olinadi.

BUSREQ orqali RAM yuklovchi tashqi controller avval `/BUSREQ` ni LOW qiladi, `/BUSACK` LOW bo‘lishini kutadi, shundan keyingina bus’ni boshqaradi. Ish tugagach controller o‘z bus driver’larini high-impedance holatiga o‘tkazib, `/BUSREQ` ni bo‘shatadi. CPU bus boshqaruvini qayta oladi. Uzoq DMA vaqtida DRAM refresh tashqi controller zimmasida bo‘ladi.

IM 0 da interrupt acknowledge orqali instruction opcode’i olinadi; IM 1 da tashqi vector ishlatilmaydi va CPU 0038h ga o‘tadi; IM 2 da qurilma bergan byte I register bilan birga vector table pointer’ini hosil qiladi. IM 2 uchun jadvaldan ikkita byte o‘qiladi. NMI response esa `/IORQ` bilan INT acknowledge qilmaydi va 0066h ga o‘tadi.

HALT vaqtida PC keyingi instruction manzilida qoladi, takroriy M1 cycle’lar R registerining quyi yetti bitini oshiradi. Refresh bosqichida address bus’da I va R asosidagi refresh address chiqadi. `/HALT` LOW bo‘ladi, clock davom etadi.
