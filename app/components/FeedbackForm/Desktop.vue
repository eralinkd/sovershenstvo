<template>
  <section class="feedback-form">
    <div class="container">
      <div class="form">
        <img src="/images/feedback-form.png" alt="feedbackForm" class="form-image" />
        <h2 class="title">
          Запишитесь на бесплатную <br />
          консультацию прямо сейчас
        </h2>
        <div class="subtitle">
          Заполните форму и с вами свяжется <br />
          администратор клиники
        </div>
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
          <button class="controls-btn" :disabled="isSubmitting" @click="handleSubmit">
            {{ isSubmitting ? 'Отправка...' : 'Записаться на прием' }}
          </button>
          <div class="consent">
            <input id="consent" v-model="isConsentGiven" type="checkbox" class="consent-input" />
            <label for="consent" class="consent-label">
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
import { ref } from 'vue'
import { api } from '@/api'

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
</script>

<style scoped>
.feedback-form {
  padding: 100px 0;
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
}

.form {
  padding: 80px 60px 100px 60px;
  border-radius: 50px;
  background: linear-gradient(270deg, #faf1ed 0%, #eaf2fc 100%);
  display: flex;
  flex-direction: column;
  position: relative;
}

.form-image {
  position: absolute;
  right: 15px;
  bottom: 0;
  width: 50%;
  aspect-ratio: 913/820;
}

.title {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.subtitle {
  color: #000;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 37.5px */
  margin-top: 24px;
}

.inputs {
  display: flex;
  gap: 35px;
  margin-top: 60px;
  max-width: 750px;
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
  background: #0079ff;
  border-radius: 45px;
  border: none;
  color: #fff;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  transition: background 0.3s;
}

.controls-btn:hover:not(:disabled) {
  background: #0056cc;
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
  border: 1px solid #878787;
  background: #fff;
  position: relative;
}

.consent-text {
  color: #878787;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 125%; /* 15px */
}

.consent-input:checked + .consent-label .consent-box {
  background: #0079ff;
  border-color: #0079ff;
}

.consent-input:checked + .consent-label .consent-box::after {
  content: '';
  position: absolute;
  left: 8px;
  top: 3px;
  width: 8px;
  height: 14px;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(45deg);
}

.consent-input:focus + .consent-label .consent-box {
  box-shadow: 0 0 0 3px rgba(0, 121, 255, 0.2);
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
