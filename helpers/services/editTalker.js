const fs = require('fs').promises;
const readTalkerJSON = require('./readTalkerJson');

const editTalker = async (request) => {
  const { id } = request.params;
  const { name, age, talk } = request.body;

  const talkerList = await readTalkerJSON();
  const talkerIndex = talkerList.findIndex((talker) => talker.id === Number(id));
  
  talkerList[talkerIndex] = { 
    ...talkerList[talkerIndex],
    name,
    age,
    talk,
  };

  await fs.writeFile('talker.json', JSON.stringify(talkerList));
  return talkerList[talkerIndex];
};

module.exports = editTalker;
