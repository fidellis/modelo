'use strict';

require('dotenv').config();

const path = require('path');

process.env.IBM_DB_HOME = path.resolve('../drivers');

const ibmdb = require('ibm_db');
const logger = require('common/logger');

function checkVariables(vars) {
  vars.forEach(v => {
    if (!process.env[v]) throw new Error(`Environment variable ${v} is not defined.`);
  });
}

// variáveis de ambiente obrigatórias
checkVariables(['DB_DB2_USER', 'DB_DB2_PWD']);

class DB2 {

  constructor(options = {}) {
    const { user, pwd } = options;
    this.query = this.query.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.user = user;
    this.pwd = pwd;
  }

  open() {
    const self = this;
    if (this.conn) return Promise.resolve(this.conn);
    return new Promise((resolve, reject) => {
      ibmdb.open(`DRIVER={DB2};DATABASE=BDB2P04;UID=${self.user || process.env.DB_DB2_USER};PWD=${self.pwd || process.env.DB_DB2_PWD};HOSTNAME=gwdb2.bb.com.br;port=50100`, (err, conn) => {
        if (err) {
          console.error('Erro na conexão');
          logger.error(err.stack || err);
          return reject(err);
        }
        logger.debug('DB2 connection opened');
        self.conn = conn;
        resolve(conn);
      });
    });
  }

  query(sql) {
    return new Promise((resolve, reject) => {
      this.open().then(conn => {
        logger.debug('Executing query:', sql);
        conn.query(sql, (err, data) => {
          if (err) {
            logger.error(err.stack || err);
            return reject(err);
          }
          resolve(data);
        });
      }).catch(err => reject(err));
    });
  }

  close() {
    const conn = this.conn;
    return new Promise((resolve, reject) => {
      if (!conn) {
        resolve();
        return;
      }
      conn.close(err => {
        if (err) {
          reject(err);
          return;
        }
        console.log('DB2 connection closed');
        resolve();
      });
    });
  }
}

module.exports = DB2;