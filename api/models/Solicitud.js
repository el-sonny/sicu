/**
* Solicitud.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
  	'FECHASOLICITUD' : {
      type: 'DATETIME',
      index : true
    },
  	'FOLIO' : {
      unique : true,
      index : true
    },
    'dependencia' : {
      index : true
    },
    'status' : {
      index : true
    },
    'sector' : {
      index : true
    },
    'sector' : {
      index : true
    },
    'recursos_revision' : {
      collection : 'recurso_revision',
      via : 'Folio de la solicitud'
    },
    'respuesta' : {
      model : 'respuesta'
    }
  },
  
  migrate:'safe'
};

