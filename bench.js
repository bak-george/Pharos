import { getSiteData, getHTMLContentFromUrl } from "./src/ingest.js";

const rawData = await getSiteData("https://georgebakoulis.dev/sitemap.xml");
const enriched = await getHTMLContentFromUrl(rawData);

console.log(`fetched ${enriched.length} pages`);
