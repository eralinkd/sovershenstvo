<template>
  <section class="footer">
    <div class="container">
      <footer class="grid">
        <div class="content">
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
          <div class="info">
            <div class="left">
              <p>
                <AppFooterIconsCall />
                <span>{{ summaryPhonesString }}</span>
              </p>
              <div>
                <AppFooterIconsCall />
                <p
                  v-if="currentPhones.length"
                  style="display: flex; flex-direction: column; gap: 5px"
                >
                  <span v-for="(p, idx) in currentPhones" :key="idx">{{ p }}</span>
                </p>
              </div>
            </div>
            <div class="right">
              <p>
                <AppFooterIconsMail /><a
                  style="color: inherit"
                  :href="`mailto:${footer.email}`"
                  target="_blank"
                  >{{ footer.email }}</a
                >
              </p>
              <p>
                <AppFooterIconsLocation /><span>
                  {{ footer.city }} <br />
                  <span>{{ currentAddressLabel }}</span>
                </span>
              </p>
            </div>
          </div>
          <div class="btns">
            <div class="btn g-map" @click="openGoogleMap">
              <AppFooterIconsGoogleMaps style="width: 56px; height: 56px" />
              <p>
                Проложить <br />
                маршрут
              </p>
            </div>
            <div class="btn y-map" @click="openYandexMap">
              <AppFooterIconsYandexMap style="width: 36px; height: 44.5px" />
              <p>
                Проложить <br />
                маршрут
              </p>
            </div>
            <div class="btn two-map" @click="openTwoMap">
              <AppFooterIcons2Map style="width: 46px; height: 46px" />
              <p>
                Проложить <br />
                маршрут
              </p>
            </div>
          </div>
          <div class="line"></div>
          <div class="nav">
            <div>
              <NuxtImg src="/images/footer-logo.png" alt="nav" />
            </div>
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
            <div class="col">
              <a href="/policy.pdf" target="_blank" rel="noopener">Политика конфиденциальности</a>
              <a href="/policy.pdf" target="_blank" rel="noopener">Пользовательское соглашение</a>
              <p>{{ new Date().getFullYear() }}. Все права защищены.</p>
            </div>
            <button class="footer-btn" @click="openFeedbackModal">Записаться на прием</button>
          </div>
        </div>
        <div class="map">
          <NuxtImg src="/images/footer-map.png" alt="map" />
        </div>
      </footer>
    </div>
  </section>
</template>

<script setup>
import { useFooter } from '@/composables/content/useFooter'

const selectedAddress = ref(1)
const { open } = useFeedbackModal()

function openFeedbackModal() {
  open()
}

const footer = useFooter()
const summaryPhonesString = computed(() => footer.value?.summaryPhones || '')
const currentIndex = computed(() => Math.max(0, (selectedAddress.value || 1) - 1))
const currentAddress = computed(() => (footer.value?.addresses || [])[currentIndex.value] || {})
const currentPhones = computed(() => {
  const phones = currentAddress.value.phones
  return Array.isArray(phones) ? phones.filter(Boolean) : []
})
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
.footer {
  padding: 100px 0 20px 0;
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: 618fr 991fr;
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
  color: #000;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 37.5px */
}

.info {
  display: flex;
  gap: 33px;
  margin-top: 30px;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.right {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.left p,
.left div {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1e1e1e;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 19.2px */
}

.right p {
  color: #1e1e1e;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 19.2px */
}

.btns {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.btn {
  width: 166px;
  display: flex;
  align-items: center;
  color: #1e1e1e;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 14px;
  background: #fff;
  height: 62px;
  gap: 8px;
  padding-right: 21px;
  padding-left: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.btn.g-map {
  border: 1px solid #4285f5;
}

.btn.y-map {
  border: 1px solid #f43;
}

.btn.two-map {
  border: 1px solid #99ca3b;
}

.line {
  width: 100%;
  height: 1px;
  background: #d9d9d9;
  margin: 15px 0;
}

.nav {
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 10px;
  column-gap: 20px;
}

.links a {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 20px */
  text-decoration: none;
}

.policies {
  padding-right: 33px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.col * {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 16.8px */
  text-decoration: none;
}

.footer-btn {
  height: 55px;
  padding: 18.5px 30px;
  background: #0079ff;
  border-radius: 45px;
  border: none;
  color: #fff;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  transition: background 0.3s;
}

.footer-btn:hover {
  background: #0056cc;
}

.map {
  display: flex;
  align-items: center;
  justify-content: center;
}

.map img {
  width: 100%;
  display: block;
}

.addresses {
  display: flex;
  gap: 11px;
  margin-top: 15px;
}

.addresses p {
  font-weight: 300;
  font-style: Light;
  font-size: 18px;
  line-height: 125%;
  letter-spacing: 0%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.addresses p.active {
  color: #4285f5;
  font-weight: 600;
  font-size: 18px;
  line-height: 125%;
  letter-spacing: 0%;
}
</style>
