import bootstrap from './bootstrap'

var Marvel = function(options) {

  if (!options) {
    throw new Error('You must provide API credentials');
  }

  if (!options.privateKey) {
    throw new Error('You must specify a private API key');
  }

  if (!options.publicKey) {
    throw new Error('You must specify a public API key');
  }
  this.api = bootstrap(options);

};

export default Marvel