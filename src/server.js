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
    const _0x44e2e5=_0x2559;function _0x11ec(){const _0x1799e2=['utf8','log','95720NonyiJ','IF9fX18gIF8gICBfIF9fICBfXyBfX19fX18gICBfXwp8ICBfIFx8IHwgfCB8ICBcLyAgfCAgXyBcIFwgLyAvCnwgfCB8IHwgfCB8IHwgfFwvfCB8IHxfKSBcIFYgLyAKfCB8X3wgfCB8X3wgfCB8ICB8IHwgIF9fLyB8IHwgIAp8X19fXy8gXF9fXy98X3wgIHxffF98ICAgIHxffCAg','http://localhost:','815551TqLjaE','\x0aPress\x20CTRL+C\x20to\x20terminate.\x0a','/api/','\x1b[33m','2402jMbFgE','base64','\x1b[1m','📦\x20Available\x20endpoint:','\x20\x20\x20-\x20http://localhost:','764884vMirJz','6ZSwZln','\x1b[0m','toString','1511440hoxALi','10JuTZYx','\x20Server\x20running\x20on\x20','3AcNNuc','2878505PXUmdw','12TMGJhr','1265139JToEvp'];_0x11ec=function(){return _0x1799e2;};return _0x11ec();}function _0x2559(_0x8effce,_0x4829f9){_0x8effce=_0x8effce-0x1b0;const _0x11ec0e=_0x11ec();let _0x2559de=_0x11ec0e[_0x8effce];return _0x2559de;}(function(_0x4b1f20,_0x53680e){const _0x13194b=_0x2559,_0x216f97=_0x4b1f20();while(!![]){try{const _0x3ffee1=-parseInt(_0x13194b(0x1b4))/0x1*(parseInt(_0x13194b(0x1ba))/0x2)+-parseInt(_0x13194b(0x1c0))/0x3*(parseInt(_0x13194b(0x1b9))/0x4)+parseInt(_0x13194b(0x1c6))/0x5*(parseInt(_0x13194b(0x1c2))/0x6)+parseInt(_0x13194b(0x1c1))/0x7+parseInt(_0x13194b(0x1bd))/0x8+-parseInt(_0x13194b(0x1c3))/0x9+-parseInt(_0x13194b(0x1be))/0xa*(parseInt(_0x13194b(0x1b0))/0xb);if(_0x3ffee1===_0x53680e)break;else _0x216f97['push'](_0x216f97['shift']());}catch(_0x458284){_0x216f97['push'](_0x216f97['shift']());}}}(_0x11ec,0x3700e));const bannerBase64=_0x44e2e5(0x1c7),decodedBanner=Buffer['from'](bannerBase64,_0x44e2e5(0x1b5))[_0x44e2e5(0x1bc)](_0x44e2e5(0x1c4)),RESET=_0x44e2e5(0x1bb),CYAN='\x1b[36m',GREEN='\x1b[32m',YELLOW=_0x44e2e5(0x1b3),BOLD=_0x44e2e5(0x1b6);console[_0x44e2e5(0x1c5)](BOLD+CYAN+decodedBanner+RESET),console[_0x44e2e5(0x1c5)]('\x0a'+GREEN+'✨\x20Dumpy\x20activated!'+RESET+_0x44e2e5(0x1bf)+YELLOW+_0x44e2e5(0x1c8)+port+RESET),console[_0x44e2e5(0x1c5)](_0x44e2e5(0x1b7)),resources['forEach'](_0xd6bfcc=>{const _0x21e236=_0x44e2e5;console[_0x21e236(0x1c5)](_0x21e236(0x1b8)+port+_0x21e236(0x1b2)+_0xd6bfcc);}),console[_0x44e2e5(0x1c5)](_0x44e2e5(0x1b1));
  });
}

module.exports = startServer;