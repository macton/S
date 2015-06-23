
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

var S = {
  curry    : curry,
  cv       : cv,
  identity : function( x ) { return x; },
};

exports = module.exports = S;
