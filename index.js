// Import puppeteer
const puppeteer = require('puppeteer');
const fs = require('fs');
const { title } = require('process');

const getQuotes = async (id) => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Create a page
  const page = await browser.newPage();
  // Go to your site
  await page.goto(
    'https://architech.zone/nfts/archway1yr5jel6egdldl6tzzm7tp295ly36v5kml4nw0q0rhhgguzdpej3s5alr5z/' + id,
    {
      waitUntil: ['domcontentloaded', 'load', 'networkidle0'],
    }
  );
  //await page.setContent();
  //Get page data
  const quotes = await page.evaluate(() => {
    const title = document.querySelector(
      'div.d-flex.align-items-center.lightText.justify-content-between > h2'
    ).innerText;
    const mintNo = document.querySelector('div.d-flex.align-items-center.mb16 > h1').innerText;
    const owner = document.querySelector('div.d-flex.justify-content-between > div > a').innerText;
    const ownerP = document.querySelector('div.d-flex.justify-content-between > div > a').getAttribute('href');
    const ownerProfile = 'https://architech.zone' + ownerP;
    const image = document
      .querySelector('div.br8.square.col-md-6.col-8.offset-md-0.offset-2 > img')
      .getAttribute('src');

    const traits = {};
    const nodes = document.querySelectorAll('div.singletoken_trait__DxiV7.grayCard > span.singletoken_value__vKCtc');
    const announces = [];
    nodes.forEach((el) => {
      let trait = el.innerText;
      announces.push(trait);
    });

    traits.background = announces[0];
    traits.lineage = announces[1];
    traits.tattoos_left = announces[2];
    traits.tattoos_right = announces[3];
    traits.attire = announces[4];
    traits.expression = announces[5];
    traits.beard = announces[6];
    traits.earrings = announces[7];
    traits.gaze_and_eyewear = announces[8];
    traits.hats_and_hair = announces[9];
    traits.factor = announces[10];

    return { title, mintNo, owner, ownerProfile, image, traits };
  });

  // Display the quotes
  console.log(quotes);
  // Close the browser
  await browser.close();

  if (Object.keys(quotes).length > 0) {
    console.log(id, 'th scrapped');
    fs.writeFileSync(`./data/${id}.json`, JSON.stringify(quotes));
    id++;
    getQuotes(id);
  } else {
    console.log('FINISHED');
  }
};

getQuotes(0);
