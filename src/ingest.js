export async function getSiteData(url) {
  const response = await fetch(url);
  const data = await response.text();

  return data;
}

export function filterUrlAndModDate(rawData) {
  const filteredUrlAndDate = []
  let openIndex = rawData.indexOf("<loc>")

  while (openIndex !== -1) {
    const closeIndex = rawData.indexOf("</loc>", openIndex)
    const url = rawData.slice(openIndex + "<loc>".length, closeIndex)

    const openIndexDate = rawData.indexOf("<lastmod>", closeIndex)
    const closeIndexDate = rawData.indexOf("</lastmod>", openIndexDate)
    const lastmod = rawData.slice(openIndexDate + "<lastmod>".length, closeIndexDate)

    filteredUrlAndDate.push({ url, lastmod })

    openIndex = rawData.indexOf("<loc>", closeIndex)
  }

  return filteredUrlAndDate
}

const rawData = await getSiteData("https://georgebakoulis.dev/sitemap.xml");
console.log(filterUrlAndModDate(rawData));
