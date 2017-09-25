/* eslint-disable class-methods-use-this, react/no-find-dom-node */
import _ from 'lodash';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import hoistNonReactStatic from 'hoist-non-react-statics';

function handleViewport(Component, options) {
  class InViewport extends PureComponent {
    constructor(props) {
      super(props);
      this.observer = null;
      this.node = null;
      this.state = {
        inViewport: false
      };
      this.handleIntersection = this.handleIntersection.bind(this);
      this.initIntersectionObserver = this.initIntersectionObserver.bind(this);
    }

    componentDidMount() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.initIntersectionObserver();
      this.startObserver(this.node, this.observer);
    }

    componentWillUnmount() {
      this.stopObserver(this.node, this.observer);
    }

    initIntersectionObserver() {
      if (!this.observer) {
        this.observer = new IntersectionObserver(
          this.handleIntersection,
          options
        );
      }
    }

    startObserver(node, observer) {
      if (node && observer) {
        observer.observe(node);
      }
    }

    stopObserver(node, observer) {
      if (node && observer) {
        observer.unobserve(node);
        observer.disconnect();
      }
    }

    // TODO: Find out whether throttle or debounce does
    //       a better job.
    handleIntersection = _.throttle((entries) => {
      const entry = entries[0] || {};
      const { intersectionRatio } = entry;

      const inViewport = intersectionRatio > 0;

      if (this.state.inViewport !== inViewport) {
        this.setState({ inViewport, intersectionRatio });
      }
    }, 400);

    render() {
      return (
        <Component
          {...this.props}
          inViewport={this.state.inViewport}
          ref={node => {
            this.node = ReactDOM.findDOMNode(node);
          }}
          innerRef={node => {
            if (node && !this.node) {
              // handle stateless
              this.initIntersectionObserver();
              this.startObserver(ReactDOM.findDOMNode(node), this.observer);
            }
          }}
        />
      );
    }
  }
  return hoistNonReactStatic(InViewport, Component);
}

export default handleViewport;
