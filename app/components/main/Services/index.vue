<template>
  <section class="services">
    <div class="container">
      <h2 class="services-title services-title--desktop" v-html="mainData?.services?.title"></h2>
      <h2 class="services-title services-title--mobile" v-html="mainData?.services?.title"></h2>
      <div class="services-grid">
        <div class="service-card">
          <div class="service-content">
            <h3 class="service-name" v-html="mainData?.services?.card1"></h3>
            <NuxtLink class="service-link" to="/offers/dental-treatment"
              ><span>Подробнее</span> <MainServicesArrow
            /></NuxtLink>
          </div>
          <div class="service-line"></div>
        </div>

        <div class="service-card">
          <div class="service-content">
            <h3 class="service-name" v-html="mainData?.services?.card2"></h3>
            <NuxtLink class="service-link" to="/offers/implantation"
              ><span>Подробнее</span> <MainServicesArrow
            /></NuxtLink>
          </div>
          <div class="service-line"></div>
        </div>

        <div class="service-card">
          <div class="service-content">
            <h3 class="service-name" v-html="mainData?.services?.card3"></h3>
            <NuxtLink class="service-link" to="/offers/bite-correction"
              ><span>Подробнее</span> <MainServicesArrow
            /></NuxtLink>
          </div>
          <div class="service-line"></div>
        </div>

        <div class="service-card">
          <div class="service-content">
            <h3 class="service-name" v-html="mainData?.services?.card4"></h3>
            <NuxtLink class="service-link" to="/offers/tooth-restoration"
              ><span>Подробнее</span> <MainServicesArrow
            /></NuxtLink>
          </div>
          <div class="service-line"></div>
        </div>

        <div class="service-card">
          <div class="service-content">
            <h3 class="service-name" v-html="mainData?.services?.card5"></h3>
            <NuxtLink class="service-link" to="/offers/tooth-removal"
              ><span>Подробнее</span> <MainServicesArrow
            /></NuxtLink>
          </div>
          <div class="service-line"></div>
        </div>

        <div class="service-card">
          <div class="service-content">
            <h3 class="service-name" v-html="mainData?.services?.card6"></h3>
            <NuxtLink class="service-link" to="/offers/tooth-whitening"
              ><span>Подробнее</span> <MainServicesArrow
            /></NuxtLink>
          </div>
          <div class="service-line"></div>
        </div>
      </div>

      <div class="services-button">
        <button class="services-btn" @click="navigateTo('/offers')">Полный перечень услуг</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useMain } from '@/composables/content/useMain'

const mainData = useMain()
</script>

<style scoped>
.services {
  padding: 100px 0;
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
}

/* Адаптивные отступы для services */
@media (max-width: 1200px) {
  .services {
    padding: 70px 0;
  }
}

@media (max-width: 768px) {
  .services {
    padding: 60px 0;
  }
}

@media (max-width: 480px) {
  .services {
    padding: 50px 0;
  }

  /* Switch titles on mobile and apply requested styles */
  .services-title--desktop {
    display: none !important;
  }

  .services-title--mobile {
    display: block !important;
    color: #1e1e1e !important;
    font-family: Inter !important;
    font-size: 30px !important;
    font-style: normal !important;
    font-weight: 600 !important;
    line-height: normal !important;
    margin-bottom: 40px !important;
  }
}

@media (max-width: 360px) {
  .services {
    padding: 40px 0;
  }
}

.services-title {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 40px;
}

/* Mobile alternate title hidden by default */
.services-title--mobile {
  display: none;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 40px;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

.service-card {
  background: #e3f2fd;
  border-radius: 50px;
  padding: 40px 35px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.service-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.service-name {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 125%; /* 22.5px */
  margin-bottom: 0;
  flex-grow: 1;
}

.service-link {
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 22.5px */
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: color 0.3s ease;
  margin-top: auto;
}

.service-link:hover {
  color: #0079ff;
}

.arrow {
  font-size: 16px;
  transition: transform 0.3s ease;
}

.service-link:hover .arrow {
  transform: translateX(3px);
}

.service-line {
  position: absolute;
  top: 0;
  right: 50%;
  transform: translateX(50%);
  width: 100px;
  height: 0;
  transition: height 0.3s ease;
  overflow: visible;
}

.service-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-20 0 1 200'%3E%3Cpath d='M3,0 Q-15,25 3,50 Q21,75 3,100 Q-15,125 3,150 Q21,175 3,200' stroke='%230079FF' stroke-width='20' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-size: 100px 200px;
  background-repeat: repeat-y;
  animation: snakeWave 2s linear infinite;
  animation-play-state: paused;
}

.service-card:hover .service-line {
  height: 100%;
}

.service-card:hover .service-line::after {
  animation-play-state: running;
}

@keyframes snakeWave {
  0% {
    background-position: 0 -200px;
  }
  100% {
    background-position: 0 0;
  }
}

.services-button {
  text-align: left;
}

.services-btn {
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

.services-btn:hover {
  background: #0056cc;
}
</style>
