import { getFaqRaw } from '../../../utils/faq-store'

export default defineEventHandler((_event) => {

  const data = getFaqRaw()
  return data ?? { title: '', items: [] }
})
