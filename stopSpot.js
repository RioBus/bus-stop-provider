/**
 * Stores the informations about every bus spot 
 * @param {number} latitude
 * @param {number} longitude
 * @param {number} sequential
 */
var StopSpot = function(latitude, longitude, sequential){
	this.latitude = latitude;
	this.longitude = longitude;
	this.sequential = sequential;
}

module.exports = StopSpot;