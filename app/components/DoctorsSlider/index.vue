<template>
  <ClientOnly>
    <DoctorsSliderDesktop v-if="!isMobile" :is-doctors-page="isDoctorsPage" />
    <DoctorsSliderMobile v-else :is-doctors-page="isDoctorsPage" />
    <template #fallback>
      <DoctorsSliderDesktop :is-doctors-page="isDoctorsPage" />
    </template>
  </ClientOnly>
</template>

<script setup>
const isMobile = ref(false)

defineProps({
  isDoctorsPage: {
    type: Boolean,
    default: false,
  },
})

onMounted(() => {
  const mq = window.matchMedia('(max-width: 768px)')
  const apply = () => (isMobile.value = mq.matches)
  apply()
  mq.addEventListener('change', apply)
  onBeforeUnmount(() => mq.removeEventListener('change', apply))
})
</script>
