<template>
  <section class="therapy-offers-mobile">
    <div class="container">
      <div class="offers-header">
        <h2 class="offers-title">Услуги</h2>
        <div class="offers-nav">
          <button class="nav-btn" aria-label="Предыдущий" @click="scrollPrev">
            <ArrowLeft class="icon-ctrl" />
          </button>
          <button class="nav-btn" aria-label="Следующий" @click="scrollNext">
            <ArrowRight class="icon-ctrl" />
          </button>
        </div>
      </div>

      <ClientOnly>
        <Swiper
          class="offers-slider"
          :space-between="16"
          :slides-per-view="1.1"
          :grab-cursor="true"
          :speed="600"
          :modules="modules"
          :keyboard="{ enabled: true }"
          :mousewheel="{ forceToAxis: true, sensitivity: 1 }"
          :breakpoints="{
            0: { slidesPerView: 1.05, spaceBetween: 12 },
            480: { slidesPerView: 1.1, spaceBetween: 14 },
            640: { slidesPerView: 1.2, spaceBetween: 16 },
          }"
          :free-mode="{ enabled: true, momentum: true, sticky: true }"
          @swiper="onSwiper"
        >
          <SwiperSlide v-for="(item, index) in items" :key="index">
            <NuxtLink :to="item.link || '/'" class="card">
              <div class="top">
                <div class="text">
                  <div class="topic">{{ item.topic }}</div>
                  <p>{{ item.text }}</p>
                </div>
                <component :is="icons[index]" class="icon" />
              </div>
              <div class="bottom">
                <p>{{ item.price }}</p>
                <TherapyOffersIconsArrow />
              </div>
            </NuxtLink>
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
import ArrowLeft from '@/components/CommentsSlider/Icons/arrowLeft.vue'
import ArrowRight from '@/components/CommentsSlider/Icons/arrowRight.vue'
import TherapyOffersIconsFifth from '@/components/therapy/offers/Icons/fifth.vue'
import TherapyOffersIconsFirst from '@/components/therapy/offers/Icons/first.vue'
import TherapyOffersIconsFourth from '@/components/therapy/offers/Icons/fourth.vue'
import TherapyOffersIconsSecond from '@/components/therapy/offers/Icons/second.vue'
import TherapyOffersIconsSixth from '@/components/therapy/offers/Icons/sixth.vue'
import TherapyOffersIconsThird from '@/components/therapy/offers/Icons/third.vue'
import { useOffers } from '@/composables/content/useOffers'

const modules = [Keyboard, Mousewheel, FreeMode]
let swiperInstance = null

const icons = {
  0: TherapyOffersIconsFirst,
  1: TherapyOffersIconsThird,
  2: TherapyOffersIconsFourth,
  3: TherapyOffersIconsFifth,
  4: TherapyOffersIconsSixth,
  5: TherapyOffersIconsSecond,
}

const items = useOffers()

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
.therapy-offers-mobile {
  padding: 60px 0;
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
}

.offers-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.offers-title {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.offers-nav {
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

.icon-ctrl {
  width: 41px;
  height: 41px;
}

.offers-slider {
  margin-top: 20px;
  overflow: hidden;
}

.card {
  border-radius: 22px;
  background: #eaf2fc;
  padding: 20px;
  display: block;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.text {
  max-width: 70%;
}

.topic {
  color: #1e1e1e;
  font-family: Inter;
  font-size: clamp(14px, 4.2vw, 18px);
  font-style: normal;
  font-weight: 600;
  line-height: 1.25;
}

.text p {
  margin-top: 8px;
  color: #1e1e1e;
  font-family: Inter;
  font-size: clamp(12px, 3.6vw, 13px);
  font-style: normal;
  font-weight: 400;
  line-height: 1.25;
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bottom p {
  color: #000;
  font-family: Inter;
  font-size: clamp(14px, 4.6vw, 18px);
  font-style: normal;
  font-weight: 400;
  line-height: 1.25;
}

.icon {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
}

@media (min-width: 992px) {
  .therapy-offers-mobile {
    display: none;
  }
}
</style>
