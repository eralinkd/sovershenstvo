<template>
  <div class="admin-index">
    <h1 class="admin-index-title mb-6 text-2xl font-bold">Админ-панель</h1>
    <UCard class="admin-index-card">
      <template #header>
        <h2 class="admin-index-subtitle text-lg font-semibold">Добро пожаловать</h2>
      </template>
      <p class="admin-index-text text-gray-600">
        Выберите сущность в боковом меню для редактирования контента.
      </p>
    </UCard>
  </div>
</template>

<style scoped>
.admin-index-title {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
}

.admin-index-card :deep(> div) {
  padding: 1rem 1.5rem;
}

.admin-index-text {
  color: #4b5563;
  margin: 0.5rem 0;
}
</style>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})
</script>
