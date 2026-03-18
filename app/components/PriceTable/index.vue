<template>
  <ClientOnly>
    <PriceTableDesktop
      v-if="!isMobile"
      :data="data"
      :is-collapsed="isCollapsed"
      :visible-count="visibleCount"
    />
    <PriceTableMobile
      v-else
      :data="data"
      :is-collapsed="isCollapsed"
      :visible-count="visibleCount"
    />
    <template #fallback>
      <PriceTableDesktop :data="data" :is-collapsed="isCollapsed" :visible-count="visibleCount" />
    </template>
  </ClientOnly>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    required: false,
    default: () => [],
  },
  isCollapsed: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const visibleCount = 3

const isMobile = ref(false)

onMounted(() => {
  const mq = window.matchMedia('(max-width: 768px)')
  const apply = () => (isMobile.value = mq.matches)
  apply()
  mq.addEventListener('change', apply)
  onBeforeUnmount(() => mq.removeEventListener('change', apply))
})
</script>
