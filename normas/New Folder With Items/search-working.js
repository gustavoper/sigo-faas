'use strict';

module.exports.search = (event, context, callback) => {

  let statusCode = 200;
  let jsonResp = [
    {
        "data_inclusao": "1617029834516",
        "tipo": "Externa",
        "titulo": "NBRISO5745",
        "ativo": true,
        "id": "2",
        "descricao": "Esta Norma especifica as principais dimensões e os valore s de ensaio de um alicate prendedor e de manipulação, a fim de verificar a sua aptidão para a função, em conformidade com a NBRISO5744. Os requisitos técnicos gerais são apresentados na NBRISO5743."
    },
    {
        "data_inclusao": "1617029834517",
        "tipo": "Interna",
        "titulo": "NBR 8673",
        "ativo": true,
        "id": "1",
        "descricao": "Esta Norma estabelece os requisitos exigíveis de fabricação, inspeção e recebimento de conectores (plugues e receptáculos) para cabo elétrico para auxílios visuais luminosos em aeroportos."
    },
    {
        "tipo": "Externa",
        "data_inclusao": 1617029834515,
        "titulo": "NBR 9901",
        "ativo": true,
        "id": "1617029834515",
        "descricao": "Esta norma visa atender aos requisitos para descarte de lixo industrial, sintético ou orgânico, de empresas instaladas em qualquer parte do território nacional"
    }
];

    // create a response
    const response = {
      statusCode: statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Authorization'
      },
      body: JSON.stringify(jsonResp),
    };
    callback(null, response);
  };



