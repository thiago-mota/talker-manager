const crypto = require('crypto');

const createRandomToken = () => {
  const randomToken = crypto.randomBytes(8).toString('hex');
  // https://stackoverflow.com/a/27747377
  return randomToken;
};

module.exports = createRandomToken;