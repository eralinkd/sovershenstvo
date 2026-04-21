<template>
  <section class="feedback-mobile">
    <div class="container">
      <div class="form">
        <div class="form-content">
          <h2 class="title">Запишитесь на бесплатную консультацию прямо сейчас</h2>
          <div class="subtitle">Заполните форму и с вами свяжется администратор клиники</div>

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

          <label class="consent">
            <input v-model="isConsentGiven" type="checkbox" class="consent-input" />
            <span class="consent-box"></span>
            <span class="consent-text">
              Я согласен с
              <a href="/policy.pdf" target="_blank" rel="noopener">политикой конфиденциальности</a>
            </span>
          </label>

          <button class="submit-btn" :disabled="isSubmitting" @click="handleSubmit">
            {{ isSubmitting ? 'Отправка...' : 'Записаться на прием' }}
          </button>
        </div>

        <div class="form-image-wrap">
          <NuxtImg src="/images/feedback-form.png" alt="feedbackForm" class="form-image" />
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
</script>

<style scoped>
.feedback-mobile {
  padding: 60px 0;
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
}

.form {
  border-radius: 20px;
  background: linear-gradient(270deg, #faf1ed 0%, #eaf2fc 100%), #fff;
}

.form-content {
  padding: 24px 20px;
}

.title {
  color: #1e1e1e;
  font-family: Inter, sans-serif;
  font-size: clamp(16px, 4.8vw, 18px);
  font-style: normal;
  font-weight: 600;
  line-height: 1.2;
}

.subtitle {
  margin-top: 12px;
  color: #000;
  font-family: Inter, sans-serif;
  font-size: clamp(12px, 3.8vw, 13px);
  font-style: normal;
  font-weight: 400;
  line-height: 1.25;
}

.form-image-wrap {
  margin-top: 14px;
  border-radius: 20px;
  overflow: hidden;
}

.form-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.inputs {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.input {
  width: 100%;
  border: none;
  outline: none;
  border-radius: 39px;
  background: #fff;
  padding: 14px 17px;
  color: #1e1e1e;
  font-family: Inter, sans-serif;
  font-size: clamp(12px, 3.8vw, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 1.25;
}

.input::placeholder {
  color: #cbcbcb;
}

.consent {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}

.consent-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.consent-box {
  width: 19px;
  height: 19px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid #878787;
  background: #fff;
  position: relative;
}

.consent-text {
  color: #878787;
  font-family: Inter, sans-serif;
  font-size: clamp(10px, 3.2vw, 12px);
  font-style: normal;
  font-weight: 300;
  line-height: 1.25;
}

.consent-text a {
  color: inherit;
  text-decoration: underline;
}

.consent-input:checked + .consent-box {
  background: #0079ff;
  border-color: #0079ff;
}

.consent-input:checked + .consent-box::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 6px;
  height: 10px;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(45deg);
}

.submit-btn {
  margin-top: 14px;
  padding: 10px 17px;
  background: #0079ff;
  border-radius: 26px;
  border: none;
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: clamp(12px, 3.6vw, 14px);
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #0056cc;
}

.submit-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
  opacity: 0.6;
}

@media (min-width: 992px) {
  .feedback-mobile {
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
