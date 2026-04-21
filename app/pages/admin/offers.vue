<template>
  <div class="flex h-full flex-col">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Услуги</h1>
      <div class="flex items-center gap-3">
        <span v-if="saved" class="text-sm text-green-600">Сохранено</span>
        <UButton :loading="saving" icon="i-lucide-save" @click="save">Сохранить</UButton>
      </div>
    </div>

    <div v-if="pending" class="flex flex-1 items-center justify-center">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <div v-else class="mx-auto w-full max-w-2xl space-y-4">
      <div
        v-for="(item, idx) in form.list"
        :key="idx"
        class="rounded-lg border border-gray-200 bg-white p-4"
      >
        <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Услуга {{ idx + 1 }}
          <span class="ml-2 font-normal normal-case text-gray-300">{{ item.link }}</span>
        </p>
        <div class="space-y-3">
          <UFormField label="Название" class="w-full">
            <UInput v-model="item.topic" class="w-full" />
          </UFormField>
          <UFormField label="Описание" class="w-full">
            <UInput v-model="item.text" class="w-full" />
          </UFormField>
          <UFormField label="Цена" class="w-full">
            <UInput v-model="item.price" class="w-full" placeholder="от 1 000 ₽" />
          </UFormField>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

const { data, pending, refresh } = await useFetch('/api/admin/content/offers')

const form = ref({ list: [] })
const saving = ref(false)
const saved = ref(false)

watch(
  data,
  (val) => {
    if (!val) return
    form.value = {
      list: (val.list ?? []).map((it) => ({
        topic: it.topic ?? '',
        text: it.text ?? '',
        price: it.price ?? '',
        link: it.link ?? '',
      })),
    }
  },
  { immediate: true },
)

async function save() {
  saving.value = true
  saved.value = false
  try {
    await $fetch('/api/admin/content/offers', { method: 'PUT', body: form.value })
    await refresh()
    saved.value = true
    setTimeout(() => (saved.value = false), 3000)
  } finally {
    saving.value = false
  }
}
</script>
