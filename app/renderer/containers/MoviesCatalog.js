import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Catalog from '../components/Catalog';
import { fetchMovies } from '../../shared/actions/items';
import { configureAppBar } from '../../shared/actions/application';

function mapStateToProps({ movies }) {
  return { items: movies };
}

export default withRouter(connect(mapStateToProps, {
  fetchItems: fetchMovies,
  configureAppBar
})(Catalog));
