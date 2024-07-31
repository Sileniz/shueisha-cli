import puppeteer, { type Browser, type Page } from 'puppeteer';

const mainFunction = async () => {
  const browser: Browser = await puppeteer.launch({headless: false})
  const page: Page = await browser.newPage()

  await page.goto('https://mangaplus.shueisha.co.jp/updates');

  await page.setViewport({width: 1080, height: 1024});
  //UpdatedTitles-module_gridContainer_mw8H9
  await browser.close()
}

mainFunction().catch(error => {
  console.error('Error occurred:', error);
});