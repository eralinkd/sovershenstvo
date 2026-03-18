import { refreshFaqFromDb, startFaqRefresh } from '../utils/faq-store'
import { refreshFooterFromDb, startFooterRefresh } from '../utils/footer-store'
import { refreshGlobalsFromDb, startGlobalsRefresh } from '../utils/globals-store'
import { refreshMainFromDb, startMainRefresh } from '../utils/main-store'
import { refreshPricingFromDb, startPricingRefresh } from '../utils/pricing-store'

export default defineNitroPlugin(async () => {
  // remove this after vercel deploy
  await Promise.all([
    refreshGlobalsFromDb(),
    refreshFaqFromDb(),
    refreshFooterFromDb(),
    refreshMainFromDb(),
    refreshPricingFromDb(),
  ])

  startGlobalsRefresh()
  startFaqRefresh()
  startFooterRefresh()
  startMainRefresh()
  startPricingRefresh()
})
