# 🎯 GA4 Воронка продаж - Полная настройка

## 📊 Финальная структура событий

### Воронка лендинга:
```
1. page_view → Пользователь попал на лендинг
2. engaged_scroll → Прокрутил 75% страницы (активное взаимодействие)
3. view_item → Увидел форму консультации
4. generate_lead → КОНВЕРСИЯ: Отправил форму ИЛИ
   begin_checkout → КОНВЕРСИЯ: Открыл Telegram-бота
```

---

## 🔥 События GA4 (финальные названия)

| Событие сайта | GA4 Event Name | Event Category | Lead Type | Параметры |
|---------------|----------------|----------------|-----------|-----------|
| **PageView** | `page_view` | — | — | page_title, page_location, page_path, UTM |
| **Scroll75** | `engaged_scroll` | — | — | engagement_type: 'scroll', scroll_depth: 75, UTM |
| **ConsultationOpen** | `view_item` | consultation_form | — | item_category: 'consultation_form', item_name: 'consultation_request', funnel_step: 'form_view', UTM |
| **OpenBot** | `begin_checkout` | telegram_bot | **bot** | item_category: 'telegram_bot', lead_type: 'bot', funnel_step: 'bot_open', UTM |
| **SubmitForm** | `generate_lead` | — | **consultation** | lead_type: 'consultation', form_name: 'consultation_form', value, currency: 'RUB', UTM |
| **WarmupClick** | `select_content` | — | — | content_type: 'warmup_preview', item_id: 'warmup_click', UTM |
| **ExitIntent** | `exit_intent` | engagement | — | event_category: 'engagement', UTM |

---

## ✅ Какие события пометить как CONVERSIONS в GA4

### Шаг 1: Зайдите в GA4 → Admin → Events
Найдите события и пометьте их как **Conversions**:

### 🎯 Основные конверсии:
1. ✅ **generate_lead** — главная конверсия (отправка формы)
2. ✅ **begin_checkout** — альтернативная конверсия (переход в Telegram-бота)

### 📈 Микроконверсии (опционально):
3. ⚠️ **view_item** — просмотр формы консультации (для анализа воронки)
4. ⚠️ **engaged_scroll** — активное взаимодействие (для оптимизации контента)

**Рекомендация:** Обязательно пометьте `generate_lead` и `begin_checkout` как конверсии, остальные — по желанию.

---

## 📊 Как собрать воронку в Funnel Exploration

### Шаг 1: Откройте GA4 → Explore → Blank
Создайте новый отчёт **Funnel Exploration**

### Шаг 2: Настройте воронку (шаги)

#### Вариант 1: Воронка "Консультация" (основная)
```
Шаг 1: page_view                    [100%]
        ↓
Шаг 2: engaged_scroll                [~60-70%]
        ↓
Шаг 3: view_item                     [~30-40%]
        ↓
Шаг 4: generate_lead                 [~10-15%] ← КОНВЕРСИЯ
```

#### Вариант 2: Воронка "Telegram-бот" (альтернативная)
```
Шаг 1: page_view                    [100%]
        ↓
Шаг 2: engaged_scroll                [~60-70%]
        ↓
Шаг 3: begin_checkout                [~5-10%] ← КОНВЕРСИЯ
```

#### Вариант 3: Комбинированная воронка (полная)
```
Шаг 1: page_view                    [100%]
        ↓
Шаг 2: engaged_scroll                [~60-70%]
        ↓
        ├─→ Шаг 3a: view_item → generate_lead     [~10%] ← Консультация
        └─→ Шаг 3b: begin_checkout                 [~5%]  ← Telegram

Итого конверсий: ~15%
```

### Шаг 3: Настройте фильтры

#### По типу лида:
- **lead_type = consultation** — только консультации
- **lead_type = bot** — только Telegram-бот

#### По UTM-меткам:
- **utmSource** — источник трафика (google, yandex, vk)
- **utmMedium** — тип канала (cpc, organic, referral)
- **utmCampaign** — название кампании

#### По воронке:
- **funnel_step = form_view** — дошли до формы
- **funnel_step = bot_open** — открыли Telegram-бота

### Шаг 4: Добавьте сегменты

#### Сегмент 1: Платный трафик
```
utmMedium = cpc OR utmMedium = paid
```

#### Сегмент 2: Органический трафик
```
utmMedium = organic OR (utmSource IS NULL AND utmMedium IS NULL)
```

#### Сегмент 3: Социальные сети
```
utmSource = vk OR utmSource = facebook OR utmSource = telegram
```

### Шаг 5: Настройте Breakdown (детализация)

Используйте следующие параметры для анализа:
- **utmSource** — откуда пришли пользователи
- **utmCampaign** — какая кампания эффективнее
- **lead_type** — какой тип лида конвертирует лучше
- **device_category** — десктоп vs мобильные

---

## 🔍 Пример отчёта Funnel Exploration

### Настройки:
1. **Visualization**: Funnel exploration
2. **Date range**: Last 30 days
3. **Steps**:
   - Step 1: Event name = `page_view`
   - Step 2: Event name = `engaged_scroll`
   - Step 3: Event name = `view_item`
   - Step 4: Event name = `generate_lead` OR `begin_checkout`

4. **Breakdown**: `utmSource`
5. **Segment**: All Users

### Результат:
```
100% (1000) → page_view
 ↓ 65% (650) → engaged_scroll
 ↓ 35% (350) → view_item
 ↓ 12% (120) → generate_lead + begin_checkout
```

**CR = 12%** — процент конверсии от входа до целевого действия

---

## 🎯 Какие метрики отслеживать

### 1. Conversion Rate (CR)
- **Общий CR**: (generate_lead + begin_checkout) / page_view × 100%
- **CR формы**: generate_lead / view_item × 100%
- **CR Telegram**: begin_checkout / page_view × 100%

### 2. Drop-off анализ
Смотрите, где теряются пользователи:
- **page_view → engaged_scroll**: ~35% отвал (низкая вовлечённость)
- **engaged_scroll → view_item**: ~50% отвал (не доскроллили до формы)
- **view_item → generate_lead**: ~70% отвал (не заполнили форму)

### 3. UTM-анализ
Сравнивайте CR по источникам:
- Google CPC: CR = ?
- Yandex Direct: CR = ?
- VK Ads: CR = ?
- Organic: CR = ?

### 4. Lead Type анализ
Какой тип лида конвертирует лучше:
- **Консультация** (lead_type=consultation): скорее всего выше качество
- **Telegram-бот** (lead_type=bot): скорее всего выше количество

---

## 🚀 Быстрый чек-лист настройки

- [ ] Добавить `VITE_GA4_MEASUREMENT_ID` в `.env`
- [ ] Перезапустить dev-сервер: `npm run dev`
- [ ] Проверить в GA4 Real-Time → Events (должны появиться события)
- [ ] Подождать 24-48 часов для накопления данных
- [ ] Пометить `generate_lead` и `begin_checkout` как Conversions
- [ ] Создать отчёт Funnel Exploration (шаги выше)
- [ ] Настроить Breakdown по `utmSource` и `lead_type`
- [ ] Анализировать CR и Drop-off каждую неделю

---

## 📌 Дополнительные советы

### 1. Настройте Custom Dimensions
Для более глубокого анализа создайте кастомные измерения:
- **lead_type** (Event scope)
- **funnel_step** (Event scope)
- **form_name** (Event scope)

### 2. Настройте Audiences для ретаргетинга
- **Engaged Users**: engaged_scroll в последние 7 дней
- **Form Viewers**: view_item в последние 7 дней (но не generate_lead)
- **Bot Openers**: begin_checkout в последние 7 дней

### 3. Подключите Google Ads
Импортируйте `generate_lead` и `begin_checkout` в Google Ads как конверсии для оптимизации кампаний.

---

## 💡 Итоговая структура событий для воронки

```javascript
// 1. Пользователь попал на лендинг
gtag('event', 'page_view', {
  page_title: '...',
  page_location: '...',
  utmSource: 'google',
  utmMedium: 'cpc',
  utmCampaign: 'landing_promo'
});

// 2. Прокрутил 75% страницы
gtag('event', 'engaged_scroll', {
  engagement_type: 'scroll',
  scroll_depth: 75,
  utmSource: 'google',
  utmMedium: 'cpc'
});

// 3. Увидел форму консультации
gtag('event', 'view_item', {
  item_category: 'consultation_form',
  item_name: 'consultation_request',
  funnel_step: 'form_view',
  utmSource: 'google'
});

// 4a. Отправил форму (КОНВЕРСИЯ)
gtag('event', 'generate_lead', {
  lead_type: 'consultation',
  form_name: 'consultation_form',
  value: 5000,
  currency: 'RUB',
  utmSource: 'google',
  utmCampaign: 'landing_promo'
});

// 4b. Открыл Telegram-бота (АЛЬТЕРНАТИВНАЯ КОНВЕРСИЯ)
gtag('event', 'begin_checkout', {
  item_category: 'telegram_bot',
  lead_type: 'bot',
  funnel_step: 'bot_open',
  utmSource: 'google'
});
```

---

**Готово!** Теперь у вас есть полная воронка продаж с UTM-метками и типами лидов. 🚀
