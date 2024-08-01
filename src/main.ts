import puppeteer, { type Browser, type Page } from 'puppeteer';
import readline from 'node:readline';
import getTextsFromSelector from '../utils/getText';
import getLinkFromSelector from "../utils/getLinkFromSelector"
import askIndex from '../utils/askIndex';

const mainFunction = async () => {
  const browser: Browser = await puppeteer.launch()
  const page: Page = await browser.newPage()
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  await page.goto('https://mangaplus.shueisha.co.jp/updates');

  await page.setViewport({width: 1080, height: 1024});

  const titles: Array<string | null> = await getTextsFromSelector(page, '.UpdatedTitle-module_titleName_1QO_s')
  const chapters: Array<string | null> = await getTextsFromSelector(page, '.UpdatedTitle-module_chapterTitle_kZUrz')
  const chapter: Array<string> = await getLinkFromSelector(page, 'UpdatedTitle-module_titleWrapper_2EQIT')
  if((!titles || titles == null) || (!chapters || chapters == null)) {
    console.log("Houve um erro ao buscar as atualizações")
    await browser.close()
  }
  console.log("Atualizações: \n")
  for(let i in titles){
    console.log(`${[i]}: ${titles[i]}: ${chapters[i] == 'ex' ? "Extra" : chapters[i]}`)
  }
  console.log('\n')
  rl.question(
    "Opções:\n1: [Ver info completa]\n2: [Encerrar o programa]\n",
    async (choice) => {
      if (choice == "1") {
        askIndex(rl, titles, async (index) => {
          const ch: string = chapter[index]
          await page.goto(ch)
          await page.waitForSelector('.TitleDetailHeader-module_info_1_7BN')
          const author = await page.$eval('.TitleDetailHeader-module_info_1_7BN', el => el.querySelector('p')?.textContent);
          console.log(`${titles[index]}\n${author}`)
          rl.close()
          await browser.close()
        });
      } else {
        rl.close();
        await browser.close()
      }
    }
  );
}

mainFunction().catch(error => {
  console.error('Error occurred:', error);
});