const { DataFrame } = require('data-forge');
const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://silly-cats.fandom.com/wiki/Silly_Cats_Wiki';

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract <meta> tags and attributes.
    const metaTagsData = [];

    // Extract the title of the page.
    const title = $('head > title').text();

    // Add the title as the first object in the array of meta tags.
    metaTagsData.unshift({
      name: 'title',
      content: title
    });

    $('meta').each(function () {
      const name = this.attribs['name']; // Get the "name" attribute of the <meta> tag.
      const content = this.attribs['content']; // Get the "content" attribute of the <meta> tag.
      if (name && content) { // Only add the tag to the array if both "name" and "content" are present.
        metaTagsData.push({
          name,
          content
        });
      }
    });

    // Convert the array of objects to a DataFrame.
    let metaTags = new DataFrame(metaTagsData);

    // Add a new column with the word count for each meta tag and title.
    metaTags = metaTags.select(row => ({
      ...row,
      wordsCount: row.content.split(' ').length
    }));

    console.log(metaTags.toString()); // Print the DataFrame to the console.
  })
  .catch(error => console.error(error));