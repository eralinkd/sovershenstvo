<template>
  <ClientOnly>
    <MainOffersDesktop v-if="!isMobile" :is-promotions-page="isPromotionsPage" />
    <MainOffersMobile v-else :is-promotions-page="isPromotionsPage" />
    <template #fallback>
      <MainOffersDesktop :is-promotions-page="isPromotionsPage" />
    </template>
  </ClientOnly>
</template>

<script setup>
defineProps({
  isPromotionsPage: {
    type: Boolean,
    default: false,
  },
})

const isMobile = ref(false)

onMounted(() => {
  const mq = window.matchMedia('(max-width: 991px)')
  const apply = () => (isMobile.value = mq.matches)
  apply()
  mq.addEventListener('change', apply)
  onBeforeUnmount(() => mq.removeEventListener('change', apply))
})
</script>
