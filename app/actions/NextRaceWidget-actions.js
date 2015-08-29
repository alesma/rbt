var AppCostants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var API = require('../utils/api');

var NextRaceWidgetActions = {
	loadData: function() {
		API.getData('next_races.json', AppCostants.FETCH_NEXT_RACES);
	}
};

module.exports = NextRaceWidgetActions;