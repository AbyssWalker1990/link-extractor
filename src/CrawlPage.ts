import GetAllLinksFromPage from './GetAllLinksFromPage'
import NormalizeURL from './NormalizeURL'
import axios from 'axios'

class CrawlPage {
    constructor(
        private readonly getAllLinksFromPage = new GetAllLinksFromPage(),
        private readonly normalizeURL = new NormalizeURL(),
    ) {}
    public async handle(baseURL: string, currentURL: string, pages: { [key: string]: number }) {
        const baseURLObj = new URL(baseURL)
        const currentURLObj = new URL(currentURL)

        const axiosInstance = axios.create()

        if (currentURLObj.hostname !== baseURLObj.hostname) {
            console.log(`Skipping external link: ${currentURL}`)
            return pages
        }

        const normalizedURL = this.normalizeURL.handle(currentURL)

        if (pages[normalizedURL] > 0) {
            pages[normalizedURL]++
            return pages
        }

        pages[normalizedURL] = 1

        console.log(`NOW CRAWLING: ${currentURL}`)

        try {
            const html = await axiosInstance(currentURL)

            if (html.status > 399) {
                console.log(`Error: ${html.status} for ${currentURL}`)
                return pages
            }

            const contentType = html.headers?.['content-type']
            console.log('contentType: ', contentType)
            if (!contentType?.includes('text/html')) {
                console.log(`NON HTML: ${html.status} for ${currentURL}`)
                return pages
            }

            const htmlBody = html.data

            const nextUrls = this.getAllLinksFromPage.handle(htmlBody, new URL(baseURL))
            for (const nextURL of nextUrls) {
                pages = await this.handle(baseURL, nextURL, pages)
            }
        } catch (error) {
            console.log('Error in fetch: ', error)
        }
        return pages
    }
}
export default CrawlPage
