const fs = require('fs').promises;
const readTalkerJSON = require('./readTalkerJson');

const addTalker = async (request, response) => {
  const { name, age, talk } = request.body;

  const talkerList = await readTalkerJSON();
 
  const newTalker = {
    id: talkerList.length + 1,
    name,
    age,
    talk,
  };

  talkerList.push(newTalker);
  await fs.writeFile('talker.json', JSON.stringify(talkerList));
  console.log(talkerList[talkerList.length - 1]);
  response.status(201).json(talkerList[talkerList.length - 1]);
};

module.exports = addTalker;
