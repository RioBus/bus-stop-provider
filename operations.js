var request = require('request');
var BusStop = require("./busStop");
var MongoClient = require('mongodb').MongoClient;
var dbConfig = require("./config").dataBaseConfig;
var StopSpot = require("./stopSpot");
 
/**
 * Gets the informations about bus line
 * @param {string} itinerary
 * @param {function} callback
 */
function getBusStop(itinerary, callback) {
	var testeLink = "http://dadosabertos.rio.rj.gov.br/apiTransporte/Apresentacao/csv/gtfs/onibus/paradas/gtfs_linha" + itinerary.line + "-paradas.csv"
	request(testeLink, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
			var output = prepareData(body, itinerary.description);
    		callback(output);	
  		}
		else{
			callback(new BusStop(itinerary.line, itinerary.description, "desconhecido", []));
		}
	})
}

/**
 * Takes every bus line that will be used
 * @param {function} callback
 */
function getLines(callback){
	var link = "http://rest.riob.us/v3/itinerary";
	request(link, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
			var output = prepareStop(body);
    		callback(output);	
  		}
	})
}

/**
 * Breaks the line 
 * @param {string} line
 * @return {Object}
 */
function prepareStop(line){
	return JSON.parse(line);
}

/**
 * Breaks the data in informations about bus line
 * @param {string} data
 * @param {string} description
 * @return {BusStop}
 */
function prepareData(data, description){
	//var lines = data.replace("\r", "");
	var lines = data.split("\r\n");
	var spots = []; 
	var lineBus, agency;
	//linha,descricao,agencia,sequencia,latitude,longitude
	for(var i = 1; i < lines.length; i++){
		if(lines[i] === "") continue;
		var line = lines[i].split(",");
		if(lineBus === undefined) lineBus = line[0] +"";
		if(agency === undefined) agency = line[2];
		var sequential = parseInt(line[3]);
		var latitude = parseFloat(line[4].replace("\"", ""));
		var longitude = parseFloat(line[5].replace("\"", ""));
		//stops.push(new BusStop(lineBus, description, agency, latitude, longitude, sequential));
		spots.push(new StopSpot(latitude, longitude, sequential));
	}
	return new BusStop(lineBus, description, agency, spots);
}

/**
 * Open the connection with database and clear the collection
 * @param {function} callback
 * @return {(err: Error, collection: any)=>void}
 */
function startDataBase(callback){
	MongoClient.connect('mongodb://' + dbConfig.user + ':' + dbConfig.pass + '@' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.dataBaseName, function(err, db) {
		if(err) callback(err, null);
		var collection = db.collection("bus_stop");
		collection.remove({}, function(){});
		callback(null, collection);
	});
}

/**
 * Insert the stops on database
 * @param {BusStop} stops
 * @param {any} collection
 * @param {function} callback
 */
function saveToDataBase(stops, collection, callback) {
	//if(stops.length == 0){console.log("entrei aqui"); process.exit();}
	collection.insert(stops, callback);
}

/**
 * Create a index for the collection
 * @param{any} collection
 */
function createId(collection){
	collection.ensureIndex({line: 1});
}


module.exports = {
	getBusStop:getBusStop,
	saveToDataBase:saveToDataBase,
	getLines:getLines,
	startDataBase:startDataBase,
	createId:createId,
};