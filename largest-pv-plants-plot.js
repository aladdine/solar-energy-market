// div dimensions
var w = 1000;
var h = 600;
var margin = {
	top: 20,
	bottom: 180,
	left: 80,
	right: 20
};

// drawing area dimensions
var width = w - margin.left - margin.right;
var height = h - margin.top - margin.bottom;
	
var title = "10 largest solar energy power plants in the world (2016)";

// project data
var data = [
{ name: "Longyangxia Dam Solar Park", country: "China",  size: 850, year: 2015},
{ name: "Kamuthi Solar Power Project", country: "United States",  size: 648, year: 2015},
{ name: "Solar Star (I and II)", country: "United States",  size: 579, year: 2015},
{ name: "Topaz Solar Farm", country: "United States",  size: 550, year: 2014},	
{ name: "Desert Sunlight Solar Farm", country:	"United States",  size: 550, year: 2015},
{ name: "Copper Mountain Solar Facility", country: "United States",  size: 458, year: 2015},	
{ name: "California Valley Solar Ranch", country:	"United States",  size: 292, year: 2013},
{ name: "Agua Caliente Solar Project", country: "United States",  size: 290, year: 2014},	
{ name: "Mount Signal Solar", country: "United States",  size: 266, year: 2014},
{ name: "Charanka Solar Park", country: "India",  size: 224, year: 2012},	
{ name: "Mesquite Solar project", country: "United States",  size: 207, year: 2013}
];

// call d3 function
d3.select("body").append("h1").append("text").text(title);

// set x axis
var x = d3.scale.ordinal()
          .domain(data.map( function(entry){
            return entry.name;
          }))
          .rangeBands([0, width]);

var xAxis = d3.svg.axis()
       .scale(x)
       .orient("bottom"); 

// set y axis
var y = d3.scale.linear()
          .domain([0, d3.max(data, function(d){
            return d.size;
          })])
          .range([height, 0]);

var yAxis = d3.svg.axis()
               .scale(y)
               .orient("left");  

// set gridlines
var yGridLines = d3.svg.axis()
               .scale(y)
               .tickSize(-width,0,0)
               .tickFormat("")
               .orient("left");                                        

var ordinalColorScale = d3.scale.category20();         

var svg = d3.select("body")
              .append("svg")
							.attr("id", "chart")
							.attr("width", w)
							.attr("height", h);  



var chart = svg.append("g")
               .classed("dispaly", true)
               .attr("transform", "translate(" + margin.left + "," + margin.top  + ")");							 

function plot(params){
 this.append("g")
      .call(yGridLines)
      .classed("gridline", true)
      .attr("transform","translate(0,0)");

this.selectAll(".bar")
    .data(params.data)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("x", function(d,i){
      return x(d.name);
    })
    .attr("y", function(d,i){
    	return y(d.size);
    })
    .attr("width", function(d,i){
    	return x.rangeBand();
    })
    .attr("height", function(d,i){
    	return height - y(d.size);
    })
    .style("fill", function(d, i) {
         return  ordinalColorScale(i);
    });


this.selectAll(".bar-label")
   .data(params.data)
   .enter()
   .append("text")
   .classed("bar-label", true)
   .attr("dx", 0)
   .attr("dy", 20)
   .text(function(d,i){
   	return "(" + d.size + "MW)";
   })
   .attr("x", function(d,i){
   	return x(d.name) + (x.rangeBand()/2);
   })
   .attr("y", function(d,i){
   	 return y(d.size);
   }) 

   this.append("g")
       .classed("x axis", true)
       .attr("transform","translate(" + 0 + "," + height + ")")
       .call(xAxis)
       .selectAll("text")
       .style("text-anchor", "end")
       .attr("dx", -8)
       .attr("dy", 8)
       .attr("transform", "translate(0,0) rotate(-45)");
   this.append("g")
       .classed("y axis", true)
       .attr("transform","translate(" + 0 + "," + 0 + ")")
       .call(yAxis);  

   this.select(".y.axis")
       .append("text")
       .text("Size (MW)")
       .style("text-anchor", "middle")
       .attr("x", 0)
       .attr("y", 0)
       .attr("transform", "translate(-40," + height/2 + ") rotate(-90)");   

  this.select(".x.axis")
       .append("text")
       .text("Installations")
       .style("text-anchor", "middle")
       .attr("x", 0)
       .attr("y", 0)
       .attr("transform", "translate(" + width/2 + "," + 170 + ")");      
}

// bind data	
plot.call(chart, {
	data: data
});
