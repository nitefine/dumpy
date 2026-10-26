const express = require('express');
const cors = require('cors');

function startServer(dbData, port) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  let db = JSON.parse(JSON.stringify(dbData));

  app.use((req, res, next) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
  });

  const resources = Object.keys(db);

  resources.forEach((resource) => {
    const basePath = `/api/${resource}`;

    app.get(basePath, (req, res) => {
      let data = db[resource];
      
      if (req.query._limit) {
        const limit = parseInt(req.query._limit, 10);
        data = data.slice(0, limit);
      }

      res.json({
        success: true,
        count: data.length,
        data: data
      });
    });

    app.get(`${basePath}/:id`, (req, res) => {
      const id = isNaN(req.params.id) ? req.params.id : Number(req.params.id);
      const item = db[resource].find((el) => el.id === id);

      if (!item) {
        return res.status(404).json({ success: false, message: 'Resource not found' });
      }

      res.json({ success: true, data: item });
    });

    app.post(basePath, (req, res) => {
      const newItem = req.body;
      
      const lastItem = db[resource][db[resource].length - 1];
      const newId = lastItem && typeof lastItem.id === 'number' ? lastItem.id + 1 : Date.now();

      const created = { id: newId, ...newItem };
      db[resource].push(created);

      res.status(201).json({ success: true, data: created });
    });

    app.put(`${basePath}/:id`, (req, res) => {
      const id = isNaN(req.params.id) ? req.params.id : Number(req.params.id);
      const index = db[resource].findIndex((el) => el.id === id);

      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Resource not found' });
      }

      db[resource][index] = { ...db[resource][index], ...req.body, id };

      res.json({ success: true, data: db[resource][index] });
    });

    app.delete(`${basePath}/:id`, (req, res) => {
      const id = isNaN(req.params.id) ? req.params.id : Number(req.params.id);
      const index = db[resource].findIndex((el) => el.id === id);

      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Resource not found' });
      }

      const deleted = db[resource].splice(index, 1);

      res.json({ success: true, message: 'Successfully deleted', data: deleted[0] });
    });
  });

  app.listen(port, () => {
    const bannerBase64 = "IF9fX18gIF8gICBfIF9fICBfXyBfX19fX18gICBfXwp8ICBfIFx8IHwgfCB8ICBcLyAgfCAgXyBcIFwgLyAvCnwgfCB8IHwgfCB8IHwgfFwvfCB8IHxfKSBcIFYgLyAKfCB8X3wgfCB8X3wgfCB8ICB8IHwgIF9fLyB8IHwgIAp8X19fXy8gXF9fXy98X3wgIHxffF98ICAgIHxffCAg"
    const decodedBanner = Buffer.from(bannerBase64, 'base64').toString('utf8');

    const RESET = "\x1b[0m";
    const CYAN = "\x1b[36m";
    const GREEN = "\x1b[32m";
    const YELLOW = "\x1b[33m";
    const BOLD = "\x1b[1m";

    console.log(BOLD + CYAN + decodedBanner + RESET);

    console.log(`\n${GREEN}✨ Dumpy activated!${RESET} Server running on ${YELLOW}http://localhost:${port}${RESET}`);
    console.log(`📦 Available endpoint:`);
    resources.forEach((res) => {
      console.log(`   - http://localhost:${port}/api/${res}`);
    });
    console.log(`\nPress CTRL+C to terminate.\n`);
  });
}

module.exports = startServer;