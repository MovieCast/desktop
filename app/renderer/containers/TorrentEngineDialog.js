import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TorrentEngineDialog from '../components/Debug/TorrentEngineDialog';

function mapStateToProps({ torrent }) {
  return { torrent };
}

export default withRouter(connect(mapStateToProps)(TorrentEngineDialog));
