import { connect } from 'react-redux';
import App from '../components/App';

function mapStateToProps({ settings: { ui } }) {
  return { ui };
}

export default connect(mapStateToProps)(App);
