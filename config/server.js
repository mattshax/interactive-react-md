
const config = {
  apiPath: process.env.API_PATH || '/api/v1',
  database: process.env.DATABASE_URI || 'postgres://matthewshaxted:postgres@localhost:5432/postgres',
};

module.exports = config;
