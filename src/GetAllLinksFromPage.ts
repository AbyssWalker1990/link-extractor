import { JSDOM } from 'jsdom'

class GetAllLinksFromPage {
    public handle(htmlBody: string, baseURL: URL): string[] {
        const urls = [] as string[]
        const dom = new JSDOM(htmlBody)
        const links = dom.window.document.querySelectorAll('a')
        for (const linkElement of links) {
            if (linkElement.href.startsWith('/')) {
                //relative
                try {
                    const urlObj = new URL(`${baseURL.origin}${linkElement.href}`)
                    urls.push(urlObj.href)
                } catch (error: unknown) {
                    console.log('error: ', error)
                }
            } else {
                //absolute
                try {
                    const urlObj = new URL(linkElement.href)
                    urls.push(urlObj.href)
                } catch (error: unknown) {
                    console.log('error: ', error)
                }
                urls.push(linkElement.href)
            }
        }
        console.log('urls: ', urls)
        return urls
    }
}

export default GetAllLinksFromPage
