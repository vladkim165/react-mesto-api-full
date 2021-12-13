const allowedCors = [
  'https://mesto-prod.nomoredomains.rocks',
  'http://mesto-prod.nomoredomains.rocks',
  'https://api.mesto-prod.nomoredomains.rocks',
  'http://api.mesto-prod.nomoredomains.rocks',
  'http://localhost:3000',
  'https://localhost:3000',
  'localhost:3000',
];

module.exports = (req, res, next) => {
  if (allowedCors.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
};
