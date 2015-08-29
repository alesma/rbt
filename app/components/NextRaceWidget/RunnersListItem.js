var React = require('react');

var RunnersListItem = React.createClass({
	render: function (){
		var img;
		if (this.props.runner.silk !== "") {
			var url = "/images/silks/" + this.props.runner.silk;
			img = <img className="runnersListItem__img" src={url} />
		}
		var url = "http://www.racebets.com/bet/" + this.props.raceId;
		return (
			<li className="runnersListItem">
				{img}
				<span className="runnersListItem__name">{this.props.runner.name}</span>
				<a href={url} className="runnersListItem__btn">{this.props.runner.odds}</a>
			</li>
		)
	}
});

module.exports = RunnersListItem;
