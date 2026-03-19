import { getFooterRaw } from '../../../utils/footer-store'

export default defineEventHandler((_event) => {

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
