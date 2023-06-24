const cheerio = require('cheerio');
const axios = require('axios');
const { DataFrame } = require('data-forge');

// URL of the page you want to scrape
const url = 'https://www.freecodecamp.org/news/setup-git-on-mac/';

// Tags you want to extract
const tags = ['p', 'span', 'a', 'strong', 'em', 'blockquote', 'pre', 'code', 'ul', 'ol', 'li'];

// Function to extract content of each tag in HTML
function extractTags(html) {
  const $ = cheerio.load(html);
  return tags.map(tag => {
    return {
      [tag]: $(tag).toArray().map(element => $(element).text())
    };
  });
}

// Make HTTP request to fetch the HTML
axios.get(url)
  .then(response => {
    // Extract content of each tag in HTML
    const data = extractTags(response.data);

    // Create DataFrame with columns for each tag
    const df = new DataFrame(data);

    // Log DataFrame to console
    console.log(df.toString());
  })
  .catch(error => {
    console.error(error);
  });
