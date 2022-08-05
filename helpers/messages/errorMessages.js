 const errorMessages = {
    TALKER_NOT_FOUND: 'Pessoa palestrante não encontrada',
    TOKEN_NOT_FOUND: 'Token não encontrado',
    INVALID_TOKEN: 'Token inválido',
    NAME_REQUIRED: 'O campo "name" é obrigatório',
    INVALID_NAME_LENGTH: 'O "name" deve ter pelo menos 3 caracteres',
    AGE_REQUIRED: 'O campo "age" é obrigatório',
    INVALID_AGE: 'A pessoa palestrante deve ser maior de idade',
    TALK_REQUIRED: 'O campo "talk" é obrigatório',
    WATCHED_AT_REQUIRED: 'O campo "watchedAt" é obrigatório',
    INVALID_DATE: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    RATE_REQUIRED: 'O campo "rate" é obrigatório',
    INVALID_RATE: 'O campo "rate" deve ser um inteiro de 1 à 5',
 }; 

 module.exports = errorMessages;
