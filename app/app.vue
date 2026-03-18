<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <FeedbackModal :is-open="isOpen" @close="close" />
  </UApp>
</template>

<script setup>
const route = useRoute()
const isAdmin = computed(() => route.path.startsWith('/admin'))

const globals = useGlobals()
const { isOpen, close } = useFeedbackModal()

useHead(() => ({
  htmlAttrs: {
    class: isAdmin.value ? 'admin-root' : 'site-content',
  },
  title: globals.value?.meta?.title ?? '',
  meta: [
    { name: 'description', content: globals.value?.meta?.seo?.description ?? '' },
    { property: 'og:title', content: globals.value?.meta?.seo?.ogTitle ?? '' },
    { property: 'og:description', content: globals.value?.meta?.seo?.ogDescription ?? '' },
    { property: 'og:image', content: '/favicon.ico' },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
}))
</script>
