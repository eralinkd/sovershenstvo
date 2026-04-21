<template>
  <header class="m-header" :class="{ 'is-open': isOpen }">
    <div class="m-header__bar">
      <div class="m-header__burger" @click="toggle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path
            d="M3.75 7.5H26.25V10H3.75V7.5ZM3.75 13.75H26.25V16.25H3.75V13.75ZM3.75 20H26.25V22.5H3.75V20Z"
            fill="#878787"
          />
        </svg>
        <p>Меню</p>
      </div>

      <NuxtLink to="/" class="m-header__logo">
        <NuxtImg src="/images/header-logo.png" alt="Логотип" />
      </NuxtLink>
    </div>

    <transition name="slide">
      <div v-if="isOpen" ref="menuRef" class="m-menu">
        <nav class="m-menu__nav">
          <ul class="col">
            <li><NuxtLink to="/about" @click="close">О нас</NuxtLink></li>
            <li><NuxtLink to="/offers" @click="close">Услуги</NuxtLink></li>
            <li><NuxtLink to="/pricing" @click="close">Стоимость услуг</NuxtLink></li>
          </ul>
          <ul class="col">
            <li><NuxtLink to="/doctors" @click="close">Специалисты</NuxtLink></li>
            <li><NuxtLink to="/promotions" @click="close">Акции</NuxtLink></li>
            <li><NuxtLink to="/reviews" @click="close">Отзывы</NuxtLink></li>
          </ul>
        </nav>

        <div class="m-menu__block">
          <div class="label">Режим работы</div>
          <div class="row">
            <AppHeaderIconsTimer />
            <span class="gray">Пн-Пт:</span>
            <span>9:00 - 20:00</span>
            <span class="sep">|</span>
            <span class="gray">Сб:</span>
            <span>9:00 - 19:00</span>
          </div>
        </div>

        <div class="m-menu__block">
          <div class="label">Телефон</div>
          <div class="row">
            <AppHeaderIconsPhone />
            <a href="tel:+73832500002"><span class="gray">+7 (8412)</span> 95-10-49</a>
            <span class="sep">|</span>
            <a href="tel:+7383951049"><span class="gray">+7 (8412)</span> 20-38-78</a>
          </div>
        </div>

        <!-- <button class="m-menu__whatsapp" @click="goWhatsapp">
          <AppHeaderIconsWhatsapp />
          <span>Написать в Whatsapp</span>
        </button> -->
        <button class="m-menu__call" @click="openModal">Заказать звонок</button>
      </div>
    </transition>
  </header>

  <div v-if="isOpen" class="m-overlay" @click="close"></div>
</template>

<script setup>
import AppHeaderIconsPhone from '@/components/AppHeader/Icons/phone.vue'
import AppHeaderIconsTimer from '@/components/AppHeader/Icons/timer.vue'

// import AppHeaderIconsWhatsapp from '@/components/AppHeader/Icons/whatsapp.vue'

const isOpen = ref(false)
const menuRef = ref(null)
const { open } = useFeedbackModal()

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function openModal() {
  close()
  open()
}

onMounted(() => {
  const onKey = (e) => {
    if (e.key === 'Escape') close()
  }
  window.addEventListener('keydown', onKey)
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
})
</script>

<style scoped>
.m-header {
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 110;
}

.m-header__bar {
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
}

.m-header__logo img {
  width: 43.429px;
  height: 38px;
  width: fit-content;
  display: block;
  margin-left: auto;
}

.m-header__burger {
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: none;
  padding: 6px 8px;
  cursor: pointer;
  color: #878787;
  leading-trim: both;
  text-edge: cap;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.m-header__menu-text {
  color: #878787;
  font-size: 13px;
}

.m-burger,
.m-burger::before,
.m-burger::after {
  content: '';
  display: block;
  width: 22px;
  height: 2px;
  background: #1e1e1e;
  position: relative;
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}

.m-burger::before {
  top: -6px;
  position: absolute;
}
.m-burger::after {
  top: 6px;
  position: absolute;
}

.m-burger.active {
  background: transparent;
}
.m-burger.active::before {
  transform: translateY(6px) rotate(45deg);
}
.m-burger.active::after {
  transform: translateY(-6px) rotate(-45deg);
}

.m-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border-top: 1px solid #ddd;
  padding: 16px 20px 20px 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}

.m-menu__nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 34px;
  margin-bottom: 20px;
}

.m-menu__nav .col {
  display: grid;
  gap: 20px;
}

.m-menu__nav a {
  color: #000;
  font-size: 13px;
  text-decoration: none;
}

.m-menu__block {
  display: grid;
  gap: 10px;
  margin-bottom: 16px;
}

.m-menu__block .label {
  color: #878787;
  font-size: 14px;
}

.row {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #000;
  font-size: 13px;
}

.row a {
  color: #000;
  text-decoration: none;
}
.sep {
  color: #878787;
  padding: 0 2px;
}
.gray {
  color: #878787;
}

.m-menu__whatsapp {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #000;
  font-size: 14px;
  background: transparent;
  border: none;
  padding: 6px 0;
  cursor: pointer;
}

.m-menu__whatsapp:hover {
  color: #25d366;
}

.m-menu__call {
  display: block;
  margin-top: 8px;
  background: #0079ff;
  color: #fff;
  border: none;
  border-radius: 26px;
  padding: 10px 17px;
  font-size: 10px;
  font-weight: 500;
}

.m-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 20;
}

/* Animations */
.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}

/* Ensure this header is mobile-only if included on desktop by mistake */
@media (min-width: 992px) {
  .m-header {
    display: none;
  }
}
</style>
