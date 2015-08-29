var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _raceTypes = [
	{
		type: 'G',
		label: 'Gallop',
		selected: true
	},
	{
		type: 'J',
		label: 'Jumping',
		selected: true
	},
	{
		type: 'T',
		label: 'Trot',
		selected: true
	},
	{
		type: 'D', // dogs races
		label: 'Dogs',
		selected: false
	}
];

function _updateRaceTypes(type){
	_raceTypes = _raceTypes.map(function(raceType){
		return {
			type: raceType.type,
			label: raceType.label,
			selected: (raceType.type === type ? !raceType.selected : raceType.selected)
		}
	});
}

var RaceTypeFilterStore = assign(EventEmitter.prototype, {
	emitChange: function (){
		this.emit(CHANGE_EVENT)
	},
	addChangeListener: function(callback){
		this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback)
	},
	getRaceTypes: function (){
		return _raceTypes;
	},
	dispatcherIndex: AppDispatcher.register(function(payload){
		var action = payload.action;
		switch(action.actionType){
			case AppConstants.UPDATE_RACE_TYPES_FILTERS:
				// update stores data after user interaction
				_updateRaceTypes(payload.action.raceType);
				break;
		}
		RaceTypeFilterStore.emitChange();
		return true;
	})
});

module.exports = RaceTypeFilterStore;