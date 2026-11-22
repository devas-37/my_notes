---
name: MOSFET — boshlovchilar uchun va MCU bilan boshqarish
tags:
  - elektronika
  - mosfet
  - tranzistor
  - mikrokontroller
  - boshlovchilar
---

# MOSFET va MCU: kichik signal bilan yuklamani boshqarish

**MOSFET — elektr toki uchun kuchlanish bilan boshqariladigan kalit.** Mikrokontroller (MCU) uning boshqaruv oyoqchasiga signal beradi; yuklama tokini esa alohida quvvat manbai yetkazadi.

Masalan, 3.3 V GPIO bilan 12 V LED lentani boshqarish mumkin. **12 V GPIOga kirmaydi:** u yuklama zanjirida qoladi. Buning uchun mos tranzistor, to‘g‘ri ulanish va umumiy GND kerak.

Oldingi mavzu: [[Electronics/Basic/Bipolyar tranzistorlar|Bipolyar tranzistorlar — BJT]].

## 1. MOSFETning uchta oyoqchasi

| Belgi | Nomi | Sodda ma’nosi |
|---|---|---|
| G | Gate — zatvor | Boshqaruv kirishi |
| D | Drain — stok | N-kanalli pastki kalitda yuklamadan tok keladigan tomon |
| S | Source — istok | Shu sxemada GNDga ulanadigan tomon |

**G, D, S — vazifalar; korpusdagi chapdan o‘ngga tartib emas.** Oyoqlar joylashuvini aynan sizdagi detal datasheetidan oling.

Gate — izolyatsiyalangan elektrod. Uni kichik kondensatorga o‘xshatish qulay:

- Yoqayotganda gate zaryadlanadi.
- O‘chirayotganda gate zaryadi chiqariladi.
- Holat saqlanayotganda gate orqali juda kichik sizish toki oqadi.
- Tez-tez yoqib-o‘chirishda gate zaryadlash toki muhim bo‘lib qoladi.

Demak, **“MOSFETga umuman tok kerak emas” deyish noto‘g‘ri**. Doimiy baza toki kerak emas, ammo o‘tish paytida tok kerak.

## 2. Asosiy tushuncha: VGS

MOSFET gate kuchlanishini **sourcega nisbatan** sezadi:

$$
V_{GS} = V_G - V_S
$$

| Gate kuchlanishi | Source kuchlanishi | VGS |
|---|---|---|
| 3.3 V | 0 V | 3.3 V |
| 3.3 V | 3 V | 0.3 V |
| 0 V | 0 V | 0 V |

Shuning uchun “gatega 3.3 V berdim” degan ma’lumotning o‘zi yetarli emas. Source qayerga ulanganini ham bilish kerak.

Bu noteda asosan **enhancement-mode N-kanalli MOSFET**, ya’ni VGS = 0 da odatda yopiq bo‘ladigan tur ko‘riladi.

## 3. N-kanal va P-kanal

| Tur | Sodda yoqish sharti | Oddiy ishlatilishi |
|---|---|---|
| N-kanal | Gate sourcedan yetarlicha musbat | Yuklamaning GND tomonini uzish — low-side |
| P-kanal | Gate sourcedan yetarlicha manfiy | Yuklamaning musbat tomonini uzish — high-side |

Boshlash uchun **N-kanalli low-side kalit** tushunarliroq: source GNDda, boshqaruv esa GPIOdan keladi.

## 4. Eng ko‘p adashiladigan joy: VGS(th)

Datasheetdagi **VGS(th)** — MOSFET kichik tok o‘tkaza boshlaydigan chegara. Bu katta yuklamani kam yo‘qotish bilan boshqarish kuchlanishi emas.

**MCU uchun asosiy savol: “Mening gate kuchlanishimda RDS(on) qancha?”**

RDS(on) — ochiq MOSFETning drain–source orasidagi qarshiligi. U kichik bo‘lsa, kuchlanish tushishi va qizish kamayadi.

- 3.3 V MCU uchun RDS(on) qiymati 2.5 V yoki undan past mos gate kuchlanishida kafolatlangan detal qulay.
- 5 V MCU uchun 4.5 Vdagi kafolatlangan qiymatga qarash mumkin.
- Faqat 10 Vda ko‘rsatilgan RDS(on) qiymati 3.3 V bilan yaxshi ishlashni kafolatlamaydi.
- GPIOning yuklangan holatdagi minimal HIGH kuchlanishini ham hisobga oling.

“Logic-level” yozuvi foydali, lekin jadvaldagi **aniq VGS sharti** hal qiluvchi mezon. Gate kuchlanishi mutlaq maksimal chegaradan ham oshmasligi kerak. [Toshiba: gate kuchlanishini tanlash](https://toshiba.semicon-storage.com/us/semiconductor/knowledge/faq/mosfet/how-much-gate-source-voltage-should-be-applied-to-drive-the-mosf.html).

**Haqiqiy misol:** AO3400A datasheetida RDS(on) maksimumi VGS = 2.5 Vda 48 mΩ, 4.5 Vda 32 mΩ deb berilgan. Bu ko‘rsatilgan o‘lchash sharoitlari uchun; qizigan holatdagi qarshilikni alohida baholash kerak. Korpusdagi katta amper raqami har qanday platada shuncha tok mumkin degani emas. [AOS AO3400A datasheet, 1–2-bet](https://www.aosmd.com/sites/default/files/res/datasheets/AO3400A.pdf).

## 5. BJT va MOSFET: MCU uchun farqi

| Savol | NPN BJT | N-kanalli MOSFET |
|---|---|---|
| Boshqaruv | Baza–emitter kuchlanishi va baza toki | Gate–source kuchlanishi; o‘tishda gate zaryadi |
| GPIOdan uzluksiz tok | Yoqilganda baza toki kerak | Statik gate toki juda kichik; pull-down ham tok oladi |
| Kirishdagi ketma-ket rezistor | Baza tokini cheklaydi | Gate tok impulsini va tebranishni kamaytiradi |
| Reset uchun rezistor | Baza–emitter pull-down | Gate–source pull-down |
| Ochiq kalitdagi yo‘qotish | Taxminan IC × VCE(sat) | Taxminan ID² × RDS(on) |
| Qulay vazifa | Kichik yuklama, sodda signal interfeysi | Mos tanlanganda kattaroq tok, LED lenta, quvvat PWM |
| Ko‘p uchraydigan xato | Faol rejimdagi β bilan to‘yinishni kafolatlash | VGS(th)ni to‘liq ochilish deb qabul qilish |

> [!NOTE]
> Terminlar bir xil ma’noni bermaydi: **BJT kalit sifatida yoqilganda to‘yinishga olib boriladi. MOSFET kam qarshilikli kalit sifatida odatda ohmik rejimda ishlaydi.** MOSFETning “saturation” rejimi BJTdagi to‘yinish bilan bir xil emas.

## 6. MCU → NPN BJT: kichik yuklamani boshqarish

Quyidagi raqamlar — o‘quv misoli. Yuklama 5 Vda taxminan 20 mA talab qilsin.

```text
+5 V ───── [yuklama] ───── C
                          │
                        NPN
                          │
MCU GPIO ─── RB ───┬──── B │
                  │       E ─── GND
                 RBE
                  │
GND ──────────────┘

MCU GND va 5 V manbaning GNDsi umumiy.
RBE: baza bilan emitter orasida.
```

**RB bazaga ketadigan tokni cheklaydi. Uni tashlab ketmang.**

O‘quv hisobida majburiy tok nisbatini 10 deb olaylik:

$$
I_B \approx \frac{I_C}{10}
= \frac{20\,\text{mA}}{10}
= 2\,\text{mA}
$$

VBE ≈ 0.8 V deb olsak, 3.3 V GPIO uchun:

$$
R_B \approx \frac{3.3-0.8}{0.002}
= 1250\,\Omega
$$

**1.2 kΩ — boshlang‘ich nominal.** RBE uchun 47 kΩ kabi pull-down bazani resetda emitterga tortadi. Uning toki ham GPIO yukiga qo‘shiladi.

Bu hisob to‘yinishning universal kafolati emas. Aniq BJT uchun VCE(sat), uning IC/IB sharti, VBE va haroratni; MCU uchun esa VOH hamda ruxsat etilgan chiqish tokini tekshiring.

Nega katta tokda bu usul noqulay? Xuddi shu nisbat bilan 500 mA yuklamaga 50 mA baza toki kerak bo‘ladi. Bunday tokni oddiy GPIOdan olishga tayanmang: mos MOSFET yoki drayver tanlash qulayroq.

## 7. MCU → N-MOSFET: 12 V yuklamani boshqarish

```text
+12 V ───── [yuklama] ───── D
                           │
                        N-MOSFET
                           │
MCU GPIO ─── RG ───┬──── G  │
                  │        S ─── GND
                 RPD
                  │
GND ──────────────┘

MCU GND va 12 V manbaning minus chiqishi umumiy.
RPD: gate bilan source orasida.
12 V GPIOga ulanmaydi.
```

Ulanish tartibi:

1. Source → umumiy GND.
2. Drain → yuklamaning minus tomoni.
3. Yuklamaning plus tomoni → o‘z quvvat manbai.
4. GPIO → RG → gate.
5. Gate → RPD → source.
6. MCU GND → yuklama manbai GND.

**RG — ketma-ket gate rezistori.** Kichik gate zaryadi va sekin yoqish/o‘chirish uchun 1 kΩni boshlang‘ich misol sifatida olish mumkin. 3.3 Vda ideal boshlang‘ich tok chegarasi taxminan 3.3 mA bo‘ladi; GPIOning o‘z qarshiligi ham bor. Bu qiymat barcha PWM holatlari uchun mos emas.

**RPD — pull-down**, masalan 47 kΩ: MCU resetda yoki Hi-Z bo‘lganda gate suzib qolmasligi uchun. Uni MOSFETga yaqin qo‘yish foydali. GPIO HIGH holatida bu rezistor orqali ham kichik tok oqadi.

**Yuklama quvvatini GPIO bermaydi.** Masalan, 12 V / 500 mA yuklama o‘z manbaidan taxminan 6 W oladi; GPIO boshqaruvni beradi.

## 8. Qizishni oddiy hisoblash

MOSFET ochiq holatda:

$$
V_{DS} \approx I_D R_{DS(on)}, \qquad
P_{MOS} \approx I_D^2 R_{DS(on)}
$$

Faraz qilamiz: ID = 0.5 A, RDS(on) = 0.05 Ω.

$$
V_{DS} \approx 0.025\,\text{V}, \qquad
P_{MOS} \approx 0.0125\,\text{W}
$$

Xuddi shu tokda BJT uchun **VCE(sat) = 0.2 V deb faraz qilsak**:

$$
P_{BJT} \approx 0.5 \times 0.2 = 0.1\,\text{W}
$$

Bu faqat o‘tkazish yo‘qotishlarini taqqoslaydi. Real harorat korpus, plata mis maydoni, muhit va kommutatsiya tezligiga ham bog‘liq. 0.2 V barcha BJT va toklar uchun kafolatlangan qiymat emas.

## 9. Rele yoki motor: himoya diodi

Rele g‘altagi, solenoid va oddiy cho‘tkali DC motor — induktiv yuklamalar. Kalit o‘chganda ularning toki birdan yo‘qolmaydi; kuchlanish sakrashi tranzistorga zarar yetkazishi mumkin.

Oddiy bir yo‘nalishli low-side boshqaruvda diod yuklamaga **parallel** ulanadi:

```text
              +V
               │
       ┌───────┴────────┐
       │                │
   [g‘altak]        K — katod
       │            [diod]
       │            A — anod
       └───────┬────────┘
               │
          D yoki C
          tranzistor
          S yoki E
               │
              GND
```

- **Katod, odatda chiziqli tomon → +V.**
- **Anod → drain yoki kollektor.**
- Normal yoqilgan holatda diod teskari ulangan bo‘ladi.
- O‘chirishda g‘altak toki yuklama–diod halqasida davom etadi.

Diodning teskari kuchlanishi, toki va PWMda tezligini yuklamaga moslang. Oddiy flyback diod rele qo‘yib yuborishini sekinlashtirishi mumkin. [TI: Basics of Power Switches](https://www.ti.com/lit/an/slva927a/slva927a.pdf).

**N-MOSFETning ichki body diodi bu ulanishda tashqi flyback diod o‘rnini bosmaydi.** U source → drain yo‘nalishida bo‘lib, draindagi musbat induktiv sakrashni +Vga qaytarmaydi.

Bu sxema yo‘nalishi almashadigan H-bridge uchun tayyor yechim emas. Elektronikali fan, nasos yoki motor modulida ishlab chiqaruvchining ulash talablariga qarang.

## 10. PWM: faqat yoqish/o‘chirishdan keyingi bosqich

PWM — chiqishni tez yoqib-o‘chirish:

- 0% duty — doim o‘chiq.
- 50% duty — vaqtning yarmi yoqilgan.
- 100% duty — doim yoqilgan.

MCUning GPIO kuchlanishi 50% dutyda “yarim HIGH” bo‘lib qolmaydi: signal LOW va HIGH orasida almashadi.

MOSFET sekin ochilib-yopilsa, o‘tishda unda bir vaqtda katta tok va kuchlanish bo‘ladi — **kommutatsiya yo‘qotishi** ortadi. Shu sabab katta RG har doim yaxshi emas.

Gate zaryadi va chastota uchun boshlang‘ich baho:

$$
I_{gate,avg} \approx Q_g f
$$

Masalan, Qg = 10 nC va f = 20 kHz bo‘lsa, gate zaryadlash uchun o‘rtacha tok ≈ 0.2 mA. Ammo bu **cho‘qqi toki ham 0.2 mA** degani emas: tez o‘tish uchun qisqa vaqt ichida ancha katta tok kerak bo‘lishi mumkin.

Katta Qg, yuqori chastota yoki sezilarli quvvatda **gate driver** kerak bo‘lishi mumkin. Drayver GPIO signalini qabul qilib, gate zaryadini tez kiritadi va chiqaradi. [Analog Devices: gate drayverlari](https://www.analog.com/en/resources/analog-dialogue/articles/isolated-gate-drivers-what-why-and-how.html).

## 11. MCU dasturi va reset holati

Bu platformadan mustaqil psevdokod; funksiyalar aniq SDK nomlari emas:

```text
ishga_tushish:
    chiqish_registriga_LOW_yoz(pin)
    pinni_chiqish_qil(pin)

yuklamani_yoqish:
    pinni_HIGH_qil(pin)

yuklamani_ochirish:
    pinni_LOW_qil(pin)
```

Low-side NPN/N-MOSFETda odatda **HIGH → yoqilgan**, **LOW → o‘chirilgan**.

MCU ruxsat bersa, chiqish registrini LOW qilib, keyin chiqish rejimini yoqish boshlang‘ich impulsni kamaytiradi. Biroq dastur ishga tushguncha ham vaqt bor: shu sabab apparatdagi pull-down kerak.

Boot uchun ishlatiladigan yoki resetda maxsus signal beradigan pinni yuklama boshqaruviga tanlashdan oldin MCU hujjatlarini o‘qing. GPIOning bitta pin, port va umumiy tok cheklovlari alohida bo‘lishi mumkin; absolute maximum doimiy ish nuqtasi emas.

## 12. High-side va 12 Vdagi P-MOSFET

Yuklamaning GNDsi uzilmasligi kerak bo‘lsa, musbat tomondan boshqarish — **high-side** kerak.

P-MOSFET sourceda 12 V bilan turganda:
- Gate 12 Vga yaqin bo‘lsa VGS ≈ 0 → o‘chiq.
- Gate pastga tortilsa VGS manfiy → yoqilishi mumkin.
- GPIOdan 3.3 V berish VGS = 3.3 − 12 = −8.7 V qiladi; bu o‘chirish emas.

**12 V high-side P-MOSFET gateini 3.3 V GPIOga bevosita ulamang.** Odatda NPN yoki kichik N-MOSFET bilan sath moslashtirish, gate–source pull-up va zarur bo‘lsa VGS cheklagichi ishlatiladi. High-side N-MOSFET uchun esa gate sourcening ustiga ko‘tariladigan maxsus drayver kerak bo‘lishi mumkin.

## 13. Interaktiv: GPIO, baza toki va qizish

GPIO kuchlanishi, yuklama toki va MOSFET qarshiligini o‘zgartiring. HIGH, LOW va reset holatlarini solishtiring.

<interactive src="mosfet-bjt-mcu" />

E’tibor bering:
1. Yuklama toki oshganda BJTga kerakli baza toki qanday o‘sadi?
2. MOSFET toki ikki baravar oshganda I²R yo‘qotishi necha baravar bo‘ladi?
3. Resetda GPIO LOW chiqarmasa ham, pull-down nima uchun kerak?

Modeldagi qiymatlar o‘quv taxminlari; u aniq tranzistor va MCUning elektr xususiyatlarini simulyatsiya qilmaydi.

## 14. Yodda qoladigan beshta qoida

1. **MCU boshqaradi, yuklama manbai quvvat beradi.**
2. **BJT:** baza rezistori va yetarli baza toki kerak.
3. **MOSFET:** VGS(th)ga emas, haqiqiy VGSdagi RDS(on)ga qarang.
4. **Reset:** baza/gateni suzuvchi qoldirmang.
5. **Induktiv yuklama:** mos flyback yo‘li kerak; GND, pinout va komponent chegaralarini to‘g‘ri belgilang.

Boshlang‘ich amaliyot uchun past kuchlanishli DC yuklamalar bilan ishlang. Yakka tranzistorli bu sxemalar galvanik izolyatsiya yoki avtomatik qisqa tutashuv himoyasini ta’minlamaydi.
