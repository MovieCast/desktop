import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Settings from '../components/Settings';
import { configureAppBar } from '../../shared/actions/application';
import { changeSettings, resetSettings } from '../../shared/actions/settings';

function mapStateToProps({ settings }) {
  return { settings };
}

export default withRouter(connect(mapStateToProps, {
  configureAppBar,
  changeSettings,
  resetSettings
})(Settings));
