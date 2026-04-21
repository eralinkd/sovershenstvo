<template>
  <section class="doctors-mobile">
    <div class="container">
      <div class="header">
        <h2 class="title">{{ doctorsData.title || 'Наша команда' }}</h2>
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
          :slides-per-view="1.15"
          :grab-cursor="true"
          :speed="600"
          :modules="modules"
          :keyboard="{ enabled: true }"
          :mousewheel="{ forceToAxis: true, sensitivity: 1 }"
          :auto-height="true"
          :breakpoints="{
            0: { slidesPerView: 1.05, spaceBetween: 12 },
            480: { slidesPerView: 1.1, spaceBetween: 14 },
            640: { slidesPerView: 1.15, spaceBetween: 16 },
          }"
          :free-mode="{ enabled: true, momentum: true, sticky: true }"
          @swiper="onSwiper"
        >
          <SwiperSlide v-for="(doctor, index) in activeDoctors" :key="index">
            <article class="card">
              <div class="text">
                <div class="name">{{ doctor.name }}</div>
                <div v-if="doctor.role" class="role">{{ doctor.role }}</div>
                <div v-if="aboutHtml(doctor)" class="about" v-html="aboutHtml(doctor)" />
              </div>

              <div class="photo">
                <NuxtImg :src="doctor.photo" :alt="doctor.name" loading="lazy" />
              </div>

              <template v-if="doctor.licenses && doctor.licenses.length">
                <div class="section-title">Сертификаты</div>
                <div class="licenses">
                  <NuxtImg
                    v-for="(src, i) in doctor.licenses"
                    :key="i"
                    :src="src"
                    alt="License"
                    width="163"
                    height="231"
                    loading="lazy"
                  />
                </div>
              </template>

              <template v-if="experienceHtml(doctor)">
                <div class="section-title">Опыт</div>
                <div class="experience" v-html="experienceHtml(doctor)" />
              </template>

              <button class="cta-btn" @click="openFeedbackModal">Записаться на прием</button>
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
import { useDoctors } from '@/composables/content/useDoctors'

const modules = [Keyboard, Mousewheel, FreeMode]
let swiperInstance = null

const doctorsData = useDoctors()
const activeDoctors = computed(() => doctorsData.value?.slider?.doctors || [])

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

function aboutHtml(doctor) {
  if (!doctor || !doctor.about) return ''
  if (typeof doctor.about === 'string') return safeLines(doctor.about)
  if (Array.isArray(doctor.about)) {
    return doctor.about
      .map((entry) => {
        if (typeof entry === 'string') return `<p>${escapeHtml(entry)}</p>`
        const title = entry.title ? `<strong>${escapeHtml(entry.title)}</strong>` : ''
        const body = entry.info || entry.text || ''
        return `${title}${title ? '<br />' : ''}${safeLines(body)}`
      })
      .join('<br /><br />')
  }
  return ''
}

function experienceHtml(doctor) {
  if (!doctor || !doctor.experience) return ''
  if (typeof doctor.experience === 'string') return safeLines(doctor.experience)
  if (Array.isArray(doctor.experience)) return doctor.experience.map(escapeHtml).join('<br />')
  return ''
}

function safeLines(text) {
  const escaped = escapeHtml(String(text))
  return escaped
    .replace(/\r?\n/g, '<br />') // actual newlines
    .replace(/\\n/g, '<br />') // literal "\n" sequences
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
</script>

<style scoped>
.doctors-mobile {
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

.card {
  border-radius: 20px;
  background: #fff;
  overflow: hidden;
  padding: 16px;
}

.photo {
  border-radius: 20px;
  background: linear-gradient(270deg, #faf1ed 0%, #eaf2fc 100%);
  overflow: hidden;
  margin-top: 12px;
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
}

.photo img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

.text {
  padding: 0 0 12px 0;
}

.name {
  color: #0079ff;
  font-family: Inter, sans-serif;
  font-size: clamp(18px, 5vw, 22px);
  font-style: normal;
  font-weight: 600;
  line-height: 1.25;
}

.role {
  margin-top: 4px;
  color: #000;
  font-family: Inter, sans-serif;
  font-size: clamp(12px, 3.6vw, 13px);
  font-style: normal;
  font-weight: 400;
  line-height: 1.25;
}

.about {
  margin-top: 6px;
  color: #000;
  font-family: Inter, sans-serif;
  font-size: clamp(12px, 3.6vw, 13px);
  font-style: normal;
  font-weight: 400;
  line-height: 1.25;
}

.section-title {
  margin-top: 14px;
  color: #1e1e1e;
  font-family: Inter, sans-serif;
  font-size: clamp(14px, 4.2vw, 18px);
  font-style: normal;
  font-weight: 500;
  line-height: 1.25;
}

.licenses {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 10px;
}

.licenses img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
}

.experience {
  margin-top: 8px;
  color: #000;
  font-family: Inter, sans-serif;
  font-size: clamp(12px, 3.6vw, 13px);
  font-style: normal;
  font-weight: 400;
  line-height: 1.25;
}

.cta-btn {
  margin-top: 16px;
  padding: 12px 18px;
  background: #0079ff;
  border-radius: 26px;
  border: none;
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: clamp(12px, 3.6vw, 14px);
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 100%;
}

@media (min-width: 992px) {
  .doctors-mobile {
    display: none;
  }
}
</style>
