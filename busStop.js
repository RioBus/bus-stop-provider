/**
 * Create a new BusStop object
 * @param {string} line
 * @param {string} description
 * @param {string} agency
 * @param {string} line
 * @param {StopSpot} spots
 */
var BusStop = function(line, description, agency, spots){
	this.line = line;
	this.description = description;
	this.agency = agency;
	this.spots = spots;
}

module.exports = BusStop;