const express = require('express');
const bodyParser = require('body-parser');
const createRandomToken = require('./helpers/services/createRandomToken');
const readTalkerJSON = require('./helpers/services/readTalkerJson');
const { HTTP_OK_STATUS } = require('./helpers/messages/statusMessages');
const { validateEmail, validatePassword } = require('./middlewares/loginValidation');
const getTalker = require('./helpers/services/getTalker');
const talkerIdValidation = require('./middlewares/talkerIdValidation');
const { validateName, validateToken, validateAge, validateTalk,
validateWatchedAt, checkIfRateExist, validateRate } = require('./middlewares/talkerValidation');
const editTalker = require('./helpers/services/editTalker');
const addTalker = require('./helpers/services/addTalker');
const deleteTalker = require('./helpers/services/deleteTalker');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

app.get('/talker', async (_request, response) => (
  response
    .status(HTTP_OK_STATUS)
    .send(await readTalkerJSON())
  ));

  app.get('/talker/:id', talkerIdValidation, async (request, response) => {
    response
      .status(200)
      .json(await getTalker(request));
  });

app.post('/login', validateEmail, validatePassword, (_request, response) => (
  response
    .status(HTTP_OK_STATUS)
    .json({ token: createRandomToken() })
  ));

app.use(validateToken);

app.delete('/talker/:id', deleteTalker);

app.use(validateName, validateAge, validateTalk, validateWatchedAt, checkIfRateExist, validateRate);

app.post('/talker', addTalker);

app.put('/talker/:id', editTalker);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
