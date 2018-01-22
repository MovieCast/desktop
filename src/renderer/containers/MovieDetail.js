import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Detail from '../components/Detail/Detail';
import { fetchMovie } from '../../shared/actions/entities';

import { DETAIL_VIEW_UNLOADED } from '../../shared/actions/detail';

// This logic should be placed elsewere at some point
// Select entities from state
const getResult = (state) => state.result;
const getMovies = (state) => state.movies;

// Select movie result list
const getMovieResult = createSelector(
  [getResult, getMovies],
  (result, movies) => {
    if (!result) return null;
    return movies[result];
  }
);

function mapStateToProps({ entities, streamer, detail: { loading } }, ownProps) {
  return {
    item: getMovieResult({ movies: entities.movies, result: ownProps.match.params.id }),
    streamer,
    loading
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchItem: fetchMovie }, dispatch),
  onUnload: () => dispatch({ type: DETAIL_VIEW_UNLOADED }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
