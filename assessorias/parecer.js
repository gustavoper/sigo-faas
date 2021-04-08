'use strict';

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set region
AWS.config.update({region: 'sa-east-1'});

const sns = new AWS.SNS()

module.exports.emitir = async (event, context, callback) => {
let data = event;
 if (event.body) {
    var finalData = event.body.replace(/\\/g, "");
    data = JSON.parse(finalData);
}


  console.error(event);
  
  const params = {
    Message: `
    Aviso: Foi emitido um parecer para a norma ${data.norma_titulo} 
    
    Descrição: ${data.parecer_conteudo}
    
    Risco de fazer: ${data.parecer_riscofazer}
    
    Risco de não fazer: ${data.parecer_risconaofazer}
    
    Notificar compliance: ${data.parecer_notificarcompliance}
    `,
    Subject: 'SIGO - Consultorias e Assessorias - Novo Perecer',
    TopicArn: 'arn:aws:sns:sa-east-1:787146068074:SIGO'
  };

  let respContent = {};

  try {
    const data = await sns.publish(params).promise();
    respContent.messageId = data.MessageId,
    respContent.result = 'Success'
  } catch (e) {
    //console.log(e.stack)
    respContent.result = "ERROR"
  }
  
  let response = {
    statusCode: 200,
     headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
                },
    body: JSON.stringify(respContent)
  };
  
  callback(null, response);

};