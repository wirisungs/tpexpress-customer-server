const { SSO } = require("@htilssu/wowo");

const sso = new SSO(TPE)

const login = async (req, res) => {
  sso.redirectToLogin(location.origin + callbackUrl)
};

module.exports = { login };
