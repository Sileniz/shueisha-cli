import type { Page } from "puppeteer";

async function getTextsFromSelector(page: Page, selector: string): Promise<Array<string | null>> {
  return page.evaluate(selector => {
    const nodes = document.querySelectorAll(selector);
    return Array.from(nodes).map(node => node.textContent);
  }, selector);
}
export default getTextsFromSelector