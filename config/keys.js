// keys.js figure out which environment and return 

if(process.env.NODE_ENV === 'PRODUCTION') {
    module.exports = require('./prod')

} else {
    module.exports = require('./dev')
}