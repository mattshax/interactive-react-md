const Sequelize = require('sequelize');
const config = require('../config/server');

const seq = new Sequelize(config.database,{
  logging: false
});

seq.authenticate().then((errors) => {
  if (errors === undefined) {
    console.log('Connection successful: ', config.database);
  }
  else {
    console.log('Error connecting to database: ', errors);
  }
});

const Data = seq.define('data', {
  message: {
    type: Sequelize.STRING,
  },
});

const mainTriggerFunction = "CREATE OR REPLACE FUNCTION notify_event() RETURNS TRIGGER AS $$"+
"    DECLARE "+
"        data json;"+
"        notification json;"+
"    BEGIN"+
"        IF (TG_OP = 'DELETE') THEN"+
"            data = row_to_json(OLD);"+
"        ELSE"+
"            data = row_to_json(NEW);"+
"        END IF;"+
"        notification = json_build_object("+
"                          'table',TG_TABLE_NAME,"+
"                          'action', TG_OP,"+
"                          'data', data);"+
"        PERFORM pg_notify('events',notification::text);"+
"        RETURN NULL; "+
"    END;"+
"$$ LANGUAGE plpgsql;";

// create database or clear with force:true
Data.sync({
  force: false
}).then((table) => {
  console.log('applying trigger to ' + table.tableName);
  const tableTrigger = 'CREATE TRIGGER ' + table.tableName + '_event AFTER INSERT OR UPDATE OR DELETE ON ' + table.tableName + ' FOR EACH ROW EXECUTE PROCEDURE notify_event();'
  seq.query(mainTriggerFunction)
    .then(e => {
      return seq.query(tableTrigger)
    })
    .then(e => {
      console.log('trigger applied')
    })
    .catch(e => {
      console.log('trigger already exists')
    });
});

const db = {
  Data,
};

module.exports = db;
