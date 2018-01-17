import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Player from '../components/Player/Player';
import * as playerActions from '../../shared/actions/player';

function mapStateToProps({ player }) {
  return { player };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...playerActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
