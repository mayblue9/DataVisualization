/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function startRead_spread() {
  // var starttime = new Date();

   console.log("Spread layout");
    var file = document.getElementById("file").files[0];
    if (file) {
        getAsText_spread(file);
        //alert("Name: " + file.name + "\n" + "Last Modified Date :" + file.lastModifiedDate);
    }
   
    //var endtime = new Date();
  
}
 function getAsText_spread(readFile) {
    var reader = new FileReader();
    reader.readAsText(readFile);
    reader.onload = loaded_spread;
}
function loaded_spread(evt) {
    //alert("File Loaded Successfully");
    var fileString = evt.target.result;
    var startTime = new Date();
    drawgraph_spread(fileString.toString());
    var totalTime=new Date-startTime;
   // console.log(fileString.toString());
   console.log("total time taken is :"+totalTime);
}
function drawgraph_spread(data){
    console.log("spread layout called");
    var nodes = [];
var edges=[];
var node=[];
var len =400;
for (var i = 0; i < len; i++) {
    nodes[i]={data: { id: 'n'+i , name: 'n'+i } };
var lines = data.split("\n");
 //console.log(lines);
   for(var k  in lines){
      var node=lines[k].replace('	', ',');
      var node_split=node.split(",");
    if (node != "")
      {
      var node_split=node.split(",");
     
    edges[k]=   { data: { source: 'n'+node_split[0], target: 'n'+node_split[1] } };
      }
    }


 }
  var options = {
  name: 'spread'
};

$('#cy').cytoscape(
        {
  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'content': 'data(name)',
        'text-valign': 'center',
        'text-outline-width': 0.5,
        'text-outline-color': '#888',
        'background-color': 'green',
        'color': '#fff'
      })
    .selector('edge')
      .css({
        'target-arrow-shape': 'triangle',
         'line-color': 'black',
         'source-arrow-color': 'black',
        'target-arrow-color': 'black'
      })
    .selector(':selected')
      .css({
        'background-color': 'black',
        'line-color': 'black',
        'target-arrow-color': 'black',
        'source-arrow-color': 'black'
      })
    .selector('.faded')
      .css({
        'opacity': 0.25,
        'text-opacity': 0
      }), 
  elements: {
    nodes: nodes,
    edges: edges
  },
  
  layout:options,
  
  // on graph initial layout done (could be async depending on layout...)
  ready: function(){
    window.cy = this;
    
    // giddy up...
    
   cy.elements().unselectify();
   cy.userZoomingEnabled( true );
    
    cy.on('tap', 'node', function(e){
      var node = e.cyTarget; 
      var neighborhood = node.neighborhood().add(node);
      
      cy.elements().addClass('faded');
      neighborhood.removeClass('faded');
    });
    
    cy.on('tap', function(e){
      if( e.cyTarget === cy ){
        cy.elements().removeClass('faded');
      }
    });
  }
});
   
}
