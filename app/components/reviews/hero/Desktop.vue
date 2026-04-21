<template>
  <section class="therapy-hero">
    <div class="container">
      <div class="grid">
        <div class="left">
          <div class="title" v-html="formatMultiline(reviews.hero.title || '')"></div>
          <div class="subtitle" v-html="formatMultiline(reviews.hero.subtitle || '')"></div>
          <div class="info">
            <div class="item">
              <TherapyHeroIconsSmiles />
              <p v-html="formatMultiline(reviews.hero.items[0] || '')" />
            </div>
            <div class="item">
              <TherapyHeroIconsClients />
              <p v-html="formatMultiline(reviews.hero.items[1] || '')" />
            </div>
            <div class="item">
              <TherapyHeroIconsAchivement />
              <p v-html="formatMultiline(reviews.hero.items[2] || '')" />
            </div>
          </div>
          <div class="btns">
            <button class="therapy-btn" @click="openFeedbackModal">Записаться на прием</button>
            <UIButton variant="secondary" @click="leaveReview">Оставить отзыв</UIButton>
          </div>
        </div>
        <div class="img">
          <NuxtImg :src="reviews.hero.img" alt="reviews" quality="80" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useReviewsContent } from '@/composables/content/useReviewsContent'

const { open } = useFeedbackModal()

function openFeedbackModal() {
  open()
}

function leaveReview() {
  window.open('https://yandex.ru/profile/1050283619?lang=ru', '_blank')
}

const reviews = useReviewsContent()

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
.therapy-hero {
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
  margin-top: 60px;
}

.grid {
  display: grid;
  grid-template-columns: 650fr 1113fr;
  gap: 30px;
}

.img {
  border-radius: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.subtitle {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 37.5px */
}

.info {
  max-width: 476px;
  border-radius: 35px;
  background: #eaf2fc;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 35px;
}

.item {
  display: flex;
  align-items: center;
  gap: 35px;
  color: #1e1e1e;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 125%; /* 22.5px */
}

.therapy-btn {
  width: fit-content;
  padding: 18.5px 30px;
  background: #0079ff;
  border-radius: 45px;
  border: none;
  color: #fff;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  transition: background 0.3s;
}

.therapy-btn:hover {
  background: #0056cc;
}

.btns {
  display: flex;
  gap: 20px;
}
</style>
