import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.send(
    ReactDOMServer.renderToStaticMarkup(
      <html>
        <head>
          <title>Practice</title>
          <script type="text/javascript" src="/index.js" />
        </head>
        <body>
          <div id="root">Loading...</div>
        </body>
      </html>,
    ),
  );
});

app.get('/index.js', (req, res) => {
  res.type('text/javascript');

  const data = fs.readFileSync('build/main.js', 'utf8');

  res.send(data);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
