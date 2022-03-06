const createServer = require('https').createServer;
const parse = require('url').parse;
const next = require('next');
const fs = require('fs');
const {PORT: port = 3000} = process.env;
const dev = process.env.NODE_ENV === 'development';
if (!dev) throw new Error('Can not start local server in non-dev env.');
const app = next({dev});
const handle = app.getRequestHandler();
const httpsOptions = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem'),
};
app.prepare().then(function () {
  createServer(httpsOptions, function (req, res) {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, function (err) {
    if (err) throw err;
    strapi.log.info('ready - started server on url: https://localhost:' + port);
  });
});
