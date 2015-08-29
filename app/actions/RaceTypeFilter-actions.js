var AppCostants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var RaceTypeFilterActions = {
	updateRaceTypesFilter: function(raceType){
		AppDispatcher.handleViewAction({
			actionType: AppCostants.UPDATE_RACE_TYPES_FILTERS,
			raceType: raceType
		})
	}
};

module.exports = RaceTypeFilterActions;