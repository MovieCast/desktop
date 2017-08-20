import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Catalog from '../components/Catalog/Catalog';
import { fetchMovies } from '../../shared/actions/catalog';
import { configureAppBar } from '../../shared/actions/application';

function mapStateToProps({ catalog }) {
  return { catalog };
}

export default withRouter(connect(mapStateToProps, {
  fetchItems: fetchMovies,
  configureAppBar
})(Catalog));
