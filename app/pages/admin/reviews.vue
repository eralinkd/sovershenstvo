<template>
  <div class="flex h-full flex-col">
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Отзывы</h1>
      <div class="flex items-center gap-3">
        <span v-if="saved" class="text-sm text-green-600">Сохранено</span>
        <UButton :loading="saving" icon="i-lucide-save" @click="save">Сохранить</UButton>
      </div>
    </div>

    <div v-if="pending" class="flex flex-1 items-center justify-center">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <div v-else class="flex flex-1 gap-4 overflow-hidden">
      <!-- Left: review list -->
      <div class="flex w-52 shrink-0 flex-col gap-1">
        <p class="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Отзывы</p>
        <button
          v-for="(rev, idx) in form.list"
          :key="idx"
          :class="[
            'w-full rounded-lg px-3 py-2 text-left text-sm leading-tight transition-colors',
            activeIdx === idx
              ? 'bg-blue-100 font-medium text-blue-700'
              : 'text-gray-700 hover:bg-gray-100',
          ]"
          @click="
            ;() => {
              activeTab = 'review'
              activeIdx = idx
            }
          "
        >
          {{ rev.author || `Отзыв ${idx + 1}` }}
          <span v-if="rev.platform" class="block text-xs text-gray-400">{{ rev.platform }}</span>
        </button>
        <UButton
          block
          variant="outline"
          size="sm"
          icon="i-lucide-plus"
          class="mt-1"
          @click="addReview"
        >
          Добавить
        </UButton>

        <div class="mt-4 border-t border-gray-100 pt-3">
          <button
            :class="[
              'w-full rounded-lg px-3 py-2 text-left text-sm leading-tight transition-colors',
              activeTab === 'hero'
                ? 'bg-blue-100 font-medium text-blue-700'
                : 'text-gray-700 hover:bg-gray-100',
            ]"
            @click="activeTab = 'hero'"
          >
            <UIcon name="i-lucide-layout" class="mr-1 inline size-4" />
            Страница
          </button>
        </div>
      </div>

      <!-- Right: hero editor -->
      <div
        v-if="activeTab === 'hero'"
        class="flex flex-1 flex-col gap-4 overflow-y-auto rounded-lg border border-gray-200 bg-white p-4"
      >
        <h2 class="border-b pb-3 font-semibold">Страница</h2>
        <UFormField label="Заголовок" class="w-full">
          <UTextarea v-model="form.hero.title" :rows="2" class="w-full" />
        </UFormField>
        <UFormField label="Подзаголовок" class="w-full">
          <UTextarea v-model="form.hero.subtitle" :rows="2" class="w-full" />
        </UFormField>
        <UFormField label="Изображение">
          <AdminImagePicker v-model="form.hero.img" label="Изображение героя" />
        </UFormField>
        <div>
          <p class="mb-2 text-sm font-medium text-gray-700">Преимущества (3 блока)</p>
          <div class="space-y-2">
            <UFormField v-for="n in 3" :key="n" :label="`Блок ${n}`" class="w-full">
              <UTextarea v-model="form.hero.items[n - 1].text" :rows="2" class="w-full" />
            </UFormField>
          </div>
        </div>
      </div>

      <!-- Right: review editor -->
      <div
        v-if="activeTab === 'review' && currentReview"
        class="flex flex-1 flex-col gap-4 overflow-y-auto rounded-lg border border-gray-200 bg-white p-4"
      >
        <div class="flex items-center justify-between border-b pb-3">
          <h2 class="font-semibold">{{ currentReview.author || `Отзыв ${activeIdx + 1}` }}</h2>
          <UButton
            variant="outline"
            color="error"
            size="sm"
            icon="i-lucide-trash-2"
            @click="removeReview(activeIdx)"
          >
            Удалить
          </UButton>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Автор" class="w-full">
            <UInput v-model="currentReview.author" class="w-full" />
          </UFormField>
          <UFormField label="Дата" class="w-full">
            <UInput v-model="currentReview.date" placeholder="01.01.2025" class="w-full" />
          </UFormField>
          <UFormField label="Платформа" class="w-full">
            <UInput v-model="currentReview.platform" placeholder="yandex" class="w-full" />
          </UFormField>
          <UFormField label="Врач" class="w-full">
            <UInput v-model="currentReview.doctor" class="w-full" />
          </UFormField>
        </div>

        <div>
          <p class="mb-2 text-sm font-medium text-gray-700">Услуги (до 5)</p>
          <div class="grid grid-cols-2 gap-2">
            <UInput
              v-for="n in 5"
              :key="n"
              v-model="currentReview.services[n - 1]"
              :placeholder="`Услуга ${n}`"
            />
          </div>
        </div>

        <UFormField label="Текст отзыва" class="w-full">
          <UTextarea v-model="currentReview.text" :rows="6" class="w-full" />
        </UFormField>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

const { data, pending, refresh } = await useFetch('/api/admin/content/reviews')

const emptyReview = () => ({
  author: '',
  date: '',
  platform: '',
  doctor: '',
  services: ['', '', '', '', ''],
  text: '',
})

const form = ref({
  hero: { title: '', subtitle: '', img: '', items: [{ text: '' }, { text: '' }, { text: '' }] },
  list: [],
})
const activeTab = ref('review')
const activeIdx = ref(0)
const saving = ref(false)
const saved = ref(false)

watch(
  data,
  (val) => {
    if (!val) return
    const hero = val.hero ?? {}
    const srcItems = Array.isArray(hero.items) ? hero.items : []
    form.value = {
      hero: {
        title: hero.title ?? '',
        subtitle: hero.subtitle ?? '',
        img: hero.img ?? '',
        items: [0, 1, 2].map((i) => ({ text: srcItems[i]?.text ?? '' })),
      },
      list: (val.list ?? []).map((r) => ({
        author: r.author ?? '',
        date: r.date ?? '',
        platform: r.platform ?? '',
        doctor: r.doctor ?? '',
        services: [0, 1, 2, 3, 4].map((i) => (r.services ?? [])[i] ?? ''),
        text: r.text ?? '',
      })),
    }
    if (form.value.list.length > 0) activeTab.value = 'review'
  },
  { immediate: true },
)

const currentReview = computed(() =>
  activeTab.value === 'review' ? (form.value.list[activeIdx.value] ?? null) : null,
)

function addReview() {
  form.value.list.push(emptyReview())
  activeIdx.value = form.value.list.length - 1
  activeTab.value = 'review'
}

function removeReview(idx) {
  form.value.list.splice(idx, 1)
  activeIdx.value = Math.max(0, Math.min(activeIdx.value, form.value.list.length - 1))
}

async function save() {
  saving.value = true
  saved.value = false
  try {
    const payload = {
      hero: form.value.hero,
      list: form.value.list
        .filter((r) => r.author.trim() || r.text.trim())
        .map((r) => ({ ...r, services: r.services.filter(Boolean) })),
    }
    await $fetch('/api/admin/content/reviews', { method: 'PUT', body: payload })
    await refresh()
    saved.value = true
    setTimeout(() => (saved.value = false), 3000)
  } finally {
    saving.value = false
  }
}
</script>
