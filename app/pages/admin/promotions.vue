<template>
  <div class="flex h-full flex-col">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Акции</h1>
      <div class="flex items-center gap-3">
        <span v-if="saved" class="text-sm text-green-600">Сохранено</span>
        <UButton :loading="saving" icon="i-lucide-save" @click="save">Сохранить</UButton>
      </div>
    </div>

    <div v-if="pending" class="flex flex-1 items-center justify-center">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <div v-else class="mx-auto w-full max-w-2xl space-y-4">
      <div class="rounded-lg border border-gray-200 bg-white p-4">
        <h2 class="mb-4 font-semibold text-gray-800">Герой</h2>
        <div class="space-y-4">
          <UFormField label="Заголовок" class="w-full">
            <UTextarea v-model="form.hero.title" :rows="3" class="w-full" />
          </UFormField>
          <UFormField label="Подзаголовок" class="w-full">
            <UInput v-model="form.hero.subtitle" class="w-full" />
          </UFormField>
          <UFormField label="Изображение">
            <AdminImagePicker v-model="form.hero.img" label="Изображение героя" />
          </UFormField>

          <div>
            <p class="mb-2 text-sm font-medium text-gray-700">Преимущества (3 блока)</p>
            <div class="space-y-2">
              <UFormField
                v-for="n in 3"
                :key="n"
                :label="`Блок ${n}`"
                class="w-full"
              >
                <UTextarea v-model="form.hero.items[n - 1].text" :rows="2" class="w-full" />
              </UFormField>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

const { data, pending, refresh } = await useFetch('/api/admin/content/promotions')

const emptyForm = () => ({
  hero: {
    title: '',
    subtitle: '',
    img: '',
    items: [{ text: '' }, { text: '' }, { text: '' }],
  },
})

const form = ref(emptyForm())
const saving = ref(false)
const saved = ref(false)

watch(
  data,
  (val) => {
    if (!val || Object.keys(val).length === 0) return
    const hero = val.hero ?? {}
    const srcItems = Array.isArray(hero.items) ? hero.items : []
    form.value = {
      hero: {
        title: hero.title ?? '',
        subtitle: hero.subtitle ?? '',
        img: hero.img ?? '',
        items: [0, 1, 2].map((i) => ({ text: srcItems[i]?.text ?? '' })),
      },
    }
  },
  { immediate: true },
)

async function save() {
  saving.value = true
  saved.value = false
  try {
    await $fetch('/api/admin/content/promotions', { method: 'PUT', body: form.value })
    await refresh()
    saved.value = true
    setTimeout(() => (saved.value = false), 3000)
  } finally {
    saving.value = false
  }
}
</script>
