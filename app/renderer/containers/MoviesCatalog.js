import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Catalog from '../components/Catalog';
import { fetchMovies } from '../../shared/actions/items';

function mapStateToProps({ movies }) {
  return { items: movies };
}

export default withRouter(connect(mapStateToProps, { fetchItems: fetchMovies })(Catalog));
