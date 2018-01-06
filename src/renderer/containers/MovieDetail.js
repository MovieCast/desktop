import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Detail from '../components/Detail/Detail';
import { fetchMovie } from '../../shared/actions/catalog';
import { configureAppBar } from '../../shared/actions/application';
import { playTorrent } from '../../shared/actions/player';

function mapStateToProps({ catalog, torrent }, ownProps) {
  return { item: catalog.entities.movies[ownProps.match.params.id], torrent };
}

export default withRouter(connect(mapStateToProps, {
  fetchItem: fetchMovie,
  playTorrent,
  configureAppBar
})(Detail));
