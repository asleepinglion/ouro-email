"use strict";

var SuperJS = require('superjs');

module.exports = SuperJS.Class.extend({

  _metaFile : function() {
    this._super();
    this._loadMeta(__filename);
  },

  init: function(app, config) {

    //execute parent constructor
    this._super.apply(this, arguments);

    //localize configuration
    this.config = config;

    //load providers
    this.load();

  },

  load: function() {

    //load email providers
    if( this.config.providers ) {
      for( var provider in this.config.providers ) {
        this._load(provider, { setup: { namespace: 'providers', local: true }, config: this.config.providers[provider] });
      }
    }

    this.log.debug('email providers loaded:',Object.keys(this.providers));

  },

  send: function(resolve, reject, options, provider) {

    provider = provider || this.config.default;

    if( typeof provider !== 'string' ) {
      reject(new SuperJS.Error('invalid_provider', 'You must specify and install a provider, or set a default in the configuration.'));
    } else if( !this.providers[provider] ) {
      reject(new SuperJS.Error('invalid_provider', 'The `' + provider + '` provider is installed or is not valid.'));
    }

    this.log.debug('sending email via `' + provider + '`', options);

    this.providers[provider].send(options)
      .then(function(response) {
        resolve(response);
      })
      .catch(function(err) {
        reject(err);
      });

  }

});
