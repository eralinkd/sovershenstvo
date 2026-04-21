<template>
  <ClientOnly>
    <OffersToothRestorationHeroDesktop v-if="!isMobile" />
    <OffersToothRestorationHeroMobile v-else />
    <template #fallback>
      <OffersToothRestorationHeroDesktop />
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
