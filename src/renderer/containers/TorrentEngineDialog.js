/* eslint-disable */
import { connect } from 'react-redux';
import TorrentEngineDialog from '../components/Debug/TorrentEngineDialog';

function mapStateToProps({ torrent }) {
  return { torrent };
}

export default connect(mapStateToProps)(TorrentEngineDialog);
