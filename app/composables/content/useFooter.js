export const useFooter = () => {
  const { data } = useFetch('/api/content/footer', {
    key: 'footer',
  })
  return computed(() => data.value ?? { title: '', subtitle: '', city: '', email: '', summaryPhones: '', addresses: [] })
}
