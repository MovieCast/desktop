import { connect } from 'react-redux';
import AppFrame from '../components/AppFrame';

function mapStateToProps({ updater, settings }) {
  return { updater, settings };
}

export default connect(mapStateToProps)(AppFrame);
