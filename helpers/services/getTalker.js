const findTalker = require('./findTalker');

const getTalker = async (request) => findTalker(request.params.id);

module.exports = getTalker;
