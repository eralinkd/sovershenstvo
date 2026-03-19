import { refreshAboutFromDb, startAboutRefresh } from '../utils/about-store'
import { refreshOffersFromDb, startOffersRefresh } from '../utils/offers-store'
import { refreshPromotionsFromDb, startPromotionsRefresh } from '../utils/promotions-store'
import { refreshReviewsFromDb, startReviewsRefresh } from '../utils/reviews-store'
import { refreshDoctorsFromDb, startDoctorsRefresh } from '../utils/doctors-store'
import { refreshFaqFromDb, startFaqRefresh } from '../utils/faq-store'
import { refreshFooterFromDb, startFooterRefresh } from '../utils/footer-store'
import { refreshGlobalsFromDb, startGlobalsRefresh } from '../utils/globals-store'
import { refreshMainFromDb, startMainRefresh } from '../utils/main-store'
import { refreshPricingFromDb, startPricingRefresh } from '../utils/pricing-store'

export default defineNitroPlugin(async () => {
  await Promise.all([
    refreshGlobalsFromDb(),
    refreshFaqFromDb(),
    refreshFooterFromDb(),
    refreshMainFromDb(),
    refreshPricingFromDb(),
    refreshDoctorsFromDb(),
    refreshAboutFromDb(),
    refreshOffersFromDb(),
    refreshPromotionsFromDb(),
    refreshReviewsFromDb(),
  ])

  startGlobalsRefresh()
  startFaqRefresh()
  startFooterRefresh()
  startMainRefresh()
  startPricingRefresh()
  startDoctorsRefresh()
  startAboutRefresh()
  startOffersRefresh()
  startPromotionsRefresh()
  startReviewsRefresh()
})
