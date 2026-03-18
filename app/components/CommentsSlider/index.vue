<template>
  <ClientOnly>
    <CommentsSliderDesktop v-if="!isMobile" :comments="comments" />
    <CommentsSliderMobile v-else :comments="comments" />
    <template #fallback>
      <CommentsSliderDesktop :comments="comments" />
    </template>
  </ClientOnly>
</template>

<script setup>
const comments = await useCommentSlider()
const isMobile = ref(false)

onMounted(() => {
  const mq = window.matchMedia('(max-width: 768px)')
  const apply = () => (isMobile.value = mq.matches)
  apply()
  mq.addEventListener('change', apply)
  onBeforeUnmount(() => mq.removeEventListener('change', apply))
})
</script>
