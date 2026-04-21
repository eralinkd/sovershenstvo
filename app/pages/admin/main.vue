<template>
  <div class="mx-auto max-w-2xl">
    <h1 class="mb-4 text-2xl font-bold">Главная страница</h1>

    <div v-if="pending" class="flex items-center justify-center py-20">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <form v-else class="space-y-4" @submit.prevent="save">
      <!-- Hero -->
      <div class="rounded-lg border border-gray-200 bg-white p-4">
        <h2 class="mb-3 text-base font-semibold">Hero</h2>
        <div class="space-y-3">
          <UFormField label="Заголовок" class="w-full">
            <UTextarea v-model="form.hero.title" class="w-full" :rows="2" placeholder="Идеальная улыбка <br> начинается здесь" />
          </UFormField>
          <UFormField label="Текст" class="w-full">
            <UTextarea v-model="form.hero.text" class="w-full" :rows="3" placeholder="<b>Клиника «Совершенство»</b> — 18 лет профессионализма" />
          </UFormField>
          <UFormField label="Изображение" class="w-full">
            <AdminImagePicker v-model="form.hero.image" label="Hero изображение" />
          </UFormField>
        </div>
      </div>

      <!-- Strengths -->
      <div class="rounded-lg border border-gray-200 bg-white p-4">
        <h2 class="mb-3 text-base font-semibold">Сильные стороны</h2>
        <div class="space-y-3">
          <UFormField label="Заголовок блока" class="w-full">
            <UTextarea v-model="form.strengths.title" class="w-full" :rows="2" />
          </UFormField>
          <UFormField label="Карточка 1" class="w-full">
            <UInput v-model="form.strengths.card1" class="w-full" />
          </UFormField>
          <UFormField label="Карточка 2" class="w-full">
            <UInput v-model="form.strengths.card2" class="w-full" />
          </UFormField>
          <UFormField label="Карточка 3" class="w-full">
            <UInput v-model="form.strengths.card3" class="w-full" />
          </UFormField>
        </div>
      </div>

      <!-- Services -->
      <div class="rounded-lg border border-gray-200 bg-white p-4">
        <h2 class="mb-3 text-base font-semibold">Услуги</h2>
        <div class="space-y-3">
          <UFormField label="Заголовок блока" class="w-full">
            <UInput v-model="form.services.title" class="w-full" />
          </UFormField>
          <UFormField v-for="i in 6" :key="i" :label="`Карточка ${i}`" class="w-full">
            <UTextarea v-model="form.services[`card${i}`]" class="w-full" :rows="2" />
          </UFormField>
        </div>
      </div>

      <!-- Offers -->
      <div class="rounded-lg border border-gray-200 bg-white p-4">
        <h2 class="mb-3 text-base font-semibold">Спецпредложения</h2>
        <div class="space-y-3">
          <UFormField label="Заголовок блока" class="w-full">
            <UTextarea v-model="form.offers.title" class="w-full" :rows="2" />
          </UFormField>
          <template v-for="i in 4" :key="i">
            <div class="rounded border border-gray-100 p-3">
              <p class="mb-2 text-sm font-medium text-gray-500">Баннер {{ i }}</p>
              <div class="space-y-2">
                <UFormField label="Заголовок" class="w-full">
                  <UTextarea v-model="form.offers[`banner${i}`].title" class="w-full" :rows="2" />
                </UFormField>
                <UFormField v-if="i <= 2" label="Подзаголовок" class="w-full">
                  <UInput v-model="form.offers[`banner${i}`].subtitle" class="w-full" />
                </UFormField>
                <UFormField v-if="i <= 2" label="Изображение" class="w-full">
                  <AdminImagePicker v-model="form.offers[`banner${i}`].img" :label="`Баннер ${i} изображение`" />
                </UFormField>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Unique -->
      <div class="rounded-lg border border-gray-200 bg-white p-4">
        <h2 class="mb-3 text-base font-semibold">Уникальные решения</h2>
        <div class="space-y-3">
          <UFormField label="Заголовок блока" class="w-full">
            <UInput v-model="form.unique.title" class="w-full" />
          </UFormField>
          <UFormField label="Подзаголовок блока" class="w-full">
            <UTextarea v-model="form.unique.subtitle" class="w-full" :rows="2" />
          </UFormField>
          <template v-for="i in 2" :key="i">
            <div class="rounded border border-gray-100 p-3">
              <p class="mb-2 text-sm font-medium text-gray-500">Карточка {{ i }}</p>
              <div class="space-y-2">
                <UFormField label="Заголовок" class="w-full">
                  <UInput v-model="form.unique[`card${i}`].title" class="w-full" />
                </UFormField>
                <UFormField label="Подзаголовок" class="w-full">
                  <UTextarea v-model="form.unique[`card${i}`].subtitle" class="w-full" :rows="2" />
                </UFormField>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Details -->
      <div class="rounded-lg border border-gray-200 bg-white p-4">
        <h2 class="mb-3 text-base font-semibold">Детали (счётчики)</h2>
        <div class="space-y-3">
          <UFormField label="Заголовок блока" class="w-full">
            <UTextarea v-model="form.details.title" class="w-full" :rows="2" />
          </UFormField>
          <UFormField v-for="i in 3" :key="i" :label="`Карточка ${i}`" class="w-full">
            <UTextarea v-model="form.details[`card${i}`].text" class="w-full" :rows="2" />
          </UFormField>
        </div>
      </div>

      <!-- Why -->
      <div class="rounded-lg border border-gray-200 bg-white p-4">
        <h2 class="mb-3 text-base font-semibold">Почему выбирают нас</h2>
        <div class="space-y-3">
          <UFormField label="Заголовок блока" class="w-full">
            <UInput v-model="form.why.title" class="w-full" />
          </UFormField>
          <template v-for="i in 4" :key="i">
            <div class="rounded border border-gray-100 p-3">
              <p class="mb-2 text-sm font-medium text-gray-500">Карточка {{ i }}</p>
              <div class="space-y-2">
                <UFormField label="Заголовок" class="w-full">
                  <UTextarea v-model="form.why[`card${i}`].title" class="w-full" :rows="2" />
                </UFormField>
                <UFormField label="Текст" class="w-full">
                  <UTextarea v-model="form.why[`card${i}`].text" class="w-full" :rows="2" />
                </UFormField>
              </div>
            </div>
          </template>
        </div>
      </div>

      <p class="text-xs text-gray-400">
        Для переноса строки используйте <code>&lt;br /&gt;</code>, для жирного — <code>&lt;b&gt;текст&lt;/b&gt;</code>
      </p>

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

const { data, refresh, pending } = useFetch('/api/admin/content/main')

const saving = ref(false)
const saved = ref(false)

const emptyForm = () => ({
  hero: { title: '', text: '', image: '' },
  strengths: { title: '', card1: '', card2: '', card3: '' },
  services: { title: '', card1: '', card2: '', card3: '', card4: '', card5: '', card6: '' },
  offers: {
    title: '',
    banner1: { title: '', subtitle: '', img: '' },
    banner2: { title: '', subtitle: '', img: '' },
    banner3: { title: '' },
    banner4: { title: '' },
  },
  unique: {
    title: '',
    subtitle: '',
    card1: { title: '', subtitle: '' },
    card2: { title: '', subtitle: '' },
  },
  details: {
    title: '',
    card1: { text: '' },
    card2: { text: '' },
    card3: { text: '' },
  },
  why: {
    title: '',
    card1: { title: '', text: '' },
    card2: { title: '', text: '' },
    card3: { title: '', text: '' },
    card4: { title: '', text: '' },
  },
})

const form = ref(emptyForm())

watch(
  data,
  (val) => {
    if (!val) return
    const base = emptyForm()
    form.value = {
      hero: { ...base.hero, ...val.hero },
      strengths: { ...base.strengths, ...val.strengths },
      services: { ...base.services, ...val.services },
      offers: {
        ...base.offers,
        ...val.offers,
        banner1: { ...base.offers.banner1, ...val.offers?.banner1 },
        banner2: { ...base.offers.banner2, ...val.offers?.banner2 },
        banner3: { ...base.offers.banner3, ...val.offers?.banner3 },
        banner4: { ...base.offers.banner4, ...val.offers?.banner4 },
      },
      unique: {
        ...base.unique,
        ...val.unique,
        card1: { ...base.unique.card1, ...val.unique?.card1 },
        card2: { ...base.unique.card2, ...val.unique?.card2 },
      },
      details: {
        ...base.details,
        ...val.details,
        card1: { ...base.details.card1, ...val.details?.card1 },
        card2: { ...base.details.card2, ...val.details?.card2 },
        card3: { ...base.details.card3, ...val.details?.card3 },
      },
      why: {
        ...base.why,
        ...val.why,
        card1: { ...base.why.card1, ...val.why?.card1 },
        card2: { ...base.why.card2, ...val.why?.card2 },
        card3: { ...base.why.card3, ...val.why?.card3 },
        card4: { ...base.why.card4, ...val.why?.card4 },
      },
    }
  },
  { immediate: true },
)

async function save() {
  saving.value = true
  saved.value = false
  try {
    await $fetch('/api/admin/content/main', { method: 'PUT', body: form.value })
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
