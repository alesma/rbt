var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var API = require('../utils/api');
var RaceTypeFilterStore = require('./RaceTypeFilter-store');
var Money = require('../utils/money');

var CHANGE_EVENT = 'change';

var _nextRaces = [];

function _getBestRace() {
	var activeRaceTypes = RaceTypeFilterStore.getRaceTypes()
		.filter(function(type) {
			return type.selected === true
		})
		.map(function(type){
			return type.type
		});

	var nextRaces = NextRaceWidgetStore.getNextRaces();

	var nextRacesFiltered = nextRaces.filter(function(race, index) {
		return activeRaceTypes.indexOf(race.race_type) > -1 
	});

	// create new array with only the index and purse amount converted to euro
	var purseArray = nextRacesFiltered.map(function(race, index) {
		return {
			index: index,
			value: race.purse.currency === "EUR" ? race.purse.amount : Money.convert(race.purse.amount, {from: race.purse.currency, to: "EUR"})
		}
	});

	// sort the new array
	purseArray.sort(function(a, b) {
		if (a.value < b.value) {
			return 1;
		}
		if (a.value > b.value) {
			return -1;
		}
		return 0;
	});

	// use sort array to get the race with the highest purse amount
	var result = purseArray.map(function(el) {
		return nextRacesFiltered[el.index];
	})[0];

	if (typeof result === "undefined") {
		return {
			error: true,
			errorMessage: "Sorry, no event to display"
		}
	}

	return {
		race: result,
		error: false
	}
}

function _fetchNextRaces(response){
	var data = JSON.parse(response.text);
	if (data.status === "success") {
		_nextRaces = data.data.races;
	}
}

var NextRaceWidgetStore = assign(EventEmitter.prototype, {
	emitChange: function (){
		this.emit(CHANGE_EVENT)
	},
	addChangeListener: function(callback){
		this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback)
	},
	getNextRaces: function (){
		return _nextRaces;
	},
	getBestRace: _getBestRace,
	dispatcherIndex: AppDispatcher.register(function(payload){
		var action = payload.action;
		switch(action.actionType){
			case AppConstants.FETCH_NEXT_RACES:
				// api calls is succesfull, update the store data and notify view
				_fetchNextRaces(action.response);
				break;
		}
		NextRaceWidgetStore.emitChange();
		return true;
	})
});

module.exports = NextRaceWidgetStore;