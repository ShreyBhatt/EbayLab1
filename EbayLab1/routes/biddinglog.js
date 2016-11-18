var winston = require('winston');

var bid = new (winston.Logger)({
    transports: [
        new (winston.transports.File)( { filename: '././logs/biddinglog.log', level: 'info', timestamp:false})
    ]
});

module.exports = bid;