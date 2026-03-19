const DEFAULT_ABOUT = {
  title: '',
  hero: {
    quote: '',
    quoteAuthor: '',
    topImage: '',
    bottomText: '',
    ctaText: '',
    stats: { first: '', second: '', third: '' },
    statsLabels: { first: '', second: '', third: '' },
  },
  mission: {
    title: '',
    subtitle: '',
    blocks: [],
  },
}

export const useAbout = () => {
  const { data } = useFetch('/api/content/about', { key: 'about' })
  return computed(() => data.value ?? DEFAULT_ABOUT)
}
