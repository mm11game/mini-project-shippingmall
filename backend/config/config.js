const dotenv = require("dotenv");
dotenv.config();

const config = {
  development: {
    host: process.env.DBHOST,
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: "test01",
    dialect: "mysql",
  },
};

module.exports = config;
