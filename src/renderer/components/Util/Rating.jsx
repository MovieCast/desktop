import React from 'react';
import PropTypes from 'prop-types';
import {
  Star,
  StarBorder,
  StarHalf
} from 'material-ui-icons';

function Rating(props) {
  const rating = Math.round(props.rating) / 2;

  return (
    <div className={props.className}>
      {[1, 2, 3, 4, 5].map(i => {
        if (i > rating) {
          if (rating % 1 > 0 && Math.ceil(rating) === i) {
            return (<StarHalf key={i} />);
          }
          return (<StarBorder key={i} />);
        }
        return (<Star key={i} />);
      })}
    </div>
  );
}

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  size: PropTypes.number
};

Rating.defaultProps = {
  size: 24
};

export default Rating;
