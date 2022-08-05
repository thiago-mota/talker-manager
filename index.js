const express = require('express');
const bodyParser = require('body-parser');
const createRandomToken = require('./helpers/services/createRandomToken');
const readTalkerJSON = require('./helpers/services/readTalkerJson');
const { HTTP_OK_STATUS, HTTP_CREATED } = require('./helpers/messages/statusMessages');
const loginValidation = require('./middlewares/loginValidation');
const getTalker = require('./helpers/services/getTalker');
const talkerIdValidation = require('./middlewares/talkerIdValidation');
const { validateName, validateToken, validateAge, 
 validateTalk, validateWatched, validateRate } = require('./middlewares/talkerValidation');

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

app.post('/talker', validateToken, validateName, validateAge, validateTalk, validateWatched, validateRate, (request, response) => {
  response
    .status(HTTP_CREATED)
    .json('xablau');
    console.log(request.body);
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
