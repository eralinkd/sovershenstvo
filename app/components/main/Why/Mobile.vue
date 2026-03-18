<template>
  <section class="why-mobile">
    <div class="container">
      <div class="why-header">
        <h2 class="why-title" v-html="mainData?.why?.title"></h2>
        <div class="why-nav">
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
          class="why-slider"
          :space-between="16"
          :slides-per-view="1.15"
          :grab-cursor="true"
          :speed="600"
          :modules="modules"
          :keyboard="{ enabled: true }"
          :mousewheel="{ forceToAxis: true, sensitivity: 1 }"
          :breakpoints="{
            0: { slidesPerView: 1.05, spaceBetween: 12 },
            480: { slidesPerView: 1.1, spaceBetween: 14 },
            640: { slidesPerView: 1.15, spaceBetween: 16 },
          }"
          :free-mode="{ enabled: true, momentum: true, sticky: true }"
          @swiper="onSwiper"
        >
          <SwiperSlide v-for="(item, index) in items" :key="index">
            <article class="why-card">
              <div class="icon-wrap">
                <component :is="item.icon" style="width: 100%; height: 100%" />
              </div>
              <div class="card-title" v-html="item.title"></div>
              <div class="card-text" v-html="item.text"></div>
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
import ArrowLeft from '@/components/CommentsSlider/Icons/arrowLeft.vue'
import ArrowRight from '@/components/CommentsSlider/Icons/arrowRight.vue'
import { useMain } from '@/composables/content/useMain'
import MainWhyIconsBadge from './Icons/badge.vue'
import MainWhyIconsComfort from './Icons/comfort.vue'
import MainWhyIconsPrice from './Icons/price.vue'
import MainWhyIconsTechnologies from './Icons/technologies.vue'

const mainData = useMain()

const modules = [Keyboard, Mousewheel, FreeMode]
let swiperInstance = null

const items = [
  {
    icon: MainWhyIconsPrice,
    title: mainData?.why?.card1?.title,
    text: mainData?.why?.card1?.text,
  },
  {
    icon: MainWhyIconsTechnologies,
    title: mainData?.why?.card2?.title,
    text: mainData?.why?.card2?.text,
  },
  {
    icon: MainWhyIconsComfort,
    title: mainData?.why?.card3?.title,
    text: mainData?.why?.card3?.text,
  },
  {
    icon: MainWhyIconsBadge,
    title: mainData?.why?.card4?.title,
    text: mainData?.why?.card4?.text,
  },
]

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
.why-mobile {
  padding: 60px 0;
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
}

.why-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.why-title {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.why-nav {
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

.why-slider {
  margin-top: 20px;
  overflow: hidden;
}

.why-card {
  border-radius: 20px;
  background: #eaf2fc;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 201px;
}

.icon-wrap {
  width: 36.667px;
  height: 36.667px;
}

.card-title {
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 125%;
  margin-top: 4px;
}

.card-text {
  color: #000;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
  max-width: 70%;
}

@media (min-width: 992px) {
  .why-mobile {
    display: none;
  }
}
</style>
