module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: process.env.USER_DB_NAME,
  password: process.env.PASSWORD_DB,
  database: 'addressbook',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  }
}
