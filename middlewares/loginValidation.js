const { HTTP_BAD_REQUEST } = require('../helpers/messages/statusMessages');

const EMAIL_REQUIRED = { message: 'O campo "email" é obrigatório' };
const INVALID_EMAIL = { message: 'O "email" deve ter o formato "email@email.com"' };
const PASSWORD_REQUIRED = { message: 'O campo "password" é obrigatório' };
const INVALID_PASSWORD_LENGTH = { message: 'O "password" deve ter pelo menos 6 caracteres' };

const loginValidation = (request, response, next) => {
  const { email, password } = request.body;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  // https://www.educba.com/email-validation-in-javascript/

  if (!email) return response.status(HTTP_BAD_REQUEST).json(EMAIL_REQUIRED);
  if (!emailRegex.test(email)) return response.status(HTTP_BAD_REQUEST).json(INVALID_EMAIL);
  if (!password) return response.status(HTTP_BAD_REQUEST).json(PASSWORD_REQUIRED);
  if (password.length < 6) return response.status(HTTP_BAD_REQUEST).json(INVALID_PASSWORD_LENGTH);

  next();
};

module.exports = loginValidation;
