<template>
  <section class="therapy-hero-mobile">
    <div class="container">
      <div class="title">Профессиональная чистка и отбеливание</div>
      <div class="subtitle">Цена от <span class="bold">7 500 ₽</span></div>

      <div class="image-wrap">
        <NuxtImg src="/images/page-therapy/page-tooth-decay/hero.png" alt="therapy" />
      </div>

      <div class="info">
        <div class="item">
          <TherapyHeroIconsSmiles />
          <p>Более 18 лет <br />мы дарим улыбки</p>
        </div>
        <div class="item">
          <TherapyHeroIconsClients />
          <p>250 000+ <br />довольных пациентов</p>
        </div>
        <div class="item">
          <TherapyHeroIconsAchivement />
          <p>Признание <br />на «Продокторов»</p>
        </div>
      </div>

      <button class="therapy-btn" @click="openFeedbackModal">Записаться на прием</button>
    </div>
  </section>
</template>

<script setup>
const { open } = useFeedbackModal()

function openFeedbackModal() {
  open()
}
</script>

<style scoped>
.therapy-hero-mobile {
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

.bold {
  font-weight: 600;
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
  .therapy-hero-mobile {
    display: none;
  }
}
</style>
