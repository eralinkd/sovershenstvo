export const useDoctors = () => {
  const { data } = useFetch('/api/content/doctors', { key: 'doctors' })
  return computed(() => data.value ?? { title: '', slider: { title: '', doctors: [] } })
}
