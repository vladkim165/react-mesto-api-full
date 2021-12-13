const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const cookie = req.cookies.jwt;

  if (!cookie) {
    const err = new Error('Необходима авторизация');
    err.statusCode = 401;

    next(err);
  }

  let payload;

  try {
    const { JWT_SECRET = 'dev-key' } = process.env;
    console.log(cookie);
    console.log(payload);
    payload = jwt.verify(cookie, JWT_SECRET);
  } catch (e) {
    const err = new Error('Необходима авторизация. Неверный токен');
    err.statusCode = 401;

    next(err);
  }
  req.user = payload;
  next();
};
