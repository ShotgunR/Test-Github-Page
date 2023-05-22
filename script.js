window.onload = function () {
  const chart = new d3Kit.SvgChart("#chart0", {
    initialWidth: 720,
    initialHeight: 500,
    margin: {left: 20, right: 20, top: 20, bottom: 30},
    offset: [0.5, 0.5], // add little offset for sharp-edge rendering
  });
  chart.rootG.append('circle')
  .attr('cx', 10)
  .attr('cy', 10)
  .attr('r', 5)
};
