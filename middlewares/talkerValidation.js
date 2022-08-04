const { TOKEN_NOT_FOUND, INVALID_TOKEN, NAME_REQUIRED, INVALID_NAME_LENGTH,
AGE_REQUIRED, INVALID_AGE, TALK_REQUIRED, WATCHED_AT_REQUIRED,
INVALID_DATE, RATE_REQUIRED, INVALID_RATE } = require('../helpers/messages/errorMessages');
const { HTTP_CREATED, HTTP_BAD_REQUEST,
HTTP_UNAUTHORIZED } = require('../helpers/messages/statusMessages');

const validateToken = (request, response, next) => {
 const { authorization } = request.headers;
 if (!authorization) return response.status(HTTP_UNAUTHORIZED).json(TOKEN_NOT_FOUND);
 if (authorization.length !== 16) return response.status(HTTP_UNAUTHORIZED).json(INVALID_TOKEN);

 next();
};

const validateName = (request, response, next) => {
  const { name } = request.body;
  if (!name) return response.status(HTTP_BAD_REQUEST).json(NAME_REQUIRED);
  if (name.length <= 3) return response.status(HTTP_BAD_REQUEST).json(INVALID_NAME_LENGTH);

  next();
};

// const validateAge = () => {

// };

// const validateTalk = () => {

// };

// const validateWatched = () => {

// };

// const validateDate = () => {

// };

// const validateRate = () => {

// };

module.exports = { validateName, validateToken };
