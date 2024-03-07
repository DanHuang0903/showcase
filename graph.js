
async function chart(){
    let chartdataset = [];
    let content = [];
    let player = [];
    let player_filtered = [];
    let p_attires = {};
    let show_attires = {};
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQS8ZgEo2FxRCUQi562fZ72A6jeEO3jkWMR1VRDgossR_-mMUhVFTJw0avWiTqS5-Z4npbjWX1sC5Ig/pub?output=csv';
    const data = await d3.csv(csvUrl);
    data.splice(data.length - 1, 1);

    data.forEach( (c, row) =>{
        if(c['内容'] != ('抽奖' || '')){
        content.push(c['内容'])

        let people = c['参与者'].split('，');
        show_attires[c['内容']] = [];

        people.forEach((p,i) => {
            people[i] = p.split('-')[0];
            let current_attire = p.split('-')[1];

            show_attires[c['内容']].push(current_attire);

            if(!Object.keys(p_attires).includes(people[i])){
                p_attires[people[i]] = [];
                p_attires[people[i]].push(current_attire);
            }else{
              p_attires[people[i]].push(current_attire);
            }
  
        });
        player[row] = people;
        
        }
    });

    player = player.filter(item=>item);
 
    player_filtered = [...new Set(player_filtered)];
    player.forEach((pl,index)=>{
      pl.forEach((n)=>{
        if(content.length > player_filtered.length){
          chartdataset.push([content[index],n,1]);
        }else{
          chartdataset.push([n,content[index],1]);
        }
      })
    });

  
    let index = chartdataset.findIndex(subArray => subArray.includes('待定'));
    if (index !== -1) {
        let item = chartdataset.splice(index, 1)[0]; 
        chartdataset.push(item); 
    }

    
	 d3.select("#chart").selectAll('svg').remove();

	 let width = 780;
 	 let height = 640;


  
   let mainBar = content.length > player_filtered.length ? content : player_filtered
   let bar_color = getColors(mainBar);

   let svg = d3.select("#chart")
     			   .append("svg")
     			   .attr("width", width)
     			   .attr("height",height)
     			   .attr("id","snake_svg");

   let defs = svg.append("defs");
 	 let filter = defs.append("filter")
    .attr("id", "drop-shadow2")
    .attr("height", "125%");
    filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 5)
    .attr("result", "blur");

    filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 5)
    .attr("dy", 1)
    .attr("result", "offsetBlur");

 	 let feMerge = filter.append("feMerge");

	  feMerge.append("feMergeNode")
	    .attr("in", "offsetBlur")
	  feMerge.append("feMergeNode")
	    .attr("in", "SourceGraphic");
	 

	  let g =[svg.append("g").attr("transform","translate(250,20)")
	    ,svg.append("g").attr("transform","translate(650,100)")];

	   let bp=[ viz.bP()
      .data(chartdataset)
      .min(20)
      .pad(4)
      .height(height-20)
      .width(width/3)
      .barSize(40)
      .fill(d=>bar_color[d.primary])    
    ,viz.bP()
      .data(chartdataset)
      .value(d=>d[0])
      .min(20)
      .pad(4)
      .height(height-20)
      .width(width/3)
      .barSize(40)
      .fill(d=>bar_color[d.primary])
  ];


[0].forEach(function(i){
  g[i].call(bp[i])
 d3.selectAll(".subBars").style("filter","url(#drop-shadow2)");

  
  g[i].selectAll(".mainBars")
    .on("mouseover",mouseover)
    .on("mouseout",mouseout);

   


  g[i].selectAll(".mainBars").append("text").attr("class","label")
    .attr("x",d=>(d.part=="primary"? -80: 85))
    .attr("y",d=>(d.part=="primary"? +1: +1))
    .text(d=>d.key)
    .style("fill", d=>(d.key == "待定" ? "red" : "#5C6F7C"))
    .style("font-size",d=>(d.part == "primary"? "1.1rem":"1rem"))
    .attr("text-anchor",d=>(d.part=="primary"? "end": "start"))
    .style("display", function(d) { return d.value === 0 ? "none" : null; });

  
  g[i].selectAll(".mainBars").append("text").attr("class","perc")
    .attr("x",d=>(d.part=="primary"? -30: 40))
    .attr("y",d=>+2)
    .text(function(d){ return d3.format(",")(d.value)})
    .style("fill", "#5C6F7C")
    .style("font-size",d=>(d.part == "primary"? "1.1rem":"1rem"))
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
  .style("fill", d=>(d.key == "待定" ? "red" : "#69901D"))
  .style("font-weight","bold");
  let current = d.key;

 if(p_attires[current]){
    p_attires[current].forEach(pa => {
      $('.cloth').each((index,c) => {
        if(c.src.includes(encodeURIComponent(pa))){
          $(c).removeClass('d-none');
        }
      })
    });
  }else if(show_attires[current]){
    show_attires[current].forEach(sa => {
      $('.cloth').each((i,e) => {
        if(e.src.includes(encodeURIComponent(sa))){
          $(e).removeClass('d-none');
        }
      })
    
    });
  }

}

function mouseout(d){
  [0].forEach(function(i){
    bp[i].mouseout(d);
    g[i].selectAll(".mainBars").select(".label")
    .style("display", function(d) { return d.value === 0 ? "none" : null; })
    .style("fill", d=>(d.key == "待定" ? "red" : "#5C6F7C"));
    g[i].selectAll(".mainBars").select(".perc")
    .text(function(d){ return d3.format(",")(d.value)})
    .style("display", function(d) { return d.value === 0 ? "none" : null; });

  });
  d3.select(this)
  .selectAll("text")
  .style("fill", d=>(d.key == "待定" ? "red" : "#5C6F7C"))
  .style("font-weight","");

  d3.select(this).style("border","0px solid #F15D22");
  $('.cloth').each((i,c) => {
   if(!Array.from(c.classList).includes('d-none')){
    $(c).addClass('d-none');
   };
  })
}


d3.select(self.frameElement).style("height", "800px");

}

function getColors(bars){
  let playerColor = {};
  const colors = ["#9370DB","#D8BFD8", "#20B2AA", "#DB7093","#FFB6C1", "#228B22","#FAFAD2","#FFA500", "#ADD8E6","#00CED1","#87CEFA","#C71585","#008080","#FFD700","#FF7F50","#483D8B"];
  bars.forEach((p,i) => {
    playerColor[p] = colors[i];
  });

  return playerColor;
}