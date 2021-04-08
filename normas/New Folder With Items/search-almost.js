'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.search = async (event) => {




  
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NORMAS,
    FilterExpression: "contains(titulo, :titulo)",
    ExpressionAttributeValues: {
      ":titulo": event.titulo 
    }
  };

  let statusCode = 200;

  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    let body = "";
    

    if (error) {
      console.error(error);
      statusCode = 400;
      body = JSON.stringify(event);
    } else {
      body = result.Items;
    }
  });
  return {
    statusCode: statusCode,
    body: JSON.stringify(
      {
        message: body,
        input: event.body,
      },
      null,
      2
    ),
  };
}

