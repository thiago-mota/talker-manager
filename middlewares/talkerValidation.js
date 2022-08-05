const { TOKEN_NOT_FOUND, INVALID_TOKEN, NAME_REQUIRED, INVALID_NAME_LENGTH,
AGE_REQUIRED, INVALID_AGE, TALK_REQUIRED, WATCHED_AT_REQUIRED,
INVALID_DATE, RATE_REQUIRED, INVALID_RATE } = require('../helpers/messages/errorMessages');
const { HTTP_BAD_REQUEST,
HTTP_UNAUTHORIZED } = require('../helpers/messages/statusMessages');

const validateToken = (request, response, next) => {
 const { authorization } = request.headers;

 if (!authorization) {
  return response
    .status(HTTP_UNAUTHORIZED)
    .json({ message: TOKEN_NOT_FOUND });
 }
 if (authorization.length !== 16) {
  return response
    .status(HTTP_UNAUTHORIZED)
    .json({ message: INVALID_TOKEN });
 }

 next();
};

const validateName = (request, response, next) => {
  const { name } = request.body;

  if (!name) {
    return response
      .status(HTTP_BAD_REQUEST)
      .json({ message: NAME_REQUIRED });
  } 
  if (name.length <= 3) {
    return response
      .status(HTTP_BAD_REQUEST)
      .json({ message: INVALID_NAME_LENGTH });
  }

  next();
};

const validateAge = (request, response, next) => {
  const { age } = request.body;
  
  if (!age) {
    return response
      .status(HTTP_BAD_REQUEST)
      .json({ message: AGE_REQUIRED });
  } 
  if (age < 18) {
    return response
      .status(HTTP_BAD_REQUEST)
      .json({ message: INVALID_AGE });
  }

  next();
};

const validateTalk = (request, response, next) => {
  const { talk } = request.body;
  // const { watchedAt, rate } = request.body.talk;

  if (!talk) {
    return response
      .status(HTTP_BAD_REQUEST)
      .json({ message: TALK_REQUIRED });
  }

  next();
};

const validateWatched = (request, response, next) => {
  const { watchedAt } = request.body.talk;
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  // https://www.regextester.com/99555

  if (!watchedAt) {
    return response
      .status(HTTP_BAD_REQUEST)
      .json({ message: WATCHED_AT_REQUIRED });
  }
  
  if (!dateRegex.test(watchedAt)) {
    return response
      .status(HTTP_BAD_REQUEST)
      .json({ message: INVALID_DATE });
  }

  next();
};

const validateRate = (request, response, next) => {
  const { rate } = request.body.talk;

  if (!rate) {
    return response
      .status(HTTP_BAD_REQUEST)
      .json({ message: RATE_REQUIRED });
  }
  if (typeof Object.values(rate) !== 'number'
  || Object.values(rate) > 5
  || Object.values(rate) < 1) {
    return response
      .status(400)
      .json({ message: INVALID_RATE });
  }
  // https://eslint.org/docs/latest/rules/valid-typeof checar se correto

  next();
};

module.exports = {
  validateName,
  validateToken,
  validateAge,
  validateTalk,
  validateWatched,
  validateRate,
};
