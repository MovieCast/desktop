import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Player from '../components/Player/Player';

import {
  togglePlay,
  setBuffering,
  updateDuration,
  updateCurrentTime,
  toggleFullscreen,
  toggleUi,
  PLAYER_VIEW_UNLOADED
} from '../../shared/actions/player';

function mapStateToProps({ player }) {
  return { player };
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    togglePlay,
    setBuffering,
    updateDuration,
    updateCurrentTime,
    toggleFullscreen,
    toggleUi
  }, dispatch),
  onUnload: () => dispatch({ type: PLAYER_VIEW_UNLOADED })
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
