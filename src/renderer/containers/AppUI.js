import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppUI from '../components/App/AppUI';

function mapStateToProps({ settings: { ui } }) {
  return { ui };
}

export default withRouter(connect(mapStateToProps)(AppUI));
