var getBusStop = require("./operations").getBusStop;
var saveToDataBase = require("./operations").saveToDataBase;
var BusStop = require("./busStop")
var getLines = require("./operations").getLines;
var startDataBase = require("./operations").startDataBase;
var createId = require("./operations").createId;
var count = 0;
var countTryLines = 0;
var countStopsBus = 0;
var countLine = 0;

console.log("Retrieving lines data...");

/**
 * Takes every bus line that will be used
 * @param {function} 
 */
getLines(function(lines){
	var numberLines = lines.length;
	console.log("Total amount of lines: " + numberLines);
	startDataBase(function(err, collection){
		if(err) console.log(err);
		else{
			lines.forEach(function(line){
				getBusStop(line, function(response){
					if(response){
						saveToDataBase(response, collection, function(err, output){
							var counterDisplay = "("+ ++countLine + "/" + numberLines+")";
							if(!err && output)
								console.log("["+line.line+"] Saved.", counterDisplay);
							else{
								console.log("["+line.line+"] Not Saved.", counterDisplay);
								console.log(err);
							}
							if(countLine === numberLines) process.exit();
						});
					} else console.log("["+line.line+"] Not retrieved.");
				});
			
			});
			
			createId(collection, {"line": -1}, function(err, informationIndex){
				if(err) console.log(err);
			});
			
		}
		
	});
	
});
