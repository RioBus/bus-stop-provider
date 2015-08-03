var getBusStop = require("./operations").getBusStop;
var saveToDataBase = require("./operations").saveToDataBase;
var BusStop = require("./busStop")
var getLines = require("./operations").getLines;

getLines(function(lines){
	console.log("peguei as linhas");
	lines.forEach(function(line){
		console.log("pegando os pontos da linha " + line);
		getBusStop(line, function(response){
			if(response){
				console.log("tentando salvar os pontos da linha " + line);
				saveToDataBase(response, function(response){
					console.log("["+line+"] Saved.");
				});
			} else {
				console.log("["+line+"] Not saved.");
			}
		});
	});
}); 

/*getBusStop("867", function(stops){
	saveToDataBase(stops, function(response){
		console.log(response);
	})
});*/