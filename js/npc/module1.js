import val2 from './module2.js';
import val3 from './module3.js';

const total=Date.now()-t0;
 document.querySelector('div').replaceChildren(total );
 
window.parent.postMessage(total,"*");
console.log(val2+val3);