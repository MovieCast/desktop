import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { denormalize } from 'normalizr';
import Catalog from '../components/Catalog/Catalog';
import { fetchMovies, setFilter } from '../../shared/actions/catalog';
import { configureAppBar } from '../../shared/actions/application';
import { getMoviesResult } from '../../shared/selectors/catalog';
import { movieList } from '../../shared/normalizers/movie';

// function mapStateToProps({ catalog }) {
//   return { catalog };
// }

function mapStateToProps({ catalog }) {
  console.log(denormalize(catalog.entities, movieList, catalog.result));
  return {
    result: getMoviesResult(catalog),
    // result: denormalize(catalog.entities, movieList, catalog.result).movies,
    filter: catalog.filter
  };
}


export default withRouter(connect(mapStateToProps, {
  fetchItems: fetchMovies,
  setFilter,
  configureAppBar
})(Catalog));
