<template>
  <section class="faq-form-mobile">
    <div class="container">
      <h2 class="faq-form-title" v-html="resolvedTitle"></h2>

      <div class="faq-container">
        <div
          v-for="(faq, idx) in items"
          :key="idx"
          class="item"
          :class="{ open: faq.open }"
          @click="toggle(idx)"
        >
          <div class="item-control" aria-hidden="true">{{ faq.open ? '−' : '+' }}</div>
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
          />
        </div>
        <div class="controls">
          <div class="consent">
            <input
              id="faqm-consent"
              v-model="isConsentGiven"
              type="checkbox"
              class="consent-input"
            />
            <label for="faqm-consent" class="consent-label">
              <span class="consent-box"></span>
              <span class="consent-text">
                Я согласен с
                <a href="/policy.pdf" target="_blank" rel="noopener"
                  >политикой конфиденциальности</a
                >
              </span>
            </label>
          </div>
          <button class="controls-btn" :disabled="isSubmitting" @click="handleSubmit">
            {{ isSubmitting ? 'Отправка...' : 'Записаться на прием' }}
          </button>
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

const faqData = await useFaq()
const resolvedTitle = computed(() => props.title || faqData.title)
const sourceItems = computed(() => (props.faqs && props.faqs.length ? props.faqs : faqData.items))
const items = ref(
  sourceItems.value.map((i) => ({
    question: i.question,
    answer: i.answer,
    open: Boolean(i.open),
  })),
)

function toggle(index) {
  items.value[index].open = !items.value[index].open
}
</script>

<style scoped>
.faq-form-mobile {
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
  margin-top: 40px;
}

.faq-form-title {
  color: #1e1e1e;
  font-family: Inter;
  font-size: clamp(24px, 7.2vw, 30px);
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.faq-container {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item {
  padding: 20px;
  border-radius: 22px;
  background: #f4f1f3;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.item-control {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  user-select: none;
}

.question {
  color: #000;
  font-family: Inter;
  font-size: clamp(14px, 4.2vw, 18px);
  font-style: normal;
  font-weight: 600;
  line-height: 1.25;
  padding-right: 32px; /* prevent overlap with absolute +/- control */
}

.answer {
  color: #000;
  font-family: Inter;
  font-size: clamp(12px, 3.6vw, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 1.25;
  white-space: pre-line;
}

.form {
  height: fit-content;
  margin-top: 16px;
  padding: 20px;
  border-radius: 22px;
  background: url('/images/faq-form/bg.png') center center / cover no-repeat;
}

.form-title {
  color: #fff;
  font-family: Inter;
  font-size: clamp(24px, 7.2vw, 30px);
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.form-subtitle {
  margin-top: 10px;
  color: #fff;
  font-family: Inter;
  font-size: clamp(12px, 4vw, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 1.25;
}

.form-text {
  color: #fff;
  font-family: Inter;
  font-size: clamp(12px, 3.6vw, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 1.25;
  margin-top: 10px;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
}

.input {
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  padding: 14px 21px;
  border-radius: 39px;
  background: #fff;
  border: none;
  outline: none;
  font-family: Inter;
  font-size: clamp(12px, 3.6vw, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 1.25;
}

.controls {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
}

.controls-btn {
  padding: 10px 17px;
  background: #fff;
  border-radius: 26px;
  border: none;
  color: #1e1e1e;
  font-family: Inter;
  font-size: clamp(12px, 3.6vw, 14px);
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  transition: background 0.3s ease;
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
  gap: 10px;
  cursor: pointer;
  width: 200px;
}

.consent-label a {
  color: inherit;
  text-decoration: underline;
}

.consent-box {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #fff;
  background: #fff;
  position: relative;
}

.consent-text {
  color: #fff;
  font-family: Inter;
  font-size: clamp(10px, 3.2vw, 12px);
  font-style: normal;
  font-weight: 300;
  line-height: 1.25;
}

.consent-input:checked + .consent-label .consent-box {
  background: #fff;
  border-color: #fff;
}

.consent-input:checked + .consent-label .consent-box::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 3px;
  width: 6px;
  height: 10px;
  border-right: 2px solid #0079ff;
  border-bottom: 2px solid #0079ff;
  transform: rotate(45deg);
}

.consent-input:focus + .consent-label .consent-box {
  box-shadow: 0 0 0 3px rgba(0, 121, 255, 0.2);
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

@media (min-width: 992px) {
  .faq-form-mobile {
    display: none;
  }
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
