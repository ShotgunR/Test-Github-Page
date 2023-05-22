const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const t = urlParams.get('t');
console.log(t);


let p = d3.select('body')
  .selectAll('div')
  .data([3, 4]);

const pEnter = p.enter()
  .append('div')
  .text(d => d);
  
p.text(d => d);