var AppDispatcher = require('../dispatchers/app-dispatcher');
var request = require('superagent');

var _pending = [];

var API = {
	// second parameter is the event that will be dispatched, the store will react and update the data
	getData: function(url, actionType){
		// abort previous request if it still there
		if (_pending[actionType]) {
			_pending[actionType].abort();
			_pending[actionType] = null;
		}

		_pending[actionType] = request.get(url).end(function(err, res){
			if (err) throw err;
			AppDispatcher.handleRequestAction({
				actionType: actionType,
				response: res
			});
		});
	}
}

module.exports = API;