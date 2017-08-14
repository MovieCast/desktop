import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Player from '../components/Player/Player';
import { configureAppBar } from '../../shared/actions/application';

export default withRouter(connect(null, {
  configureAppBar
})(Player));
