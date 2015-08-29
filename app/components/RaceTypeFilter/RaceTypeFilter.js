var React = require('react');
var RaceTypeFilterStore = require('../../stores/RaceTypeFilter-store');
var RaceTypeFilterActions = require('../../actions/RaceTypeFilter-actions');

function raceTypes(){
  return {
    raceTypes: RaceTypeFilterStore.getRaceTypes()
  };
}

var RaceTypeFilter = React.createClass({
  getInitialState: function(){
    return raceTypes();
  },
  componentWillMount: function(){
    RaceTypeFilterStore.addChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState(raceTypes());
  },
  handler: function(event) {
    RaceTypeFilterActions.updateRaceTypesFilter(event.target.name);
  },
  render: function (){
    var checkboxes = this.state.raceTypes.map(function(raceType) {
      return (
        <div key={raceType.type}>
          <label htmlFor={raceType.type}>
            <input type="checkbox" checked={raceType.selected} id={raceType.type} name={raceType.type} onChange={this.handler} />
            &nbsp;{raceType.label}
          </label>
        </div>
      )
    }.bind(this));
    return (
      <form>
        {checkboxes}
      </form>
    )
  }
});

module.exports = RaceTypeFilter;
