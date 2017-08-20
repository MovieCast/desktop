import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Player from '../components/Player/Player';
import { configureAppBar } from '../../shared/actions/application';
import * as playerActions from '../../shared/actions/player';

function mapStateToProps({ player }) {
  return { player };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...playerActions, configureAppBar }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Player));
