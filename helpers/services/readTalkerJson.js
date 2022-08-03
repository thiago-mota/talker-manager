const fs = require('fs').promises;

const readTalkerJSON = async () => {
  const talkers = await fs.readFile('./talker.json', 'utf8');
  return JSON.parse(talkers);
};

module.exports = readTalkerJSON;
