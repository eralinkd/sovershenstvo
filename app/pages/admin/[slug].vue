<template>
  <div>
    <h1 class="mb-6 text-2xl font-bold">{{ title }}</h1>
    <UCard>
      <p class="text-gray-600">
        Страница в разработке.
      </p>
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const route = useRoute()
const slug = route.params.slug

const titles = {
  globals: 'Основные',
  faq: 'FAQ',
  footer: 'Footer',
  main: 'Main',
  pricing: 'Pricing',
  doctors: 'Doctors',
  about: 'About',
  offers: 'Offers',
  promotions: 'Promotions',
  reviews: 'Reviews',
}

const title = computed(() => titles[slug] || 'Редактирование')
</script>
