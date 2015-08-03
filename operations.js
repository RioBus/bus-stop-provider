var request = require('request');
var BusStop = require("./busStop");
var MongoClient = require('mongodb').MongoClient;
var dbConfig = require("./config").dataBaseConfig;
 

function getBusStop(line, callback) {
	var testeLink = "http://dadosabertos.rio.rj.gov.br/apiTransporte/Apresentacao/csv/gtfs/onibus/paradas/gtfs_linha" + line + "-paradas.csv"
	request(testeLink, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
			var output = prepareData(body);
    		callback(output);
			
  		}
	})
}

function getLines(callback){
	var link = "http://rest.riob.us/v3/itinerary";
	request(link, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
			var output = prepareStop(body);
    		callback(output);
			
  		}
	})
}

function prepareStop(line){
	var data = JSON.parse(line);
	var lines = [];
	data.forEach(function(obj){
		lines.push(obj.line);
	})
	
	return lines;
}

function prepareData(data){
	//var lines = data.replace("\r", "");
	var lines = data.split("\r\n");
	var stops = []; 
	//linha,descricao,agencia,sequencia,latitude,longitude
	for(var i = 1; i < lines.length; i++){
		if(lines[i] === "") continue;
		var line = lines[i].split(",");
		var lineBus = line[0] + "";
		var description = line[1];
		var agency = line[2];
		var sequential = parseInt(line[3]);
		var latitude = parseFloat(line[4].replace("\"", ""));
		var longitude = parseFloat(line[5].replace("\"", ""));
		stops.push(new BusStop(lineBus, description, agency, latitude, longitude, sequential));
	}
	return stops;
}

function saveToDataBase(stops, callback) {
	MongoClient.connect('mongodb://' + dbConfig.user + ':' + dbConfig.pass + '@' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.dataBaseName, function(err, db) {
		if(err) callback(err);
		var collection = db.collection("bus_stop");
		collection.remove({}, function(){});
		collection.insertMany(stops, function(error, docs){
			if(error) callback(error);
			else callback(docs);
		});
	})
}

module.exports = {
	getBusStop:getBusStop,
	saveToDataBase:saveToDataBase,
	getLines:getLines
};