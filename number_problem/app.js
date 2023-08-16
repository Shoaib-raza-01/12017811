const express = require('express');
const axios = require('axios'); 
const app = express();
const port = 8008; 


async function processUrls(urls) {
  const results = [];
  const requests = urls.map(async url => {
    try {
      const response = await axios.get(url, { timeout: 500 })
      if (response.data && Array.isArray(response.data.numbers)) {
        results.push(...response.data.numbers);
      }
    } catch (error) {
      console.error(`Error fetching data from ${url}: ${error.message}`);
    }
  });

  await Promise.all(requests)
  const uniqueSortedNumbers = Array.from(new Set(results)).sort((a, b) => a - b);
  return uniqueSortedNumbers;
}

app.get('/numbers', async (req, res) => {
  // const urls = req.query.url;
  const urls = Array.isArray(req.query.url) ? req.query.url : [req.query.url];

  if (!urls || urls.length === 0) {
    return res.status(400).send({ error: 'At least one URL is required' });
  }

  try {
    const extractedNumbers = await processUrls(urls)
    res.status(201).send({ numbers: extractedNumbers })
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`HTTP MicroService is running at PORT:${port}`);
});
