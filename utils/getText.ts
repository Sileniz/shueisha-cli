import type { Page } from "puppeteer";

async function getTextsFromSelector(page: Page, selector: string) {
  return page.evaluate(selector => {
    const nodes = document.querySelectorAll(selector);
    return Array.from(nodes).map(node => node.textContent);
  }, selector);
}
export default getTextsFromSelector