const findTalker = require('./findTalker');

const getTalker = async (request) => {
  const { id } = request.params;
  const talker = await findTalker(id);
  
  return talker;
};

module.exports = getTalker;
