import { connect } from 'react-redux';
import AppTitleBar from '../components/App/AppTitleBar';

function mapStateToProps({ application }) {
  return { application };
}

export default connect(mapStateToProps)(AppTitleBar);
