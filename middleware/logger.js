// Middleware are functions that have access to the request and response object.
function logger(req, res, next) {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next(); // move to next middleware
}

module.exports = logger;
