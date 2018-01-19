/* eslint-disable react/forbid-prop-types, jsx-a11y/no-static-element-interactions, no-return-assign, max-len */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

function getPercent(value, min, max) {
  let percent = (value - min) / (max - min);
  if (isNaN(percent)) {
    percent = 0;
  }

  return percent;
}

const styles = theme => ({
  slider: {
    touchCallout: 'none',
    userSelect: 'none',
    cursor: 'default',
    position: 'relative',
    // marginTop: 24,
    // marginBottom: 48,
    height: 18,
    width: '100%'
  },
  track: {
    position: 'absolute',
    top: 18 - 12,
    left: 0,
    width: '100%',
    height: 2,
    backgroundColor: theme.palette.primary[300]
  },
  filled: {
    directionInverant: true,
    position: 'absolute',
    left: 0,
    height: '100%',
    backgroundColor: theme.palette.primary[100],
    marginRight: 1,
  },
  handle: {
    directionInverant: true,
    boxSizing: 'border-box',
    position: 'absolute',
    cursor: 'pointer',
    pointerEvents: 'inherit',
    zIndex: 1,
    margin: '1px 0 0 0',
    width: 12,
    height: 12,
    backgroundColor: theme.palette.primary[100],
    backgroundClip: 'padding-box',
    border: '0px solid transparent',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'visible',
    outline: 'none'
  },
  handleWhenDisabled: {
    boxSizing: 'content-box',
    cursor: 'not-allowed',
    backgroundColor: theme.palette.primary[300],
    width: 8,
    height: 8,
    border: 'none'
  },
  handleWhenPercentZero: {

  },
  handleWhenActive: {
    width: 18,
    height: 18
  }
});

class Slider extends Component {
  state = {
    active: false,
    dragging: false,
    focused: false,
    hovered: false,
    value: 0
  }

  componentWillMount() {
    const {
      defaultValue,
      min,
      max
    } = this.props;

    let {
      value
    } = this.props;

    if (value === undefined) {
      value = defaultValue !== undefined ? defaultValue : min;
    }

    this.setState({
      value: this.resolveValue(value, min, max)
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined && !this.state.dragging) {
      const {
        min = this.props.min,
        max = this.props.max
      } = nextProps;

      this.setState({
        value: this.resolveValue(nextProps.value, min, max)
      });
    }
  }

  track = null;
  handle = null;

  resolveValue = (value, min, max) => {
    if (value > max) {
      return max;
    }

    if (value < min) {
      return min;
    }

    return value;
  }

  handleFocus = (event) => {
    this.setState({
      focused: true
    });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  handleBlur = (event) => {
    this.setState({
      focused: false,
      active: false
    });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  handleMouseDown = (event) => {
    const { disabled } = this.props;

    if (disabled) return;

    const position = event.clientX - this.getTrackOffset();
    this.setValueFromPosition(event, position);

    document.addEventListener('mousemove', this.handleDragMouseMove);
    document.addEventListener('mouseup', this.handleMouseEnd);

    // Cancel text selection
    event.preventDefault();

    // Set focus manually since we called preventDefault()
    this.handle.focus();

    this.onDragStart(event);
  }

  handleMouseEnter = () => {
    this.setState({
      hovered: true
    });
  }

  handleMouseLeave = () => {
    this.setState({
      hovered: false
    });
  }

  handleMouseUp = () => {
    if (!this.props.disabled) {
      this.setState({
        active: false
      });
    }
  }

  handleTouchStart = () => {

  }

  handleDragMouseMove = (event) => {
    this.onDragUpdate(event, 'mouse');
  }

  handleMouseEnd = (event) => {
    document.removeEventListener('mousemove', this.handleDragMouseMove);
    document.removeEventListener('mouseup', this.handleMouseEnd);

    this.onDragStop(event);
  }

  getTrackOffset() {
    return this.track.getBoundingClientRect().left;
  }

  onDragStart(event) {
    this.setState({
      dragging: true,
      active: true
    });

    if (this.props.onDragStart) {
      this.props.onDragStart(event);
    }
  }

  onDragUpdate(event, type) {
    const { disabled } = this.props;

    if (this.dragRunning) return;

    this.dragRunning = true;

    requestAnimationFrame(() => {
      this.dragRunning = false;

      const source = type === 'touch' ? event.touches[0] : event;

      const position = source.clientX - this.getTrackOffset();

      if (!disabled) {
        this.setValueFromPosition(event, position);
      }
    });
  }

  onDragStop(event) {
    this.setState({
      dragging: false,
      active: false
    });

    if (this.props.onDragStop) {
      this.props.onDragStop(event);
    }
  }

  setValueFromPosition(event, position) {
    const {
      step,
      min,
      max
    } = this.props;

    const positionMax = this.track.clientWidth;

    let value;
    if (position <= 0) {
      value = min;
    } else if (position >= positionMax) {
      value = max;
    } else {
      value = (position / positionMax) * (max - min);
      value = (Math.round(value / step) * step) + min;
      value = parseFloat(value.toFixed(5));
    }

    console.log(value);

    value = this.resolveValue(value, min, max);

    if (this.state.value !== value) {
      this.setState({ value });

      if (this.props.onChange) {
        this.props.onChange(event, value);
      }
    }
  }

  render() {
    const {
      classes,
      disabled,
      min,
      max,
      step
    } = this.props;

    const {
      active,
      focused,
      hovered,
      value
    } = this.state;

    const disabledGutter = 2 + (8 / 2);
    const calcDisabledSpacing = disabled ? ` - ${disabledGutter}px` : '';
    const percent = getPercent(value, min, max);

    return (
      <div
        className={classes.slider}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        onTouchStart={this.handleTouchStart}
      >
        <div ref={(node) => this.track = node} className={classes.track}>
          <div className={classes.filled} style={{ width: `calc(${(percent * 100)}%${calcDisabledSpacing})` }} />
          <div
            ref={(node) => this.handle = node}
            style={{ left: `${percent * 100}%` }}
            className={classNames(classes.handle, {
              [classes.handleWhenActive]: this.state.active,
              [classes.handleWhenDisabled]: this.props.disabled
            })}
          />
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  // axis: PropTypes.oneOf(['x', 'x-reverse', 'y', 'y-reverse']),
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragStop: PropTypes.func,
  onFocus: PropTypes.func,
  step: PropTypes.number,
  value: PropTypes.number
};

Slider.defaultProps = {
  axis: 'x',
  defaultValue: null,
  disabled: false,
  min: 0,
  max: 1,
  step: 0.01,
  value: 0,

  onBlur: () => {},
  onChange: () => {},
  onDragStart: () => {},
  onDragStop: () => {},
  onFocus: () => {}
};

export default withStyles(styles)(Slider);
