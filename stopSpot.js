/**
 * Stores the informations about every bus spot 
 * @param {float} latitude
 * @param {float} longitude
 * @param {int} sequential
 */
var StopSpot = function(latitude, longitude, sequential){
	this.latitude = latitude;
	this.longitude = longitude;
	this.sequential = sequential;
}

module.exports = StopSpot;