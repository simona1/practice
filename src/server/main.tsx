import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import { dieRoll } from './utils';

const app = express();
const PORT = 5000;

app.use((req, res, next) => {
  console.log('Logging path:', req.path);
  next();
});

app.use((req, res, next) => {
  if (req.method !== 'POST') {
    next();
    return;
  }
  console.log('Parsing body');
  const data: string[] = [];
  req.on('data', (d: Buffer) => {
    data.push(d.toString());
  });
  req.on('end', () => {
    try {
      req.body = JSON.parse(data.join(''));
    } catch (err) {
      console.log('Logging error for body parsing:', err);
      req.body = {};
    }
    next();
  });
});

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

const ROLL_DIE_PATH = '/api/v1/rolldie/';
app.post(ROLL_DIE_PATH, (req, res, next) => {
  const { dieSides } = req.body;
  res.type('application/json');
  const roll = dieRoll(dieSides ?? 6);
  res.send(JSON.stringify({ roll }));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
