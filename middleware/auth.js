// FR-12: Middleware Auth
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.status(401).json({ 
    status: 'error', 
    message: 'Silakan login terlebih dahulu' 
  });
}

function isAuthenticatedPage(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/login');
}

module.exports = { isAuthenticated, isAuthenticatedPage };