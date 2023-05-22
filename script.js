const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const t = urlParams.get('t');
console.log(t);


d3.selectAll("h1").append("div");