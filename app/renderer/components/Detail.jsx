import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Detail extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchItem(id);
  }

  render() {
    const { item } = this.props;
    return (
      <div>
        { item.title }
        <img src={item.background_image_original} />
      </div>
    );
  }
}

Detail.propTypes = {
  item: PropTypes.object,
  match: PropTypes.object.isRequired,
  fetchItem: PropTypes.func.isRequired
};
