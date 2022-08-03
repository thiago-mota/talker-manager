const readTalkerJSON = require('./readTalkerJson');
const { TALKER_NOT_FOUND } = require('../messages/errorMessages');
const { HTTP_NOT_FOUND_STATUS } = require('../messages/statusMessages');

const findTalker = async (request, response) => {
  const { id } = request.params;
  const talkers = await readTalkerJSON();
  
  const specificTalker = talkers.find((talker) => talker.id === Number(id));
  
  if (!specificTalker) {
    return response
    .status(HTTP_NOT_FOUND_STATUS)
    .json({ message: TALKER_NOT_FOUND });
  }

  return specificTalker;
};

module.exports = findTalker;
