const React = require('react');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class List extends React.Component {
  render () {
    return (
      <ul className='list'>
        <ReactCSSTransitionGroup transitionName='list__item-' transitionEnterTimeout={200} transitionLeaveTimeout={200}>
          {this.props.data.map(itemProps => this.renderItem(itemProps, this.props.handleRemove))}
        </ReactCSSTransitionGroup>
      </ul>
    );
  }

  renderItem (props, handleRemove) {
    return (
      <li className='list__item' key={props.id}>
        <span className='list__item_text'>{props.name}</span>
        {handleRemove ? <button className='list__item_remove' onClick={handleRemove.bind(this, props.id)}>Remove</button> : ''}
      </li>
    );
  }
}

module.exports = List;
