const cheerio = require('cheerio');
const axios = require('axios');
const { DataFrame } = require('data-forge');

// URL of the page you want to scrape
const url = 'https://www.freecodecamp.org/news/setup-git-on-mac/';

// Tags you want to extract
const tags = ['p', 'span', 'a', 'strong', 'em', 'blockquote', 'pre', 'code', 'ul', 'ol', 'li'];

// Function to count occurrences of each tag in HTML
function countTags(html) {
  const $ = cheerio.load(html);
  return tags.reduce((counts, tag) => {
    counts[tag] = $(tag).length;
    return counts;
  }, {});
}

// Make HTTP request to fetch the HTML
axios.get(url)
  .then(response => {
    // Count occurrences of each tag in HTML
    const counts = countTags(response.data);

    // Create DataFrame with columns for each tag
    const df = new DataFrame([counts], { columns: tags });

    // Log DataFrame to console
    console.log(df.toString());
  })
  .catch(error => {
    console.error(error);
  });