import axios from 'axios'
import { load } from 'cheerio'

async function extractLinksFromUrl(url: string): Promise<string[]> {
    const response = await axios.get(url)
    const html = response.data
    const $ = load(html)
    const links: string[] = []

    $('a').each((_, element) => {
        const href = $(element).attr('href')
        if (href) {
            links.push(href)
        }
    })

    return links
}

const url = 'https://abnk.uk' // Replace with the URL you want to extract links from

// extractLinksFromUrl(url)
//   .then((links) => {
//     const visited: string[] = [];
//     console.log("Links on the page:");
//     links.forEach((link, index) => {
//       console.log(`${index + 1}: ${link}`);
//     });
//     const filtered = links.filter(
//       (link) => link.startsWith(url) || link.startsWith("/")
//     );
//     for (const filter of filtered) {
//       console.log(`Go to ${filter}`);
//       if (!visited.includes(filter)) {
//         visited.push(filter);
//         extractLinksFromUrl(url);
//       }
//     }
//     console.log("----------------");
//     console.log("Filtered links on the page:", filtered);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

const getAllLinks = async (url: string) => {
    const visited: string[] = []

    const initialLinks = await extractLinksFromUrl(url)
    const filtered = initialLinks.filter((link) => link.startsWith(url) || link.startsWith('/'))
    const mapped = filtered.map((link) => {
        return link.startsWith('/') ? url + link : link
    })
    const noDuplicates = [...new Set(mapped)]
    console.log('Links on the page: ', noDuplicates)

    while (initialLinks.length > 0) {
        const currentLink = initialLinks.shift()
        if (currentLink) {
            const links = await extractLinksFromUrl(currentLink)
            const filtered = links.filter((link) => link.startsWith(url) || link.startsWith('/'))
            const mapped = filtered.map((link) => {
                return link.startsWith('/') ? url + link : link
            })
            const noDuplicates = [...new Set(mapped)]
            console.log('Links on the page: ', noDuplicates)
            for (const link of noDuplicates) {
                if (!visited.includes(link)) {
                    visited.push(link)
                    initialLinks.push(...(await extractLinksFromUrl(link)))
                }
            }
        }
    }
    console.log('Visited: ', visited)
    return visited
}

getAllLinks(url)
