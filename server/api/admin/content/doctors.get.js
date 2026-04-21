import { getDoctorsRaw } from '../../../utils/doctors-store'

export default defineEventHandler(() => {
  return getDoctorsRaw()?.data ?? { title: '', slider: { title: '', doctors: [] } }
})
