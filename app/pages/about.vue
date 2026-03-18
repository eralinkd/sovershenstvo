<template>
  <div>
    <AppHeader />
    <main>
      <AppBreadcrumbs :path="breadcrumbs" />
      <AboutHero />
      <DoctorsSlider />
      <AboutMission />
      <AboutDoctors />
      <CommentsSlider />
      <FeedbackForm />
      <LicensesSlider />
      <FAQForm :faqs="faqData.items" :title="faqData.title" />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { useFaq } from '~/composables/content/useFaq'

const breadcrumbs = [
  { path: '/', name: 'Главная' },
  { path: '/about', name: 'О нас' },
]

const faqData = useFaq()
</script>
