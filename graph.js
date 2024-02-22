import {spreadsheetId,range,API_KEY} from "/key.js";

function chart(dataset){

  // const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQS8ZgEo2FxRCUQi562fZ72A6jeEO3jkWMR1VRDgossR_-mMUhVFTJw0avWiTqS5-Z4npbjWX1sC5Ig/pubhtml';
  // d3.csv(csvUrl).then(function(data){
  //   console.log(data);
  // })


const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${API_KEY}`;

fetch(url)
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data.values);
  })
  .catch(error => console.log('Error:', error));

	 d3.select("#chart").selectAll('svg').remove();

	 var width = 800;
 	 var height = 500;
 	 var bar_color ={黄丹:"#D8BFD8", 蓝心:"#20B2AA", 艺洁:"#FFB6C1",小喵:"#FAFAD2",文奕:"#ADD8E6"};

   var svg = d3.select("#chart")
     			   .append("svg")
     			   .attr("width", width)
     			   .attr("height",height)
     			   .attr("id","snake_svg");

   var defs = svg.append("defs");
 	 var filter = defs.append("filter")
    .attr("id", "drop-shadow2")
    .attr("height", "125%");
    filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 5)
    .attr("result", "blur");

    filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 5)
    .attr("dy", 5)
    .attr("result", "offsetBlur");

 	 var feMerge = filter.append("feMerge");

	  feMerge.append("feMergeNode")
	    .attr("in", "offsetBlur")
	  feMerge.append("feMergeNode")
	    .attr("in", "SourceGraphic");
	 

	  var g =[svg.append("g").attr("transform","translate(250,40)")
	    ,svg.append("g").attr("transform","translate(650,100)")];

	   var bp=[ viz.bP()
      .data(dataset)
      .min(10)
      .pad(2)
      .height(height-50)
      .width(width/3)
      .barSize(45)
      .fill(d=>bar_color[d.primary])    
    ,viz.bP()
      .data(dataset)
      .value(d=>d[3])
      .min(10)
      .pad(1)
      .height(height-50)
      .width(width/3)
      .barSize(45)
      .fill(d=>bar_color[d.primary])
  ];


[0].forEach(function(i){
  g[i].call(bp[i])
 d3.selectAll(".subBars").style("filter","url(#drop-shadow2)");

  
  g[i].selectAll(".mainBars")
    .on("mouseover",mouseover)
    .on("mouseout",mouseout);

   


  g[i].selectAll(".mainBars").append("text").attr("class","label")
    .attr("x",d=>(d.part=="primary"? -105: 100))
    .attr("y",d=>(d.part=="primary"? +5: +4))
    .text(d=>d.key)
    .style("fill", "#5C6F7C")
    .style("font-size",d=>(d.part == "primary"? "1.2rem":"1rem"))
    .attr("text-anchor",d=>(d.part=="primary"? "end": "start"))
    .style("display", function(d) { return d.value === 0 ? "none" : null; });
  
  g[i].selectAll(".mainBars").append("text").attr("class","perc")
    .attr("x",d=>(d.part=="primary"? -30: 40))
    .attr("y",d=>+6)
    .text(function(d){ return d3.format(",")(d.value)})
    .style("fill", "#5C6F7C")
    .style("font-size",d=>(d.part == "primary"? "1.2rem":"1rem"))
    .attr("text-anchor",d=>(d.part=="primary"? "end": "start"))
    .style("display", function(d) { return d.value === 0 ? "none" : null; });
});
function mouseover(d){
  [0].forEach(function(i){
    bp[i].mouseover(d);

    g[i].selectAll(".mainBars").select(".perc")
    .text(function(d){ return d3.format(",")(d.value)})
    .style("display", function(d) { return d.value === 0 ? "none" : null; });

    g[i].selectAll(".mainBars").select(".label")
    .style("display", function(d) { return d.value === 0 ? "none" : null; });

  });
  d3.select(this)
  .selectAll("text")
  .style("fill","#69901D")
  .style("font-weight","bold");
  






}
function mouseout(d){
  [0].forEach(function(i){
    bp[i].mouseout(d);
    g[i].selectAll(".mainBars").select(".label")
    .style("display", function(d) { return d.value === 0 ? "none" : null; });
    g[i].selectAll(".mainBars").select(".perc")
    .text(function(d){ return d3.format(",")(d.value)})
    .style("display", function(d) { return d.value === 0 ? "none" : null; });

  });
  d3.select(this)
  .selectAll("text")
  .style("fill","#5C6F7C")
  .style("font-weight","");

  d3.select(this).style("border","0px solid #F15D22");
}


d3.select(self.frameElement).style("height", "800px");

}