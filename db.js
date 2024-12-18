const mssql = require('mssql')

const config = {
    user: 'db_ab09c2_vqapi_admin',
    password: 'Kini@1341',
    server: 'SQL1001.site4now.net',  // or IP address of the SQL Server
    database: 'db_ab09c2_vqapi',
    // options: {
    //   encrypt: true, // Use encryption (true if you're using Azure)
    //   trustServerCertificate: true, // For local development, set to true
    // }
  };

  mssql.connect(config)

  module.exports = mssql