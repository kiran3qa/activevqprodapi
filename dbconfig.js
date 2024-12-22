const mssql = require('mssql')

const dbConfig = {
    user: 'db_ab09c2_vqapi_admin',
    password: 'Kini@1341',
    server: 'SQL1001.site4now.net',
    database: 'db_ab09c2_vqapi',
    options: {
        encrypt: true,
        trustServerCertificate: true
    },

    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },

    debug: {
        packet: true,
        payload: true,
        token: true
    }
};

const connection = mssql.connect(dbConfig)

module.exports = connection
