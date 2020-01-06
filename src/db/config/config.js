require("@babel/register");
const dotenv = require('dotenv');

dotenv.config({ path: 'variable.env' });
const dialect = 'postgres';
module.exports = {
  "development": {
    use_env_variable: 'DATABASE_URL',
    dialect
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
  // "development": {
  //   "username": "postgres",
  //   "password": null,
  //   "database": "ride-my-way",
  //   "host": "127.0.0.1",
  //   "dialect": "postgres"
  // }
}
