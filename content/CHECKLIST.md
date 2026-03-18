# Чеклист: сущности контента и БД

## Легенда

- ✅ В БД — сущность реализована в базе
- ❌ Нет в БД — только в YAML, нужно добавить
- ⚠️ Частично — есть в БД, но не хватает полей

---

## Сущности в content/

### 1. globals.yml ✅

| Поле              | В БД                | Примечание                             |
| ----------------- | ------------------- | -------------------------------------- |
| title             | ✅                  |                                        |
| seo.description   | ✅ seoDescription   |                                        |
| seo.ogTitle       | ✅ seoOgTitle       |                                        |
| seo.ogDescription | ✅ seoOgDescription |                                        |
| seo.ogImage       | ❌                  | Убрано по требованию, не редактируется |

---

### 2. faq.yml ✅

| Поле                  | В БД                 | Примечание |
| --------------------- | -------------------- | ---------- |
| title                 | ✅                   |            |
| list.item\*.question  | ✅ FaqItem.question  |            |
| list.item\*.answer    | ✅ FaqItem.answer    |            |
| list.item\*.sortOrder | ✅ FaqItem.sortOrder |            |

---

### 3. footer.yml ✅

| Поле                | В БД                       | Примечание |
| ------------------- | -------------------------- | ---------- |
| title               | ✅                         |            |
| subtitle            | ✅                         |            |
| city                | ✅                         |            |
| email               | ✅                         |            |
| summaryPhones       | ✅                         |            |
| address\*.label     | ✅ FooterAddress.label     |            |
| address\*.phone1–3  | ✅ FooterAddress.phone1–3  |            |
| address\*.sortOrder | ✅ FooterAddress.sortOrder |            |

---

### 4. main.yml ✅

| Блок      | Поля                                       | В БД                                                                                                                      |
| --------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| hero      | title, text, image                         | ✅ MainHero.title, MainHero.text, MainHero.image                                                                          |
| strengths | title, card1–3                             | ✅ MainStrengths.title, MainStrengths.card1–3                                                                             |
| services  | title, card1–6                             | ✅ MainServices.title, MainServices.card1–6                                                                               |
| offers    | title, banner1–4 (title, subtitle, img)    | ✅ MainOffers.title, MainOffers.banner1–4 (MainOffers.banner1.title, MainOffers.banner1.subtitle, MainOffers.banner1.img) |
| unique    | title, subtitle, card1–2 (title, subtitle) | ✅ MainUnique.title, MainUnique.subtitle, MainUnique.card1–2 (MainUnique.card1.title, MainUnique.card1.subtitle)          |
| details   | title, card1–3 (text)                      | ✅ MainDetails.title, MainDetails.card1–3 (MainDetails.card1.text)                                                        |
| why       | title, card1–4 (title, text)               | ✅ MainWhy.title, MainWhy.card1–4 (MainWhy.card1.title, MainWhy.card1.text)                                               |

---

### 5. pricing.yml ❌

| Поле                              | В БД |
| --------------------------------- | ---- |
| pricing.category\*.title          | ❌   |
| pricing.category*.item*.title     | ❌   |
| pricing.category*.item*.our_price | ❌   |
| pricing.category*.item*.price     | ❌   |
| pricing.category\*.sortOrder      | ❌   |
| pricing.category*.item*.sortOrder | ❌   |

---

### 6. doctors.yml ❌

| Поле                           | В БД |
| ------------------------------ | ---- |
| title                          | ❌   |
| slider.title                   | ❌   |
| doctor\*.name                  | ❌   |
| doctor\*.role                  | ❌   |
| doctor\*.photo                 | ❌   |
| doctor\*.about[] (title, info) | ❌   |
| doctor\*.licenses (l1–l10)     | ❌   |
| doctor\*.sortOrder             | ❌   |

---

### 7. about.yml ❌

| Блок             | Поля                                     | В БД |
| ---------------- | ---------------------------------------- | ---- |
| hero             | quote, quoteAuthor, topImage, bottomText | ❌   |
| hero.stats       | first, second, third                     | ❌   |
| hero.statsLabels | first, second, third                     | ❌   |
| hero.ctaText     | ❌                                       |
| mission          | title, subtitle                          | ❌   |
| mission.blocks   | block*.title, block*.text                | ❌   |

---

### 8. offers.yml ❌

| Поле                  | В БД |
| --------------------- | ---- |
| list.item\*.topic     | ❌   |
| list.item\*.text      | ❌   |
| list.item\*.price     | ❌   |
| list.item\*.link      | ❌   |
| list.item\*.sortOrder | ❌   |

---

### 9. promotions.yml ❌

| Поле                   | В БД |
| ---------------------- | ---- |
| hero.title             | ❌   |
| hero.subtitle          | ❌   |
| hero.items.item\*.text | ❌   |
| hero.img               | ❌   |

---

### 10. reviews.yml ❌

| Поле                           | В БД |
| ------------------------------ | ---- |
| hero.title                     | ❌   |
| hero.subtitle                  | ❌   |
| hero.items.item\*.text         | ❌   |
| hero.img                       | ❌   |
| list.review\*.author           | ❌   |
| list.review\*.date             | ❌   |
| list.review\*.platform         | ❌   |
| list.review\*.doctor           | ❌   |
| list.review\*.services (s1–s5) | ❌   |
| list.review\*.text             | ❌   |
| list.review\*.sortOrder        | ❌   |

---

## Сущности без YAML (захардкожены)

### 11. Header ❌

| Поле      | Где       | В БД |
| --------- | --------- | ---- |
| schedule  | AppHeader | ❌   |
| phones    | AppHeader | ❌   |
| nav items | AppHeader | ❌   |

---

### 12. Licenses (слайдер сертификатов) ❌

| Поле     | Где            | В БД |
| -------- | -------------- | ---- |
| images[] | LicensesSlider | ❌   |

---

### 13. FAQ по услугам ❌

| Сущность             | Где                                        | В БД |
| -------------------- | ------------------------------------------ | ---- |
| Implantation FAQ     | composables/offers/Implantation/useFaq     | ❌   |
| BiteCorrection FAQ   | composables/offers/BiteCorrection/useFaq   | ❌   |
| ToothWhitening FAQ   | composables/offers/ToothWhitening/useFaq   | ❌   |
| DentalTreatment FAQ  | composables/offers/DentalTreatment/useFaq  | ❌   |
| ToothRestoration FAQ | composables/offers/ToothRestoration/useFaq | ❌   |
| ToothRemoval FAQ     | composables/offers/ToothRemoval/useFaq     | ❌   |

---

## Итог

| Статус          | Сущности                                                   |
| --------------- | ---------------------------------------------------------- |
| ✅ В БД         | globals, faq, footer                                       |
| ❌ Нет в БД     | main, pricing, doctors, about, offers, promotions, reviews |
| ❌ Захардкожены | header, licenses, FAQ по услугам                           |
