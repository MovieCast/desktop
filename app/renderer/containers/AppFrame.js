import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppFrame from '../components/AppFrame';

function mapStateToProps({ application, updater, settings }) {
  return { application, updater, settings };
}

export default withRouter(connect(mapStateToProps)(AppFrame));
