var db = require('./dbconfig');

var knex = require('knex')({
											client: 'mysql',
											connection: db
										});
var bookshelf = require('bookshelf')(knex);
var Record = bookshelf.Model.extend({
  tableName: 'records',
  hasTimeStamps: true,
  
});

var Records = bookshelf.Collection.extend({
  model: Record
});

var recordObj = {};
		recordObj.records = Records;
		recordObj.record = Record;

module.exports = recordObj;