<template>
  <div>
    <AppHeader />
    <main>
      <MainHero />
      <MainStrengths />
      <MainServices />
      <MainOffers />
      <MainUnique />
      <MainDetails />
      <MainWhy />
      <PriceTable
        v-if="mainData?.pricing && mainData?.pricing.length > 0"
        :data="mainData?.pricing"
        :is-collapsed="true"
      />
      <FeedbackForm />
      <DoctorsSlider />
      <CommentsSlider />
      <LicensesSlider />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { useMain } from '~/composables/content/useMain'

const mainData = useMain()
</script>
