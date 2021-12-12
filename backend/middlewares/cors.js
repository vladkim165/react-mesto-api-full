const allowedCors = [
  'https://mesto-prod.nomoredomains.rocks/',
  'http://mesto-prod.nomoredomains.rocks/',
  'https://api.mesto-prod.nomoredomains.rocks/',
  'http://api.mesto-prod.nomoredomains.rocks/',
  'http://localhost:3000/',
  'https://localhost:3000/',
];

module.exports = (req, res, next) => {
  const { method } = req;
  const requestHeaders = req.headers['Access-Control-Request-Headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  const { origin } = req.headers.Origin;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};
