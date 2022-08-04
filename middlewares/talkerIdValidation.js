const findTalker = require('../helpers/services/findTalker');
const { TALKER_NOT_FOUND } = require('../helpers/messages/errorMessages');
const { HTTP_NOT_FOUND_STATUS } = require('../helpers/messages/statusMessages');

const talkerIdValidation = async (request, response, next) => {
  const { id } = request.params;
  const talker = await findTalker(id);

  if (!talker) {
    return response
      .status(HTTP_NOT_FOUND_STATUS)
      .json({ message: TALKER_NOT_FOUND });
  } 
  next();
};

module.exports = talkerIdValidation;
