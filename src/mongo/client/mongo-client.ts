const mongoose = require('mongoose');

const { mongo: mongoConfig } = require('config');

mongoose.connect(mongoConfig.connectionString, { useNewUrlParser: true });

export {};
