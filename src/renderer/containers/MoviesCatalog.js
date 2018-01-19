import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';

import Catalog from '../components/Catalog/Catalog';
import { fetchMovies } from '../../shared/actions/entities';
import { setFilter, CATALOG_VIEW_UNLOADED } from '../../shared/actions/catalog';

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

const mapStateToProps = (state) => ({
  filter: state.catalog.filter,
  result: getMoviesResult(state),
  loading: state.catalog.loading,
  moreAvailable: state.catalog.moreAvailable
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchItems: fetchMovies, setFilter }, dispatch),
  onUnload: () => dispatch({ type: CATALOG_VIEW_UNLOADED }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
