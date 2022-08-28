const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/game-quest', {
    
});

module.exports = mongoose.connection;