import { about as aboutData } from '~/data/content'

export const useAbout = () => {
  const body = aboutData || {}
  const hero = body?.hero || {}

  return computed(() => ({
    hero: {
      quote: hero?.quote,
      quoteAuthor: hero?.quoteAuthor,
      topImage: hero?.topImage,
      bottomText: hero?.bottomText,
      stats: {
        first: hero?.stats?.first,
        second: hero?.stats?.second,
        third: hero?.stats?.third,
      },
      statsLabels: {
        first: hero?.statsLabels?.first,
        second: hero?.statsLabels?.second,
        third: hero?.statsLabels?.third,
      },
      ctaText: hero?.ctaText,
    },
    mission: body?.mission || {},
  }))
}
