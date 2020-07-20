const secret = require('./secret')

module.exports = {
    MONGODB_URI: `mongodb://${secret.MONGO_USER}:${secret.MONGO_PASS}@ds229186.mlab.com:29186/heroku_bgk1zwnv`,
    PORT: 4040,
    baseUrl: "smolify.me/"
}
