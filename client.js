

//import {d3} from 'node_modules/d3/build/d3.min.js';





var dataset = []
d3.json("meno-x.json", function(err,data) {


var asd=Object.keys(data).map(function(key) {
        var datarray = {};
        datarray[key] = data[key];
        return datarray;
});

    console.log(data)
    console.log(asd)
    
    var ul = d3.select('body').append('ul');

    ul.selectAll('li')
        .data(asd)
        .enter()
        .append('li')
        .text(function(d){return Object.keys(d) +" →  "+ Object.values(d)} );
    });


