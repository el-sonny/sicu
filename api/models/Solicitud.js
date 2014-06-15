/**
* Solicitud.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
  	'FECHASOLICITUD' : 'datetime',
  	'dependencia' : {
  		model : 'dependencia'
  	},
  	'FOLIO' : {
      unique : true,
      index : true
  	},
    'recursos_revision' : {
      collection : 'recurso_revision'
    },
  },
  
  migrate:'safe'
};

