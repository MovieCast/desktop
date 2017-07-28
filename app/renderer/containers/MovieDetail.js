import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Detail from '../components/Detail';
import { fetchMovie } from '../../shared/actions/items';

function mapStateToProps({ movies }, ownProps) {
  return { item: movies[ownProps.match.params.id] };
}

export default withRouter(connect(mapStateToProps, { fetchItem: fetchMovie })(Detail));
