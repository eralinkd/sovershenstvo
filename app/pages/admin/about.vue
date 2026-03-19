<template>
  <div class="flex h-full flex-col">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">О клинике</h1>
      <div class="flex items-center gap-3">
        <span v-if="saved" class="text-sm text-green-600">Сохранено</span>
        <UButton :loading="saving" icon="i-lucide-save" @click="save">Сохранить</UButton>
      </div>
    </div>

    <div v-if="pending" class="flex flex-1 items-center justify-center">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <div v-else class="mx-auto w-full max-w-2xl space-y-6">
      <!-- Page title -->
      <UFormField label="Заголовок страницы" class="w-full">
        <UInput v-model="form.title" class="w-full" />
      </UFormField>

      <!-- Hero -->
      <div class="rounded-lg border border-gray-200 bg-white p-4">
        <h2 class="mb-4 font-semibold text-gray-800">Герой</h2>
        <div class="space-y-4">
          <UFormField label="Цитата" class="w-full">
            <UTextarea v-model="form.hero.quote" :rows="3" class="w-full" />
          </UFormField>
          <UFormField label="Автор цитаты" class="w-full">
            <UInput v-model="form.hero.quoteAuthor" class="w-full" />
          </UFormField>
          <UFormField label="Изображение">
            <AdminImagePicker v-model="form.hero.topImage" label="Изображение героя" />
          </UFormField>
          <UFormField label="Текст под изображением" class="w-full">
            <UTextarea v-model="form.hero.bottomText" :rows="4" class="w-full" />
          </UFormField>
          <UFormField label="Кнопка CTA" class="w-full">
            <UInput v-model="form.hero.ctaText" class="w-full" />
          </UFormField>

          <div>
            <p class="mb-2 text-sm font-medium text-gray-700">Статистика (цифры)</p>
            <div class="grid grid-cols-3 gap-3">
              <UFormField label="Первая" class="w-full">
                <UInput v-model="form.hero.stats.first" class="w-full" />
              </UFormField>
              <UFormField label="Вторая" class="w-full">
                <UInput v-model="form.hero.stats.second" class="w-full" />
              </UFormField>
              <UFormField label="Третья" class="w-full">
                <UInput v-model="form.hero.stats.third" class="w-full" />
              </UFormField>
            </div>
          </div>

          <div>
            <p class="mb-2 text-sm font-medium text-gray-700">Статистика (подписи)</p>
            <div class="grid grid-cols-3 gap-3">
              <UFormField label="Первая" class="w-full">
                <UInput v-model="form.hero.statsLabels.first" class="w-full" />
              </UFormField>
              <UFormField label="Вторая" class="w-full">
                <UInput v-model="form.hero.statsLabels.second" class="w-full" />
              </UFormField>
              <UFormField label="Третья" class="w-full">
                <UInput v-model="form.hero.statsLabels.third" class="w-full" />
              </UFormField>
            </div>
          </div>
        </div>
      </div>

      <!-- Mission -->
      <div class="rounded-lg border border-gray-200 bg-white p-4">
        <h2 class="mb-4 font-semibold text-gray-800">Миссия</h2>
        <div class="space-y-4">
          <UFormField label="Заголовок" class="w-full">
            <UInput v-model="form.mission.title" class="w-full" />
          </UFormField>
          <UFormField label="Подзаголовок" class="w-full">
            <UTextarea v-model="form.mission.subtitle" :rows="2" class="w-full" />
          </UFormField>

          <div class="space-y-3">
            <p class="text-sm font-medium text-gray-700">Блоки (фиксированные)</p>
            <div
              v-for="n in 6"
              :key="n"
              class="rounded-lg border border-gray-100 bg-gray-50 p-3"
            >
              <p class="mb-2 text-xs font-semibold text-gray-400">Блок {{ n }}</p>
              <UFormField :label="`Заголовок блока ${n}`" class="mb-2 w-full">
                <UTextarea v-model="form.mission.blocks[`block${n}`].title" :rows="2" class="w-full" />
              </UFormField>
              <UFormField :label="`Текст блока ${n}`" class="w-full">
                <UTextarea v-model="form.mission.blocks[`block${n}`].text" :rows="3" class="w-full" />
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

const { data, pending, refresh } = await useFetch('/api/admin/content/about')

const emptyBlock = () => ({ title: '', text: '' })
const emptyForm = () => ({
  title: '',
  hero: {
    quote: '',
    quoteAuthor: '',
    topImage: '',
    bottomText: '',
    ctaText: '',
    stats: { first: '', second: '', third: '' },
    statsLabels: { first: '', second: '', third: '' },
  },
  mission: {
    title: '',
    subtitle: '',
    blocks: {
      block1: emptyBlock(),
      block2: emptyBlock(),
      block3: emptyBlock(),
      block4: emptyBlock(),
      block5: emptyBlock(),
      block6: emptyBlock(),
    },
  },
})

const form = ref(emptyForm())
const saving = ref(false)
const saved = ref(false)

watch(
  data,
  (val) => {
    if (!val || Object.keys(val).length === 0) return
    const f = emptyForm()
    f.title = val.title ?? ''
    f.hero.quote = val.hero?.quote ?? ''
    f.hero.quoteAuthor = val.hero?.quoteAuthor ?? ''
    f.hero.topImage = val.hero?.topImage ?? ''
    f.hero.bottomText = val.hero?.bottomText ?? ''
    f.hero.ctaText = val.hero?.ctaText ?? ''
    f.hero.stats.first = val.hero?.stats?.first ?? ''
    f.hero.stats.second = val.hero?.stats?.second ?? ''
    f.hero.stats.third = val.hero?.stats?.third ?? ''
    f.hero.statsLabels.first = val.hero?.statsLabels?.first ?? ''
    f.hero.statsLabels.second = val.hero?.statsLabels?.second ?? ''
    f.hero.statsLabels.third = val.hero?.statsLabels?.third ?? ''
    f.mission.title = val.mission?.title ?? ''
    f.mission.subtitle = val.mission?.subtitle ?? ''
    for (let n = 1; n <= 6; n++) {
      const key = `block${n}`
      f.mission.blocks[key].title = val.mission?.blocks?.[key]?.title ?? ''
      f.mission.blocks[key].text = val.mission?.blocks?.[key]?.text ?? ''
    }
    form.value = f
  },
  { immediate: true },
)

async function save() {
  saving.value = true
  saved.value = false
  try {
    await $fetch('/api/admin/content/about', { method: 'PUT', body: form.value })
    await refresh()
    saved.value = true
    setTimeout(() => (saved.value = false), 3000)
  } finally {
    saving.value = false
  }
}
</script>
