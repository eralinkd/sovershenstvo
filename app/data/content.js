/**
 * Загрузка данных из content/*.yml (без запросов).
 * Пример получения через API (когда бекенд будет готов):
 *   const { data } = await useFetch('/api/content/globals')
 *   return data
 */
import yaml from 'js-yaml'
import globalsRaw from '../../content/globals.yml?raw'
import mainRaw from '../../content/main.yml?raw'
import pricingRaw from '../../content/pricing.yml?raw'
import footerRaw from '../../content/footer.yml?raw'
import doctorsRaw from '../../content/doctors.yml?raw'
import aboutRaw from '../../content/about.yml?raw'
import offersRaw from '../../content/offers.yml?raw'
import promotionsRaw from '../../content/promotions.yml?raw'
import reviewsRaw from '../../content/reviews.yml?raw'
import faqRaw from '../../content/faq.yml?raw'

export const globals = yaml.load(globalsRaw)
export const main = yaml.load(mainRaw)
export const pricing = yaml.load(pricingRaw)
export const footer = yaml.load(footerRaw)
export const doctors = yaml.load(doctorsRaw)
export const about = yaml.load(aboutRaw)
export const offers = yaml.load(offersRaw)
export const promotions = yaml.load(promotionsRaw)
export const reviews = yaml.load(reviewsRaw)
export const faq = yaml.load(faqRaw)
