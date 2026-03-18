<template>
  <section class="about">
    <div class="container">
      <div class="grid">
        <div class="block top">
          <div class="title">
            <span v-html="formatMultiline(about.hero.quote)" />
          </div>
          <p class="subtitle">{{ about.hero.quoteAuthor }}</p>
          <AboutHeroIconsQuotes class="quotes" />
        </div>
        <div class="img">
          <NuxtImg :src="about.hero.topImage" alt="about" />
        </div>
        <div class="block bottom">
          <div class="text">
            <span v-html="formatMultiline(about.hero.bottomText)" />
          </div>
          <div class="items">
            <div class="item">
              <div class="number">{{ about.hero.stats.first }}</div>
              <p>{{ about.hero.statsLabels.first }}</p>
            </div>
            <div class="item">
              <div class="number">{{ about.hero.stats.second }}</div>
              <p>{{ about.hero.statsLabels.second }}</p>
            </div>
            <div class="item">
              <div class="number">{{ about.hero.stats.third }}</div>
              <p>{{ about.hero.statsLabels.third }}</p>
            </div>
          </div>
          <button class="about-btn" @click="openFeedbackModal">{{ about.hero.ctaText }}</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAbout } from '@/composables/content/useAbout'

const { open } = useFeedbackModal()

function openFeedbackModal() {
  open()
}

const about = useAbout()

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
.about {
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
  margin-top: 60px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
}

.block {
  position: relative;
  border-radius: 50px;
  background: #eaf2fc;
  position: relative;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
}

.block.bottom {
  gap: 30px;
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
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 125%; /* 22.5px */
}

.quotes {
  position: absolute;
  bottom: 0;
  right: 50px;
}

.text {
  max-width: 483px;
  color: #1e1e1e;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 22.5px */
}

.items {
  display: flex;
  gap: 55px;
}

.item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.number {
  color: #0079ff;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-transform: uppercase;
}

.item p {
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.img {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row: span 2;
}

.img img {
  display: block;
  width: 100%;
  height: 100%;
  object-position: center center;
}

.about-btn {
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

.about-btn:hover {
  background: #0056cc;
}
</style>
