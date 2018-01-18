import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Catalog from '../components/Catalog/Catalog';
import { setFilter } from '../../shared/actions/catalog';
import { fetchMovies } from '../../shared/actions/entities';
// import { getMoviesResult } from '../../shared/selectors/catalog';


// function mapStateToProps({ catalog }) {
//   return { catalog };
// }

const getResult = (state) => state.catalog.result;
const getMovies = (state) => state.entities.movies;

// Select movie result list
const getMoviesResult = createSelector(
  [getResult, getMovies],
  (result, movies) => {
    if (!result) return null;
    return result.map(movieId => movies[movieId]);
  }
);


function mapStateToProps(state) {
  return {
    result: getMoviesResult(state),
    filter: state.catalog.filter,
    moreAvailable: state.catalog.moreAvailable
  };
}


export default connect(mapStateToProps, {
  fetchItems: fetchMovies,
  setFilter
})(Catalog);
