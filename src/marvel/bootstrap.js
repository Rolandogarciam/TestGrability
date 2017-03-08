import characters from './characters'
import comics from './comics'

const resource = {
    'characters': characters,
    'comics': comics
}

export default function(options) {
  const api = { 
        apiDomain: 'https://gateway.marvel.com/',
        version: 'v1'
      }
  ;
  var internals = {};
    
  for(let i in resource){
    let opts = Object.assign({}, options, api, { resource: i })
    internals[i] = resource[i](opts);
  }
    
  return internals;

};