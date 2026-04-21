<template>
  <div class="mx-auto max-w-2xl">
    <h1 class="mb-4 text-2xl font-bold">Основные</h1>
    <UCard class="p-4">
      <form v-if="!pending" class="space-y-4" @submit.prevent="save">
        <div>
          <h2 class="mb-3 text-base font-semibold">SEO</h2>
          <div class="space-y-3">
            <UFormField label="Заголовок сайта" class="w-full">
              <UInput v-model="form.title" class="w-full" placeholder="Совершенство — ваша стоматология" />
            </UFormField>
            <UFormField label="Meta description" class="w-full">
              <UTextarea v-model="form.seoDescription" class="w-full" placeholder="Описание для поисковиков" :rows="3" />
            </UFormField>
            <UFormField label="OG Title (для соцсетей)" class="w-full">
              <UInput v-model="form.seoOgTitle" class="w-full" placeholder="Заголовок при шаринге" />
            </UFormField>
            <UFormField label="OG Description (для соцсетей)" class="w-full">
              <UTextarea v-model="form.seoOgDescription" class="w-full" placeholder="Описание при шаринге" :rows="3" />
            </UFormField>
          </div>
        </div>

        <div class="flex gap-2 pt-2">
          <UButton type="submit" :loading="saving"> Сохранить </UButton>
          <UButton v-if="saved" variant="ghost" color="success" disabled> Сохранено </UButton>
        </div>
      </form>
      <div v-else class="flex items-center justify-center py-12">
        <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
      </div>
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const { data, refresh, pending } = useFetch('/api/admin/content/globals')

const form = ref({
  title: '',
  seoDescription: '',
  seoOgTitle: '',
  seoOgDescription: '',
})

const saving = ref(false)
const saved = ref(false)

watch(data, (val) => {
  form.value = {
    title: val?.title ?? '',
    seoDescription: val?.seoDescription ?? '',
    seoOgTitle: val?.seoOgTitle ?? '',
    seoOgDescription: val?.seoOgDescription ?? '',
  }
}, { immediate: true })

async function save() {
  saving.value = true
  saved.value = false
  try {
    await $fetch('/api/admin/content/globals', {
      method: 'PUT',
      body: {
        title: form.value.title,
        seoDescription: form.value.seoDescription,
        seoOgTitle: form.value.seoOgTitle,
        seoOgDescription: form.value.seoOgDescription,
      },
    })
    saved.value = true
    await refresh()
    setTimeout(() => { saved.value = false }, 2000)
  } catch (e) {
    console.error(e)
  } finally {
    saving.value = false
  }
}
</script>
