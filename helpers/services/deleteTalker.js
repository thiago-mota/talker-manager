const fs = require('fs').promises;
const readTalkerJSON = require('./readTalkerJson');
const { HTTP_NO_CONTENT } = require('../messages/statusMessages');

const deleteTalker = async (request, response) => {
  const { id } = request.params;
  const talkerList = await readTalkerJSON();

  const removeTalker = talkerList.filter((talker) => talker.id !== Number(id));
  await fs.writeFile('talker.json', JSON.stringify(removeTalker));

  response
    .status(HTTP_NO_CONTENT)
    .json();
};

module.exports = deleteTalker;
