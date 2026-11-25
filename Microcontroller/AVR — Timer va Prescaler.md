---
name: AVR — Timer va Prescaler
tags:
  - avr
  - microcontroller
  - timer
  - prescaler
---

# AVR MCUlarda Timer va Prescaler

**Timer — takt impulslarini sanaydigan apparat hisoblagich. Prescaler — shu hisoblagichga kelayotgan taktni sekinlashtiradigan bo‘luvchi.** Ular yordamida vaqt oralig‘i hosil qilinadi, davriy ish bajariladi yoki PWM signali chiqariladi.

Oddiy o‘xshatish: timer — qadam sanagich; clock — muntazam kelayotgan qadamlar; prescaler esa “har 64 ta qadamdan faqat bittasini hisoblagichga uzat” deydi.

> [!NOTE]
> Tushuntirish klassik ATmega AVR timerlariga asoslangan. Hisoblashlarda timerning kirish takti **8 MHz** deb olinadi. Registrli kod **ATmega328P** uchun. Boshqa AVRlarda, xususan yangi oilalarda, timer nomlari va boshqaruvi boshqacha bo‘lishi mumkin.

## 1. Timer vaqtni qanday biladi?

Timer “millisekund”ni bevosita bilmaydi. U impuls sanaydi. Har bir impuls orasidagi vaqt ma’lum bo‘lsa, nechta impuls sanalganidan o‘tgan vaqtni topamiz.

Masalan, sekundiga 1 000 ta impuls kelsa:

- 1 ta impuls oralig‘i — 1 ms;
- 10 ta sanash qadami — 10 ms;
- 1 000 ta sanash qadami — 1 s.

**Tick** — timerning bitta sanash qadami. Ichki clockdan ishlaydigan timer CPU boshqa kodni bajarayotganda ham apparatda sanashni davom ettiradi.

```mermaid
flowchart LR
    A["Timerga kiruvchi clock"] --> B["Prescaler: N ga bo‘lish"]
    B --> C["Timer tick"]
    C --> D["TCNT hisoblagichi"]
    D --> E["Compare match yoki overflow"]
    E --> F["Flag"]
    F --> G["Ruxsat berilsa interrupt"]
```

Timer va counter odatda bitta periferiyaning ikki ishlatilishidir: ichki muntazam taktni sanaganda vaqt o‘lchaymiz; tegishli tashqi kirishdagi impulslarni sanaganda hodisalar sonini o‘lchaymiz. Bu imkoniyat qaysi timerda borligini datasheet belgilaydi. [Microchip: AVR Timer Overview](https://developerhelp.microchip.com/xwiki/bin/view/products/mcu-mpu/8-bit-avr/peripherals/timers-counters/8-bit-avr-avrtimerover/)

## 2. Prescaler nima uchun kerak?

8 MHz clock — sekundiga 8 000 000 takt. Prescalersiz hisoblagich juda tez yuradi. Uzoqroq vaqtni sanash uchun har bir qadamni uzaytiramiz.

$$
f_{tick}=\frac{f_{clk}}{N}
$$

$$
T_{tick}=\frac{N}{f_{clk}}
$$

Bu yerda:

- $f_{clk}$ — timer prescaleriga keladigan haqiqiy takt, Hz;
- $N$ — prescaler bo‘luvchisi;
- $f_{tick}$ — sekundiga sanash qadamlari;
- $T_{tick}$ — bitta qadam davomiyligi, sekund.

**Misol: 8 MHz va prescaler 64**

$$
f_{tick}=\frac{8\,000\,000}{64}=125\,000\ \text{Hz}
$$

$$
T_{tick}=\frac{64}{8\,000\,000}=8\ \mu s
$$

Demak, timer har **8 mikrosekundda** bir qadam yuradi. 125 qadam — 1 ms.

| Prescaler $N$ | 8 MHz dan keyingi tick chastotasi | Bitta tick |
| --- | --- | --- |
| 1 | 8 MHz | 0,125 µs |
| 8 | 1 MHz | 1 µs |
| 64 | 125 kHz | 8 µs |
| 256 | 31,25 kHz | 32 µs |
| 1024 | 7 812,5 Hz | 128 µs |

Katta prescaler uzoqroq vaqtni qamrab oladi, ammo vaqtni mayda qadamlarga ajratish imkonini kamaytiradi. Masalan, 128 µs qadam bilan 10 µs farqni ajratib bo‘lmaydi. Bu **vaqt rezolyutsiyasi** masalasidir; clockning haqiqiy aniqligi esa alohida masala.

> [!IMPORTANT]
> Timer prescaleri odatda faqat tegishli timer taktiga ta’sir qiladi. Uni CPU/system clock prescaleri bilan adashtirmang. Chipdagi “8 MHz” yozuvi yoki koddagi `F_CPU` makrosi haqiqiy clockni o‘z-o‘zidan sozlamaydi.

## 3. 8-bit va 16-bit timer farqi

Hisoblagich biti uning nechta holatni saqlay olishini belgilaydi:

| Hisoblagich | Qiymatlar | Holatlar soni |
| --- | --- | --- |
| 8-bit | 0…255 | $2^8=256$ |
| 16-bit | 0…65535 | $2^{16}=65536$ |

Noldan boshlanadigan 8-bit Normal sanash:

```text
0 → 1 → 2 → ... → 254 → 255 → 0 → 1 → ...
                                  ↑
                               overflow
```

**Overflow** — maksimal qiymatdan yana nolga o‘tish. 255 eng katta qiymat, lekin to‘liq aylanish **256 tick** oladi: nol ham sanash holati.

Normal rejimda, noldan boshlab:

$$
T_{overflow}=2^b\cdot\frac{N}{f_{clk}}
$$

8 MHz va $N=64$ bo‘lsa:

- 8-bit: $256\times8\ \mu s=2{,}048\ \text{ms}$;
- 16-bit: $65536\times8\ \mu s=524{,}288\ \text{ms}$.

Bir xil prescalerda 16-bit timer uzoqroq oraliqni sig‘diradi; bitta tickning davomiyligi esa o‘zgarmaydi.

## 4. Asosiy rejimlar

| Rejim | Timer nima qiladi? | Qo‘llanish |
| --- | --- | --- |
| Normal | Maksimumgacha sanab, nolga qaytadi | Overflow orqali vaqt hisoblash |
| CTC | Belgilangan TOP qiymatiga yetib, nolga qaytadi | Davriy interval |
| Fast PWM | Takroriy sanash va apparat chiqishini boshqaradi | LED yorqinligi, motor boshqaruvi |
| Phase Correct PWM | Yuqoriga va pastga sanaydi | Simmetrik PWM |

Boshlash uchun **CTC** qulay: qancha sanash kerakligini berasiz, timer davriy ravishda o‘zi qaytadan boshlaydi. Rejim va TOP manbai WGM bitlari bilan tanlanadi. [Microchip: timer rejimlari](https://developerhelp.microchip.com/xwiki/bin/view/products/mcu-mpu/8-bit-avr/peripherals/timers-counters/example-project/)

### CTC va compare match

Klassik Timer1 CTC mode 4 da `OCR1A` — TOP, `TCNT1` — joriy hisoblagich.

```text
OCR1A = 124

TCNT1:
0 → 1 → 2 → ... → 123 → 124 → 0 → ...
                         compare
```

Bir takrorlanish **125 tick** oladi. Shuning uchun:

$$
T_{match}=(OCR1A+1)\cdot\frac{N}{f_{clk}}
$$

Kerakli intervaldan registr qiymatini topish:

$$
OCR1A=\frac{f_{clk}\cdot T_{match}}{N}-1
$$

**Nega −1?** 125 ta holat kerak bo‘lsa, ular 0…124 bo‘ladi.

CTC da TOPga yetish oddiy overflow bilan bir xil hodisa emas: davriy interrupt uchun **compare match** manbasini tanlaymiz.

## 5. Kerakli vaqtni hisoblash

### 1 ms interval: 8 MHz, prescaler 64

$$
K=\frac{8\,000\,000\times0{,}001}{64}=125
$$

$K$ — kerakli ticklar soni. Shuning uchun $OCR=125-1=124$.

124 ham 8-bit, ham 16-bit registrga sig‘adi.

### 10 ms interval: 8 MHz, prescaler 64

$$
K=\frac{8\,000\,000\times0{,}010}{64}=1250
$$

$OCR=1249$. Bu 8-bitga sig‘maydi; 16-bit timerga sig‘adi.

### 1 sekund interval: 8 MHz, prescaler 256

$$
K=\frac{8\,000\,000\times1}{256}=31250
$$

$OCR=31249$. Bu ham 16-bit timerga sig‘adi.

### Prescalerni tanlash tartibi

1. Kerakli intervalni sekundda yozing.
2. Timer qo‘llaydigan prescalerdan birini tanlang.
3. $K=f_{clk}T/N$ ni hisoblang.
4. 8-bit uchun $1\le K\le256$, 16-bit uchun $1\le K\le65536$ bo‘lishini tekshiring.
5. $OCR=K-1$ ni yozing.

Agar $K$ butun chiqmasa, eng yaqin mos butun qiymat tanlanadi va haqiqiy interval qayta hisoblanadi:

$$
T_{real}=(OCR+1)\frac{N}{f_{clk}}
$$

Masalan, $N=1024$ bilan 1 ms uchun $K=7{,}8125$. $K=8$ tanlansa, $OCR=7$ va haqiqiy interval **1,024 ms** bo‘ladi. $N=64$ bilan esa yuqoridagi 1 ms misoli butun chiqadi.

## 6. Interrupt timerning o‘zi emas

**Timer sanaydi; interrupt esa hodisaga CPU javob berishini ta’minlaydi.**

Hodisa flagni o‘rnatadi. CPU ISRga kirishi uchun tegishli interrupt maskasi ham, global interrupt ruxsati ham yoqilgan bo‘lishi kerak. Interrupt yoqilmasa ham hisoblagich ishlashi mumkin.

ISR — interrupt kelganda bajariladigan funksiya. Uni qisqa tuting: uzoq kutish yoki ko‘p ishni ISRga joylamang. Apparat hodisasi davriy bo‘lsa ham, CPU bandligi sabab ISRga kirish biroz kechikishi mumkin. Juda aniq chiqish signali kerak bo‘lsa, timerning apparat OC chiqishidan foydalanish ma’qul.

## 7. Registrlarni tushunish

Klassik ATmega328P Timer1 misolida:

| Registr yoki bitlar | Vazifasi |
| --- | --- |
| `TCNT1` | Hozirgi sanash qiymati |
| `OCR1A` | Compare A qiymati; tanlangan CTC rejimida TOP |
| `TCCR1A`, `TCCR1B` | Rejim, clock va chiqish boshqaruvi |
| `WGM13:0` | Sanash rejimi |
| `CS12:0` | Clock manbasi/prescaler |
| `TIMSK1.OCIE1A` | Compare A interruptiga ruxsat |
| `TIFR1.OCF1A` | Compare A hodisasi flagi |

ATmega328P Timer1 uchun `CS12 CS11 CS10`:

| Bitlar | Clock |
| --- | --- |
| 000 | To‘xtagan |
| 001 | Ichki clock / 1 |
| 010 | Ichki clock / 8 |
| 011 | Ichki clock / 64 |
| 100 | Ichki clock / 256 |
| 101 | Ichki clock / 1024 |
| 110 | T1 pinidagi tushuvchi front |
| 111 | T1 pinidagi ko‘tariluvchi front |

Bu jadval barcha timerlarga ko‘chirilmaydi: masalan, ATmega328P Timer2 da 32 va 128 bo‘luvchilari ham bor, bit kodlari farq qiladi. [ATmega328P oilasi datasheet, Timer/Counter bo‘limlari](https://ww1.microchip.com/downloads/aemDocuments/documents/MCU08/ProductDocuments/DataSheets/ATmega48A-PA-88A-PA-168A-PA-328-P-DS-DS40002061B.pdf)

## 8. C kodi: har 10 ms interrupt

**Shart:** ATmega328P haqiqatan 8 MHz da ishlaydi. AVR-GCC uchun mustaqil misol; Timer1 to‘liq shu kodga ajratilgan. PB5 ga ulangan LED holati har 500 ms da almashadi.

```c
#define F_CPU 8000000UL

#include <avr/io.h>
#include <avr/interrupt.h>
#include <stdint.h>

ISR(TIMER1_COMPA_vect)
{
    static uint8_t ticks = 0;

    if (++ticks == 50) {     // 50 * 10 ms = 500 ms
        ticks = 0;
        PORTB ^= (1 << PB5);
    }
}

int main(void)
{
    cli();

    PORTB &= ~(1 << PB5);
    DDRB |= (1 << DDB5);     // PB5 chiqish

    TCCR1A = 0;
    TCCR1B = 0;             // Timer hozircha to'xtagan
    TIMSK1 = 0;
    TCNT1 = 0;

    OCR1A = 1249;           // 8 MHz / 64 * 0.010 s - 1

    TIFR1 = (1 << OCF1A);   // Eski flagni 1 yozib tozalash
    TIMSK1 = (1 << OCIE1A);

    // WGM13:0 = 0100: CTC, TOP = OCR1A
    // CS12:0 = 011: prescaler 64, timer ishga tushadi
    TCCR1B = (1 << WGM12) | (1 << CS11) | (1 << CS10);

    sei();

    while (1) {
        // Asosiy dastur boshqa ishlarni bajarishi mumkin.
    }
}
```

Hisob: bitta tick 8 µs, 1250 tick 10 ms. ISRdagi 50 ta hodisa 500 ms qiladi. LED 500 ms yonib, 500 ms o‘chadi: **to‘liq davri 1 s, chastotasi 1 Hz**.

`F_CPU` bu yerda clockni sozlamaydi. Haqiqiy clock 1 MHz bo‘lsa, shu registrlar bilan 10 ms o‘rniga 80 ms hosil bo‘ladi.

## 9. PWM bilan bog‘lanishi

PWMda signalning davri takrorlanadi, uning yoqilgan ulushi esa **duty cycle** deyiladi:

$$
D=\frac{T_{on}}{T_{period}}\times100\%
$$

Masalan, har 1 ms davrning 0,25 ms qismi HIGH bo‘lsa, duty cycle 25%.

Fast PWM uchun odatiy davr formulasi:

$$
f_{PWM}=\frac{f_{clk}}{N(TOP+1)}
$$

8 MHz, $N=64$, $TOP=255$ bo‘lsa, $f_{PWM}=488{,}28125$ Hz. Prescaler va TOP davrni, compare qiymati esa tanlangan PWM rejimida yoqilgan ulushni boshqaradi.

CTC da pin har compare hodisasida bir marta toggle qilinsa, to‘liq chiqish davri uchun **ikki** hodisa kerak: chiqish chastotasi compare hodisalari chastotasining yarmi. PWM va CTC toggle formulalarini aralashtirmang. [Microchip datasheet: CTC va Fast PWM](https://ww1.microchip.com/downloads/aemDocuments/documents/MCU08/ProductDocuments/DataSheets/ATmega48A-PA-88A-PA-168A-PA-328-P-DS-DS40002061B.pdf)

## 10. Ko‘p uchraydigan chalkashliklar

- **8-bit MCU faqat 8-bit timerga ega deb o‘ylash.** 8-bit AVR ichida 16-bit timer ham bo‘lishi mumkin.
- **Mikrosekund va millisekundni aralashtirish.** 1 ms = 1 000 µs; formulada vaqtni sekundga aylantiring.
- **OCR hisobida −1 ni unutish.** 0…124 oralig‘i 125 holat.
- **Prescaler CPUni ham sekinlashtiradi deb o‘ylash.** Timer va system clock bo‘luvchilari boshqa-boshqa sozlamalar.
- **Interruptni timer ishlashining sharti deb bilish.** Interrupt — CPUga xabar berish yo‘li.
- **Clock aniqligini prescaler tuzatadi deb o‘ylash.** Clock 1% xato bo‘lsa, undan olingan vaqt ham shunga bog‘liq xato qiladi.
- **Arduino kutubxonasi ishlatayotgan timerni qayta sozlash.** Bu kutubxona funksiyalariga ta’sir qilishi mumkin; masalan, Uno muhitida Timer0 vaqt funksiyalari uchun ishlatiladi.
- **Boshqa modelga kodni aynan ko‘chirish.** Registrlar, vektorlar, pinlar va prescaler jadvalini model datasheetidan tekshiring.

## Esda saqlash uchun

**Clock** — takt qanchalik tez keladi?  
**Prescaler** — har nechta taktdan bitta tick olinadi?  
**Timer biti** — hisoblagich qancha holatni sig‘diradi?  
**TOP/OCR** — qayergacha sanaladi?  
**Interrupt** — hodisa kelganda CPU nima bajaradi?

Asosiy bog‘lanish: **vaqt = sanash qadamlari soni × bitta tick vaqti**.

Bog‘liq qurilma: [[Microcontroller/ATmega325V-8AU|ATmega325V-8AU]]. Bu notedagi ATmega328P registrli misolini o‘sha chip uchun moslashtirmasdan ishlatmang.
