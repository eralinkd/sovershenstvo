export const useFaq = () => {
  const { data } = useFetch('/api/content/faq', {
    key: 'faq',
  })
  return computed(() => data.value ?? { title: '', items: [] })
}
