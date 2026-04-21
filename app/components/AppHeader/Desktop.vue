<template>
  <div class="sticky-header">
    <header class="header">
      <div class="header-main">
        <div class="header-content">
          <div class="header-separator"></div>
          <div class="header-logo">
            <NuxtLink to="/">
              <NuxtImg src="/images/header-logo.png" alt="Логотип" />
            </NuxtLink>
          </div>

          <div class="header-info">
            <div class="header-schedule">
              <div class="info-label">Режим работы</div>
              <div class="info-content">
                <AppHeaderIconsTimer />
                <span class="gray">Пн-Пт:</span> 9:00 - 20:00
                <div class="separator"></div>
                <span class="gray">Сб:</span> 9:00 - 19:00
              </div>
            </div>

            <div class="header-phone">
              <div class="info-label">Телефон</div>
              <div class="info-content">
                <AppHeaderIconsPhone />
                <span class="gray">+7 (8412) </span>25-00-02
                <div class="separator"></div>
                <span class="gray">+7 (8412) </span>95-10-49
              </div>
            </div>

            <div class="header-whatsapp">
              <!-- <AppHeaderIconsWhatsapp />
              <span>Написать в Whatsapp</span> -->
            </div>
          </div>

          <button class="header-call-btn" @click="openModal">Заказать звонок</button>
        </div>
      </div>
    </header>

    <nav class="navigation">
      <div class="container">
        <div class="nav-menu">
          <NuxtLink to="/about" class="nav-link">О нас</NuxtLink>
          <div class="nav-separator"></div>
          <NuxtLink to="/offers" class="nav-link">Услуги</NuxtLink>
          <div class="nav-separator"></div>
          <NuxtLink to="/pricing" class="nav-link">Стоимость услуг</NuxtLink>
          <div class="nav-separator"></div>
          <NuxtLink to="/doctors" class="nav-link">Специалисты</NuxtLink>
          <div class="nav-separator"></div>
          <NuxtLink to="/promotions" class="nav-link">Акции</NuxtLink>
          <div class="nav-separator"></div>
          <NuxtLink to="/reviews" class="nav-link">Отзывы</NuxtLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
const { open } = useFeedbackModal()

function openModal() {
  open()
}
</script>

<style scoped>
/* Sticky container for header + navigation */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Header */
.header {
  background: #fff;
  transition: box-shadow 0.3s ease;
}

.header:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 1640px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 40px;
  padding: 20px 30px 20px 30px;
  position: relative;
}

.header-separator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 1px;
  background: #ddd;
}

.header-logo img {
  /* height: 110px; */
  /* width: auto; */
  transition: transform 0.3s ease;
}

.header-logo:hover img {
  transform: scale(1.05);
}

.header-info {
  display: flex;
  align-items: flex-end;
  gap: 60px;
  color: #000;
  font-size: 14px;
  font-weight: 400;
}

.header-schedule,
.header-phone {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 7px;
}

.header-whatsapp {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  transition:
    color 0.3s ease,
    transform 0.2s ease;
}

.header-whatsapp:hover {
  color: #25d366;
  transform: translateY(-2px);
}

.info-label {
  color: #878787;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.info-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.phone-bold {
  font-weight: 700;
  color: #333;
}

.header-search {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 15px;
}

.search-input {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input input {
  width: 220px;
  padding: 12px 12px 12px 40px;
  border: none;
  border-bottom: 1px solid #e5e5e5;
  font-size: 16px;
  color: #333;
  background: transparent;
  text-align: center;
}

.search-input input::placeholder {
  color: #666;
  text-align: center;
}

.search-icon {
  position: absolute;
  left: 10px;
  width: 28px;
  height: 28px;
}

.search-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
  background: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  color: #666;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.3s;
}

.search-btn:hover {
  background: #e5e5e5;
}

.search-btn img {
  width: 16px;
  height: 16px;
}

.header-call-btn {
  padding: 15px 30px;
  background: #0079ff;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  margin-top: 15px;
}

.header-call-btn:hover {
  background: #0056cc;
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(0, 121, 255, 0.3);
}

/* Navigation */
.navigation {
  background: #fff;
  padding: 15px 0;
  position: relative;
}

.navigation .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  color: #333;
  font-size: 17px;
  font-weight: 400;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-link:hover {
  background: #f5f5f5;
}

.nav-link.active {
  color: #0079ff;
  background: #f0f8ff;
  border-bottom: 2px solid #0079ff;
}

.nav-separator {
  width: 1px;
  height: 20px;
  background: #e5e5e5;
}

.gray {
  color: #878787;
}
</style>
