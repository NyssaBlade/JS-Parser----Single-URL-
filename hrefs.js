const { DataFrame } = require('data-forge');
const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://git-scm.com/download/mac';

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract <a> tags and href attributes.
    const hrefData = [];

    $('a').each(function () {
      const href = $(this).attr('href');
      if (href) {
        const text = $(this).text();
        const wordCount = text.trim().split(/\s+/).length; // Count number of words in anchor text.
        hrefData.push({ href, text, wordCount });
      }
    });

    const hrefs = new DataFrame(hrefData);

    console.log(hrefs.toString());
  })
  .catch(error => console.error(error));