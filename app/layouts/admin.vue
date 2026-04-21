<template>
  <div class="admin-layout flex min-h-screen">
    <aside class="admin-sidebar relative w-64 shrink-0 border-r border-gray-200 bg-gray-50">
      <div class="admin-sidebar-header flex h-16 items-center border-b border-gray-200 px-6">
        <NuxtLink to="/admin" class="text-lg font-semibold">Админка</NuxtLink>
      </div>
      <nav class="admin-nav space-y-1 p-4">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="admin-nav-link flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
          active-class="bg-blue-100 text-blue-700"
        >
          <UIcon :name="item.icon" class="size-5 shrink-0" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </aside>
    <main class="admin-main flex-1 overflow-auto p-6">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
const navItems = [
  { to: '/admin', label: 'Дашборд', icon: 'i-lucide-home' },
  { to: '/admin/globals', label: 'Основные', icon: 'i-lucide-settings' },
  { to: '/admin/main', label: 'Главная стр.', icon: 'i-lucide-layout' },
  { to: '/admin/faq', label: 'FAQ', icon: 'i-lucide-help-circle' },
  { to: '/admin/footer', label: 'Футер', icon: 'i-lucide-phone' },
  { to: '/admin/images', label: 'Медиатека', icon: 'i-lucide-images' },
  { to: '/admin/pricing', label: 'Прайс-лист', icon: 'i-lucide-dollar-sign' },
  { to: '/admin/doctors', label: 'Врачи', icon: 'i-lucide-users' },
  { to: '/admin/about', label: 'О клинике', icon: 'i-lucide-info' },
  { to: '/admin/offers', label: 'Услуги', icon: 'i-lucide-clipboard-list' },
  { to: '/admin/promotions', label: 'Акции (стр.)', icon: 'i-lucide-gift' },
  { to: '/admin/reviews', label: 'Отзывы', icon: 'i-lucide-star' },
]
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.admin-sidebar {
  width: 16rem;
  flex-shrink: 0;
  border-right: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.admin-sidebar-header {
  display: flex;
  height: 4rem;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.admin-nav {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.admin-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: #374151;
}

.admin-nav-link:hover {
  background-color: #f3f4f6;
}

.admin-nav-link :deep(svg) {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.admin-main {
  flex: 1;
  overflow: auto;
  padding: 1.5rem;
}
</style>
