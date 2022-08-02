const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const TALKER_NOT_FOUND_MESSAGE = { message: 'Pessoa palestrante não encontrada' };
const PORT = '3000';

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

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
