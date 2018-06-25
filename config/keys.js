// keys.js figure out which environment and return 

if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod')

} else {
    module.exports = require('./prod')
}