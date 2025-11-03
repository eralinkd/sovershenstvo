const API_BASE_URL = 'https://api.unyto.ru:8443'
const SITE_TOKEN = '184df047-2563-4.228-bbc0-61d8cc528bfd'

export const api = {
  async pushWebsiteQuestionnaire(websiteQuestionnaire) {
    try {
      const response = await fetch(`${API_BASE_URL}/website/push`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-SITE-TOKEN': SITE_TOKEN,
        },
        body: JSON.stringify({
          websiteQuestionnaire,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  },
}
