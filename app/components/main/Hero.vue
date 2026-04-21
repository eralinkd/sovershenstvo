<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title" v-html="mainData?.hero?.title"></h1>
          <p class="hero-subtitle" v-html="mainData?.hero?.text"></p>
          <button class="hero-btn" @click="openFeedbackModal">Записаться на прием</button>
        </div>
        <div class="hero-image">
          <NuxtImg quality="90" :src="mainData?.hero?.image" alt="Идеальная улыбка" />
        </div>
        <button class="hero-btn hero-btn--mobile" @click="openFeedbackModal">
          Записаться на прием
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useMain } from '@/composables/content/useMain'

const mainData = useMain()
const { open } = useFeedbackModal()

function openFeedbackModal() {
  open()
}
</script>

<style scoped>
/* Hero Section */
.hero {
  background: linear-gradient(270deg, #faf1ed 0%, #eaf2fc 100%), #fff;
  border-radius: 50px;
  margin: 100px auto 100px auto;
  max-width: 1700px;
  /* overflow: hidden; */
  position: relative;
}

.hero-content {
  display: flex;
  align-items: flex-start;
  padding: 100px 50px;
  position: relative;
  z-index: 2;
}

/* Адаптив для hero-content */
@media (max-width: 1200px) {
  .hero-content {
    padding: 80px 40px;
  }

  .hero-title {
    font-size: 56px !important;
  }

  .hero-subtitle {
    font-size: 28px !important;
  }
}

@media (max-width: 950px) {
  .hero-content {
    padding: 60px 30px;
    flex-direction: column;
    text-align: center;
  }

  .hero-text {
    max-width: 100%;
    margin-bottom: 40px;
  }

  .hero-title {
    font-size: 48px !important;
    margin-bottom: 25px;
  }

  .hero-subtitle {
    font-size: 24px !important;
    margin-bottom: 30px;
  }

  .hero-image {
    position: relative;
    width: 100%;
    height: 300px;
    margin-top: 30px;
    z-index: 1;
  }
}

@media (max-width: 768px) {
  .hero-content {
    padding: 50px 25px;
  }

  .hero-title {
    font-size: 42px !important;
    margin-bottom: 20px;
  }

  .hero-subtitle {
    font-size: 22px !important;
    margin-bottom: 25px;
  }

  .hero-image {
    height: 250px;
    margin-top: 25px;
  }

  .hero-btn {
    padding: 12px 25px;
    font-size: 16px !important;
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: 35px 15px;
  }

  .hero-title {
    font-size: 32px !important;
    margin-bottom: 12px;
    line-height: 1.1;
  }

  .hero-subtitle {
    font-size: 18px !important;
    margin-bottom: 18px;
    line-height: 1.2;
  }

  .hero-image {
    height: 180px;
    margin-top: 15px;
  }

  .hero-btn {
    padding: 8px 18px;
    font-size: 14px !important;
  }
}

/* Адаптив для hero блока - картинка под текстом */
@media (max-width: 600px) {
  .hero {
    background: none !important;
    border-radius: 0 !important;
    margin: 20px auto !important;
  }

  .hero-content {
    flex-direction: column !important;
    padding: 40px 20px !important;
    text-align: center !important;
    margin-bottom: 20px !important;
  }

  .hero-text {
    width: 100% !important;
    margin-bottom: 0px !important;
  }

  .hero-image {
    position: static !important;
    width: 100% !important;
    height: auto !important;
    margin: 0 auto !important;
    background: linear-gradient(270deg, #faf1ed 0%, #eaf2fc 100%), #fff !important;
    border-radius: 20px !important;
    overflow: hidden !important;
  }

  .hero-title {
    width: 100% !important;
    font-size: 30px !important;
    line-height: 1.1 !important;
    margin-bottom: 10px !important;
  }

  .hero-subtitle {
    width: 100% !important;
    font-size: 13px !important;
    line-height: 1.3 !important;
    margin-bottom: 25px !important;
  }

  .hero-btn {
    font-size: 10px !important;
    padding: 10px 17px !important;
  }

  /* Hide desktop CTA and show mobile CTA under the image */
  .hero-text .hero-btn {
    display: none !important;
  }

  .hero-btn--mobile {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    margin-top: 18px;
    font-size: 10px !important;
    padding: 10px 17px !important;
    border-radius: 26.222px !important;
  }
}

.hero-text {
  flex: 1;
}

.hero-title {
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 63px;
  line-height: 100%;
  color: #0079ff;
  margin-bottom: 30px;
  /* Правильный перенос слов по правилам русского языка */
  hyphens: auto;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  word-break: normal;
  overflow-wrap: break-word;
}

.hero-subtitle {
  font-family: Inter, sans-serif;
  font-size: 30px;
  line-height: 125%;
  color: #333;
  margin-bottom: 40px;
  /* Правильный перенос слов по правилам русского языка */
  hyphens: auto;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  word-break: normal;
  overflow-wrap: break-word;
  font-weight: 400;
}

.hero-subtitle b {
  font-weight: 600;
}

.hero-btn {
  padding: 24px 39px;
  border-radius: 59px;
  background: #0079ff;
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

/* Hidden by default, revealed on mobile in media query */
.hero-btn--mobile {
  display: none;
}

.hero-btn:hover {
  background: #0056cc;
}

.hero-image {
  position: absolute;
  right: 0;
  bottom: 0px;
  aspect-ratio: 1231/776;
  width: 70%;
  /* height: 100%; */
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}
</style>
