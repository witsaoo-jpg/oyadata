'use strict';
(() => {
  const SOURCE='https://witsaoo-jpg.github.io/rain-radar-thailand/';
  const nativeFetch=window.fetch.bind(window);
  window.fetch=(input,init)=>{
    if(typeof input==='string' && input.startsWith('./data/')){
      return nativeFetch(SOURCE+input.slice(2),init);
    }
    return nativeFetch(input,init);
  };
})();