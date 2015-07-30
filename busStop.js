var BusStop = function(line, description, agency, latitude, longitude, sequential){
	this.line = line;
	this.description = description;
	this.agency = agency;
	this.latitude = latitude;
	this.longitude = longitude;
	this.sequential = sequential;
}

module.exports = BusStop;