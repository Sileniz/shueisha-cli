import puppeteer, { type Browser, type Page } from 'puppeteer';
import getTextsFromSelector from '../utils/getText';
import getLinkFromSelector from "../utils/getLinkFromSelector"
const mainFunction = async () => {
  const browser: Browser = await puppeteer.launch()
  const page: Page = await browser.newPage()

  await page.goto('https://mangaplus.shueisha.co.jp/updates');

  await page.setViewport({width: 1080, height: 1024});

  const titles: Array<string | null> = await getTextsFromSelector(page, '.UpdatedTitle-module_titleName_1QO_s')
  const chapters: Array<string | null> = await getTextsFromSelector(page, '.UpdatedTitle-module_chapterTitle_kZUrz')
  const chapter = await getLinkFromSelector(page, 'UpdatedTitle-module_titleWrapper_2EQIT')
  if((!titles || titles == null) || (!chapters || chapters == null)) {
    console.log("Houve um erro ao buscar as atualizações")
    await browser.close()
  }
  console.log("Atualizações: \n")
  for(let i in titles){
    console.log(`${titles[i]}: ${chapters[i] == 'ex' ? "Extra" : chapters[i]}`)
  }
  console.log('\n')
  console.log(chapter)
  await browser.close()
}

mainFunction().catch(error => {
  console.error('Error occurred:', error);
});