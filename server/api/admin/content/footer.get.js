import { getFooterRaw } from '../../../utils/footer-store'

export default defineEventHandler((_event) => {
  // TODO: восстановить проверку авторизации
  const data = getFooterRaw()
  return (
    data ?? {
      title: '',
      subtitle: '',
      city: '',
      email: '',
      summaryPhones: '',
      addresses: [],
    }
  )
})
