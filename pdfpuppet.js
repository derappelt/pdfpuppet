#!/usr/bin/env node
const puppeteer = require('puppeteer');
const argv = require('minimist')(process.argv.slice(2));

const defaultOptions = {
  path: '',
  scale: 1,
  displayHeaderFooter: false,
  headerTemplate: '',
  footerTemplate: '',
  printBackground: false,
  landscape: false,
  pageRanges: '',
  format: 'Letter',
  width: '',
  height: '',
  margin: {
    top: '0',
    right: '0',
    bottom: '0',
    left: '0'
  }
};

argv.margin= {
  top: argv['margin-top'] || argv.margin || defaultOptions.margin.top,
  right: argv['margin-right'] || argv.margin || defaultOptions.margin.right,
  bottom: argv['margin-bottom'] || argv.margin || defaultOptions.margin.bottom,
  left: argv['margin-left'] || argv.margin || defaultOptions.margin.left
}

const options = {...defaultOptions, ...argv};

(async () => {
  const browser = await puppeteer.launch();
//const browser = await puppeteer.launch({executablePath: '/path/to/chrome'});
  const page = await browser.newPage();
  await page.goto(argv._[0]);
  await page.emulateMedia('screen');
  await page.pdf(options);
  await browser.close();
})();