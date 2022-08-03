const express = require('express');
const bodyParser = require('body-parser');
const createRandomToken = require('./helpers/services/createRandomToken');
const findTalker = require('./helpers/services/findTalker');
const readTalkerJSON = require('./helpers/services/readTalkerJson');
const { HTTP_OK_STATUS } = require('./helpers/messages/statusMessages');
const loginValidation = require('./middlewares/loginValidation');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

app.get('/talker', async (_request, response) => (
  response
  .status(HTTP_OK_STATUS)
  .send(await readTalkerJSON())
  ));

// app.post('/talker', async (request, response) => {
//   const { name, age, talk } = request.body;
//   const { authorization } = request.headers;
  // const talkers = await readTalkerJSON();
  // const newTalker = {
  //   name,
  //   age,
  //   talk,
  // };

  // const newTalkerList = talkers.push(newTalker);

//   if (name.length < 3) return response.status(HTTP_UNAUTHORIZED).message();
// });
  
app.get('/talker/:id', async (request, response) => (
  response
    .send(await findTalker(request, response))
));

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
