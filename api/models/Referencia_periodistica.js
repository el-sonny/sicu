/**
* Referencia_periodistica.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	'id' : {
  		unique : true,
  		index : true
  	},
  	'solicitud' : {
  		index :true,
  		model:'solicitud'
  	}
  },
  migrate : 'safe',
};

