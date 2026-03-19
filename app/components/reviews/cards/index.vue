<template>
  <section class="reviews-cards">
    <div class="container">
      <h2 class="reviews-cards-title">Отзывы</h2>
      <div class="filters">
        <UISelect v-model="selectedProduct" :options="products" />
        <UISelect v-model="selectedDoctor" :options="doctors" />
      </div>
      <div class="cards-grid" :class="{ collapsed: !showMore && filteredReviews.length > 5 }">
        <div v-for="(r, idx) in filteredReviews" :key="idx" class="block">
          <div class="user">
            <UserIcon class="avatar" />
            <p class="name">{{ r.author }}</p>
            <p class="date">{{ r.date }}</p>
            <div class="platform">{{ platformLabel(r.platform) }}</div>
            <ReviewsCardsStars style="flex-shrink: 0" />
          </div>
          <div class="text">{{ r.text }}</div>
          <div class="info">
            <div class="doctor">
              Лечащий врач <span>{{ r.doctor }}</span>
            </div>
            <div class="products">
              <p class="normal">Оказанные услуги</p>
              <p v-for="(s, si) in r.services" :key="si">{{ s }}</p>
            </div>
          </div>
        </div>
      </div>
      <UIButton
        v-if="filteredReviews.length > 5"
        variant="secondary"
        class="show-more-btn"
        @click="showMore = !showMore"
      >
        {{ showMore ? 'Скрыть' : 'Показать ещё' }}
      </UIButton>
    </div>
  </section>
</template>

<script setup>
import UserIcon from './user.vue'

const reviews = useReviews()

const products = computed(() => {
  const serviceSet = new Map()
  for (const r of reviews.value) {
    for (const s of r.services || []) {
      const key = String(s).toLowerCase()
      if (!serviceSet.has(key)) serviceSet.set(key, s)
    }
  }
  return [
    { value: 'all', label: 'Все услуги' },
    ...Array.from(serviceSet.values()).map((s) => ({ value: s, label: s })),
  ]
})

const doctors = computed(() => {
  const doctorSet = Array.from(new Set(reviews.value.map((r) => r.doctor))).filter(Boolean)
  return [
    { value: 'all', label: 'Все врачи' },
    ...doctorSet.map((d) => ({ value: d, label: d })),
  ]
})

const showMore = ref(false)
const selectedProduct = ref({ value: 'all', label: 'Все услуги' })
const selectedDoctor = ref({ value: 'all', label: 'Все врачи' })

const filteredReviews = computed(() => {
  const selectedDoctorValue = selectedDoctor.value?.value
  const selectedServiceValue = selectedProduct.value?.value

  return reviews.value.filter((r) => {
    const byDoctor =
      !selectedDoctorValue || selectedDoctorValue === 'all' || r.doctor === selectedDoctorValue

    const byService =
      !selectedServiceValue ||
      selectedServiceValue === 'all' ||
      (r.services || []).some(
        (s) => String(s).toLowerCase() === String(selectedServiceValue).toLowerCase(),
      )

    return byDoctor && byService
  })
})

function platformLabel(p) {
  if (!p) return ''
  return String(p).toLowerCase() === 'yandex' ? 'Яндекс' : p
}
</script>

<style scoped>
.reviews-cards {
  padding: 100px 0;
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
}

.reviews-cards-title {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.cards-grid {
  margin-top: 25px;
  /* Two-column masonry layout */
  column-count: 2;
  column-gap: 20px;
}

.cards-grid.collapsed .block:nth-child(n + 5) {
  display: none;
}

.block {
  padding: 40px;
  border-radius: 35px;
  border: 1px solid #878787;
  display: flex;
  flex-direction: column;
  /* Prevent items from breaking across columns and add vertical spacing */
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  -moz-column-break-inside: avoid;
  margin-bottom: 20px;
}

.user {
  display: flex;
  align-items: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 18px;
  color: #bdbdbd;
}

.name {
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 125%; /* 22.5px */
  margin-right: 25px;
}

.date {
  color: #878787;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: 125%; /* 22.5px */
  margin-right: 20px;
}

.platform {
  color: #878787;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: 125%; /* 22.5px */
  margin-right: 10px;
}

.text {
  margin-top: 20px;
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 22.5px */
  white-space: pre-line;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
}

.doctor {
  display: flex;
  gap: 20px;
  color: #878787;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: 125%; /* 22.5px */
}

.doctor span {
  font-weight: 500;
}

.products {
  display: flex;
  gap: 20px;
  color: #878787;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 125%; /* 22.5px */
}

.products .normal {
  font-weight: 300;
}

.filters {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.show-more-btn {
  margin-top: 40px;
}

/* Mobile adaptation */
@media (max-width: 768px) {
  .reviews-cards {
    padding: 60px 0;
  }

  .reviews-cards-title {
    font-size: clamp(24px, 7.2vw, 30px);
  }

  .filters {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .cards-grid {
    margin-top: 16px;
    column-count: 1;
    column-gap: 12px;
  }

  .block {
    padding: 20px;
    border-radius: 22px;
    margin-bottom: 12px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    margin-right: 12px;
  }

  .name {
    font-size: clamp(14px, 4.5vw, 16px);
    margin-right: 12px;
  }

  .date,
  .platform {
    font-size: clamp(12px, 3.6vw, 14px);
    margin-right: 10px;
  }

  .text {
    margin-top: 12px;
    font-size: clamp(12px, 3.6vw, 14px);
    line-height: 1.25;
  }

  .info {
    gap: 10px;
    margin-top: 16px;
  }

  .doctor,
  .products {
    flex-direction: column;
    gap: 12px;
    font-size: clamp(12px, 3.6vw, 14px);
  }

  .show-more-btn {
    margin-top: 20px;
    padding: 10px 17px;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  /* Re-layout user row into two lines on mobile */
  .user {
    display: grid;
    grid-template-columns: 40px 1fr auto;
    grid-template-rows: auto auto;
    column-gap: 12px;
    row-gap: 4px;
    align-items: center;
  }

  .avatar {
    grid-column: 1;
    grid-row: 1 / span 2;
    width: 40px;
    height: 40px;
    margin-right: 0;
  }

  .name {
    grid-column: 2;
    grid-row: 1;
    margin-right: 0;
  }

  .date {
    grid-column: 2;
    grid-row: 2;
    margin-right: 0;
  }

  .platform {
    grid-column: 3;
    grid-row: 2;
    margin-right: 0;
  }
}
</style>
