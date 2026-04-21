<template>
  <div class="mx-auto max-w-2xl">
    <h1 class="mb-4 text-2xl font-bold">Футер</h1>

    <div v-if="pending" class="flex items-center justify-center py-20">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <form v-else class="space-y-4" @submit.prevent="save">
      <div class="rounded-lg border border-gray-200 bg-white p-4">
        <h2 class="mb-3 text-base font-semibold">Контакты</h2>
        <div class="space-y-3">
          <UFormField label="Заголовок блока" class="w-full">
            <UInput v-model="form.title" class="w-full" placeholder="Контакты" />
          </UFormField>
          <UFormField label="Подзаголовок" class="w-full">
            <UInput v-model="form.subtitle" class="w-full" placeholder="Как нас найти" />
          </UFormField>
          <UFormField label="Город" class="w-full">
            <UInput v-model="form.city" class="w-full" placeholder="Пенза" />
          </UFormField>
          <UFormField label="Email" class="w-full">
            <UInput v-model="form.email" class="w-full" placeholder="info@clinic.ru" />
          </UFormField>
          <UFormField label="Общий телефон (строка)" class="w-full">
            <UInput v-model="form.summaryPhones" class="w-full" placeholder="+7 (8412) 00-00-00" />
          </UFormField>
        </div>
      </div>

      <div class="space-y-3">
        <div
          v-for="(addr, idx) in form.addresses"
          :key="idx"
          class="rounded-lg border border-gray-200 bg-white p-4"
        >
          <div class="mb-3">
            <span class="text-sm font-medium text-gray-500">Адрес {{ idx + 1 }}</span>
          </div>
          <div class="space-y-3">
            <UFormField label="Название / адрес" class="w-full">
              <UInput v-model="addr.label" class="w-full" placeholder="ул. Ленина, 1" />
            </UFormField>
            <UFormField label="Телефон 1" class="w-full">
              <UInput v-model="addr.phone1" class="w-full" placeholder="+7 (8412) 00-00-00" />
            </UFormField>
            <UFormField label="Телефон 2" class="w-full">
              <UInput v-model="addr.phone2" class="w-full" placeholder="+7 (8412) 00-00-01" />
            </UFormField>
            <UFormField label="Телефон 3" class="w-full">
              <UInput v-model="addr.phone3" class="w-full" placeholder="+7 (8412) 00-00-02" />
            </UFormField>
          </div>
        </div>
      </div>

      <div class="flex gap-2 pt-2">
        <UButton type="submit" :loading="saving">Сохранить</UButton>
        <UButton v-if="saved" variant="ghost" color="success" disabled>Сохранено</UButton>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const { data, refresh, pending } = useFetch('/api/admin/content/footer')

const form = ref({
  title: '',
  subtitle: '',
  city: '',
  email: '',
  summaryPhones: '',
  addresses: [],
})

const saving = ref(false)
const saved = ref(false)

watch(
  data,
  (val) => {
    if (!val) return
    form.value = {
      title: val.title ?? '',
      subtitle: val.subtitle ?? '',
      city: val.city ?? '',
      email: val.email ?? '',
      summaryPhones: val.summaryPhones ?? '',
      addresses: (val.addresses ?? []).map((a) => ({
        label: a.label ?? '',
        phone1: a.phone1 ?? '',
        phone2: a.phone2 ?? '',
        phone3: a.phone3 ?? '',
      })),
    }
  },
  { immediate: true },
)

async function save() {
  saving.value = true
  saved.value = false
  try {
    await $fetch('/api/admin/content/footer', {
      method: 'PUT',
      body: form.value,
    })
    saved.value = true
    await refresh()
    setTimeout(() => {
      saved.value = false
    }, 2000)
  } catch (e) {
    console.error(e)
  } finally {
    saving.value = false
  }
}
</script>
