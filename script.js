const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const t = urlParams.get('t')
console.log(t);
const div = d3.select("body")
.selectAll("div")
.data([4, 8, 15, 16, 23, 42])
.enter().append("div").text(d => d) 