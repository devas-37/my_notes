---
name: Rele — MCU bilan ishlatish va amaliy tipslar
tags:
  - electronics
  - rele
  - microcontroller
---

# Rele: MCU bilan ishlatish va amaliy tipslar

**Rele — elektr yordamida bosiladigan mexanik kalit.** MCU kichik boshqaruv signalini beradi, rele esa boshqa zanjirni ulaydi yoki uzadi.

Tasavvur qiling: barmog‘ingiz o‘rniga elektromagnit devordagi kalitni bosmoqda. MCU — buyruq beruvchi, tranzistor — g‘altakni quvvatlovchi, rele kontaktlari — yuklamani ulovchi kalit.

Bu note odatiy **DC g‘altakli, quvvat berilganda tortadigan va quvvat uzilganda qaytadigan elektromexanik rele** haqida. Latching rele, AC g‘altakli rele va SSRning boshqaruvi boshqacha.

Bog‘liq notelar: [[Electronics/Basic/Bipolyar tranzistorlar|BJT asoslari]] · [[Electronics/Basic/MOSFET va MCU integratsiyasi|MOSFET va MCU integratsiyasi]].

## 1. Releda ikkita alohida zanjir bor

| Qism | Vazifasi | Muhim parametr |
|---|---|---|
| G‘altak — coil | Magnit maydon hosil qilib kontaktni siljitadi | G‘altak kuchlanishi va toki |
| Kontaktlar | Yuklamaning elektr yo‘lini ulaydi yoki uzadi | AC/DC kuchlanish, tok va yuklama turi |

**“5 V rele”** ko‘pincha g‘altakka 5 V kerakligini bildiradi. Bu kontaktlardan faqat 5 V o‘tadi degani emas. Korpusdagi kontakt reytingi esa GPIO yoki g‘altakning toki emas.

Oddiy rele kontaktlari o‘zidan kuchlanish chiqarmaydi: ular tashqi manbaning zanjirini ulaydi. Bunday kontaktni **quruq kontakt — dry contact** deyishadi.

G‘altak va kontaktlar orasida to‘g‘ridan-to‘g‘ri elektr ulanish yo‘q; harakat magnit orqali uzatiladi. Izolyatsiyaning ruxsat etilgan chegaralari rele va plataning konstruksiyasiga bog‘liq. [OMRON: rele ishlash prinsipi](https://www.ia.omron.com/support/guide/36/introduction.html).

## 2. COM, NO va NC nimani anglatadi?

- **COM — Common:** ko‘chuvchi kontaktning umumiy chiqishi.
- **NO — Normally Open:** g‘altak quvvatsiz paytda COM bilan uzilgan.
- **NC — Normally Closed:** g‘altak quvvatsiz paytda COM bilan ulangan.

“Normal” bu yerda dasturdagi LOW emas, **g‘altak quvvatsiz holat** degani.

| G‘altak holati | COM–NO | COM–NC |
|---|---|---|
| Quvvatsiz | Uzilgan | Ulangan |
| Quvvatlangan, rele tortgan | Ulangan | Uzilgan |

Oddiy SPDT releda shu uchta kontakt chiqishi bor. SPSTda bitta kontakt yo‘li, DPDTda birgalikda harakatlanadigan ikkita almashuvchi kontakt guruhi bo‘ladi.

### 12 V yuklamani odatda o‘chiq tutish

```text
+12 V yuklama manbasi ── sug‘urta ── COM
                                      /
                                    NO ── yuklama ── 0 V yuklama manbasi

NC ishlatilmaydi.
```

Rele tortsa COM–NO ulanadi va yuklama yoqiladi. NC tanlansa, g‘altak quvvatsiz paytda yuklama yoqilgan bo‘ladi.

**Kontakt tomondagi manba GNDsini MCU GNDsiga ulash shart emas.** U alohida, izolyatsiyalangan zanjir bo‘lib qolishi mumkin.

## 3. Nega g‘altakni GPIOga bevosita ulab bo‘lmaydi?

GPIO — kuchli quvvat manbasi emas. G‘altak MCU pinidan ortiq tok talab qilishi mumkin; o‘chirishda esa induktiv kuchlanish sakrashi hosil qiladi.

Odatdagi yo‘l:

```text
MCU GPIO → tranzistor yoki driver → rele g‘altagi
                                    ↓
                              mexanik kontakt
                                    ↓
                                 yuklama
```

GPIO faqat tranzistorni boshqaradi. G‘altak toki o‘z manbasidan olinadi. TI ham MCUdan rele g‘altagini boshqarishda tok kuchaytiruvchi bosqich va himoya diodini ko‘rsatadi. [TI: MCU bilan interfeys](https://www.ti.com/document-viewer/lit/html/SSZTA23/GUID-606B000D-7305-4933-9AF5-A6ABC00AB79E).

## 4. Alohida releni N-MOSFET bilan ulash

Quyidagi sxema kichik **DC g‘altakli** rele uchun low-side kalitdir:

```text
                        +Vcoil — g‘altakning nominal manbasi
                           │
                  ┌────────┴─────────┐
                  │                  │
             [rele g‘altagi]      K — katod
                  │              [D1 diod]
                  │              A — anod
                  └────────┬─────────┘
                           │
                           D
MCU GPIO ── Rg ──┬──── G  N-MOSFET
                 │         S
                Rpd        │
                 │         │
GND ─────────────┴─────────┴──── MCU GND
```

**Ulash tartibi:**

1. G‘altakning bir uchi → uning nominal +Vcoil manbasi.
2. Ikkinchi uchi → MOSFET drain.
3. Source → g‘altak manbasi GND.
4. MCU GND → shu GND.
5. GPIO → ketma-ket gate rezistori Rg → gate.
6. Gate → pull-down Rpd → source.
7. D1 → g‘altakka parallel; **katod +Vcoilga, anod drainga**.

Boshlang‘ich loyiha uchun **Rg ≈ 100–330 Ω**, **Rpd ≈ 10–100 kΩ** ko‘rib chiqilishi mumkin. Bular universal qiymat emas: gate zaryadi, MCU pin imkoniyati, sizish toki va yoqilish talabi hisobga olinadi.

### MOSFET tanlashdagi asosiy trick

3.3 V MCU uchun **RDS(on) aynan 2.5 V yoki 3.3 Vga mos gate kuchlanishida kafolatlangan** MOSFET izlang. Faqat VGS(th) kichikligi yetmaydi: threshold — tranzistor endi tok o‘tkaza boshlaydigan shart, yaxshi ochilish kafolati emas.

VDS, gate kuchlanish chegarasi, tok va qizish ham mos bo‘lsin. Korpus oyoqlari joylashuvini datasheetdan oling.

> [!TIP]
> G‘altak 12 V, MCU 3.3 V bo‘lishi mumkin. Ushbu low-side sxemada gate 3.3 V bilan boshqariladi, g‘altakka esa 12 V manba ishlaydi. MOSFET bu sharoitga mos tanlanishi kerak; 12 Vni GPIOga ulamang.

## 5. BJT bilan ham ishlatish mumkin

MOSFET o‘rniga NPN BJT qo‘yilsa:

- G‘altakning pastki uchi → kollektor.
- Emitter → GND.
- GPIO → baza rezistori RB → baza.
- Baza–emitter orasiga pull-down.
- Flyback diod o‘sha joyda qoladi.

### Hisoblash misoli — shartli 5 V, 70 mA g‘altak

Bu aniq rele modeli emas, hisoblashni tushuntirish uchun faraz.

To‘yintirish uchun majburiy tok nisbati 10 deb olsak:

$$
I_B \approx \frac{I_{coil}}{10}
= \frac{70\,\text{mA}}{10}
= 7\,\text{mA}
$$

3.3 V GPIO va VBE ≈ 0.8 V farazida:

$$
R_B \approx \frac{3.3-0.8}{0.007}
\approx 357\,\Omega
$$

330 Ω tanlansa, ideal hisobda baza toki taxminan 7.6 mA chiqadi. **Bu barcha MCU uchun maqbul degani emas.** GPIOning shu tokdagi kafolatlangan HIGH kuchlanishi, pin/port jami toki va BJTning to‘yinish shartlarini tekshirish kerak. Pull-down toki ham GPIOdan olinadi.

BJTdagi kuchlanish tushuvi sabab g‘altakka manbadagi kuchlanishning hammasi yetmaydi. G‘altakning tortish kuchlanishi uchun zaxira qolsin. Oddiy hFE qiymati bilan to‘yinishni kafolatlab bo‘lmaydi.

**GPIO toki cheklanganida mos logic-level MOSFET ko‘pincha qulayroq.**

## 6. Flyback diod: kichik detal, katta foyda

G‘altak energiya saqlaydi. Tranzistor o‘chganda tok darhol to‘xtay olmaydi. Diod shu tok uchun g‘altak atrofida vaqtinchalik aylanma yo‘l beradi.

**Yodlash:** diodning chiziqli tomoni — katod — g‘altakning **musbat manbasiga** ulanadi.

- Diodni g‘altakka yaqin joylashtiring.
- Teskari kuchlanish va impuls tok imkoniyati g‘altakka mos bo‘lsin.
- Ba’zi rele va modullarda diod ichkarida mavjud; ularda qutblanish muhim.
- MOSFETning body diodi bu sxemada g‘altak diodini almashtirmaydi.

Oddiy diod g‘altak toki so‘nishini sekinlashtiradi, shu sabab kontakt kechroq qaytishi mumkin. Tez qo‘yib yuborish zarur bo‘lsa, ishlab chiqaruvchi tavsiya qilgan diod + Zener yoki boshqa clamp ishlatiladi; tranzistorning kuchlanish zaxirasi qayta hisoblanadi. **AC g‘altakka oddiy diodni shunday parallel ulash mumkin emas.** [OMRON: surge suppressorlar](https://www.ia.omron.com/product/cautions/36/safety_precautions.html).

## 7. Tayyor rele moduli: VCC, GND, IN

Tayyor modulda odatda driver va himoya elementlari bo‘ladi, ammo tarkib modelga bog‘liq.

| Belgisi | Odatdagi ma’nosi |
|---|---|
| VCC | Modul ta’minoti; bu har doim MCU logic kuchlanishi degani emas |
| GND | Ta’minot/boshqaruv qaytish yo‘li |
| IN | Boshqaruv kirishi |
| JD-VCC | Ayrim modullarda g‘altak/driver ta’minoti |
| COM, NO, NC | Yuklama kontaktlari |

### Active-high yoki active-low?

| Modul turi | IN = LOW | IN = HIGH |
|---|---|---|
| Active-high | G‘altak o‘chiq | G‘altak yoqilgan |
| Active-low | G‘altak yoqilgan | G‘altak o‘chiq |

Bu jadval **g‘altak** holatini bildiradi. Yuklama NCga ulangan bo‘lsa, uning holati teskari bo‘ladi.

### 5 V modul 3.3 V GPIOga avtomatik mos emas

5 V — modul ta’minoti; kirish esa boshqa talabga ega bo‘lishi mumkin.

- 3.3 V ishonchli HIGH deb tan olinadimi?
- LOWda GPIO qancha tok yutishi kerak?
- IN ichkaridan 5 Vga tortilganmi?
- MCU o‘chiq, modul yoqilganida IN orqali MCUga tok kiradimi?

Javob modul sxemasidan olinadi. Zarur bo‘lsa NPN/open-drain interfeys yoki level shifter qo‘llanadi. NPN interfeys signal mantiqini ham o‘zgartirishi mumkin; yakuniy ON/OFF darajalarini shu sxemaga qarab belgilang.

### Optokupler va JD-VCC haqidagi muhim trick

**Optokupler borligi haqiqiy galvanik izolyatsiya kafolati emas.** GND umumiy bo‘lsa yoki ta’minotlar boshqa joyda birlashsa, izolyatsiya yo‘qoladi.

JD-VCC jumperini olishning o‘zi ham yetmasligi mumkin. Haqiqiy ajratish uchun modul sxemasi, izolyatsiyalangan ta’minotlar va plata oralig‘i mos bo‘lishi kerak. Oddiy tranzistorli boshqaruvda esa MCU va driver GNDsi umumiy bo‘lishi zarur.

## 8. Reset paytida rele tasodifan yoqilmasin

MCU ishga tushayotganda GPIO Hi-Z, ichki pull-up yoki maxsus boot funksiyada bo‘lishi mumkin. Dastur hali ishlamasdan ham rele tortishi ehtimoli bor.

Amaliy choralar:

- Oddiy MOSFET/NPN driverda tashqi pull-down bilan o‘chiq holatni belgilang.
- Active-low modulda OFF darajasini saqlaydigan, GPIO kuchlanishiga mos interfeys tanlang.
- Boot/strapping yoki yuklanishda impuls beradigan pinlardan qoching.
- Output latchni o‘chiq darajaga tayyorlab, keyin pinni output qiling.
- Xavfli yuklamani faqat dasturdagi boshlang‘ich qiymatga tayamang.

Arduino uslubidagi misol; **RELAY_ON va RELAY_OFF aynan yakuniy interfeysingizga mos bo‘lishi kerak**:

```cpp
const int RELAY_PIN = 7;       // Platangizdagi mos GPIO bilan almashtiring
const int RELAY_ON  = LOW;     // Ushbu misol: active-low kirish
const int RELAY_OFF = HIGH;

void setup() {
  digitalWrite(RELAY_PIN, RELAY_OFF);
  pinMode(RELAY_PIN, OUTPUT);
}

void setRelay(bool on) {
  digitalWrite(RELAY_PIN, on ? RELAY_ON : RELAY_OFF);
}

void loop() {
  // setRelay(true);  // Yoqish
  // setRelay(false); // O‘chirish
}
```

Bu kod resetdan setup()gacha bo‘lgan vaqtni himoyalamaydi. **O‘sha davrni apparatdagi to‘g‘ri bias/interfeys hal qiladi.** Arduino bo‘lmagan MCUlarda registr/HAL orqali latchni oldindan tayyorlash tartibi boshqacha bo‘lishi mumkin.

## 9. Amaliy tips va tricklar

### Rele yoqilganda MCU reset bo‘lsa

Ko‘pincha sabab ta’minot cho‘kishi yoki shovqin:

- G‘altak tokini MCU regulyatorining kuchsiz chiqishidan olmang.
- Manbani barcha bir vaqtda yoqiladigan g‘altaklar tokiga moslang.
- G‘altak toki yo‘lini MCUning nozik GND yo‘lidan aylantirmang.
- Driver yoniga mahalliy keramika va kerakli bulk kondensator qo‘ying.
- G‘altak diodi va kontakt tomondagi induktiv yuklama himoyasini alohida ko‘ring.

Masalan, to‘rtta 70 mA g‘altak bir vaqtda yoqilsa, faqat g‘altaklarning o‘zi taxminan **280 mA** talab qiladi. MCU va boshqa qurilmalar bundan tashqari.

Kondensator qiymati tok impulsi, ruxsat etilgan kuchlanish pasayishi va manba javobiga bog‘liq; u quvvati yetmaydigan manbani almashtirmaydi.

### Rele “chertadi”, lekin yuklama yonmaydi

Chertish mexanizm harakatlanganini bildiradi, kontakt orqali quvvat o‘tayotganini kafolatlamaydi. COM/NO tanlovi, yuklama manbasi, simlar va kontakt holati sabab bo‘lishi mumkin. Moduldagi LED ham kontaktning haqiqiy holati sensori emas.

### Rele “trrrr” qilib titrasa

G‘altak kuchlanishi yetishmasligi, manbaning cho‘kishi yoki buyruqning tez-tez almashishi mumkin. Bunday holat kontaktlarni tez yeyishi mumkin.

Harorat boshqaruvida **gisterezis** ishlating: masalan, isitkichni 24 °Cdan pastda yoqing, 26 °Cdan yuqorida o‘chiring, oraliqda oldingi holatni saqlang. Nasos/kompressor uchun qurilma talab qilgan minimal yoqilgan va o‘chiq vaqtni ham saqlang.

### Mexanik relega tez PWM bermang

LED yorqinligi yoki motor tezligini boshqarish uchun MOSFET/driver ishlating. Rele tez chertish uchun mo‘ljallanmagan; switching chastotasi uning datasheetiga bog‘liq. G‘altakni torttirgandan keyin tokni PWM bilan kamaytirish — maxsus hisoblangan driver usuli, oddiy yuklama PWMidan farq qiladi.

### Kontakt reytingidagi “10 A”ni to‘liq shartlari bilan o‘qing

AC/DC, kuchlanish, induktiv/rezistiv yuklama va boshlang‘ich tok muhim. Motor yoki kondensatorli manbaning yoqilish toki odatdagi tokidan katta bo‘lishi mumkin. **10 A AC reytingini 10 A DC deb ko‘chirmang.** Kontakt, plata yo‘li va terminal imkoniyatlari ham bir xil bo‘lmasligi mumkin. [OMRON: kontakt yuklamalari va inrush](https://www.ia.omron.com/product/cautions/36/safety_precautions.html).

### G‘altak diodi kontakt yuklamasini himoyalamaydi

Rele g‘altagi — bitta induktivlik; kontaktga ulangan solenoid yoki motor — boshqa yuklama. Ularning himoyasi alohida.

Bir qutbli DC solenoidga mos flyback diod qo‘llanishi mumkin. Motor, ikki yo‘nalishli zanjir yoki AC yuklamada himoya turi boshqacha: mos TVS, MOV yoki RC snubber sxemaga qarab tanlanadi. Tasodifiy kondensator qo‘shish kontaktning yoqilish tokini oshirishi mumkin.

### “O‘chiq” buyruq yuklama albatta uzildi degani emas

Ortiqcha tok yoki yoy sabab kontakt yopishib qolishi mumkin. Quvvat uzilganda NO odatda ochiladi, lekin bu nosozlikka qarshi kafolat emas. Muhim tizimlarda qayta aloqa va alohida xavfsizlik uzgichi talab etilishi mumkin.

## 10. Qisqa nosozlik jadvali

| Belgi | Ehtimoliy sabab | Yechim yo‘nalishi |
|---|---|---|
| Umuman tortmaydi | Noto‘g‘ri g‘altak kuchlanishi, driver yoki IN mos emas | G‘altak va modul spetsifikatsiyasiga mos ta’minot/interfeys |
| Resetda bir marta tortadi | GPIO boot holati, active-low kirish suzib qoladi | Tashqi bias, mos pin va interfeys |
| Tez titraydi | Ta’minot pasayishi yoki buyruq tebranishi | Tok zaxirasi, gisterezis, to‘g‘ri ulanish |
| MCU qayta yuklanadi | Quvvat yoki induktiv shovqin | Diod, ta’minot va tok yo‘llarini tuzatish |
| Chertadi, yuklama ishlamaydi | COM/NO xato, yuklama manbasi yo‘q, kontakt shikastlangan | Kontakt zanjirini aniqlash |
| LOWda yoqiladi | Active-low modul | Dasturdagi ON/OFF mantiqini moslash |
| Buyruq OFF, yuklama ON | NC ishlatilgan yoki kontakt yopishgan | Kontakt tanlovi va nosoz kontaktni ajratish |

## 11. Qaysi vaziyatda qaysi kalit?

| Vazifa | Odatda mos yechim |
|---|---|
| Past kuchlanishli DC LED, tez PWM | MOSFET |
| DC motor tezligi va yo‘nalishi | Motor driver/H-bridge |
| Alohida zanjirni sekin ulash, quruq kontakt kerak | Elektromexanik rele |
| Ko‘p rele kanali | GPIO darajasiga mos relay-driver IC |
| Tez-tez AC ulash | Yuklamaga mos AC SSR; sizish toki va qizishini hisobga olish |

SSR mexanik rele bilan bir xil emas. AC triakli SSR odatda DCni uzish uchun mos kelmaydi; OFF holatida ham sizish toki bo‘lishi mumkin.

## 12. Boshlash uchun eng tushunarli loyiha

**MCU → MOSFET driver → DC rele → alohida 12 V chiroq.**

Avval shu past kuchlanishli sxemada g‘altak bilan kontaktning vazifasini tushunib oling. G‘altak manbasi o‘z nominalida, chiroq esa o‘z manbasida ishlaydi; COM–NO yo‘li chiroqni ulaydi.

> [!WARNING]
> 220/230 V tarmoqni breadboard yoki ochiq jumper simlar bilan ulamang. Rele korpusidagi reyting butun modul xavfsizligini kafolatlamaydi. Tarmoq uchun tegishli izolyatsiya, korpus, himoya va malakali montaj kerak. Bu notedagi boshlang‘ich loyiha past kuchlanishli DC bilan bajariladi.

**Yodda saqlang:** GPIO → driver → g‘altak; kontakt → yuklama. G‘altakning kuchlanishini, GPIOning mantiqini va kontaktning yuklama reytingini uchta alohida masala sifatida tanlang.
