---
name: web-scraping
description: Implement web scraping and browser automation using Playwright or Puppeteer to extract data from websites. Use this skill whenever the user wants to scrape websites, extract data from HTML, automate browser interactions, take screenshots, or monitor website changes. Trigger for "web scraping", "Playwright scraping", "Puppeteer", "extract data from website", "HTML parsing", "cheerio", "browser automation", or "screenshot automation".
---

# Web Scraping

Extract data from websites using Playwright, Puppeteer, or Cheerio.

## Playwright (Best for JS-heavy sites)

```bash
npm install playwright
npx playwright install chromium
```

```ts
import { chromium } from 'playwright';

async function scrapeProductData(url: string) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Block unnecessary resources to speed up scraping
  await page.route('**/*.{png,jpg,gif,svg,css,font}', route => route.abort());

  await page.goto(url, { waitUntil: 'networkidle' });

  // Wait for specific content
  await page.waitForSelector('.product-list');

  const products = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.product-card')).map(card => ({
      title: card.querySelector('h3')?.textContent?.trim(),
      price: card.querySelector('.price')?.textContent?.trim(),
      rating: card.querySelector('.rating')?.getAttribute('data-score'),
      url: card.querySelector('a')?.href,
    }));
  });

  await browser.close();
  return products;
}
```

## Handling Pagination

```ts
async function scrapeAllPages(baseUrl: string) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const allItems = [];
  let pageNum = 1;

  while (true) {
    await page.goto(`${baseUrl}?page=${pageNum}`);
    const items = await page.$$eval('.item', els =>
      els.map(el => ({ title: el.querySelector('h3')?.textContent }))
    );

    if (items.length === 0) break;
    allItems.push(...items);
    pageNum++;

    // Be polite — add delay between requests
    await page.waitForTimeout(1000 + Math.random() * 2000);
  }

  await browser.close();
  return allItems;
}
```

## Cheerio (Static HTML Parsing — Faster)

```bash
npm install cheerio node-fetch
```

```ts
import * as cheerio from 'cheerio';

async function parseStaticPage(url: string) {
  const html = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MyBot/1.0)' }
  }).then(r => r.text());

  const $ = cheerio.load(html);

  const articles = $('article').map((_, el) => ({
    title: $(el).find('h2').text().trim(),
    date: $(el).find('time').attr('datetime'),
    excerpt: $(el).find('.excerpt').text().trim(),
    url: $(el).find('a').attr('href'),
  })).get();

  return articles;
}
```

## Screenshot Automation

```ts
async function takeScreenshot(url: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  await browser.close();
}
```

## Rate Limiting & Ethics

```ts
// Respect robots.txt and add delays
const DELAY_MS = 2000;

async function politeRequest(url: string) {
  await new Promise(r => setTimeout(r, DELAY_MS));
  return fetch(url, {
    headers: {
      'User-Agent': 'MyBot/1.0 (contact@myapp.com)',
    }
  });
}
```

**Best Practices:**
- Check `robots.txt` before scraping
- Add random delays between requests (1-3s)
- Respect rate limits
- Use official APIs when available
- Cache results to minimize requests
- Include contact info in User-Agent
