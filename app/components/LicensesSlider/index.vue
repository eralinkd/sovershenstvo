<template>
  <ClientOnly>
    <LicensesSliderDesktop v-if="!isMobile" />
    <LicensesSliderMobile v-else />
    <template #fallback>
      <LicensesSliderDesktop />
    </template>
  </ClientOnly>
</template>

<script setup>
const isMobile = ref(false)

onMounted(() => {
  const mq = window.matchMedia('(max-width: 768px)')
  const apply = () => (isMobile.value = mq.matches)
  apply()
  mq.addEventListener('change', apply)
  onBeforeUnmount(() => mq.removeEventListener('change', apply))
})
</script>
