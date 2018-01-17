import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Catalog from '../components/Catalog/Catalog';
import { fetchMovies, setFilter } from '../../shared/actions/catalog';
import { configureAppBar } from '../../shared/actions/application';
import { getMoviesResult } from '../../shared/selectors/catalog';

// function mapStateToProps({ catalog }) {
//   return { catalog };
// }

function mapStateToProps({ entities, catalog }) {
  return {
    result: getMoviesResult({ movies: entities.movies, result: catalog.result }),
    filter: catalog.filter,
    moreAvailable: catalog.moreAvailable
  };
}


export default withRouter(connect(mapStateToProps, {
  fetchItems: fetchMovies,
  setFilter,
  configureAppBar
})(Catalog));
