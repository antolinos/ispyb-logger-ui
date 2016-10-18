function StatsParser() {

}

StatsParser.prototype.groupByPackage = function(logMessages) {
    return _.groupBy(logMessages, "PACKAGE");
};

StatsParser.prototype.getPackageStats = function(logMessages) {
        var map = this.groupByPackage(logMessages);
        var keys = _.keys(map);
        var values = [];
        for (var i = 0; i < keys.length; i++) {
	    	values.push(map[keys[i]].length);
	    }
        return {
            keys : keys,
            values : values
        }
};

StatsParser.prototype.plotPie = function(logMessages) {
	var map = this.getPackageStats(logMessages);
	

	var data = [ {
		values : map.values,
		labels : map.keys,
		type : 'pie'
	} ];

	var layout = {
		height : 400,
		width : 450
	};
	myPlot = Plotly.newPlot('pie-chart', data, layout);
};

StatsParser.prototype.parseToVisualize = function(logMessages) {
	var points = {
		x : [],
		y : []
	};
	for (var i = 0; i < logMessages.length; i++) {
		points.x.push(logMessages[i].H + (logMessages[i].MI/60));
		points.y.push(logMessages[i].DURATION);
	}    
	return points;
};

StatsParser.prototype.displayTable = function(logMessages) {    
    for (var i =0; i < logMessages.length; i++){ 
        var attributes = [];    
        
        if (logMessages[i].TYPE != "ERROR"){ 
            
            if (typeof(logMessages[i].PARAMS) == "string"){
                 try{
                        var parsedToJSON = JSON.parse(logMessages[i].PARAMS);
                        logMessages[i].PARAMS = parsedToJSON;
                    }
                    catch(e){                          
                         attributes.push({
                             key : "",
                             value : logMessages[i].PARAMS
                         });                     
                    }
            }  
            
            if (typeof(logMessages[i].PARAMS) == "object"){
                if (logMessages[i].PARAMS){                            
                    for (var key in logMessages[i].PARAMS){                        
                            attributes.push({
                                key : key,
                                value :logMessages[i].PARAMS[key]
                            });                    
                    }                           
                }
            }                         
        }
        else{
            attributes.push({
                key : "Msg",
                value :logMessages[i].PARAMS
            });
             attributes.push({
                key : "trace",
                value :logMessages[i].COMMENTS
            });
        }
        logMessages[i].ATTRIBUTES = attributes;
    }
   
    dust.render('method.template', logMessages, function(err, out) {        
        $('#output').html(out);
    });
};
StatsParser.prototype.plotScatter = function(title, logMessages) {
	    var byMethod = _.groupBy(logMessages, "METHOD");
        var data = [];
        var map = {};
        
        var curves = [];
        
        for (var key in byMethod){            
            var xCoordinates = [];
            var yCoordinates = [];
            var text = [];
            var size = [];
            var ids = [];
            
            var logs = [];
            for(var i in byMethod[key]){                
                if ((byMethod[key][i].DURATION != -1)||(byMethod[key][i].TYPE == "ERROR")){                                                                                
                    xCoordinates.push(byMethod[key][i].jsDate);
                    yCoordinates.push(byMethod[key][i].DURATION);                                      
                    text.push(key);
                    var ssize = byMethod[key][i].DURATION/10;
                    if (ssize < 500){
                        ssize = 500;
                    }
                    size.push(ssize);
                    ids.push(byMethod[key][i].ID);
                    map[byMethod[key][i].ID] = byMethod[key][i];                    
                    logs.push(byMethod[key][i]);                    
                }
                else{
                    console.log(byMethod[key][i]);
                }
                
            }   
            curves.push(logs);
                             
            data.push( {
                            marker : {
                                size : size,
                                sizemode : "area",
                                sizeref :10
                                //symbol : key.length
                            },
                            textfont : {
                                family:'Times New Roman'
                            },
                            id : ids,
                            textposition: 'bottom center',
                            mode: 'markers',
                            name : key,
                            x : xCoordinates,
                            y : yCoordinates,
                            text :  text             
                });                                        
        }
      
        
      var myPlot = document.getElementById(title),       
        layout = {
            xaxis : {
              type : 'date',  
            },
            hovermode:'closest',
            title:'Click on Points'
        };

      Plotly.newPlot(title, data, layout);
      var _this = this;
       myPlot.on('plotly_click', function(data){
           var selected = [];
            var pts = {};
           if (data){
               for (var i =0; i < data.points.length; i++){
                    if (data.points){                        
                        var point = data.points[0];
                        pts = point.data.id[point.pointNumber];
                        selected.push(map[pts]);
                    }
               }
           }      
           _this.displayTable(selected);               
    });    
    
     myPlot.on('plotly_selected', function(eventData) {
           var logsSelected = [];           
           for (var i = 0; i < eventData.points.length; i++){
               var pt = eventData.points[i];              
               logsSelected.push(curves[pt.curveNumber][pt.pointNumber]);   
           }           
            _this.displayTable(logsSelected);     
      });   
};

StatsParser.prototype.parse = function(logMessages) {
	this.logMessages = logMessages;
	this.plotPie(logMessages);
    //this.plotScatter('plot', _.filter(logMessages, {PACKAGE : 'BIOSAXS_UI'}));
};

StatsParser.prototype.loadPackage = function(package) {	
    this.plotScatter('plot', _.filter(this.logMessages, {PACKAGE : package}));
};