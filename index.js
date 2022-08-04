const express = require('express');
const bodyParser = require('body-parser');
const createRandomToken = require('./helpers/services/createRandomToken');
const findTalker = require('./helpers/services/findTalker');
const readTalkerJSON = require('./helpers/services/readTalkerJson');
const { HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS } = require('./helpers/messages/statusMessages');
const { TALKER_NOT_FOUND } = require('./helpers/messages/errorMessages');
const loginValidation = require('./middlewares/loginValidation');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

app.get('/talker', async (_request, response) => (
  response
  .status(HTTP_OK_STATUS)
  .send(await readTalkerJSON())
  ));
  
app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talker = await findTalker(id);

  if (!talker) {
    return response
      .status(HTTP_NOT_FOUND_STATUS)
      .json({ message: TALKER_NOT_FOUND });
  } 
  response.status(200).json(talker);
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
