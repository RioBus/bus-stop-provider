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


/**
 * Takes every bus line that will be used
 * @param {function} 
 */
getLines(function(lines){
	console.log("peguei as linhas");
	startDataBase(function(err, collection){
		if(err) console.log(err);
		else{
			var numberLines = lines.length;
			console.log("Numero total de linhas: " + numberLines);


			lines.forEach(function(line){
			//console.log("pegando os pontos da linha " + line);
				getBusStop(line, function(response){
					if(response){
						saveToDataBase(response, collection, function(err, response){
							countLine++;
							if(!err && response){
								console.log("["+line.line+"] Saved.");
							}
							else{
								console.log("["+line.line+"] Not Saved.");
								console.log(err);
							}
							console.log(countLine + "/" + numberLines);
							if(countLine === numberLines){process.exit();}
						});
					} else {
						console.log("["+line.line+"] Not retrieved.");
					}
				});
			
			});
			
		}
		
		createId(collection);
	});
	
	
});
//console.log("Salvei: " + count + " linhas");

//var list = ["322", "298"];


/*getBusStop("322", function(stops){
	startDataBase(function(err){
		console.log(err);
	});
	saveToDataBase(stops, function(response){
		console.log(response);
		console.log("["+ line + "]" + "Saved.");
	})
});	*/
