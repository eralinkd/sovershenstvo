<template>
  <section class="promo-hero-mobile">
    <div class="container">
      <div class="title" v-html="formatMultiline(promo.hero.title || '')"></div>
      <div class="subtitle">{{ promo.hero.subtitle }}</div>

      <div class="image-wrap">
        <NuxtImg :src="promo.hero.img" alt="promotions" quality="80" />
      </div>

      <div class="info">
        <div class="item">
          <TherapyHeroIconsSmiles />
          <p v-html="formatMultiline(promo.hero.items[0] || '')" />
        </div>
        <div class="item">
          <TherapyHeroIconsClients />
          <p v-html="formatMultiline(promo.hero.items[1] || '')" />
        </div>
        <div class="item">
          <TherapyHeroIconsAchivement />
          <p v-html="formatMultiline(promo.hero.items[2] || '')" />
        </div>
      </div>

      <button class="therapy-btn" @click="openFeedbackModal">Записаться на прием</button>
    </div>
  </section>
</template>

<script setup>
import { usePromotions } from '@/composables/content/usePromotions'

const { open } = useFeedbackModal()

function openFeedbackModal() {
  open()
}

const promo = usePromotions()

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function formatMultiline(text) {
  const escaped = escapeHtml(text || '')
  return escaped.replace(/\r?\n/g, '<br />').replace(/\\n/g, '<br />')
}
</script>

<style scoped>
.promo-hero-mobile {
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
  margin-top: 40px;
}

.image-wrap {
  border-radius: 20px;
  overflow: hidden;
  margin-top: 16px;
}

.image-wrap img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.title {
  color: #1e1e1e;
  font-family: Inter;
  font-size: clamp(24px, 7.2vw, 30px);
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.subtitle {
  margin-top: 8px;
  color: #1e1e1e;
  font-family: Inter;
  font-size: clamp(12px, 4vw, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 1.25;
}

.info {
  margin-top: 14px;
  border-radius: 22px;
  background: #eaf2fc;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.item {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #1e1e1e;
  font-family: Inter;
  font-size: clamp(12px, 3.6vw, 14px);
  font-style: normal;
  font-weight: 600;
  line-height: 1.25;
}

.therapy-btn {
  margin-top: 16px;
  width: fit-content;
  padding: 10px 17px;
  background: #0079ff;
  border-radius: 26px;
  border: none;
  color: #fff;
  font-family: Inter;
  font-size: clamp(12px, 3.6vw, 14px);
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

@media (min-width: 992px) {
  .promo-hero-mobile {
    display: none;
  }
}
</style>
