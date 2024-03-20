const POOL = require("pg").Pool;
const pool = new POOL({
        user:"playabook",
        port:5432,
        password:"8896",
        host:"localhost",
        database:"reelbook"
})
module.exports = pool;