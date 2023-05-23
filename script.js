var nodes = [
  new labella.Node(10, 50), // idealPos(Location on line), width(of label)
  new labella.Node(50, 50),
  new labella.Node(120, 600),
  new labella.Node(400, 100),
  new labella.Node(300, 50),
  new labella.Node(500, 100),
  new labella.Node(10, 100),
];

//https://github.com/twitter/labella.js/blob/master/docs/Force.md
const force = new labella.Force({
  lineSpacing: 2,
  nodeSpacing: 3,
  minPos: 0,
  maxPos: 700,
  density: 0.75,
  algorithm: "overlap",
})
  .nodes(nodes)
  .compute();

//Onload of the window incase the script runs before the the DOM is loaded.
//This would overide any changes d3Kit and Labella make.
window.onload = function () {
  //D3Kit runs on top of D3 to create a svg element in the
  //DOM and return it as a selection object so we can attach objects to it and also manipulate it
  const chart = new d3Kit.SvgChart("#chart0", {
    initialWidth: 600,
    initialHeight: 500,
    margin: { left: 20, right: 20, top: 20, bottom: 30 },
    offset: [0.5, 0.5], // add little offset for sharp-edge rendering
    layerGap: 60,
    nodeHeight: 12,
  });

  //This is a function of d3Kit to create <g> child elements of the chart we just created based on the below array
  //https://github.com/twitter/d3kit/blob/master/docs/api/LayerOrganizer.md
  const layers = new d3Kit.LayerOrganizer(chart.rootG);
  layers.create(["line", "path", "label", "dot"]);

  //The renderer is the utility that takes the nodes and will be used to add x, y, dx and dy to each node for use later.
  //It will also later be used to generate the line path from node to label
  const renderer = new labella.Renderer({
    layerGap: chart.options.layerGap,
    nodeHeight: chart.options.nodeHeight,
  });
  renderer.layout(nodes);
  console.log(nodes);

  //select the line layer and create a line object
  const mainLine = layers
    .get("line")
    .append("line")
    .style("stroke-width", 2)
    .style("stroke", "#222");

  //get max height of the nodes
  const height = d3.max(nodes, (node) => node.y);
  console.log(chart.options());
  chart.height(
    height + chart.options().margin.top + chart.options().margin.bottom
  );

  mainLine.attr("x2", chart.getInnerWidth());

  // ---------------------------------------------------
  // Draw dots on the timeline
  // ---------------------------------------------------
  const dots = layers.get("dot").selectAll("circle.dot").data(nodes);

  //This is a layover from D3 that is used to remove items in the .data([]) function above. 
  //http://using-d3js.com/02_01_binding_data.html#h_inzMid6Mr3
  dots.exit().remove();
  //adding circles to the line at the nodes idealPos
  dots
    .enter()
    .append("circle")
    .classed("dot", true)
    .style("fill", "#222")
    .attr("r", 3)
    .attr("cx", (node) => node.idealPos);

  // ---------------------------------------------------
  // Draw path from point on the timeline to the label rectangle
  // ---------------------------------------------------

  var path = layers.get("path").selectAll("path").data(nodes);

  path.exit().remove();

  path
    .enter()
    .append("path")
    .style("stroke", "Black")
    .style("stroke-width", 2)
    .style("opacity", 0.6)
    .style("fill", "none")
    .attr("d", node => renderer.generatePath(node));
};
