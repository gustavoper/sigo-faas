'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE_NORMAS,
};

module.exports.list = (event, context, callback) => {
  
  dynamoDb.scan(params, (error, result) => {
  
    if (error) {
      console.error(error);
      callback(new Error('ERROR_FETCHING_DATA'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};