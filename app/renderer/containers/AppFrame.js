import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppFrame from '../components/AppFrame';

function mapStateToProps({ updater, settings }) {
  return { updater, settings };
}

export default withRouter(connect(mapStateToProps)(AppFrame));
