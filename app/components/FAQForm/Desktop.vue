<template>
  <section class="faq-form">
    <div class="container">
      <h2 class="faq-form-title" v-html="resolvedTitle"></h2>
      <div class="grid">
        <div class="faq-container">
          <div
            v-for="(faq, idx) in items"
            :key="idx"
            class="item"
            :class="{ open: faq.open }"
            @click="toggle(idx)"
          >
            <div class="item-control">{{ faq.open ? '−' : '+' }}</div>
            <div class="question">{{ faq.question }}</div>
            <transition name="faq">
              <p v-show="faq.open" class="answer">{{ faq.answer }}</p>
            </transition>
          </div>
        </div>
        <div class="form">
          <div class="form-title">Остались вопросы?</div>
          <div class="form-subtitle">Запишитесь на бесплатную консультацию прямо сейчас</div>
          <div class="form-text">Заполните форму и с вами свяжется администратор клиники</div>
          <div class="inputs">
            <input v-model="formData.fullName" class="input" type="text" placeholder="Ваше имя:" />
            <input
              v-model="formData.phoneNumber"
              class="input"
              type="tel"
              placeholder="Ваш телефон:"
              @input="handlePhoneInput"
            />
          </div>
          <div class="controls">
            <button class="controls-btn" :disabled="isSubmitting" @click="handleSubmit">
              {{ isSubmitting ? 'Отправка...' : 'Записаться на прием' }}
            </button>
            <div class="consent">
              <input
                id="faq-consent"
                v-model="isConsentGiven"
                type="checkbox"
                class="consent-input"
              />
              <label for="faq-consent" class="consent-label">
                <span class="consent-box"></span>
                <span class="consent-text">
                  Я согласен с
                  <a href="/policy.pdf" target="_blank" rel="noopener"
                    >политикой конфиденциальности</a
                  >
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="toast">
        <div v-if="showSuccessNotification" class="toast">
          <div class="toast-box">
            <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M5 13l4 4L19 7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="toast-content">
              <p class="toast-title">Заявка отправлена!</p>
              <p class="toast-subtitle">Мы свяжемся с вами в ближайшее время</p>
            </div>
            <button
              class="toast-close"
              aria-label="Закрыть уведомление"
              @click="showSuccessNotification = false"
            >
              <svg class="toast-close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { api } from '@/api'
import { useFaq } from '@/composables/content/useFaq'

const showSuccessNotification = ref(false)
const isConsentGiven = ref(false)
const isSubmitting = ref(false)

const formData = ref({
  fullName: '',
  phoneNumber: '',
})

function handlePhoneInput(event) {
  let value = event.target.value

  // Удаляем все символы кроме цифр, + и пробелов
  value = value.replace(/[^\d+\s]/g, '')

  // Подсчитываем количество символов без пробелов
  const valueWithoutSpaces = value.replace(/\s/g, '')

  // Ограничиваем до 12 символов (без учета пробелов) для формата +7XXXXXXXXXX
  if (valueWithoutSpaces.length > 12) {
    value = value.slice(0, value.length - (valueWithoutSpaces.length - 12))
  }

  // Проверяем, что номер начинается правильно (только +7 или 7 или 8)
  if (valueWithoutSpaces.length > 0) {
    const firstChar = valueWithoutSpaces[0]
    if (firstChar === '8') {
      // Заменяем 8 на +7
      value = '+7' + value.slice(1)
    } else if (firstChar === '7' && valueWithoutSpaces[1] !== undefined) {
      // Если начинается с 7, добавляем +
      value = '+' + value
    } else if (firstChar !== '+' && firstChar !== '7') {
      // Если начинается не с +, 7 или 8, добавляем +7
      value = '+7' + value
    }
  }

  formData.value.phoneNumber = value
}

async function handleSubmit() {
  if (!isConsentGiven.value || isSubmitting.value) return

  // Валидация
  if (!formData.value.fullName.trim() || !formData.value.phoneNumber.trim()) {
    alert('Пожалуйста, заполните все поля')
    return
  }

  isSubmitting.value = true

  try {
    await api.pushWebsiteQuestionnaire({
      phoneNumber: formData.value.phoneNumber,
      fullName: formData.value.fullName,
    })

    showSuccessNotification.value = true

    // Очистка формы
    formData.value.fullName = ''
    formData.value.phoneNumber = ''
    isConsentGiven.value = false

    setTimeout(() => {
      showSuccessNotification.value = false
    }, 3000)
  } catch (error) {
    console.error('Ошибка отправки формы:', error)
    alert('Произошла ошибка при отправке. Попробуйте позже.')
  } finally {
    isSubmitting.value = false
  }
}

const props = defineProps({
  faqs: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: '',
  },
})

const faqData = useFaq()
const resolvedTitle = computed(() => props.title || faqData.value?.title)
const sourceItems = computed(() =>
  props.faqs && props.faqs.length ? props.faqs : (faqData.value?.items ?? []),
)
const items = ref(
  (sourceItems.value || []).map((i) => ({
    question: i.question,
    answer: i.answer,
    open: Boolean(i.open),
  })),
)

watch(sourceItems, (newItems) => {
  items.value = (newItems || []).map((i) => ({
    question: i.question,
    answer: i.answer,
    open: Boolean(i.open),
  }))
})

function toggle(index) {
  items.value[index].open = !items.value[index].open
}
</script>

<style scoped>
.faq-form {
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
  margin-top: 60px;
}

.faq-form-title {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.grid {
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form {
  height: fit-content;
  padding: 40px;
  border-radius: 35px;
  background: url('/images/faq-form/bg.png') center center / cover no-repeat;
}

.form-title {
  color: #fff;
  font-family: Inter;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.form-subtitle {
  margin-top: 30px;
  color: #fff;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 37.5px */
}

.form-text {
  color: #fff;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 22.5px */
  margin-top: 17px;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
  max-width: 640px;
}

.input {
  width: 100%;
  height: 84px;
  display: flex;
  align-items: center;
  padding: 20px 39px;
  border-radius: 59px;
  background: #fff;
  border: none;
  outline: none;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 30px */
}

.controls {
  margin-top: 40px;
  display: flex;
  align-items: center;
  gap: 40px;
}

.controls-btn {
  padding: 18.5px 30px;
  background: #fff;
  border-radius: 45px;
  border: none;
  color: #1e1e1e;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  transition: background 0.3s;
}

.controls-btn:hover:not(:disabled) {
  background: #e6e6e6;
}

.controls-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.consent {
  display: flex;
  align-items: center;
}

.consent-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.consent-label {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  width: 200px;
}

.consent-label a {
  color: inherit;
  text-decoration: underline;
}

.consent-box {
  width: 29px;
  height: 29px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #fff;
  background: #fff;
  position: relative;
}

.consent-text {
  color: #fff;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 125%; /* 15px */
}

.consent-input:checked + .consent-label .consent-box {
  background: #fff;
  border-color: #fff;
}

.consent-input:checked + .consent-label .consent-box::after {
  content: '';
  position: absolute;
  left: 8px;
  top: 3px;
  width: 8px;
  height: 14px;
  border-right: 2px solid #0079ff;
  border-bottom: 2px solid #0079ff;
  transform: rotate(45deg);
}

.consent-input:focus + .consent-label .consent-box {
  box-shadow: 0 0 0 3px rgba(0, 121, 255, 0.2);
}

.faq-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.item {
  padding: 40px;
  border-radius: 35px;
  background: #f4f1f3;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.item-control {
  position: absolute;
  right: 40px;
  top: 40px;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  cursor: pointer;
  user-select: none;
}

.question {
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 125%; /* 22.5px */
}

.answer {
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 22.5px */
  white-space: pre-line;
}

/* Smooth expand/collapse */
.faq-enter-active,
.faq-leave-active {
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
}

.faq-enter-from,
.faq-leave-to {
  max-height: 0;
  opacity: 0;
}

.faq-enter-to,
.faq-leave-from {
  max-height: 400px;
  opacity: 1;
}

/* Toast */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

.toast {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 1060;
  max-width: 360px;
}

.toast-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  background: #22c55e;
  color: #ffffff;
  border-radius: 12px;
  border: 1px solid #16a34a;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.toast-icon {
  width: 20px;
  height: 20px;
  color: #eafff1;
  margin-top: 2px;
  flex-shrink: 0;
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-family: Inter;
  font-weight: 600;
}

.toast-subtitle {
  font-family: Inter;
  font-size: 13px;
  opacity: 0.95;
  margin-top: 2px;
}

.toast-close {
  background: transparent;
  border: none;
  color: #eafff1;
  cursor: pointer;
  padding: 2px;
}

.toast-close-icon {
  width: 16px;
  height: 16px;
}
</style>
