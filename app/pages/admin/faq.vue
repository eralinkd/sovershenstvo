<template>
  <div class="mx-auto max-w-2xl">
    <h1 class="mb-4 text-2xl font-bold">FAQ</h1>
    <div v-if="pending" class="flex items-center justify-center py-20">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>
    <form v-else class="space-y-4" @submit.prevent="save">
      <div class="rounded-lg border border-gray-200 bg-white p-4">
        <UFormField label="Заголовок блока FAQ" class="w-full">
          <UInput v-model="form.title" class="w-full" placeholder="Часто задаваемые вопросы" />
        </UFormField>
      </div>

      <div class="space-y-3">
        <div
          v-for="(item, idx) in form.items"
          :key="idx"
          class="rounded-lg border border-gray-200 bg-white p-4"
        >
          <div class="mb-3 flex items-center justify-between">
            <span class="text-sm font-medium text-gray-500">Вопрос {{ idx + 1 }}</span>
            <UButton
              variant="ghost"
              color="error"
              size="xs"
              icon="i-lucide-trash-2"
              @click="removeItem(idx)"
            />
          </div>
          <div class="space-y-3">
            <UFormField label="Вопрос" class="w-full">
              <UInput v-model="item.question" class="w-full" placeholder="Введите вопрос" />
            </UFormField>
            <UFormField label="Ответ" class="w-full">
              <UTextarea v-model="item.answer" class="w-full" :rows="6" placeholder="Введите ответ" />
            </UFormField>
          </div>
        </div>
      </div>

      <UButton variant="outline" icon="i-lucide-plus" @click="addItem"> Добавить вопрос </UButton>

      <div class="flex gap-2 pt-2">
        <UButton type="submit" :loading="saving"> Сохранить </UButton>
        <UButton v-if="saved" variant="ghost" color="success" disabled> Сохранено </UButton>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const { data, refresh, pending } = useFetch('/api/admin/content/faq')

const form = ref({ title: '', items: [] })
const saving = ref(false)
const saved = ref(false)

watch(data, (val) => {
  if (!val) return
  form.value = {
    title: val.title ?? '',
    items: (val.items ?? []).map((it) => ({
      question: it.question ?? '',
      answer: it.answer ?? '',
    })),
  }
}, { immediate: true })

function addItem() {
  form.value.items.push({ question: '', answer: '' })
}

function removeItem(idx) {
  form.value.items.splice(idx, 1)
}

async function save() {
  saving.value = true
  saved.value = false
  try {
    await $fetch('/api/admin/content/faq', {
      method: 'PUT',
      body: {
        title: form.value.title,
        items: form.value.items,
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
