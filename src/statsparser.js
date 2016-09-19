function StatsParser(){
    
    
}
var z = null;
StatsParser.prototype.parse = function(logMessages){
 var map  = _.groupBy(logMessages, "PACKAGE");
 var keys = _.keys(map);  
 console.log(keys);
 var values = [];
 for (var i = 0; i < keys.length; i++) {
     values.push( map[keys[i]].length);
     
 }
 
 
 var data = [{
     values: values,
     labels: keys,
     type: 'pie'
 }];

var layout = {  
  height: 400,
  width: 450
};
Plotly.newPlot('pie-chart', data, layout);
};  