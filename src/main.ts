import GetAllLinksFromPage from './GetAllLinksFromPage'
import CrawlPage from './CrawlPage'

const main = async () => {
    // const getAllLinksFromPage = new GetAllLinksFromPage()
    const crawlPage = new CrawlPage()
    const pages = await crawlPage.handle('https://abnk.uk', 'https://abnk.uk', {})
    // const urls = getAllLinksFromPage.handle(html, new URL('https://www.wagslane.dev'))
    // console.log(urls)

    if (pages) {
        for (const page of Object.keys(pages)) {
            console.log(page)
        }
    }
}

main()
