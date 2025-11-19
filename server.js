const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;
const dataPath = path.join(__dirname, 'data', 'businesses.json');
const stats = {};

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get('/api/businesses', (_req, res) => {
  const payload = fs.readFileSync(dataPath, 'utf-8');
  res.type('application/json').send(payload);
});

app.post('/api/click', (req, res) => {
  const { businessId, type } = req.body || {};
  if (!businessId || !type) {
    return res.status(400).json({ ok: false, message: 'businessId y type requeridos' });
  }

  if (!stats[businessId]) stats[businessId] = { maps: 0, whatsapp: 0 };
  if (stats[businessId][type] !== undefined) {
    stats[businessId][type] += 1;
  }

  res.json({ ok: true, stats: stats[businessId] });
});

app.get('/api/stats', (_req, res) => {
  res.json(stats);
});

app.listen(port, () => {
  console.log(`Lisboa Crypto Map backend listo en http://localhost:${port}`);
});
