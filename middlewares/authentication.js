const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userpayload = validateToken(tokenCookieValue);
      req.user = userpayload;
    } catch (error) {
      console.error("Error validating token:", error);
    }
    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
