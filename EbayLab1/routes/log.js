var winston = require('winston');

var log = new (winston.Logger)({
    transports: [
        new (winston.transports.File)( { filename: '././logs/usertracking.log', level: 'info', timestamp:false})
    ]
});

module.exports = log;

