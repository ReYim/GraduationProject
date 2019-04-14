const baseAbsPath = __dirname + '/';
const Sequelize = require('sequelize');
const constants = require('../../common/constants');
const config = require('../configs/mysql.conf.json');

class MySQLManager {
  constructor() {
    const instance = this;

    this.dbRef = null;
    this.host = null;
    this.port = null;
    this.dbname = null;

    this.username = null;
    this.password = null;

    this.testConnectionAsync = this.testConnectionAsync.bind(this);

    try {
      this.host = config.host;
      this.port = config.port;
      this.dbname = config.dbname;

      this.username = config.username;
      this.password = config.password;

      this.locationAndIdentity = instance.host + ":" + instance.port + "/" + this.dbname;

      this.dbRef = new Sequelize(instance.dbname, instance.username, instance.password, {
        host: instance.host,
        port: instance.port,
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        }
      });
    } catch (e) {
      // TODO	
    }
  }

  testConnectionAsync() {
    const instance = this;
    return instance.dbRef.authenticate();
  }
}

module.exports = MySQLManager;
