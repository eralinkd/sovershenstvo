<template>
  <section class="why">
    <div class="container">
      <h2 class="why-title" v-html="mainData?.why?.title"></h2>
      <div class="grid">
        <div class="block">
          <MainWhyIconsPrice />
          <div class="title" v-html="mainData?.why?.card1?.title"></div>
          <div class="text" v-html="mainData?.why?.card1?.text"></div>
        </div>
        <div class="block">
          <MainWhyIconsTechnologies />
          <div class="title" v-html="mainData?.why?.card2?.title"></div>
          <div class="text">
            <span v-html="mainData?.why?.card2?.text"></span>
          </div>
        </div>
        <div class="block">
          <MainWhyIconsComfort />
          <div class="title" v-html="mainData?.why?.card3?.title"></div>
          <div class="text">
            <span v-html="mainData?.why?.card3?.text"></span>
          </div>
        </div>
        <div class="block">
          <MainWhyIconsBadge />
          <div class="title" v-html="mainData?.why?.card4?.title"></div>
          <div class="text">
            <span v-html="mainData?.why?.card4?.text"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useMain } from '@/composables/content/useMain'

const mainData = useMain()
</script>

<style scoped>
.why {
  padding: 100px 0;
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
}

.why-title {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 40px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.block {
  border-radius: 35px;
  background: #eaf2fc;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title {
  color: #000;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: 125%; /* 37.5px */
  margin-top: 10px;
}

.text {
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 22.5px */
  max-width: 300px;
}
</style>
