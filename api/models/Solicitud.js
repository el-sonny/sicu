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
  	'folio' : {
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
    'respuesta' : {
      index : true
    },
    'recursos_revision' : {
      collection : 'recurso_revision',
      via : 'Folio de la solicitud'
    },
    'referencias_periodisticas' : {
      collection : 'referencia_periodistica',
      via : 'solicitud'
    },
    'respuesta' : {
      model : 'respuesta'
    },
  },
};

