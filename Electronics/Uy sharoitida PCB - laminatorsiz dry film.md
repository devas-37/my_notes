---
name: "Uy sharoitida PCB — laminatorsiz dry film"
tags:
  - elektronika
  - pcb
  - dry-film
---

# Uy sharoitida PCB — laminatorsiz dry film

**Sizdagi kalsiylangan soda, kaustik soda, temir xlorid va lazer printer bu jarayonning turli bosqichlariga mos keladi.** Laminator o‘rniga harorati boshqariladigan dazmol bilan ishlash mumkin. Yana mis qoplangan tekstolit, PCB uchun dry film fotorezist, lazer printerga mos shaffof plyonka va filmga mos UV manbai kerak.

Bu qo‘llanma **suvli ishqorda ochiladigan negativ dry film fotorezist** uchun. Film markasi noma’lum: quyidagi rejimlar boshlang‘ich yo‘nalish, uning o‘z yo‘riqnomasi ustun. Solder mask plyonkasi bilan adashtirmang.

## Materiallarning vazifasi

| Material | Vazifasi | Qachon ishlatiladi |
|---|---|---|
| Lazer printer | Shaffof plyonkada fotomaska chiqaradi | Boshida |
| Dry film | Misni yedirishdan himoyalovchi tasvir hosil qiladi | UV bilan yoritilgandan so‘ng |
| Kalsiylangan soda — Na₂CO₃ | Yoritilmagan fotorezistni eritib, tasvirni ochadi | UV dan keyin, FeCl₃ dan oldin |
| Temir(III) xlorid — FeCl₃ | Himoyasiz misni yediradi | Tasvir ochilgandan keyin |
| Kaustik soda — NaOH | Qotgan fotorezistni yechadi | Mis yedirilib, plata chayilgandan keyin |

**Na₂CO₃ va NaOH bir-birining o‘rniga ishlatilmaydi.** Ichimlik sodasi NaHCO₃ ham bu retseptdagi kalsiylangan soda emas.

## 1. Fotomaska

Negativ filmda **mis qoladigan yo‘l va padlar shaffof, olib tashlanadigan mis joylari qora** bo‘ladi. Oddiy qora yo‘lli chizmani shunchaki chiqarish yetmaydi: ranglarni invert qilish kerak.

Lazer printer uchun belgilangan shaffof plyonkaga 100% masshtabda, zich qora rejimda chiqaring. “Fit to page”ni o‘chiring. Tonerli yuzasi fotorezistga qarasin; ko‘zgulashni aynan shu joylashuvga qarab tanlang. Pinlar joylashuvi va yozuvning qaysi tomondan qaralganda to‘g‘ri chiqishini tekshiring.

Bu usulda toner misga ko‘chirilmaydi — u UV ni to‘suvchi niqob bo‘lib xizmat qiladi. [PCB ishlab chiqaruvchisi qo‘llanmasi](https://www.pcbtry.com/2026/08/12/how-to-use-photosensitive-dry-film-for-pcb/).

## 2. Misni tayyorlash va laminatorsiz yopishtirish

Misni mayin abraziv va yuvish vositasi bilan tozalang, yaxshilab chaying, to‘liq quriting. Sirtga barmoq tekkizmang.

Filmni kuchli yorug‘lik va quyoshdan himoyalab ishlating. Uning ikki himoya qavati bor:

1. Misga tegadigan tomonning himoya qavatini ajrating.
2. Fotorezistni bir chetdan boshlab asta yotqizing; havo pufakchalari qolmasin.
3. Tashqi shaffof himoya qavatini qoldiring.
4. Issiqqa chidamli tekis taglik ustida, toza qog‘oz orqali, bug‘siz dazmol bilan bir tekis bosib yopishtiring. Dazmolni sirpantirib filmni siljitmang; ko‘tarib boshqa joyga qo‘ying.
5. Tekis holatda soviting.

Dazmol laminatordek bir xil harorat va bosim bermaydi. Filmning laminalash haroratiga amal qiling; dazmoldagi “sintetika” yozuvi aniq harorat kafolati emas. [Laminatorsiz ishlash bo‘yicha manba](https://www.pcbtry.com/2026/08/12/how-to-use-photosensitive-dry-film-for-pcb/).

Masalan, M115i uchun yetkazib beruvchi laminalashni taxminan 110–115 °C atrofida ko‘rsatadi. **Bu sizdagi noma’lum film uchun tayyor dazmol sozlamasi emas.** Avval kichik bo‘lakda yopishishni aniqlang. [M115i texnik rejimlari](https://www.thinktink.com/stack/volumes/voli/store/specs/m115spec.htm).

## 3. UV bilan tasvir tushirish

Fotomaskani toner tomoni filmga qaratib joylashtiring, tekis shaffof oyna bilan zich bosing. Tashqi himoya qavati UV yoritish vaqtida qoladi; **ochirish eritmasiga solishdan oldin olinadi**.

UV vaqti lampaning to‘lqin uzunligi, quvvati, masofasi va filmga bog‘liq. Kichik bo‘lakda turli ekspozitsiyalarni taqqoslab, yo‘llar saqlanadigan va oraliqlar toza ochiladigan vaqtni tanlang. Universal “2 daqiqa” yo‘q. [Jarayon qo‘llanmasi](https://www.pcbtry.com/2026/08/12/how-to-use-photosensitive-dry-film-for-pcb/).

M115i misolida sezgir diapazon 350–420 nm. O‘zingizdagi filmning diapazoniga mos UV manbai tanlang; oddiy xona yoritgichiga tayanmang. [Film spetsifikatsiyasi](https://www.thinktink.com/stack/volumes/voli/store/specs/m115spec.htm).

## 4. Kalsiylangan soda bilan tasvirni ochirish

Quyidagi boshlang‘ich retsept **suvsiz, sof Na₂CO₃** uchun:

| Eritma massasi | Na₂CO₃ | Suv |
|---|---:|---:|
| 500 g | 4,25 g | 495,75 g |
| 1 kg | 8,5 g | 991,5 g |

Bu **0,85% massaviy eritma**. Taxminan 28–30 °C da, idishni yengil tebratib ishlang. Qolgan tashqi himoya qavati olingan bo‘lishi shart. Ochilgan joylarda yalang‘och mis ko‘rinishi bilan platani chaying; eritmada keragidan ortiq ushlamang. Yuzani yalang qo‘l bilan paypaslamang.

Kristall gidratli soda uchun shu massa to‘g‘ri kelmaydi. Masalan, M115i yo‘riqnomasida Na₂CO₃·H₂O uchun 1% ko‘rsatilgan. Qadoqdagi formulani tekshiring. [Konsentratsiya va harorat manbasi](https://www.thinktink.com/stack/volumes/voli/store/specs/m115spec.htm).

## 5. Temir xlorid bilan misni yedirish

FeCl₃ ni kimyoga chidamli plastik idishda ishlating. Tayyor eritmani o‘z yo‘riqnomasi bo‘yicha qo‘llang; kukun/kristall bo‘lsa, qadoqdagi tayyorlash nisbatiga amal qiling.

Platani eritmaga to‘liq botiring, yengil tebrating. Ochiq mis yo‘qolgach, darhol oling va alohida idishda chaying. Ortiqcha ushlash yo‘llarning yonidan ham mis ketishini kuchaytiradi.

MG Chemicals tayyor FeCl₃ eritmasi uchun 35–55 °C ni ko‘rsatadi; uyda avval xona haroratida ishlash mumkin, jarayon sekinroq kechadi. Qizdirilsa, suv hammomidan foydalaning, qaynatmang. [FeCl₃ ishlab chiqaruvchisi](https://mgchemicals.com/products/circuit-board-design/copper-etchants/ferric-chloride-etching/).

## 6. Kaustik soda bilan filmni yechish

M115i uchun xona haroratidagi **1,5% NaOH** ko‘rsatilgan. Boshlang‘ich kichik porsiya: **7,5 g NaOH + 492,5 g suv**. Boshqa film ko‘rsatmasi farq qilishi mumkin.

Avval suvni soling, NaOH ni oz-ozdan aralashtirib qo‘shing; qizigan eritmani soviting. Chayilgan platani soling, film ajralgach oling va yaxshilab chaying. [Yechish rejimi](https://www.thinktink.com/stack/volumes/voli/store/specs/m115spec.htm).

## Xavfsizlik va chiqindi

- Sachrashdan himoyalovchi ko‘zoynak, kimyoga mos qo‘lqop va yopiq kiyim kiying. Ovqat idishlaridan foydalanmang.
- NaOH suvda eriganda kuchli qiziydi, teri va ko‘zni kuydiradi; alyuminiy idish ishlatmang. Tegsa darhol ko‘p oqar suv bilan yuving, ko‘zga tegsa shoshilinch tibbiy yordam oling. Terida kislota bilan neytrallamang. [CDC/NIOSH](https://www.cdc.gov/niosh/npg/npgd0565.html), [ATSDR](https://wwwn.cdc.gov/TSP/ToxProfiles/ToxProfiles.aspx?id=246&tid=45).
- UV manbaini yopiq ekran ichida ishlating; nurga tik qaramang va terini nurlantirmang.
- Ishlatilgan FeCl₃ va dastlabki chayindi suvda mis bo‘ladi: kanalizatsiyaga yoki tuproqqa quymang. Belgilangan plastik idishda yig‘ib, xavfli kimyoviy chiqindi sifatida topshiring. Soda qo‘shish chiqindini avtomatik zararsiz qilmaydi. Ishlatilgan eritmalarni bir-biriga aralashtirmang. [FeCl₃ chiqindisi haqida](https://mgchemicals.com/products/circuit-board-design/copper-etchants/ferric-chloride-etching/).

## Natija chiqmasa

| Belgi | Ehtimoliy sabab |
|---|---|
| Film ko‘chadi yoki pufakchalar bor | Mis iflos/nam, bosim yoki issiqlik yetarli emas |
| Ochirishda yo‘llar ham yuviladi | UV kam yoki ochirish haddan ortiq |
| Oraliqlarda film qoladi | Tashqi qavat olinmagan, maska qora joylaridan UV o‘tgan yoki ochirish yetarli emas |
| Yo‘llar kutilganidan ingichka | FeCl₃ da ortiqcha ushlangan, yonlama yedirilish kuchaygan |

**Keyingi aniqlashtirish uchun kerakli ma’lumotlar:** dry film markasi yoki qadoqdagi rejimlari, UV lampaning turi va quvvati, dazmol bor-yo‘qligi. Shunda yopishtirish va yoritish rejimini aniqroq moslashtirish mumkin.
