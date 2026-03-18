import { reviews as reviewsData } from '~/data/content'

export const useReviewsContent = () => {
  const body = reviewsData || {}
  const hero = body?.hero || {}

  const items = [hero?.items?.item1, hero?.items?.item2, hero?.items?.item3]
    .map((it) => it?.text)
    .filter(Boolean)

  return computed(() => ({
    hero: {
      title: hero?.title,
      subtitle: hero?.subtitle,
      items,
      img: hero?.img,
    },
  }))
}
