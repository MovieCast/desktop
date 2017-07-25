import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Catalog from '../components/Catalog';
import * as MovieActions from '../../shared/actions/items';

function mapStateToProps({ movies }) {
  return { items: movies };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MovieActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
