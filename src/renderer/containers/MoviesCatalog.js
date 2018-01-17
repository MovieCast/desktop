import { connect } from 'react-redux';
import Catalog from '../components/Catalog/Catalog';
import { setFilter } from '../../shared/actions/catalog';
import { fetchMovies } from '../../shared/actions/entities';
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


export default connect(mapStateToProps, {
  fetchItems: fetchMovies,
  setFilter
})(Catalog);
