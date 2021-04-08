'use strict';
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.create = async (event, context, callback) => {
  let data = event;
  const timestamp = new Date().getTime();
  if (event.body) {
     var finalData = event.body.replace(/\\/g, "");
     data = JSON.parse(finalData);
 }

 const params = {
    TableName: process.env.DYNAMODB_TABLE_NORMAS,
    Item: {
    id: timestamp.toString(),
    ativo: data.ativo,
    data_inclusao: timestamp,
    descricao: data.descricao,
    tipo: data.tipo,
    titulo: data.titulo,
    }, 
  };
 // write the book to the database
  dynamoDb.put(params, (error, data) => {
  // handle potential errors
  if (error) {
  console.error(error);
  callback(new Error("Could not create the book item."));
  return;
  }
 // create a response
  const response = {
  statusCode: 201,
  body: JSON.stringify(data)  
  };
  callback(null, response);
  });
}