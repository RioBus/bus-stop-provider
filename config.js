module.exports = {
	busStopApiURL: "http://dadosabertos.rio.rj.gov.br/apiTransporte/Apresentacao/csv/gtfs/onibus/paradas/gtfs_linha$$-paradas.csv",
	itineraryApiURL: "http://rest.riob.us/v3/itinerary",
	dataBaseConfig:{
		user:"riobus",
		pass:"riobus",
		dataBaseName:"riobus",
		host:"mongo",
		port:"27017"
	}
};