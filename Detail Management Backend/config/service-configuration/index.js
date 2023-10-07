const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
// const config = require(`./${env}.js`);
const config = require(`./development`);
module.exports = config;