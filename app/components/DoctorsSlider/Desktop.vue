<template>
  <section class="doctors">
    <div class="container">
      <div class="doctors-header">
        <h2 class="doctors-title">{{ doctorsData.title || 'Наши врачи' }}</h2>
        <div class="doctors-nav">
          <button class="nav-btn" aria-label="Предыдущий" @click="scrollPrev">
            <DoctorsSliderIconsArrowLeft style="width: 41px; height: 41px" class="icon" />
          </button>
          <button class="nav-btn" aria-label="Следующий" @click="scrollNext">
            <DoctorsSliderIconsArrowRight style="width: 41px; height: 41px" class="icon" />
          </button>
        </div>
      </div>

      <ClientOnly>
        <div class="slider-wrap" :style="{ '--spv': currentSpv, '--gap': currentGap + 'px' }">
          <Swiper
            class="slider"
            :space-between="24"
            :slides-per-view="1.3"
            :grab-cursor="true"
            :speed="600"
            :modules="modules"
            :keyboard="{ enabled: true }"
            :mousewheel="{ forceToAxis: true, sensitivity: 1 }"
            :breakpoints="{
              0: { slidesPerView: 1.05, spaceBetween: 12 },
              768: { slidesPerView: 1.1, spaceBetween: 16 },
              1024: { slidesPerView: 1.2, spaceBetween: 20 },
              1280: { slidesPerView: 1.3, spaceBetween: 24 },
            }"
            :free-mode="{ enabled: true, momentum: true, sticky: true }"
            @swiper="onSwiper"
            @slide-change="updateEdgeState"
            @reach-end="updateEdgeState"
            @reach-beginning="updateEdgeState"
            @from-edge="updateEdgeState"
            @progress="onProgress"
            @resize="onResize"
            @breakpoint="onBreakpoint"
          >
            <SwiperSlide v-for="(doctor, index) in activeDoctors" :key="index">
              <article class="card">
                <div class="photo">
                  <NuxtImg
                    :src="doctor.photo"
                    :alt="doctor.name"
                    loading="lazy"
                    :img-attrs="{ style: 'width:100%;height:100%;object-fit:cover;display:block' }"
                  />
                </div>
                <div class="text-container">
                  <div class="name">{{ doctor.name }}</div>
                  <div class="role">{{ doctor.role }}</div>
                  <div v-if="aboutHtml(doctor)" class="about" v-html="aboutHtml(doctor)" />
                  <template v-if="doctor.licenses && doctor.licenses.length">
                    <div class="licenses-title">Сертификаты</div>
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
                    <div class="experience-title">Опыт</div>
                    <div class="experience-text" v-html="experienceHtml(doctor)" />
                  </template>
                </div>
              </article>
            </SwiperSlide>
          </Swiper>
          <div class="fade-right" :class="{ hidden: isEnd }"></div>
        </div>
      </ClientOnly>

      <UIButton v-if="!isDoctorsPage" style="margin-top: 40px" @click="navigateTo('/doctors')"
        >Все специалисты</UIButton
      >
      <UIButton v-if="isDoctorsPage" style="margin-top: 40px" @click="openFeedbackModal"
        >Записаться на прием</UIButton
      >
    </div>
  </section>
</template>

<script setup>
import { FreeMode, Keyboard, Mousewheel } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import { useDoctors } from '@/composables/content/useDoctors'

defineProps({
  isDoctorsPage: {
    type: Boolean,
    default: false,
  },
})

const { open } = useFeedbackModal()

function openFeedbackModal() {
  open()
}

const modules = [Keyboard, Mousewheel, FreeMode]

const doctorsData = useDoctors()
const activeDoctors = doctorsData?.slider?.doctors || []

const _doctors = [
  {
    name: 'Калашников Денис Анатольевич',
    photo: `/images/doctors-slider/doctors/1.jpg`,
    role: 'хирург-имплантолог и ортопед, ведущий специалист сети клиник «Совершенство». Стаж работы 22 года.',
    about: [
      {
        info: 'Выпускник Самарского государственного медицинского университета. Интернатура в Пензенском институте усовершенствования врачей по специальности стоматология. Клиническая ординатура при Пензенском институте усовершенствования врачей по специальности «стоматология терапевтическая». Профессиональная переподготовка в Самарском государственном медицинском университете по специальности «стоматология хирургическая». Повышение квалификации в Пензенском государственном университете по программам «стоматология хирургическая» и «стоматология ортопедическая».',
      },
    ],
    licenses: [
      '/images/doctors-slider/licenses/1/1.jpg',
      '/images/doctors-slider/licenses/1/2.jpg',
      '/images/doctors-slider/licenses/1/3.jpg',
      '/images/doctors-slider/licenses/1/4.jpg',
      '/images/doctors-slider/licenses/1/5.jpg',
      '/images/doctors-slider/licenses/1/6.jpg',
    ],
  },
  {
    name: 'Светлана Анатольевна Зубкова',
    photo: `/images/doctors-slider/doctors/2.jpg`,
    role: 'Врач стоматолог-терапевт, кандидат медицинских наук',
    about: [
      {
        title: 'Направления практической деятельности:',
        info: '- Комплексный подход к диагностике заболеваний зубо-челюстной системы.\n- Лечение пульпита и периодонтита с применением современных методов механической и медикаметозной обработки корневых каналов.\n- Повторное эндодонтическое лечение зубов с некачественно запломбированными корневыми каналами.\n- Реставрация зубов.\n- Диагностика и лечение заболеваний пародонта и слизистой оболочки полости рта.',
      },
      {
        info: 'Эндодонтическое лечение представляет собой сложный трудоемкий процесс... "В эндодонтии нет мелочей. Качественно проведенное эндодонтическое лечение — залог сохранности зуба на долгие годы."',
      },
      {
        title: ' Особо сложные случаи, с которыми работаем: ',
        info: '- Искривлённые и узкие корневые каналы.\n- Перфорации дна полости зуба и стенки корневого канала.\n- Лечение хронических периодонтитов, течение которых сопровождается частыми обострениями.',
      },
    ],
    experience:
      'Искривлённые и узкие корневые каналы; перфорации; лечение хронических периодонтитов и др.',
  },
  {
    name: 'Светлана Владимировна Фокина',
    photo: `/images/doctors-slider/doctors/3.jpg`,
    role: 'Врач-стоматолог-терапевт',
    about: [
      {
        title: 'Направления деятельности:',
        info: '- Лечение кариеса с максимальным сохранением здоровых тканей.\n- Эндодонтия (лечение пульпита и периодонтита) с гарантией качества.\n- Художественная реставрация зубов.\n- Профессиональная гигиена.\n- Микропротезирование (восстановление зуба с использованием стекловолокна).\n- Диагностика и профилактика стоматологических заболеваний.',
      },
      {
        title: 'Особый подход к эстетике:',
        info: '- Реставрация передних зубов – восстановление формы и цвета.\n- Подбор оттенка пломб под естественную эмаль.\n- Воссоздание анатомических особенностей зубов.\n- Использование высококачественных композитных материалов.',
      },
      {
        title: 'Бережное лечение для вашего комфорта:',
        info: '- Индивидуальный подход к каждому пациенту\n- Безболезненные методики лечения\n- Поэтапное объяснение всех процедур\n- Возможность делать паузы по необходимости\n- Особое внимание тревожным пациентам',
      },
      {
        title: 'Принципы работы:',
        info: '"Моя цель – не просто вылечить зуб, а сделать это так, чтобы:\n- вы чувствовали себя комфортно;\n- результат выглядел естественно;\n- зуб оставался здоровым как можно дольше."',
      },
    ],
  },
  {
    name: 'Марьям Гелаевна Бараташвили',
    photo: `/images/doctors-slider/doctors/4.jpg`,
    role: 'Врач стоматолог-терапевт',
    about: [
      {
        title: 'Основные направления работы:',
        info: '- Лечение кариеса – бережное удаление пораженных тканей и восстановление зуба современными пломбировочными материалами.\n- Лечение пульпита и периодонтита – качественная обработка корневых каналов.\n- Эстетическая реставрация – восстановление формы и цвета зубов для естественной улыбки.\n- Профессиональная чистка – удаление налета и камня ультразвуком, полировка и фторирование.\n- Диагностика – выявление проблем на ранней стадии с помощью рентгена и визуального осмотра.',
      },
      {
        title: 'Принципы работы:',
        info: '- Индивидуальный подход к каждому пациенту.\n- Безболезненное лечение с использованием современных анестетиков.\n- Минимальное вмешательство при максимальном сохранении здоровых тканей зубов.\n- Точная и качественная эндодонтическая подготовка зубов к протезированию.',
      },
      {
        info: '«Сохранение жизнеспособности зуба – первостепенная задача. Однако в случаях, когда депульпирование необходимо, ключевым становится качественное лечение, обеспечивающее длительную сохранность зуба.»',
      },
    ],
  },
  {
    name: 'Елена Андреевна Белякова',
    photo: `/images/doctors-slider/doctors/5.jpg`,
    role: 'Врач стоматолог-ортопед',
    about: [
      {
        title: 'Направления деятельности:',
        info: '- Составление плана лечения.\n- Восстановление зубного ряда с использованием различных ортопедических конструкций.\n- Профессиональная гигиена и отбеливание зубов.\n- Шинирование, изготовление съемных и несъемных ретейнеров.\n- Профилактика и ранняя диагностика стоматологических заболеваний.',
      },
      {
        title: 'Принципы работы:',
        info: '- Индивидуальный подход к каждому пациенту.\n- Умение создать комфортную и непринужденную обстановку во время лечения.\n- Использование современных методик и оборудования, постоянное обучение и совершенствование.',
      },
      {
        info: '"Я не просто подбираю вам новые зубы — я помогаю почувствовать их "своими". Для меня важно, чтобы вы уходили не только с красивой улыбкой, но и с ощущением, что вас услышали и поняли. Стоматология должна быть человечной."',
      },
    ],
  },
  {
    name: 'Надежда Владимировна Поташ',
    photo: `/images/doctors-slider/doctors/6.jpg`,
    role: 'Врач-стоматолог',
    about: [
      {
        title: 'Направления деятельности:',
        info: '- Профессиональная гигиена полости рта (ультразвук, Air Flow, полировка).\n- Реминерализующая терапия для укрепления эмали.\n- Ранняя диагностика кариеса и профилактика его развития.\n- Лечение кариеса и его осложнений.\n- Герметизация фиссур (защита жевательных зубов).\n- Обучение правильной гигиене (индивидуальный подбор средств).',
      },
      {
        title: 'Особый подход к профилактике:',
        info: '- Комплексная чистка зубов – удаление налета, над- и поддесневых зубных отложений.\n- Фторирование и кальцинирование для укрепления эмали.\n- Индивидуальные программы ухода за зубами и деснами.\n- Контроль домашней гигиены с коррекцией методик чистки.\n- Щадящие методики для чувствительных зубов.',
      },
      {
        title: 'Почему важна регулярная гигиена?',
        info: '"90% проблем с зубами можно предотвратить! Моя задача – не просто почистить зубы, а научить вас поддерживать их здоровье между визитами к стоматологу."',
      },
    ],
  },
  {
    name: 'Сергей Иванович Акифьев',
    photo: `/images/doctors-slider/doctors/7.jpg`,
    role: 'Врач стоматолог-ортопед',
    about: [
      {
        title: 'Направления деятельности:',
        info: '- Составление комплексного плана лечения, опираясь на компьютерную томографию.\n- Изготовление съемных и условно-съемных протезов, не доставляющих дискомфорта.\n- Коронки и мостовидные протезы всех видов из премиальных материалов.\n- Использование технологии компьютерного моделирования для высокой точности.',
      },
      {
        title: 'Особый подход к протезированию:',
        info: '- Для тех, кто ценит естественность – подбор форм и оттенков, идентичных натуральным зубам.\n- Для требовательных пациентов – использование премиальных материалов.\n- Для сложных случаев – комплексные решения при полном или частичном отсутствии зубов.',
      },
      {
        info: '"Качественное протезирование – это не просто новые зубы, а восстановление:\n- естественной функции жевания,\n- эстетики улыбки,\n- уверенности в себе.\nЯ работаю для того, чтобы вы забыли, что у вас когда-то были проблемы с зубами."',
      },
    ],
  },
]

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

let swiperInstance = null
const isEnd = ref(false)
const currentSpv = ref(1.5)
const currentGap = ref(24)

function onSwiper(instance) {
  swiperInstance = instance
  updateSpvFromInstance()
  updateGapFromInstance()
  updateEdgeState()
}

function updateEdgeState() {
  if (!swiperInstance) return
  isEnd.value = swiperInstance.isEnd
}

function updateSpvFromInstance() {
  if (!swiperInstance) return
  const spv =
    typeof swiperInstance.params.slidesPerView === 'number'
      ? swiperInstance.params.slidesPerView
      : 1.5
  currentSpv.value = spv
}

function onResize() {
  updateSpvFromInstance()
  updateGapFromInstance()
}

function onBreakpoint() {
  updateSpvFromInstance()
  updateGapFromInstance()
}

function scrollNext() {
  if (swiperInstance) swiperInstance.slideTo(swiperInstance.activeIndex + 1, 600)
}

function updateGapFromInstance() {
  if (!swiperInstance) return
  const isNumber = typeof swiperInstance.params.spaceBetween === 'number'
  const gap = isNumber ? swiperInstance.params.spaceBetween : 24
  currentGap.value = gap
}

function onProgress() {
  if (!swiperInstance) return
  // Hide fade near the very end so it doesn't cover last slide content
  isEnd.value = swiperInstance.isEnd || swiperInstance.progress > 0.985
}

function scrollPrev() {
  if (swiperInstance && swiperInstance.activeIndex > 0)
    swiperInstance.slideTo(swiperInstance.activeIndex - 1, 600)
}
</script>

<style scoped>
.doctors {
  padding: 100px 0;
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
}

.doctors-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.doctors-nav {
  display: flex;
  gap: 10px;
}

.nav-btn {
  border: none;
  background: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
}

.doctors-title {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.slider-wrap {
  margin-top: 40px;
  position: relative;
  --spv: 1.5;
  --gap: 24px;
}

.fade-right {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: calc(((100% - var(--gap)) / var(--spv)) * (var(--spv) - 1) + var(--gap));
  pointer-events: none;
  background: linear-gradient(to left, #fff 0%, rgba(255, 255, 255, 0) 100%);
  z-index: 5;
}

.fade-right.hidden {
  opacity: 0;
}

.slider {
  height: 100%;
  width: 100%;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  position: relative;
  z-index: 1;
}

.card {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr; /* 1:1 image to text */
  overflow: hidden;
  gap: 20px;
}

.photo {
  width: 100%;
  height: fit-content;
  border-radius: 50px;
  overflow: hidden;
  background: linear-gradient(270deg, #faf1ed 0%, #eaf2fc 100%);
  min-width: 0;
}

.photo img {
  width: 100%;
  object-fit: cover;
  display: block;
}

.text-container {
  height: fit-content;
  background: #fff;
  box-sizing: border-box;
  min-width: 0;
}

.name {
  color: #0079ff;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: 125%; /* 37.5px */
}

.role {
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 22.5px */
}

.about {
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 22.5px */
  margin-top: 20px;
}

.licenses-title {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: 125%; /* 37.5px */
  margin-top: 20px;
}

.licenses {
  display: flex;
  overflow-x: scroll;
  gap: 15px;
  margin-top: 20px;
}

.licenses img {
  display: block;
  object-fit: contain;
}

.experience-title {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: 125%; /* 37.5px */
  margin-top: 20px;
}

.experience-text {
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 22.5px */
  margin-top: 20px;
}
</style>
