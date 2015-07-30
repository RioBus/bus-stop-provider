var getBusStop = require("./operations")
var BusStop = require("./busStop")


getBusStop("867", function(stops){
	console.log(stops);
});