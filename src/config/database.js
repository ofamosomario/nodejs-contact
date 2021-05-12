module.exports = {
  host: 'localhost',
  dialect: 'postgres',
  username: process.env.USER_DB_NAME,
  password: process.env.PASSWORD_DB,
  database: 'addressbook_test',
  "development": {
    database: 'addressbook_development',
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  }
}
