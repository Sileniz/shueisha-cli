import puppeteer, { type Browser, type Page } from 'puppeteer';
import getTextsFromSelector from '../utils/getText';

const mainFunction = async () => {
  const browser: Browser = await puppeteer.launch()
  const page: Page = await browser.newPage()

  await page.goto('https://mangaplus.shueisha.co.jp/updates');

  await page.setViewport({width: 1080, height: 1024});

  const titles = await getTextsFromSelector(page, '.UpdatedTitle-module_titleName_1QO_s')
  const chapters = await getTextsFromSelector(page, '.UpdatedTitle-module_chapterTitle_kZUrz')

  console.log("Atualizações: ")

  for(let i in titles){
    console.log(`${titles[i]}: ${chapters[i] == 'ex' ? "Extra" : chapters[i]}`)
  }
  await browser.close()
}

mainFunction().catch(error => {
  console.error('Error occurred:', error);
});