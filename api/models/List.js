/**
 * List
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    // todo: change this to display name
    // the actual name will be the tenantName
  	name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      defaultsTo: ''
    },
    createdBy: {
      type: 'string',
      defaultsTo: ''
    },
    tenantId: {
      type: 'string',
      required: true
    },
    tenantName: {
      type: 'string',
      required: true
    }
  }

};
