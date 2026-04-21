<template>
  <section class="details-mobile">
    <div class="container">
      <h2 class="details-title" v-html="mainData?.details?.title"></h2>

      <div class="hero-card">
        <NuxtImg src="/images/details/1.png" alt="Совершенство — ваша стоматология" />
      </div>

      <div class="stats">
        <div class="stats-list">
          <div class="stats-item">
            <div class="icon">
              <MainDetailsIconsTooth />
            </div>
            <p v-html="mainData?.details?.card1?.text"></p>
          </div>
          <div class="stats-item">
            <div class="icon">
              <MainDetailsIconsHappy />
            </div>
            <p v-html="mainData?.details?.card2?.text"></p>
          </div>
          <div class="stats-item">
            <div class="icon">
              <MainDetailsIconsAchievement />
            </div>
            <p v-html="mainData?.details?.card3?.text"></p>
          </div>
        </div>

        <button class="details-btn" @click="navigateTo('/about')">Узнать подробнее</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useMain } from '@/composables/content/useMain'

const mainData = useMain()
</script>

<style scoped>
.details-mobile {
  padding: 60px 0;
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
}

.details-title {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.hero-card {
  position: relative;
  margin-top: 20px;
  border-radius: 20px;
  overflow: hidden;
  height: 262px;
  background: linear-gradient(270deg, #faf1ed 0%, #eaf2fc 100%), #fff;
}

.hero-card img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stats {
  margin-top: 27px;
  border-radius: 20px;
  background: #0079ff;
  color: #fff;
  padding: 24px 21px;
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.stats-item {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stats-item .icon {
  width: 43px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stats-item p {
  margin: 0;
  color: #fff;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25;
}

.details-btn {
  margin-top: 24px;
  padding: 10px 17px;
  border-radius: 26.222px;
  background: #fff;
  color: #0079ff;
  border: none;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
}

@media (min-width: 992px) {
  .details-mobile {
    display: none;
  }
}
</style>
