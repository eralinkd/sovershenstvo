export const useReviews = () => {
  const { data } = useFetch('/api/content/reviews', { key: 'reviews' })
  return computed(() =>
    (data.value?.list ?? []).filter(
      (rev) => String(rev.author).trim().length > 0 && String(rev.text).trim().length > 0,
    ),
  )
}
