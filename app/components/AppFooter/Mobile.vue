<template>
  <section class="footer-mobile">
    <div class="container">
      <footer class="wrap">
        <div class="head">
          <div class="title">{{ footer.title || 'Контакты' }}</div>
          <div class="subtitle">{{ footer.subtitle || 'Как нас найти' }}</div>
          <div class="addresses">
            <p
              v-for="(addr, i) in footer.addresses"
              :key="i"
              :class="{ active: selectedAddress === i + 1 }"
              @click="selectedAddress = i + 1"
            >
              {{ addr.label }}
            </p>
          </div>
        </div>

        <div class="map-image"><NuxtImg src="/images/footer-map.png" alt="map" /></div>

        <div class="contacts">
          <div class="col">
            <div class="row">
              <AppFooterIconsCall style="flex-shrink: 0" /><span>{{ summaryPhonesString }}</span>
            </div>
            <div class="row">
              <AppFooterIconsCall />
              <p
                v-if="currentPhones.length"
                style="display: flex; flex-direction: column; gap: 5px"
              >
                <span v-for="(p, idx) in currentPhones" :key="idx">{{ p }}</span>
              </p>
            </div>
            <div class="row">
              <AppFooterIconsMail style="flex-shrink: 0" /><a
                style="color: inherit"
                :href="`mailto:${footer.email}`"
                target="_blank"
                >{{ footer.email }}</a
              >
            </div>
            <div class="row address">
              <AppFooterIconsLocation style="flex-shrink: 0" /><span
                >{{ footer.city }}<br />
                <span>{{ currentAddressLabel }}</span>
              </span>
            </div>
          </div>
        </div>

        <div class="maps">
          <button class="map-btn g-map" @click="openGoogleMap">
            <AppFooterIconsGoogleMaps style="width: 30px; height: 30px" />
            <p>Проложить<br />маршрут</p>
          </button>
          <button class="map-btn y-map" @click="openYandexMap">
            <AppFooterIconsYandexMap style="width: 30px; height: 30px" />
            <p>Проложить<br />маршрут</p>
          </button>
          <button class="map-btn two-map" @click="openTwoMap">
            <AppFooterIcons2Map style="width: 30px; height: 30px" />
            <p>Проложить<br />маршрут</p>
          </button>
        </div>

        <div class="line"></div>

        <div class="nav">
          <NuxtImg src="/images/footer-logo.png" alt="logo" class="logo" />
          <div class="links">
            <NuxtLink to="/">Главная</NuxtLink>
            <NuxtLink to="/offers">Услуги</NuxtLink>
            <NuxtLink to="/about">О нас</NuxtLink>
            <NuxtLink to="/pricing">Стоимость</NuxtLink>
            <NuxtLink to="/doctors">Специалисты</NuxtLink>
            <NuxtLink to="/promotions">Акции</NuxtLink>
            <NuxtLink to="/reviews">Отзывы</NuxtLink>
          </div>
        </div>

        <div class="line"></div>

        <div class="policies">
          <a href="/policy.pdf" target="_blank" rel="noopener">Политика конфиденциальности</a>
          <a href="/policy.pdf" target="_blank" rel="noopener">Пользовательское соглашение</a>
          <p>{{ new Date().getFullYear() }}. Все права защищены.</p>
        </div>
      </footer>
    </div>
  </section>
</template>

<script setup>
import { useFooter } from '@/composables/content/useFooter'

const selectedAddress = ref(1)
const footer = useFooter()
const summaryPhonesString = computed(() => footer.value?.summaryPhones || '')
const currentIndex = computed(() => Math.max(0, (selectedAddress.value || 1) - 1))
const currentAddress = computed(() => (footer.value?.addresses || [])[currentIndex.value] || {})
const currentPhones = computed(() =>
  Array.isArray(currentAddress.value.phones) ? currentAddress.value.phones.filter(Boolean) : [],
)
const currentAddressLabel = computed(() => currentAddress.value.label || '')

function openGoogleMap() {
  window.open('https://maps.google.com?saddr=Current+Location&daddr=53.222336,44.931484', '_blank')
}

function openYandexMap() {
  window.open(
    'https://3.redirect.appmetrica.yandex.com/route?start-lat=57.008838&start-lon=40.979283&end-lat=57.008838&end-lon=40.979283&tariffClass=econom&ref=mywebsiteru&appmetrica_tracking_id=25395763362139037',
    '_blank',
  )
}

function openTwoMap() {
  window.open('https://2gis.ru/directions/points/|44.931484,53.222336', '_blank')
}
</script>

<style scoped>
.footer-mobile {
  padding: 60px 0 20px;
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
}

.wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.title {
  color: #1e1e1e;
  font-family: Inter, sans-serif;
  font-size: clamp(24px, 6.5vw, 30px);
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.subtitle {
  margin-top: 4px;
  color: #000;
  font-family: Inter, sans-serif;
  font-size: clamp(14px, 4.2vw, 18px);
  font-style: normal;
  font-weight: 400;
  line-height: 1.25;
}

.contacts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 16px;
  margin-top: 12px;
}

.row {
  display: inline-flex;
  gap: 8px;
  color: #1e1e1e;
  font-family: Inter, sans-serif;
  font-size: clamp(12px, 3.8vw, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 1.2;
}

.col {
  display: grid;
  gap: 10px;
}

.address span {
  display: inline-block;
}

.maps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 8px;
}

.map-btn {
  display: grid;
  grid-template-columns: 30px 1fr;
  align-items: center;
  gap: 5px;
  padding: 10px 4px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #e5e5e5;
}

.map-btn p {
  margin: 0;
  color: #1e1e1e;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.1;
}

.map-btn.g-map {
  border-color: #4285f5;
}
.map-btn.y-map {
  border-color: #f43;
}
.map-btn.two-map {
  border-color: #99ca3b;
}

.map-image {
  border-radius: 20px;
  overflow: hidden;
}

.map-image img {
  width: 100%;
  display: block;
}

.nav {
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  gap: 16px;
}

.logo {
  width: clamp(60px, 24vw, 90px);
  height: auto;
}

.links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 16px;
}

.links a {
  color: #1e1e1e;
  font-family: Inter, sans-serif;
  font-size: clamp(12px, 3.6vw, 14px);
  text-decoration: none;
}

.policies {
  display: grid;
  gap: 8px;
}

.policies a,
.policies p {
  color: #1e1e1e;
  font-family: Inter, sans-serif;
  font-size: clamp(10px, 3.2vw, 12px);
  text-decoration: none;
  line-height: 1.2;
}

.cta {
  margin-top: 8px;
  padding: 12px 18px;
  background: #0079ff;
  border-radius: 26px;
  border: none;
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: clamp(12px, 3.6vw, 14px);
  font-weight: 500;
  line-height: normal;
}

.line {
  width: 100%;
  height: 1px;
  background: #d9d9d9;
  margin: 10px 0;
}

.addresses {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

.addresses p {
  font-family: Inter;
  font-weight: 300;
  font-style: Light;
  font-size: 16px;
  line-height: 125%;
  letter-spacing: 0%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.addresses p.active {
  color: #4285f5;
  font-weight: 600;
  font-size: 16px;
  line-height: 125%;
  letter-spacing: 0%;
}

@media (min-width: 769px) {
  .footer-mobile {
    display: none;
  }
}
</style>
