export const useGlobals = () => {
  const { data } = useFetch('/api/content/globals', {
    key: 'globals',
  })
  return computed(() => data.value ?? { meta: { title: '', seo: {} } })
}
