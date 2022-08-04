const express = require('express');
const bodyParser = require('body-parser');
const createRandomToken = require('./helpers/services/createRandomToken');
const readTalkerJSON = require('./helpers/services/readTalkerJson');
const { HTTP_OK_STATUS } = require('./helpers/messages/statusMessages');
const loginValidation = require('./middlewares/loginValidation');
const getTalker = require('./helpers/services/getTalker');
const talkerIdValidation = require('./middlewares/talkerIdValidation');

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

app.post('/login', loginValidation, (_request, response) => (
  response
    .status(HTTP_OK_STATUS)
    .json({ token: createRandomToken() })
  ));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
