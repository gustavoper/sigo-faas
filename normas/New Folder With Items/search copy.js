'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.search = (event, context, callback) => {

  let data = event;
  if (event.body) {
    var finalData = event.body.replace(/\\/g, "");
    data = JSON.parse(finalData);
  }


  console.error(event);
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NORMAS,
    FilterExpression: "contains(titulo, :titulo)",
    ExpressionAttributeValues: {
      ":titulo": data.titulo 
    }
  };

  // fetch book from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    let body = "";
    let statusCode = 200;

    if (error) {
      console.error(error);
      statusCode = 400;
      body = JSON.stringify(event);
    } else {
      body = result.Items;
    }




    // create a response
    const response = {
      statusCode: statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Authorization'
      },
      body: JSON.stringify(respBody),
    };
    callback(null, response);
  });
};


