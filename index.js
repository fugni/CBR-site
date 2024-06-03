require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.EXPRESS_PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json(fetch(process.env.API_URL + "/random").then(response => response.json()));
});

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});