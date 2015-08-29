var React = require('react');
var RaceTypeFilter = require('./RaceTypeFilter/RaceTypeFilter');
var NextRaceWidget = require('./NextRaceWidget/NextRaceWidget');

require('./main.scss');

var Main = React.createClass({
	render: function (){
		return (
			<div className="container">
				<div className="sidebar">
					<RaceTypeFilter />
				</div>
				<div className="sidebar--right">
					<NextRaceWidget />
				</div>
			</div>
		)
	}
});

React.render(<Main />, document.getElementById('app'));