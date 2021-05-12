module.exports = {
  host: 'localhost',
  dialect: 'postgres',
  username: process.env.USER_DB_NAME,
  password: process.env.PASSWORD_DB,
  database: 'addressbook_development',
  "test": {
    database: 'addressbook_test',
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  }
}
