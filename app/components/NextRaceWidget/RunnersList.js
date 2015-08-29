var React = require('react');
var RunnersListItem = require('./RunnersListItem');

var RunnersList = React.createClass({
	render: function (){
		var runners = this.props.runners.map(function(runner) {
			return (
				<RunnersListItem key={runner.id_runner} runner={runner} raceId={this.props.raceId}/>
			)
		}.bind(this));
		return (
			<ul className="runnersList">
				{runners}
			</ul>
		)
	}
});

module.exports = RunnersList;
