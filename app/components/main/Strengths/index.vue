<template>
  <section class="strengths">
    <div class="container">
      <h2 class="strengths-title strengths-title--desktop" v-html="mainData?.strengths?.title"></h2>
      <h2 class="strengths-title strengths-title--mobile" v-html="mainData?.strengths?.title"></h2>
      <div class="strengths-cards">
        <div class="strength-card">
          <div class="card-icon">
            <MainStrengthsIconsPlan />
          </div>
          <div class="card-text" v-html="mainData?.strengths?.card1"></div>
        </div>

        <div class="strength-card">
          <div class="card-icon">
            <MainStrengthsIconsInsurance />
          </div>
          <div class="card-text" v-html="mainData?.strengths?.card2"></div>
        </div>

        <div class="strength-card">
          <div class="card-icon">
            <MainStrengthsIconsPrice />
          </div>
          <div class="card-text" v-html="mainData?.strengths?.card3"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useMain } from '@/composables/content/useMain'

const mainData = useMain()
</script>

<style scoped>
/* Strengths Section */
.strengths {
  padding: 100px 0;
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
}

/* Адаптивные отступы для секций */
@media (max-width: 1200px) {
  .strengths {
    padding: 70px 0;
  }
}

@media (max-width: 768px) {
  .strengths {
    padding: 60px 0;
  }
}

@media (max-width: 480px) {
  .strengths {
    padding: 50px 0;
  }

  /* Switch titles on mobile and apply requested styles */
  .strengths-title--desktop {
    display: none !important;
  }

  .strengths-title--mobile {
    display: block !important;
    color: #1e1e1e !important;
    font-family: Inter !important;
    font-size: 30px !important;
    font-style: normal !important;
    font-weight: 600 !important;
    line-height: normal !important;
    margin-bottom: 23px !important;
  }
}

@media (max-width: 360px) {
  .strengths {
    padding: 40px 0;
  }
}

.strengths-title {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 23px;
}

/* Mobile alternate title hidden by default */
.strengths-title--mobile {
  display: none;
}

.strengths-cards {
  display: flex;
  gap: 30px;
  justify-content: space-between;
}

.strength-card {
  height: 200px;
  flex: 1;
  background: #e3f2fd;
  border-radius: 50px;
  padding: 45px 75px 45px 45px;
  display: flex;
  align-items: center;
  gap: 42px;
  transition: transform 0.3s ease;
}

.strength-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  flex-shrink: 0;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-text {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 125%; /* 22.5px */
}
@media (max-width: 1200px) {
  .strengths-cards {
    flex-direction: column;
  }
}
</style>
