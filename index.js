var getBusStop = require("./operations").getBusStop;
var saveToDataBase = require("./operations").saveToDataBase;
var BusStop = require("./busStop")

/*getLines(function(lines){
	lines.forEach(function(line){
		getBusStop(line, function(response){
			if(response){
				console.log("["+line+"] Saved.");
			} else {
				console.log("["+line+"] Not saved.");
			}
		});
	});
}); */

getBusStop("867", function(stops){
	saveToDataBase(stops, function(response){
		console.log(response);
	})
});