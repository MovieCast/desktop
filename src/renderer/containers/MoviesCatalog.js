import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Catalog from '../components/Catalog/Catalog';
import { fetchMovies, setFilter } from '../../shared/actions/catalog';
import { configureAppBar } from '../../shared/actions/application';
import { getMoviesResult } from '../../shared/selectors/catalog';

// function mapStateToProps({ catalog }) {
//   return { catalog };
// }

function mapStateToProps({ catalog }) {
  return {
    result: getMoviesResult(catalog),
    filter: catalog.filter,
    moreAvailable: catalog.moreAvailable
  };
}


export default withRouter(connect(mapStateToProps, {
  fetchItems: fetchMovies,
  setFilter,
  configureAppBar
})(Catalog));
