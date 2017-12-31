
d3.json("./stanotte.json", function(err,json) {

    var desc= d3.select('body')
	.append("ul");

    desc
	.selectAll('li')
        .data( [json[0].data[39], json[0].data[0], json[0].data[2] ]  )
        .enter()
        .append('li')
        .text(function(d){ return d.name+" → "+d.description; } );
    
    var ul = d3.select('body').append('ul')

    ul
        .append('li')
        .text(json[0].data[39].name+" →  "+json[0].data[0].name+" →  "+json[0].data[2].name  );
    
    ul.selectAll('li')
        .data(json)
        .enter()
        .append('li')
        .text(function(d,i){ return d.data[39].value+" →  "+d.data[0].value+" →  "+d.data[2].value; } );
    
});
