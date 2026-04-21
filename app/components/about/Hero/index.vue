<template>
  <ClientOnly>
    <AboutHeroDesktop v-if="!isMobile" />
    <AboutHeroMobile v-else />
    <template #fallback>
      <AboutHeroDesktop />
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
