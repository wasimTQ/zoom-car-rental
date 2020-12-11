const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || 'development';
let hostname, db;

if(env == 'development'){
  hostname = "127.0.0.1";


  db = new Sequelize('car-rental', process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: hostname,
    dialect: 'postgres',
    define: {
      timestamps: false
    }
  });
}else{
  hostname = process.env.DATABASE_URL;

  db = new Sequelize(hostname, {
    dialect:  'postgres',
    protocol: 'postgres',
    logging:  true,
    define: {
      timestamps: false
    }
  })
}



module.exports = db;
