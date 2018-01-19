import { connect } from 'react-redux';
import AutoUpdater from '../components/AutoUpdater/AutoUpdater';

function mapStateToProps({ updater }) {
  return { updater };
}

export default connect(mapStateToProps)(AutoUpdater);
