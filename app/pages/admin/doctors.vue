<template>
  <div class="flex h-full flex-col">
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Врачи</h1>
      <div class="flex items-center gap-3">
        <span v-if="saved" class="text-sm text-green-600">Сохранено</span>
        <UButton :loading="saving" icon="i-lucide-save" @click="save">Сохранить</UButton>
      </div>
    </div>

    <div v-if="pending" class="flex flex-1 items-center justify-center">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <div v-else class="flex flex-1 gap-4 overflow-hidden">
      <!-- Left sidebar: global fields + doctor list -->
      <div class="flex w-56 shrink-0 flex-col gap-3">
        <div class="rounded-lg border border-gray-200 bg-white p-3">
          <p class="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Заголовки</p>
          <UFormField label="Заголовок страницы" class="mb-2">
            <UInput v-model="form.title" placeholder="Наша команда" />
          </UFormField>
          <UFormField label="Заголовок слайдера">
            <UInput v-model="form.slider.title" placeholder="Наши врачи" />
          </UFormField>
        </div>

        <div class="flex flex-col gap-1">
          <p class="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Врачи</p>
          <button
            v-for="(doctor, idx) in form.slider.doctors"
            :key="idx"
            :class="[
              'w-full rounded-lg px-3 py-2 text-left text-sm leading-tight transition-colors',
              activeIdx === idx
                ? 'bg-blue-100 font-medium text-blue-700'
                : 'text-gray-700 hover:bg-gray-100',
            ]"
            @click="activeIdx = idx"
          >
            {{ doctor.name || `Врач ${idx + 1}` }}
          </button>
          <UButton
            block
            variant="outline"
            size="sm"
            icon="i-lucide-plus"
            class="mt-1"
            @click="addDoctor"
          >
            Добавить
          </UButton>
        </div>
      </div>

      <!-- Right: doctor editor -->
      <div
        v-if="currentDoctor"
        class="flex flex-1 flex-col gap-4 overflow-y-auto rounded-lg border border-gray-200 bg-white p-4"
      >
        <div class="flex items-center justify-between border-b pb-3">
          <h2 class="font-semibold">{{ currentDoctor.name || `Врач ${activeIdx + 1}` }}</h2>
          <UButton
            variant="outline"
            color="error"
            size="sm"
            icon="i-lucide-trash-2"
            :disabled="form.slider.doctors.length <= 1"
            @click="removeDoctor(activeIdx)"
          >
            Удалить врача
          </UButton>
        </div>

        <!-- Basic fields -->
        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Имя" class="w-full">
            <UInput v-model="currentDoctor.name" placeholder="ФИО" class="w-full" />
          </UFormField>
          <UFormField label="Специализация" class="w-full">
            <UInput v-model="currentDoctor.role" placeholder="Должность / специализация" class="w-full" />
          </UFormField>
        </div>

        <!-- Photo -->
        <UFormField label="Фото">
          <AdminImagePicker v-model="currentDoctor.photo" label="Фото врача" />
        </UFormField>

        <!-- About blocks -->
        <div>
          <div class="mb-2 flex items-center justify-between">
            <p class="text-sm font-semibold text-gray-700">О враче</p>
            <UButton size="xs" variant="outline" icon="i-lucide-plus" @click="addAbout">
              Добавить блок
            </UButton>
          </div>
          <div class="flex flex-col gap-3">
            <div
              v-for="(block, bIdx) in currentDoctor.about"
              :key="bIdx"
              class="rounded-lg border border-gray-100 bg-gray-50 p-3"
            >
              <div class="mb-2 flex items-center justify-between">
                <span class="text-xs text-gray-400">Блок {{ bIdx + 1 }}</span>
                <UButton
                  size="xs"
                  variant="ghost"
                  color="error"
                  icon="i-lucide-x"
                  @click="removeAbout(bIdx)"
                />
              </div>
              <UFormField label="Заголовок блока (необязательно)" class="mb-2 w-full">
                <UInput v-model="block.title" placeholder="Направления деятельности:" class="w-full" />
              </UFormField>
              <UFormField label="Текст" class="w-full">
                <UTextarea v-model="block.info" :rows="4" placeholder="Текст блока..." class="w-full" />
              </UFormField>
            </div>
          </div>
        </div>

        <!-- Licenses -->
        <div>
          <div class="mb-2 flex items-center justify-between">
            <p class="text-sm font-semibold text-gray-700">Лицензии / сертификаты</p>
            <UButton size="xs" variant="outline" icon="i-lucide-plus" @click="addLicense">
              Добавить
            </UButton>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div
              v-for="(lic, lIdx) in currentDoctor.licenses"
              :key="lIdx"
              class="relative rounded-lg border border-gray-200 bg-gray-50"
            >
              <UButton
                size="xs"
                variant="ghost"
                color="error"
                icon="i-lucide-x"
                class="absolute right-1 top-1 z-10"
                @click="removeLicense(lIdx)"
              />
              <AdminImagePicker v-model="currentDoctor.licenses[lIdx]" label="Лицензия" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

const { data, pending, refresh } = await useFetch('/api/admin/content/doctors')

const emptyDoctor = () => ({ name: '', role: '', photo: '', about: [{ title: '', info: '' }], licenses: [] })

const form = ref({ title: '', slider: { title: '', doctors: [] } })
const activeIdx = ref(0)
const saving = ref(false)
const saved = ref(false)

watch(
  data,
  (val) => {
    if (!val) return
    form.value = {
      title: val.title ?? '',
      slider: {
        title: val.slider?.title ?? '',
        doctors: (val.slider?.doctors ?? []).map((d) => ({
          name: d.name ?? '',
          role: d.role ?? '',
          photo: d.photo ?? '',
          about: (d.about ?? []).map((b) => ({ title: b.title ?? '', info: b.info ?? '' })),
          licenses: [...(d.licenses ?? [])],
        })),
      },
    }
  },
  { immediate: true },
)

const currentDoctor = computed(() => form.value.slider.doctors[activeIdx.value] ?? null)

function addDoctor() {
  form.value.slider.doctors.push(emptyDoctor())
  activeIdx.value = form.value.slider.doctors.length - 1
}

function removeDoctor(idx) {
  form.value.slider.doctors.splice(idx, 1)
  activeIdx.value = Math.min(activeIdx.value, form.value.slider.doctors.length - 1)
}

function addAbout() {
  currentDoctor.value.about.push({ title: '', info: '' })
}

function removeAbout(idx) {
  currentDoctor.value.about.splice(idx, 1)
}

function addLicense() {
  currentDoctor.value.licenses.push('')
}

function removeLicense(idx) {
  currentDoctor.value.licenses.splice(idx, 1)
}

async function save() {
  saving.value = true
  saved.value = false
  try {
    const payload = {
      title: form.value.title,
      slider: {
        title: form.value.slider.title,
        doctors: form.value.slider.doctors
          .filter((d) => d.name || d.role || d.photo)
          .map((d) => ({
            ...d,
            about: d.about.filter((b) => b.info),
            licenses: d.licenses.filter(Boolean),
          })),
      },
    }
    await $fetch('/api/admin/content/doctors', { method: 'PUT', body: payload })
    await refresh()
    saved.value = true
    setTimeout(() => (saved.value = false), 3000)
  } finally {
    saving.value = false
  }
}
</script>
