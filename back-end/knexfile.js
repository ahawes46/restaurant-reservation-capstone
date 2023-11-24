/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgres://mmnjmtju:A_w-uZLdz2uQcTmqy4WMwlZf3zEgDb7U@hansken.db.elephantsql.com/mmnjmtju",
  DATABASE_URL_DEVELOPMENT = "postgres://dlpbtyif:3l2h4BNJ8xQeB2GyUPSP5jX9Uw-y3wmH@hansken.db.elephantsql.com/dlpbtyif",
  DATABASE_URL_TEST = "postgres://hqmrjjdd:BJvMgdwevcw3hmT5t8YYzdUoa1iuHdW3@hansken.db.elephantsql.com/hqmrjjdd",
  DATABASE_URL_PREVIEW = "postgres://zqsccetz:dXIZTjCR3SWsR8f80yEKjcSlyv2O0Q2l@hansken.db.elephantsql.com/zqsccetz",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
