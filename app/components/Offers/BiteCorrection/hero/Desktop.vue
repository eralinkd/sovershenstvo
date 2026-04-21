<template>
  <section class="therapy-hero">
    <div class="container">
      <div class="grid">
        <div class="left">
          <div class="title">Исправление прикуса зубов</div>
          <div class="subtitle">по доступной цене: от <span class="bold">15 000 ₽</span></div>
          <div class="info">
            <div class="item">
              <TherapyHeroIconsSmiles />
              <p>Более 18 лет <br />мы дарим улыбки</p>
            </div>
            <div class="item">
              <TherapyHeroIconsClients />
              <p>
                250 000+ <br />
                довольных пациентов
              </p>
            </div>
            <div class="item">
              <TherapyHeroIconsAchivement />
              <p>
                Признание <br />
                на «Продокторов»
              </p>
            </div>
          </div>
          <button class="therapy-btn" @click="openFeedbackModal">Записаться на прием</button>
        </div>
        <div class="img">
          <NuxtImg src="/images/page-therapy/page-tooth-decay/hero.png" alt="therapy" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { open } = useFeedbackModal()

function openFeedbackModal() {
  open()
}
</script>

<style scoped>
.therapy-hero {
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
  margin-top: 60px;
}

.grid {
  display: grid;
  grid-template-columns: 650fr 1113fr;
  gap: 30px;
}

.img {
  border-radius: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.title {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.bold {
  font-weight: 600;
}

.subtitle {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 37.5px */
}

.info {
  max-width: 476px;
  border-radius: 35px;
  background: #eaf2fc;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 35px;
}

.item {
  display: flex;
  align-items: center;
  gap: 35px;
  color: #1e1e1e;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 125%; /* 22.5px */
}

.therapy-btn {
  width: fit-content;
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

.therapy-btn:hover {
  background: #0056cc;
}
</style>
