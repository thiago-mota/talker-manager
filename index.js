const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND_STATUS = 404;

const TALKER_NOT_FOUND_MESSAGE = { message: 'Pessoa palestrante não encontrada' };
const EMAIL_REQUIRED = { message: 'O campo "email" é obrigatório' };
const INVALID_EMAIL = { message: 'O "email" deve ter o formato "email@email.com"' };
const PASSWORD_REQUIRED = { message: 'O campo "password" é obrigatório' };
const INVALID_PASSWORD_LENGTH = { message: 'O "password" deve ter pelo menos 6 caracteres' };

const PORT = '3000';

const createRandomToken = () => {
  const randomToken = crypto.randomBytes(8).toString('hex');
  // https://stackoverflow.com/a/27747377
  return randomToken;
};

const readTalkerJSON = async () => {
  const talkers = await fs.readFile('talker.json', 'utf8');
  return JSON.parse(talkers);
};

app.get('/talker', async (_request, response) => (
  response
  .status(HTTP_OK_STATUS)
  .send(await readTalkerJSON())
  ));
  
  app.get('/talker/:id', async (request, response) => {
    const { id } = request.params;
    const talkers = await readTalkerJSON();
    
    const specificTalker = talkers.find((talker) => talker.id === Number(id));
    
    if (!specificTalker) {
      return response
      .status(HTTP_NOT_FOUND_STATUS)
      .json(TALKER_NOT_FOUND_MESSAGE);
    }
    
    return response
    .send(specificTalker);
  });
  
  app.post('/login', (request, response) => {
    const { email, password } = request.body;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    // https://www.educba.com/email-validation-in-javascript/

    if (!email) return response.status(HTTP_BAD_REQUEST).json(EMAIL_REQUIRED);
    if (!emailRegex.test(email)) return response.status(HTTP_BAD_REQUEST).json(INVALID_EMAIL);
    if (!password) return response.status(HTTP_BAD_REQUEST).json(PASSWORD_REQUIRED);
    if (password.length < 6) return response.status(HTTP_BAD_REQUEST).json(INVALID_PASSWORD_LENGTH);
  
    return response.status(HTTP_OK_STATUS).json({ token: createRandomToken() });
  });

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
