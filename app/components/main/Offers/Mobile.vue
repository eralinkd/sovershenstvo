<template>
  <section class="offers-mobile">
    <div class="container">
      <div class="offers-header">
        <h2 class="offers-title">Специальные предложения</h2>
        <div class="offers-nav">
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
          <SwiperSlide>
            <article class="offer-card image-card" @click="openFeedbackModal">
              <NuxtImg class="card-image" :src="mainData?.offers?.banner1?.img" alt="Offer" />
              <div class="card-content on-image">
                <div class="badge">Акция</div>
                <div class="card-text">
                  <div class="title" v-html="mainData?.offers?.banner1?.title"></div>
                  <div class="subtitle">{{ mainData?.offers?.banner1?.subtitle }}</div>
                </div>
                <div class="more-link">
                  <span>Подробнее</span>
                  <MainOffersArrow />
                </div>
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article class="offer-card image-card" @click="openFeedbackModal">
              <NuxtImg class="card-image" :src="mainData?.offers?.banner2?.img" alt="Offer" />
              <div class="card-content on-image">
                <div class="badge">Акция</div>
                <div class="card-text">
                  <div class="title" v-html="mainData?.offers?.banner2?.title"></div>
                  <div class="subtitle">{{ mainData?.offers?.banner2?.subtitle }}</div>
                </div>
                <div class="more-link">
                  <span>Подробнее</span>
                  <MainOffersArrow />
                </div>
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article class="offer-card gradient-card" @click="openFeedbackModal">
              <div class="card-content">
                <div class="badge outline">Акция</div>
                <div class="card-text">
                  <div class="title" v-html="mainData?.offers?.banner3?.title"></div>
                </div>
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article class="offer-card gradient-card" @click="openFeedbackModal">
              <div class="card-content">
                <div class="badge outline">Акция</div>
                <div class="card-text">
                  <div class="title" v-html="mainData?.offers?.banner4?.title"></div>
                </div>
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article
              v-if="!isPromotionsPage"
              class="offer-card cta"
              @click="navigateTo('/promotions')"
            >
              <div class="cta-body">
                <div class="cta-text">Смотреть<br />все акции</div>
              </div>
            </article>
            <article v-else class="offer-card cta" @click="openFeedbackModal">
              <div class="cta-body">
                <div class="cta-text">Уникальное предложение</div>
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
import ArrowLeft from '@/components/CommentsSlider/Icons/arrowLeft.vue'
import ArrowRight from '@/components/CommentsSlider/Icons/arrowRight.vue'
import { useMain } from '@/composables/content/useMain'
import MainOffersArrow from './Arrow.vue'

const modules = [Keyboard, Mousewheel, FreeMode]
let swiperInstance = null

defineProps({
  isPromotionsPage: {
    type: Boolean,
    default: false,
  },
})
const mainData = useMain()

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

const { open } = useFeedbackModal()

function openFeedbackModal() {
  open()
}
</script>

<style scoped>
.offers-mobile {
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

.icon {
  width: 41px;
  height: 41px;
}

.offers-slider {
  margin-top: 20px;
  overflow: hidden;
}

.offer-card {
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  height: 223px;
}

.offer-card.image-card .card-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.offer-card .card-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
}

.offer-card.image-card .card-content.on-image {
  background: rgba(0, 121, 255, 0.85);
}

.badge {
  width: fit-content;
  padding: 10px 17px;
  border-radius: 39px;
  background: #fff;
  color: #0079ff;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.badge.outline {
  background: transparent;
  color: #0079ff;
  border: 1px solid #0079ff;
}

.card-text .title {
  color: #fff;
  font-family: Inter;
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.card-text .subtitle {
  margin-top: 6px;
  color: #fff;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 125%;
}

.more-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.more-link span {
  color: #fff;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.offer-card.gradient-card {
  background: linear-gradient(270deg, #faf1ed 0%, #eaf2fc 100%), #f6f9fd;
  padding: 20px;
}

.offer-card.gradient-card .card-text .title {
  color: #1e1e1e;
}

.offer-card.gradient-card .more-link span {
  color: #1e1e1e;
}

.offer-card.cta {
  background: #0079ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.offer-card.cta .cta-text {
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

@media (min-width: 992px) {
  .offers-mobile {
    display: none;
  }
}
</style>
