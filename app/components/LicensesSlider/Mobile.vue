<template>
  <section class="licenses-mobile">
    <div class="container">
      <div class="header">
        <h2 class="title">Сертификаты</h2>
        <div class="nav">
          <button class="nav-btn" aria-label="Предыдущий" @click="scrollPrev">
            <ArrowLeft class="icon" />
          </button>
          <button class="nav-btn" aria-label="Следующий" @click="scrollNext">
            <ArrowRight class="icon" />
          </button>
        </div>
      </div>

      <ClientOnly>
        <Swiper
          class="slider"
          :space-between="16"
          :slides-per-view="1.6"
          :grab-cursor="true"
          :speed="600"
          :modules="modules"
          :keyboard="{ enabled: true }"
          :mousewheel="{ forceToAxis: true, sensitivity: 1 }"
          :breakpoints="{
            0: { slidesPerView: 1.3, spaceBetween: 12 },
            480: { slidesPerView: 1.5, spaceBetween: 14 },
            640: { slidesPerView: 1.6, spaceBetween: 16 },
          }"
          :free-mode="{ enabled: true, momentum: true, sticky: true }"
          @swiper="onSwiper"
        >
          <SwiperSlide v-for="(src, index) in images" :key="index">
            <article class="slide">
              <div class="image-wrap">
                <NuxtImg :src="src" alt="Лицензия" class="image" loading="lazy" />
              </div>
            </article>
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup>
import { FreeMode, Keyboard, Mousewheel } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import ArrowLeft from './Icons/arrowLeft.vue'
import ArrowRight from './Icons/arrowRight.vue'

const modules = [Keyboard, Mousewheel, FreeMode]
let swiperInstance = null

const images = Array.from({ length: 7 }, (_, i) => `/images/licenses/${i + 1}.jpg`)

function onSwiper(instance) {
  swiperInstance = instance
}

function scrollNext() {
  if (swiperInstance) swiperInstance.slideTo(swiperInstance.activeIndex + 1, 600)
}

function scrollPrev() {
  if (swiperInstance && swiperInstance.activeIndex > 0)
    swiperInstance.slideTo(swiperInstance.activeIndex - 1, 600)
}
</script>

<style scoped>
.licenses-mobile {
  padding: 60px 0;
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.title {
  color: #1e1e1e;
  font-family: Inter, sans-serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.nav {
  display: flex;
  gap: 8px;
}

.nav-btn {
  border: none;
  background: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon {
  width: 41px;
  height: 41px;
}

.slider {
  margin-top: 20px;
  overflow: hidden;
}

.slide {
  width: 100%;
}

.image-wrap {
  width: 100%;
  aspect-ratio: 401 / 573;
  border-radius: 20px;
  overflow: hidden;
  background: #eaeaea;
}

.image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

@media (min-width: 992px) {
  .licenses-mobile {
    display: none;
  }
}
</style>
