var React = require('react');
var NextRaceWidgetStore = require('../../stores/NextRaceWidget-store');
var RaceTypeFilterStore = require('../../stores/RaceTypeFilter-store');
var NextRaceWidgetActions = require('../../actions/NextRaceWidget-actions');
var Money = require('../../utils/money');
var Moment = require('../../utils/moment');
var Accounting = require('../../utils/accounting');
var RunnersList = require('./RunnersList');

require('./style.scss');

function getRace(){
	return NextRaceWidgetStore.getBestRace();
}

var NextRaceWidget = React.createClass({
	getInitialState: function() {
		return {
			error: true,
			errorMessage: "Loading..."
		}
	},
	componentWillMount: function() {
		// listen to changes on both stores
		NextRaceWidgetStore.addChangeListener(this._onChange);
		RaceTypeFilterStore.addChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState(getRace());
	},
	componentDidMount: function() {
		// calls action which will use the API method to retrieve the json
		NextRaceWidgetActions.loadData();
	},
	render: function (){
		var race;
		if (this.state.error) {
			race = <p>{this.state.errorMessage}</p>
		} else {
			// flag image
			var flagImageUrl = '/images/flags/' + this.state.race.event.country.toLowerCase() + '.png';

			// time left
			var fakeNow = Moment("2015-08-19 09:30");
			var postTime = Moment.unix(this.state.race.post_time);
			var difference = postTime.diff(fakeNow, 'minutes');
			var countDown = Moment.duration(difference, 'minutes').humanize(true);

			// racetype img
			var raceTypeCssClass = 'nextRaceWidget__typeImg icon-race-type-' + this.state.race.race_type; 

			// purse amount
			var formattedAmount = Accounting.formatMoney(this.state.race.purse.amount);

			var race =
				<div className="nextRaceWidget">
					<div className="nextRaceWidget__header">
						<h2 className="nextRaceWidget__header-title">
							<img className="nextRaceWidget__header-image" src={flagImageUrl} />
							{this.state.race.event.title}
						</h2>
						<span className="nextRaceWidget__header-countdown">
						{countDown}
						</span>
					</div>
					<div className="nextRaceWidget__hr"></div>
					<div className="nextRaceWidget__sub-header">
						<p className="nextRaceWidget__header-text">
							<span className="nextRaceWidget__detail">{this.state.race.num_runners} runners</span> 
							<span className="nextRaceWidget__detail">{this.state.race.distance} m</span>
							<span className="nextRaceWidget__detail">{formattedAmount} {this.state.race.purse.currency}</span>
						</p>
						<span className={raceTypeCssClass}></span>
					</div>
					<div className="nextRaceWidget__body">
						<RunnersList runners={this.state.race.runners} raceId={this.state.race.id_race}/>
					</div>
				</div>;
		}
		return (
			<div>
				{race}
			</div>
		)
	}
});

module.exports = NextRaceWidget;
