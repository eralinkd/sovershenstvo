<template>
  <ClientOnly>
    <FAQFormDesktop v-if="!isMobile" :faqs="props.faqs" :title="props.title" />
    <FAQFormMobile v-else :faqs="props.faqs" :title="props.title" />
    <template #fallback>
      <FAQFormDesktop :faqs="props.faqs" :title="props.title" />
    </template>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  faqs: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: 'Часто задаваемые <br />вопросы о лечении зубов',
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
