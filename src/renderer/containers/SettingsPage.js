import { connect } from 'react-redux';
import Settings from '../components/Settings/Settings';
import { changeSettings, resetSettings } from '../../shared/actions/settings';

function mapStateToProps({ settings }) {
  return { settings };
}

export default connect(mapStateToProps, {
  changeSettings,
  resetSettings
})(Settings);
