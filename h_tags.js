const axios = require('axios');
const cheerio = require('cheerio');
const dataForge = require('data-forge');

// URL to fetch
const url = 'https://www.freecodecamp.org/news/setup-git-on-mac/';

// Fetch the web page with axios
axios.get(url)
  .then(response => {
    // Load the HTML into cheerio
    const $ = cheerio.load(response.data);

    // Extract all the H1, H2 and H3 tags
    const h1Tags = $('h1').toArray().map(e => $(e).text());
    const h2Tags = $('h2').toArray().map(e => $(e).text());
    const h3Tags = $('h3').toArray().map(e => $(e).text());

    // Combine the tags into a dataframe
    const df = new dataForge.DataFrame({
      columns: {
        'H1 Tags': h1Tags,
        'H2 Tags': h2Tags,
        'H3 Tags': h3Tags
      }
    });

    console.log(df.toString()); // Print the dataframe
  })
  .catch(error => {
    console.log(error);
  });