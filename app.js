const express = require('express');
const { getLatestDocuments } = require('./mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    const documents = await getLatestDocuments();
    res.json({ message: "Last 10 Orders:", data: documents });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: 'Failed to fetch documents from MongoDB' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
