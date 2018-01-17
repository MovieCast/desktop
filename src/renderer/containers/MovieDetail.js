import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import Detail from '../components/Detail/Detail';
import { fetchMovie } from '../../shared/actions/entities';
import { playTorrent } from '../../shared/actions/player';

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

function mapStateToProps({ entities, torrent, detail: { loading } }, ownProps) {
  return {
    item: getMovieResult({ movies: entities.movies, result: ownProps.match.params.id }),
    torrent,
    loading
  };
}

export default connect(mapStateToProps, {
  fetchItem: fetchMovie,
  playTorrent
})(Detail);
