
// add rest = true and jsonp = true to /etc/mongod.conf

var getmongo =  $.ajax({
    url: 'http://192.168.253.206:28017/test/meteo_station/?limit=100000',
    type: 'get',
    dataType: 'jsonp',
    jsonp: 'jsonp', // mongod is expecting that
});

var fields=["datetime", "rtInsideTemp", "rtBaroCurr"];

getmongo
    .done(function(data) {

        //        d=JSON.stringify(data,undefined,1);
        //        $("pre code").text(d).css("color","green");
        //        console.log("done")

        var json=data.rows;
        // console.log(json);        
        
    // var desc= d3.select('body')
    //         .append("ul");
    
    // desc
    //     .selectAll('li')
    //     .data(fields)
    //     .enter()
    //     .append('li')
    //     .text(function(d){ return d  +" → "+json[0][d].description; } );
    
    // var ul = d3.select('body')
    //     .append('ul');

    // ul
    //     .append('li')
    //     .text(fields.join(" → "));
    
    // var li=ul.selectAll('li')
    //     .data(json)
    //     .enter()
    //     .append('li')
    //     .text(function(d){
    //         var tri=[];
    //         fields.forEach(
    //     	function(f){
    //     	    tri.push(d[f].value);
    //     	});
    //         return tri.join(" → ");
    //     });

             draw(json);


        
    })
    .fail(function(request,status,error) {
        $("pre code").text("Status: "+error+"; Error "+error).css("color","red");
        console.log("fail");
    })
    .always(function() {
        console.log("finished");
    });


// set the dimensions and margins of the graph
var margin = {top: 20, right: 120, bottom: 30, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
var y2 = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
        .x(function(d) { return x(d.Date); })
        .y(function(d) { return y(d.Imports); });
// define the line
var valueline2 = d3.line()
        .x(function(d) { return x(d.Date); })
        .y(function(d) { return y2(d.Exports); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

function draw(data) {

    // format the data
    data.forEach(function(d) {
        d.Date = new Date(d[fields[0]].value);
        d.Imports = d[fields[1]].value;
        d.Exports = d[fields[2]].value;
    });

    
    
//    console.log(data);
    
    // // sort years ascending
    // data.sort(function(a, b){
    //     return a["Date"]-b["Date"];
    // });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.Date; }));
    y.domain(d3.extent(data, function(d) { return d.Imports; }));
    y2.domain(d3.extent(data, function(d) { return d.Exports; }));

    // y.domain([0, d3.max(data, function(d) {
    //     return Math.max(d.Imports); })]);
    // y2.domain([0, d3.max(data, function(d) {
    //     return Math.max(d.Exports); })]);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline)
        .attr("fill", "none")
        .style("stroke", "orange");
    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline2)
        .attr("fill", "none")
        .style("stroke", "steelblue");
    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .style("fill", "steelblue")
        .call(d3.axisLeft(y));

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate("+width+"," + 0 + ")")
        .style("fill", "orange")
        .call(d3.axisRight(y2));
}



    
// d3.json("./object-list.json", function(err,json) {

//     var desc= d3.select('body')
// 	.append("ul");

//     var fields=["datetime", "rtInsideTemp", "rtBaroCurr"];
    
//     desc
// 	.selectAll('li')
//         .data(fields)
//         .enter()
//         .append('li')
//         .text(function(d){ return d  +" → "+json[0][d].description; } );
    
//     var ul = d3.select('body')
// 	.append('ul');

//     ul
//         .append('li')
//         .text(fields.join(" → "));
    
//     var li=ul.selectAll('li')
//         .data(json)
//         .enter()
//         .append('li')
//         .text(function(d){
// 	    var tri=[];
// 	    fields.forEach(
// 		function(f){
// 		    tri.push(d[f].value);
// 		});
// 	    return tri.join(" → ");
// 	});
 
// });

// d3.json("./array-list.json", function(err,json) {
    
//     var desc= d3.select('body')
//     	.append("ul");

//     desc
//     	.selectAll('li')
//         .data( [json[0].data[39], json[0].data[0], json[0].data[2] ]  )
//         .enter()
//         .append('li')
//         .text(function(d){ return d.name+" → "+d.description; } );
    
//     var ul = d3.select('body').append('ul')

//     ul
//         .append('li')
//         .text(json[0].data[39].name+" →  "+json[0].data[0].name+" →  "+json[0].data[2].name  );
    
//     ul.selectAll('li')
//         .data(json)
//         .enter()
//         .append('li')
//         .text(function(d,i){ return d.data[39].value+" →  "+d.data[0].value+" →  "+d.data[2].value; } );

//     });
