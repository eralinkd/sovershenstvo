export const usePromotions = () => {
  const { data } = useFetch('/api/content/promotions', { key: 'promotions' })
  return computed(() => {
    const hero = data.value?.hero ?? {}
    return {
      hero: {
        title: hero.title ?? '',
        subtitle: hero.subtitle ?? '',
        items: (hero.items ?? []).map((it) => it?.text).filter(Boolean),
        img: hero.img ?? '',
      },
    }
  })
}
