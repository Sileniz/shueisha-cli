import type { Page } from "puppeteer";

async function getLinkFromSelector(page: Page, selector: string): Promise<Array<string>> {
  return page.evaluate(selector => {
    const nodes = document.querySelectorAll(`div.${selector} > a`);
    return Array.from(nodes).map(node => node.href);
  }, selector);
}
export default getLinkFromSelector