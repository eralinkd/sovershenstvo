<template>
  <div class="flex h-full flex-col">
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Прайс-лист</h1>
      <div class="flex items-center gap-3">
        <span v-if="saved" class="text-sm text-green-600">Сохранено</span>
        <UButton :loading="saving" icon="i-lucide-save" @click="save">Сохранить</UButton>
      </div>
    </div>

    <div v-if="pending" class="flex flex-1 items-center justify-center">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-gray-400" />
    </div>

    <div v-else class="flex flex-1 gap-4 overflow-hidden">
      <!-- Category tabs sidebar -->
      <div class="w-52 shrink-0 space-y-1">
        <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Категории</p>
        <button
          v-for="(cat, idx) in form.categories"
          :key="idx"
          :class="[
            'w-full rounded-lg px-3 py-2 text-left text-sm leading-tight transition-colors',
            activeTab === idx ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100',
          ]"
          @click="activeTab = idx"
        >
          {{ cat.title || `Категория ${idx + 1}` }}
          <span class="ml-1 text-xs text-gray-400">({{ cat.children.length }})</span>
        </button>
        <UButton
          block
          variant="outline"
          size="sm"
          icon="i-lucide-plus"
          class="mt-2"
          @click="addCategory"
        >
          Добавить
        </UButton>
      </div>

      <!-- Category editor -->
      <div v-if="currentCategory" class="flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
        <!-- Category header -->
        <div class="flex items-center gap-3 border-b px-4 py-3">
          <UInput v-model="currentCategory.title" class="flex-1 text-base font-semibold" placeholder="Название категории" />
          <UButton
            variant="outline"
            color="error"
            size="sm"
            icon="i-lucide-trash-2"
            :disabled="form.categories.length <= 1"
            @click="removeCategory(activeTab)"
          >
            Удалить категорию
          </UButton>
        </div>

        <!-- Items table -->
        <div class="flex-1 overflow-y-auto">
          <table class="w-full">
            <thead class="sticky top-0 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <tr>
                <th class="px-4 py-2 w-8">#</th>
                <th class="px-4 py-2">Услуга</th>
                <th class="px-4 py-2 w-36">Цена в клинике</th>
                <th class="px-4 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, itemIdx) in currentCategory.children"
                :key="itemIdx"
                class="border-t border-gray-100 hover:bg-gray-50"
              >
                <td class="px-4 py-1.5 text-xs text-gray-400">{{ itemIdx + 1 }}</td>
                <td class="px-4 py-1.5">
                  <UInput v-model="item.title" class="w-full" size="sm" />
                </td>
                <td class="px-4 py-1.5">
                  <UInput v-model="item.our_price" class="w-full" size="sm" placeholder="1 500" />
                </td>
                <td class="px-4 py-1.5">
                  <UButton
                    variant="ghost"
                    color="error"
                    size="xs"
                    icon="i-lucide-x"
                    @click="removeItem(activeTab, itemIdx)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Add item footer -->
        <div class="border-t px-4 py-3">
          <UButton variant="outline" size="sm" icon="i-lucide-plus" @click="addItem(activeTab)">
            Добавить услугу
          </UButton>
        </div>
      </div>

      <div v-else class="flex flex-1 items-center justify-center text-gray-400">
        <p>Выберите категорию или создайте новую</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { data, pending, refresh } = useFetch('/api/admin/content/pricing', { key: 'admin-pricing' })

const saving = ref(false)
const saved = ref(false)
const activeTab = ref(0)

const emptyForm = () => ({ categories: [] })
const form = ref(emptyForm())

const currentCategory = computed(() => form.value.categories[activeTab.value] ?? null)

watch(
  data,
  (val) => {
    if (!val) return
    const cats = Array.isArray(val.categories) ? val.categories : []
    form.value = {
      categories: cats.map((cat) => ({
        title: cat.title ?? '',
        children: (Array.isArray(cat.children) ? cat.children : []).map((item) => ({
          title: item.title ?? '',
          our_price: item.our_price ?? '',
          price: item.price ?? '',
        })),
      })),
    }
  },
  { immediate: true },
)

function addCategory() {
  form.value.categories.push({ title: '', children: [] })
  activeTab.value = form.value.categories.length - 1
}

function removeCategory(idx) {
  form.value.categories.splice(idx, 1)
  activeTab.value = Math.max(0, idx - 1)
}

function addItem(catIdx) {
  form.value.categories[catIdx].children.push({ title: '', our_price: '', price: '' })
}

function removeItem(catIdx, itemIdx) {
  form.value.categories[catIdx].children.splice(itemIdx, 1)
}

async function save() {
  saving.value = true
  saved.value = false
  try {
    await $fetch('/api/admin/content/pricing', { method: 'PUT', body: form.value })
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
