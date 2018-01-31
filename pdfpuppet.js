#!/usr/bin/env node
const puppeteer = require('puppeteer');
const argv = require('minimist')(process.argv.slice(2));

const options = {
  path: argv.path || '',
  scale: Number(argv.path) || 1,
  displayHeaderFooter: (argv.displayHeaderFooter == 'true' || argv.displayHeaderFooter == '1'),
  headerTemplate: argv.headerTemplate || '',
  footerTemplate: argv.footerTemplate || '',
  printBackground: (argv.printBackground == 'true' || argv.printBackground == '1'),
  landscape: (argv.landscape == 'true' || argv.landscape == '1'),
  pageRanges: argv.pageRanges || '',
  format: argv.format || 'Letter',
  width: argv.width || '',
  height: argv.height || '',
  margin: {
    top: argv['margin-top'] || argv.margin || '0',
    right: argv['margin-right'] || argv.margin || '0',
    bottom: argv['margin-bottom'] || argv.margin || '0',
    left: argv['margin-left'] || argv.margin || '0'
  }
};

(async () => {
  const browser = await puppeteer.launch();
//const browser = await puppeteer.launch({executablePath: '/path/to/chrome'});
  const page = await browser.newPage();
  await page.goto(argv._[0]);
  await page.emulateMedia('screen');
  await page.pdf(options);
  await browser.close();
})();