'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
var responseBody;

module.exports.search = async (event, context, callback) => {
  
  let data = event;
  if (event.body) {
     var finalData = event.body.replace(/\\/g, "");
     data = JSON.parse(finalData);
 }
 

  const params = {
    TableName: process.env.DYNAMODB_TABLE_NORMAS,
    FilterExpression: "contains(titulo, :titulo)",
    ExpressionAttributeValues: {
      ":titulo": data.titulo 
    }
  };

  let statusCode = 200;



    try {
      dynamoDb.scan(params, (error, result) => {
        responseBody = result.Items;
        console.error(result);
      });

    } catch (e) {
      statusCode = 400;
      responseBody = e;
      
    }

     
  let response = {
    statusCode: 200,
     headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
                },
    body: JSON.stringify(responseBody)
  };
  
  callback(null, response);
}

