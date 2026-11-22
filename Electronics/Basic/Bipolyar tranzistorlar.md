---
name: Bipolyar tranzistorlar — boshlovchilar uchun
tags:
  - elektronika
  - tranzistor
  - boshlovchilar
---

# Bipolyar tranzistorlar: kichik signal bilan katta tokni boshqarish

**Bipolyar tranzistor (BJT)** — uchta oyoqli yarimo‘tkazgich detal. U bilan LED, rele yoki boshqa yuklamani yoqib-o‘chirish, shuningdek kichik signalni kuchaytirish mumkin.

Eng muhim fikr: **baza orqali berilgan kichik boshqaruv ta’siri kollektor–emitter yo‘lidagi kattaroq tokni boshqaradi.** Yuklamaga energiyani tranzistor emas, quvvat manbai beradi.

## 1. Uchta oyoq: B, C, E

| Belgisi | Nomi | Boshlang‘ich tasavvur |
|---|---|---|
| B | Baza — Base | Boshqaruv kirishi |
| C | Kollektor — Collector | NPN kalitda yuklamadan tok keladigan tomon |
| E | Emitter — Emitter | NPN kalitda odatda GNDga ulanadigan tomon |

Buni suv kraniga o‘xshatish mumkin: baza — kran tutqichi, kollektor–emitter yo‘li — suv yo‘li, quvvat manbai esa suv bosimi manbai. Tutqichning kichik harakati katta oqimni boshqaradi.

**O‘xshatishning chegarasi:** bazaga ham tok kerak. Tranzistor mexanik kran emas; uning ishlashi kuchlanish, tok va haroratga bog‘liq.

> [!IMPORTANT]
> B, C, E — vazifalar, oyoqlarning chapdan o‘ngga tartibi emas. Bir xil ko‘rinishdagi tranzistorlarda ham oyoqlar tartibi farq qilishi mumkin. Aniq detalning datasheetidagi pinoutni tekshiring.

## 2. NPN va PNP farqi

| Xususiyat | NPN | PNP |
|---|---|---|
| Yoqish sharti, sodda tushuncha | Baza emitterdan yuqoriroq potensialda | Baza emitterdan pastroq potensialda |
| Silikon BJT uchun odatiy taxmin | Baza emitterdan taxminan 0.6–0.8 V yuqori | Baza emitterdan taxminan 0.6–0.8 V past |
| An’anaviy tokning asosiy yo‘nalishi | C → E | E → C |
| Oddiy kalitdagi joyi | Yuklama bilan GND orasida | Musbat manba bilan yuklama orasida |
| Sxemadagi emitter strelkasi | Tashqariga qaragan | Ichkariga, baza tomon qaragan |

**Eslab qolish:** NPN bilan boshlash oson: emitter GNDda, baza musbat boshqaruv oladi.

Bu yerda tok yo‘nalishi **an’anaviy tok yo‘nalishi** bo‘yicha berilgan. Elektronlar harakati unga qarama-qarshi.

“NPN faqat musbat kuchlanishda ishlaydi” degan qoida yo‘q. Muhimi — kuchlanishlarning **emitterga nisbatan farqi**.

## 3. Baza–emitter orasidagi 0.7 V nimani anglatadi?

NPN tranzistorda:

$$
V_{BE} = V_B - V_E
$$

Emitter 0 V, baza 0.7 V bo‘lsa, $V_{BE}=0.7\text{ V}$.

Silikon tranzistorning baza–emitter o‘tishi to‘g‘ri yo‘nalishda ulangan diodga o‘xshaydi. Ko‘p oddiy hisoblarda uning kuchlanishini **taxminan 0.7 V** deb olamiz.

Ammo bu aniq “yoqilish chegarasi” emas: tok silliq o‘zgaradi, $V_{BE}$ esa tok va haroratga bog‘liq. 0.7 V faqat boshlang‘ich hisob uchun qulay taxmin.

**Shuning uchun bazani kuchlanish manbaiga bevosita ulash o‘rniga, oddiy sxemalarda baza rezistori ishlatiladi.** U baza tokini cheklaydi.

## 4. Tranzistorning uchta asosiy ish holati

| Holat | Nima bo‘ladi? | Qayerda kerak? |
|---|---|---|
| Yopiq — cutoff | Baza yetarli boshqarilmaydi, kollektor toki deyarli nol | Kalit o‘chirilgan |
| Faol — active | Baza toki o‘zgarsa, kollektor toki ham o‘zgaradi | Signal kuchaytirish |
| To‘yingan — saturation | Tranzistor kuchli ochilgan, tokni asosan tashqi yuklama cheklaydi | Kalit yoqilgan |

### Faol rejim: tokni kuchaytirish

Soddalashtirilgan munosabat:

$$
I_C \approx \beta I_B
$$

Masalan, $\beta=100$ va $I_B=20\,\mu\text{A}$ bo‘lsa:

$$
I_C \approx 100\times20\,\mu\text{A}=2\text{ mA}
$$

Bu tokni manba va yuklama ta’minlay olishi, tranzistor esa faol rejimda qolishi kerak.

$\beta$ — tok kuchaytirish koeffitsiyenti; datasheetda $h_{FE}$ deb ham uchraydi. **U doim 100 emas.** Bir modelning turli nusxalarida, turli tok va haroratlarda farq qiladi.

Aniqroq fizik qarashda kollektor toki $V_{BE}$ga kuchli bog‘liq. $I_C\approx\beta I_B$ esa boshlang‘ich sxema hisoblari uchun foydali model.

### To‘yinish: “yanada ochish” tokni cheksiz oshirmaydi

Tranzistor to‘yinganda kollektor–emitter kuchlanishi kichik bo‘ladi. Oddiy hisoblarda $V_{CE(sat)}\approx0.2\text{ V}$ deb olish mumkin, lekin haqiqiy qiymat detal va tokka bog‘liq.

Bu rejimda $I_C=\beta I_B$ formulasini cheksiz davom ettirib bo‘lmaydi. LED va uning rezistori 3 mA atrofidagi tokka yo‘l bersa, bazani ko‘proq boshqarish LEDdan 100 mA o‘tkazib yubormaydi.

## 5. Birinchi sxema: NPN bilan LEDni yoqish

Quyidagi chizma ulanish g‘oyasini ko‘rsatadi; haqiqiy oyoqlar joylashuvi emas.

```text
+5 V ── R_LED = 1 kΩ ── LED ── C
                        A → K  │
                              NPN
Boshqaruv ── RB = 10 kΩ ── B    │
                               E
                               │
GND ───────────────────────────┘
```

LEDning **anodi A** rezistor tomonga, **katodi K** kollektor tomonga ulanadi. Boshqaruv manbaining GNDsi ham shu umumiy GNDga ulanadi.

Tok yo‘llari:

- **Yuklama toki:** +5 V → LED rezistori → LED → kollektor → emitter → GND.
- **Baza toki:** boshqaruv chiqishi → baza rezistori → baza → emitter → GND.

### LED toki qancha bo‘ladi?

Qizil LED uchun $V_{LED}\approx2\text{ V}$, to‘yingan tranzistor uchun $V_{CE}\approx0.2\text{ V}$ deb olaylik:

$$
I_{LED}\approx\frac{V_{CC}-V_{LED}-V_{CE(sat)}}{R_{LED}}
=\frac{5-2-0.2}{1000}
=2.8\text{ mA}
$$

**LED tokini cheklaydigan asosiy detal — 1 kΩ rezistor.** LED rangi va turiga qarab undagi kuchlanish ham, yorqinlik ham o‘zgaradi.

### Baza toki qancha?

Boshqaruv 5 V bo‘lsa:

$$
I_B\approx\frac{V_{in}-V_{BE}}{R_B}
=\frac{5-0.7}{10000}
=0.43\text{ mA}
$$

Demak, taxminan 0.43 mA baza toki yordamida 2.8 mA LED tokini boshqaramiz.

Kalit hisobida ba’zan $I_B\approx I_C/10$ kabi konservativ boshlang‘ich qoida ishlatiladi. Bu **tranzistorning β si 10 degani emas** va barcha detallarda to‘yinishni kafolatlamaydi. Yakuniy hisobda datasheetdagi to‘yinish shartlari va boshqaruv chiqishining ruxsat etilgan toki hisobga olinadi.

Boshqaruv 0 V bo‘lsa, tranzistor yopiladi va LED o‘chadi. Baza ulanmasdan qolsa, holat ishonchsiz bo‘lishi mumkin; zarur sxemalarda B–E orasiga alohida tortuvchi rezistor qo‘yiladi.

## 6. Interaktiv: baza o‘zgarsa, LEDda nima bo‘ladi?

<interactive src="bipolyar-tranzistor-laboratoriya" />

Quyidagi tartibda kuzating:

1. **Yopiq holat**ni bosing: baza va kollektor toklariga qarang.
2. **Faol holat**ni bosing: β ni oshiring. Kollektor toki ham oshadi.
3. **To‘yinish**ni bosing: β ni yana oshiring. Nega LED toki o‘zgarmayapti?
4. Baza rezistorini kattalashtiring: baza toki kamayadi; yetarlicha kamayganda tranzistor faol rejimga qaytadi.
5. Boshqaruv kuchlanishini asta tushiring: LED toki qanday kamayishini kuzating.

**Model chegarasi:** bu o‘quv simulyatsiyasi. Unda $V_{BE}=0.7\text{ V}$, $V_{LED}=2\text{ V}$ va $V_{CE(sat)}=0.2\text{ V}$ doimiy deb olingan. Haqiqiy tranzistorning o‘tishi bunday keskin emas. Yorqinlik chizig‘i tokning shartli ko‘rsatkichi.

## 7. Kuchaytirgich bilan kalitning farqi

**Kalit** uchun ikkita chekka holat kerak: yopiq yoki to‘yingan. Masalan, mikrokontroller LEDni yoqadi.

**Kuchaytirgich** uchun tranzistor faol rejimda ushlanadi. Kichik kirish o‘zgarishi kattaroq chiqish o‘zgarishini hosil qiladi. Buning uchun oldindan ish nuqtasi belgilanadi — bu **bias** deyiladi. Faqat o‘zgaruvchan signalni bazaga berishning o‘zi sifatli kuchaytirgich yaratmaydi.

Umumiy emitterli kuchaytirgichda baza signali ko‘tarilganda kollektor toki oshadi. Kollektor rezistoridagi kuchlanish tushuvi ko‘payib, kollektor kuchlanishi pasayadi. Shuning uchun bunday kuchaytirgich chiqishi kirishga nisbatan teskari bo‘ladi.

## 8. Eng ko‘p uchraydigan xatolar

- **B, C, E oyoqlarini taxmin qilish.** Korpusga qarab tartib belgilamang.
- **Bazani rezistorsiz ulash.** Baza toki va boshqaruv chiqishi ortiqcha yuklanishi mumkin.
- **LED rezistorini unutish.** Baza rezistori LED tokini cheklovchi rezistor o‘rnini bosmaydi.
- **GNDlarni birlashtirmaslik.** Oddiy NPN sxemada boshqaruv va quvvat manbai umumiy tayanchga muhtoj.
- **β ni o‘zgarmas son deb olish.** Sxema bitta ideal qiymatgagina bog‘lanib qolmasin.
- **Tranzistorni ideal kalit deb o‘ylash.** Unda kuchlanish tushadi va issiqlik ajraladi; kollektor yo‘lidagi quvvat taxminan $P\approx V_{CE}I_C$.
- **Rele yoki motorni LED kabi ulash.** Induktiv yuklama o‘chirilganda kuchlanish sakrashi yuz beradi; oddiy bir yo‘nalishli boshqaruvda himoya diodi qo‘llanadi.

## 9. Yodda qoladigan beshta fikr

1. **Baza boshqaradi; quvvat manbai energiya beradi.**
2. **NPNni yoqish uchun baza emitterdan yuqoriroq potensialda bo‘ladi.**
3. **0.7 V — taxmin, aniq chegara emas.**
4. **$I_C\approx\beta I_B$ — faol rejim uchun.**
5. **To‘yinishda tokni yuklama va manba belgilaydi.**

Boshlash uchun shu savolga javob bera olsangiz yetarli: **“Bu sxemada baza tokini nima cheklayapti va yuklama tokini nima cheklayapti?”** Javoblar alohida bo‘lishi kerak: baza rezistori va yuklama zanjiri.
