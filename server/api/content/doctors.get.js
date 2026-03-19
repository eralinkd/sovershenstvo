import { getDoctors } from '../../utils/doctors-store'

export default defineEventHandler(() => {
  const data = getDoctors()
  if (!data) {
    return { title: '', slider: { title: '', doctors: [] } }
  }
  return data
})
