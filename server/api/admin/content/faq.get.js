import { getFaqRaw } from '../../../utils/faq-store'

export default defineEventHandler((_event) => {
  // TODO: восстановить проверку авторизации
  const data = getFaqRaw()
  return data ?? { title: '', items: [] }
})
