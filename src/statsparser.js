function StatsParser() {

}

StatsParser.prototype.plotPie = function(logMessages) {
	var map = _.groupBy(logMessages, "PACKAGE");
	var keys = _.keys(map);
	var values = [];
	for (var i = 0; i < keys.length; i++) {
		values.push(map[keys[i]].length);
	}

	var data = [ {
		values : values,
		labels : keys,
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

StatsParser.prototype.plotScatter = function(logMessages) {
	Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/gapminderDataFiveYear.csv', function(err, rows){
		var YEAR = 2007;
		var continents = ['Asia', 'Europe', 'Africa', 'Oceania', 'Americas'];
		var POP_TO_PX_SIZE = 2e5;
		function unpack(rows, key) {
		  return rows.map(function(row) { return row[key]; });
		}

		var data = continents.map(function(continent) {
		  var rowsFiltered = rows.filter(function(row) {
		      return (row.continent === continent) && (+row.year === YEAR);
		  });
		  return {
		      mode: 'markers',
		      name: continent,
		      x: unpack(rowsFiltered, 'lifeExp'),
		      y: unpack(rowsFiltered, 'gdpPercap'),
		      text: unpack(rowsFiltered, 'country'),
		      marker: {
		          sizemode: 'area',
		          size: unpack(rowsFiltered, 'pop'),
		          sizeref: POP_TO_PX_SIZE
		      }
		  };
		});
		var layout = {
		  xaxis: {title: 'Life Expectancy'},
		  yaxis: {title: 'GDP per Capita', type: 'log'},
		  margin: {t: 20},
		  hovermode: 'closest'
		};
		Plotly.plot('ispyb-api', data, layout, {showLink: false});
		});
//	return;
//	var points = this.parseToVisualize(_.filter(logMessages, function(b){return b.PACKAGE=="ISPyB_API";}));
//	console.log(points);
//	var myPlot = document.getElementById('ispyb-api'), d3 = Plotly.d3, data = [ {
//		x : points.x,
//		y : points.y,
//		labels :  points.x,
//		type : 'scatter',
//		mode : 'markers',
//		marker : {
//			size : 16
//		}
//	} ], layout = {
//		hovermode : 'closest',
//		title : 'Click on Points'
//	};
//
//	Plotly.newPlot('ispyb-api', data, layout);
//
//	myPlot.on('plotly_click', function(data) {
//		console.log(data);
//		/*
//		 * var pts = ''; for (var i = 0; i < data.points.length; i++) { pts = 'x = ' +
//		 * data.points[i].x + '\ny = ' + data.points[i].y.toPrecision(4) +
//		 * '\n\n'; }
//		 */
//		alert('Closest point clicked:\n\n' + pts);
//	});

};
StatsParser.prototype.parse = function(logMessages) {
	this.logMessages = logMessages;
	this.plotPie(logMessages);
	this.plotScatter(logMessages);
};