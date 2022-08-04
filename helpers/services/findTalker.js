const readTalkerJSON = require('./readTalkerJson');

const findTalker = async (id) => {
  const talkers = await readTalkerJSON();
  const specificTalker = talkers.find((talker) => talker.id === Number(id));

  return specificTalker;
};

module.exports = findTalker;
