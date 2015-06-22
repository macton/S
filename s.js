var path = require('path');

var curry = function(fn) {
  if (typeof fn!=='function') { 
    throw Error('Not a function'); 
  }
  var slice = [].slice;
  return function curriedFn() {
    var args = slice.call(arguments);
    if (args.length < fn.length) {
      return function() {
        return curriedFn.apply(null, args.concat( slice.call(arguments) ));
      };
    }
    return fn.apply(null, args);
  };
};

var cv = curry( function( x, y ) {
  return (typeof x === 'function') ? x(y) : x;
});

var use = function( pluginPath ) {
  var name = path.extname( pluginPath ).substr(1);
  var obj  = require( pluginPath );
  var keys = Object.keys( obj );

  Object.keys(obj).forEach( function( key ) {
    if ( typeof obj[key] === 'function' ) {
      if ( obj[key].length > 1 ) {
        obj[key] = curry( obj[key] );
      }
    }
  });

  S[name] = obj;
};

var S = {
  curry    : curry,
  cv       : cv,
  identity : function( x ) { return x; },
  use      : use,
};

exports = module.exports = S;
