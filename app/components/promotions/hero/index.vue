<template>
  <ClientOnly>
    <PromotionsHeroDesktop v-if="!isMobile" />
    <PromotionsHeroMobile v-else />
    <template #fallback>
      <PromotionsHeroDesktop />
    </template>
  </ClientOnly>
</template>

<script setup>
const isMobile = ref(false)

onMounted(() => {
  const mq = window.matchMedia('(max-width: 991px)')
  const apply = () => (isMobile.value = mq.matches)
  apply()
  mq.addEventListener('change', apply)
  onBeforeUnmount(() => mq.removeEventListener('change', apply))
})
</script>
