import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Detail from '../components/Detail/Detail';
import { fetchMovie } from '../../shared/actions/catalog';
import { configureAppBar } from '../../shared/actions/application';

function mapStateToProps({ catalog }, ownProps) {
  return { item: catalog.items[ownProps.match.params.id] };
}

export default withRouter(connect(mapStateToProps, {
  fetchItem: fetchMovie,
  configureAppBar
})(Detail));
