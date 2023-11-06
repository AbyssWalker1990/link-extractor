import axios from "axios";
import cheerio from "cheerio";
import { URL } from "url";

async function crawl(
  url: string,
  visited: Set<string>,
  depth: number = 0,
  maxDepth: number = 3
) {
  if (depth > maxDepth) {
    return;
  }

  if (visited.has(url)) {
    return;
  }

  console.log(`Crawling: ${url}`);
  visited.add(url);

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract and print internal links
    $("a").each((_, element) => {
      const href = $(element).attr("href");
      if (href) {
        const resolvedUrl = new URL(href, url).href;
        if (resolvedUrl.startsWith(url)) {
          console.log("Internal link:", resolvedUrl);
          crawl(resolvedUrl, visited, depth + 1, maxDepth);
        }
      }
    });
  } catch (error) {
    console.error(`Error crawling ${url}:`, error);
  }
}

const startUrl = "https://www.wagslane.dev"; // Replace with the starting URL of the website
const maxCrawlDepth = 3; // Maximum depth to crawl

const visitedUrls = new Set<string>();
crawl(startUrl, visitedUrls, 0, maxCrawlDepth);
