// "use strict";

// const got = require("got");
// const cheerio = require("cheerio");

// class Crawler {
//   constructor(url) {
//     this.url = url.endsWith("/") ? url : url + "/";
//     this.links = [];
//   }

//   async fetch() {
//     try {
//       await this.getLinks();
//       this.links = [...new Set(this.links)];
//     } catch (err) {
//       throw err;
//     }
//   }

//   async getLinks() {
//     try {
//       const response = await this.getURL();
//       const $ = cheerio.load(response);
//       const links = $('a[href^="' + this.url + '"]');
//       const hrefs = this.parseLinks($, links);

//       if (hrefs.length > 0) {
//         hrefs.forEach((href) => {
//           this.links.push(href);
//         });
//       }
//     } catch (err) {
//       throw new Error("Unable to get links.");
//     }
//   }

//   async getURL() {
//     try {
//       const response = await got(this.url);
//       return response.body;
//     } catch (err) {
//       throw err;
//     }
//   }

//   parseLinks($dom, $links) {
//     const hrefs = [];

//     $links.each(function () {
//       hrefs.push($dom(this).attr("href"));
//     });

//     return hrefs;
//   }
// }

// (async () => {
//   try {
//     const crawler = new Crawler("https://www.luxoft.com/");
//     await crawler.fetch();

//     console.log(crawler.links);
//   } catch (err) {
//     console.log(err);
//   }
// })();
